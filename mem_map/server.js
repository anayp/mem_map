// Minimal static server for the Memory Map prototype.
// Usage: node server.js (set PORT env if desired).

const http = require("http");
const path = require("path");
const fs = require("fs");
const { URL } = require("url");

const ROOT = __dirname;
const PORT = process.env.PORT || 4500;
const HOST = process.env.HOST || "127.0.0.1";
const CONTEXT_PATH = path.join(ROOT, "data", "context-data.json");
const CONTEXT_BAK = `${CONTEXT_PATH}.bak`;
const JOURNAL = path.join(ROOT, "data", "context-data.log");
const TOKEN = process.env.MEMMAP_TOKEN || null;
const SCAN_ROOT = path.resolve(process.env.MEMMAP_SCAN_ROOT || process.cwd());
const MAX_FILES = Number(process.env.MEMMAP_MAX_FILES || 5000);
const MAX_DEPTH = Number(process.env.MEMMAP_MAX_DEPTH || 8);
const MAX_BYTES = Number(process.env.MEMMAP_MAX_BYTES || 25 * 1024 * 1024);
const DEBUG_ABS = !!process.env.MEMMAP_DEBUG_ABS;

const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

function shouldSkip(name) {
  const lowered = name.toLowerCase();
  return lowered === ".git" || lowered === "node_modules" || lowered === ".ds_store";
}

function withinSandbox(target) {
  try {
    const real = path.resolve(fs.realpathSync(target));
    const root = path.resolve(SCAN_ROOT);
    return real === root || real.startsWith(root + path.sep);
  } catch (_) {
    return false;
  }
}

function safeLstat(p) {
  try {
    return fs.lstatSync(p);
  } catch (_) {
    return null;
  }
}

function safeReaddir(p) {
  try {
    return fs.readdirSync(p, { withFileTypes: true });
  } catch (_) {
    return null;
  }
}

function toRel(root, abs) {
  const r = path.resolve(root);
  const a = path.resolve(abs);
  return path
    .relative(r, a)
    .replace(/\\/g, "/");
}

function scanPath(rootPath) {
  const nodes = [];
  const edges = [];
  const rootId = path.basename(rootPath) || rootPath;
  let fileCount = 0;
  let totalBytes = 0;
  let errorCount = 0;

  function walk(current, depth) {
    if (depth > MAX_DEPTH) return;
    const stat = safeLstat(current);
    if (!stat) {
      errorCount += 1;
      return;
    }
    if (stat.isSymbolicLink()) return;
    const rel = path.relative(rootPath, current);
    const relId = rel ? rel.replace(/\\/g, "/") : "";
    const id = relId || rootId;
    const isDir = stat.isDirectory();
    if (!isDir) {
      fileCount += 1;
      totalBytes += stat.size;
      if (fileCount > MAX_FILES || totalBytes > MAX_BYTES) return;
    }
    nodes.push({
      id,
      type: isDir ? "DIRECTORY" : "FILE",
      payload: {
        relPath: relId || ".",
        path: relId || ".",
        absPath: DEBUG_ABS ? current : undefined,
        exists: true
      },
      metadata: {
        summary: `${isDir ? "Directory" : "File"}: ${path.basename(current)}`,
        tags: isDir ? ["dir"] : ["file"]
      }
    });

    if (isDir) {
      const children = safeReaddir(current);
      if (!children) {
        errorCount += 1;
        return;
      }
      for (const child of children) {
        const name = child.name;
        if (shouldSkip(name)) continue;
        const childPath = path.join(current, name);
        const childRel = path.relative(rootPath, childPath);
        const childId = childRel ? childRel.replace(/\\/g, "/") : rootId;
        edges.push({ from: id, to: childId, type: "CONTAINS" });
        if (child.isDirectory()) {
          walk(childPath, depth + 1);
        } else {
          walk(childPath, depth + 1);
        }
        if (fileCount > MAX_FILES || totalBytes > MAX_BYTES) break;
      }
    }
  }

  walk(rootPath, 0);
  return {
    schema_version: 2,
    board_id: `scan:${rootId}`,
    board_version: 1,
    title: `Scan of ${rootPath}`,
    content: { nodes, edges },
    view: {},
    scan_meta: {
      root: rootPath,
      limits: { MAX_FILES, MAX_DEPTH, MAX_BYTES },
      ts: new Date().toISOString(),
      errors: errorCount
    }
  };
}

function requireToken(req, res) {
  if (!TOKEN) return true;
  const header = req.headers["x-memmap-token"];
  if (header && header === TOKEN) return true;
  res.writeHead(401, { "Content-Type": "text/plain" });
  res.end("Unauthorized");
  return false;
}

function readCurrentBoard() {
  if (!fs.existsSync(CONTEXT_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(CONTEXT_PATH, "utf8"));
  } catch (_) {
    return null;
  }
}

function writeAtomic(jsonString) {
  const tmp = `${CONTEXT_PATH}.tmp`;
  fs.writeFileSync(tmp, jsonString, "utf8");
  if (fs.existsSync(CONTEXT_PATH)) {
    try {
      const backup = fs.readFileSync(CONTEXT_PATH, "utf8");
      fs.writeFileSync(CONTEXT_BAK, backup, "utf8");
    } catch (_) {
      // ignore backup failure
    }
  }
  fs.renameSync(tmp, CONTEXT_PATH);
}

function appendJournal(entry) {
  try {
    const line = `${new Date().toISOString()} ${JSON.stringify(entry)}\n`;
    fs.appendFileSync(JOURNAL, line, "utf8");
  } catch (_) {
    // ignore journal errors
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // API: get context
  if (url.pathname === "/api/context" && req.method === "GET") {
    if (!requireToken(req, res)) return;
    const current = readCurrentBoard();
    if (!current) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ schema_version: 2, board_id: "empty", board_version: 1, content: { nodes: [], edges: [] }, view: {} }, null, 2));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    res.end(JSON.stringify(current, null, 2));
    return;
  }

  // API: scan filesystem path
  if (url.pathname === "/api/scan" && req.method === "POST") {
    if (!requireToken(req, res)) return;
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
      if (body.length > 2 * 1024 * 1024) {
        res.writeHead(413);
        res.end("Payload too large");
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body || "{}");
        const targetPath = parsed.path;
        if (!targetPath || typeof targetPath !== "string") {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Missing path");
          return;
        }
        const abs = path.resolve(targetPath);
        if (!fs.existsSync(abs)) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Path does not exist");
          return;
        }
        if (!withinSandbox(abs)) {
          res.writeHead(403, { "Content-Type": "text/plain" });
          res.end("Path outside sandbox");
          return;
        }
        const result = scanPath(abs);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result, null, 2));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad JSON");
      }
    });
    return;
  }

  // API: save context
  if (url.pathname === "/api/context" && req.method === "POST") {
    if (!requireToken(req, res)) return;
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) {
        res.writeHead(413);
        res.end("Payload too large");
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        const isV2 = parsed && parsed.content && Array.isArray(parsed.content.nodes) && Array.isArray(parsed.content.edges);
        const nodes = isV2 ? parsed.content.nodes : parsed.nodes;
        const edges = isV2 ? parsed.content.edges : parsed.edges;
        if (!parsed || typeof parsed !== "object" || !Array.isArray(nodes) || !Array.isArray(edges)) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Invalid context payload");
          return;
        }
        // version check
        const current = readCurrentBoard();
        const incomingVersion = parsed.board_version || (parsed.content && parsed.content.board_version) || 1;
        const currentVersion = current && (current.board_version || 1);
        if (current && incomingVersion !== currentVersion) {
          res.writeHead(409, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: false, conflict: true, board_version: currentVersion }));
          return;
        }
        const nextVersion = (currentVersion || 0) + 1;
        parsed.board_version = nextVersion;
        if (!parsed.schema_version) parsed.schema_version = 2;
        const jsonString = JSON.stringify(parsed, null, 2);
        writeAtomic(jsonString);
        appendJournal({ event: "save", version: nextVersion, size: jsonString.length });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, board_version: nextVersion }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad JSON");
      }
    });
    return;
  }

  // Static files
  const urlPath = url.pathname;

  if (urlPath === "/favicon.ico") {
    const iconPath = path.join(ROOT, "context.svg");
    if (fs.existsSync(iconPath)) {
      res.writeHead(200, { "Content-Type": "image/svg+xml" });
      fs.createReadStream(iconPath).pipe(res);
      return;
    } else {
      res.writeHead(204);
      res.end();
      return;
    }
  }

  const requested = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  const safePath = path.normalize(requested).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(ROOT, safePath);

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mime[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Memory Map server running at http://${HOST}:${PORT}`);
  if (TOKEN) console.log("Token auth enabled for APIs.");
  console.log(`Scan sandbox root: ${SCAN_ROOT}`);
});
