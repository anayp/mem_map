const fallbackContext = {
  schema_version: 2,
  board_id: "mem-map-demo",
  board_version: 1,
  title: "Memory Map Prototype",
  content: {
    nodes: [
      {
        id: "root",
        type: "DIRECTORY",
        payload: { path: "/", exists: true },
        metadata: {
          summary: "Workspace for the context mapping lab (Memory Map prototype + reference init spec).",
          dev_notes: "Workspace entry; serves as the anchor for all nodes. Context system experiments live here.",
          tags: ["workspace", "context-system"],
          tasks: [{ title: "Keep context JSON in sync", status: "IN_PROGRESS" }]
        }
      },
      {
        id: "mem_map",
        type: "DIRECTORY",
        payload: { path: "mem_map", exists: true },
        metadata: {
          summary: "Memory Map prototype (UI + static server).",
          dev_notes: "Core prototype for visual context mapping; includes UI, API server, and sample data.",
          tags: ["ui", "prototype"],
          status: "IN_PROGRESS"
        }
      },
      {
        id: "mem_map/index.html",
        type: "FILE",
        payload: { path: "mem_map/index.html", exists: true },
        metadata: {
          summary: "Single-page UI shell: graph canvas, details, hierarchy, raw JSON accordion.",
          dev_notes: "ForceGraph CDN; panels toggle; detail panel on left, controls right/bottom; layout freeze/save buttons.",
          tags: ["ui", "layout"],
          status: "IN_PROGRESS"
        }
      },
      {
        id: "mem_map/style.css",
        type: "FILE",
        payload: { path: "mem_map/style.css", exists: true },
        metadata: {
          summary: "Styles for layout, responsive grid, panel scrolling, badges, raw JSON accordion.",
          dev_notes: "Panels have max-heights, overflow handling; hidden-panel class for toggles; left panel scrolls with section gaps.",
          tags: ["style", "responsive"],
          status: "TODO",
          tasks: [
            {
              title: "fix bad ui. make it responsive and each parts ui should be scrollable to fit overflow. keep the current left pane at the bottom. the pane at the right with details should be on the left. both of these should be toggleable and/or become visible when a node in the graph is clicked on. maybe the stored metadat cpuld also be show on hover pverview",
              status: "TODO"
            }
          ]
        }
      },
      {
        id: "mem_map/app.js",
        type: "FILE",
        payload: { path: "mem_map/app.js", exists: true },
        metadata: {
          summary: "Client logic: load/apply context, filters, detail/edit, save, auto-scan local paths.",
          dev_notes: "Loads via /api/context; scan via /api/scan; auth token header; layout freeze/save; debounced renders; view/layout persisted.",
          tags: ["logic", "client"],
          status: "IN_PROGRESS",
          tasks: [
            { title: "Improve hover previews from metadata summary/context", status: "TODO" }
          ]
        }
      },
      {
        id: "mem_map/data",
        type: "DIRECTORY",
        payload: { path: "mem_map/data", exists: true },
        metadata: {
          summary: "Data folder for context JSON.",
          tags: ["data"]
        }
      },
      {
        id: "mem_map/data/context-data.json",
        type: "FILE",
        payload: { path: "mem_map/data/context-data.json", exists: true },
        metadata: {
          summary: "Bundled demo context + default save target.",
          dev_notes: "Overwritten by Save or /api/scan responses; schema_version 2 with content/view separation.",
          tags: ["data"]
        }
      },
      {
        id: "mem_map/server.js",
        type: "FILE",
        payload: { path: "mem_map/server.js", exists: true },
        metadata: {
          summary: "Static server + APIs for saving context and scanning local paths.",
          dev_notes: "Serves UI + APIs; token-gated; scan sandbox/limits; atomic saves with backup/journal; GET /api/context; serves favicon.",
          tasks: [
            { title: "Start server to test UI", status: "TODO" },
            { title: "Optionally add auth/rate limits", status: "TODO" }
          ],
          tags: ["server", "api"]
        }
      },
      {
        id: "init_context_system.md",
        type: "FILE",
        payload: { path: "init_context_system.md", exists: true },
        metadata: {
          summary: "Reference context system init protocol; not driving this prototype directly.",
          dev_notes: "Use as ideas for metadata schema and sync patterns.",
          tags: ["reference"]
        }
      },
      {
        id: "README.md",
        type: "FILE",
        payload: { path: "README.md", exists: true },
        metadata: {
          summary: "Project overview, setup, and usage.",
          dev_notes: "Describes Memory Map features, API, and safety notes.",
          tags: ["docs"]
        }
      },
      {
        id: "LICENSE",
        type: "FILE",
        payload: { path: "LICENSE", exists: true },
        metadata: {
          summary: "MIT license for public distribution.",
          tags: ["legal"]
        }
      },
      {
        id: "CONTRIBUTING.md",
        type: "FILE",
        payload: { path: "CONTRIBUTING.md", exists: true },
        metadata: {
          summary: "Contribution guidelines for changes and PRs.",
          tags: ["docs", "community"]
        }
      },
      {
        id: "CODE_OF_CONDUCT.md",
        type: "FILE",
        payload: { path: "CODE_OF_CONDUCT.md", exists: true },
        metadata: {
          summary: "Community conduct expectations.",
          tags: ["docs", "community"]
        }
      },
      {
        id: "SECURITY.md",
        type: "FILE",
        payload: { path: "SECURITY.md", exists: true },
        metadata: {
          summary: "Security reporting guidance.",
          tags: ["docs", "security"]
        }
      },
      {
        id: ".gitignore",
        type: "FILE",
        payload: { path: ".gitignore", exists: true },
        metadata: {
          summary: "Ignore rules for runtime artifacts and local tooling.",
          tags: ["meta"]
        }
      },
      {
        id: "mem_map/context-mapping-notes.md",
        type: "FILE",
        payload: { path: "mem_map/context-mapping-notes.md", exists: true },
        metadata: {
          summary: "Working notes and roadmap for Memory Map improvements.",
          dev_notes: "Contains expert synthesis, risks, schema v2 sketch, and implementation order.",
          tags: ["notes", "roadmap"]
        }
      },
      {
        id: "mem_map/context.svg",
        type: "FILE",
        payload: { path: "mem_map/context.svg", exists: true },
        metadata: {
          summary: "Favicon/icon used by the Memory Map UI.",
          dev_notes: "100x100 SVG served at /favicon.ico.",
          tags: ["asset", "icon"]
        }
      },
      {
        id: "context-note",
        type: "NOTE",
        payload: { path: "notes/prototype", exists: false },
        metadata: {
          summary: "Focus on UI/flow first; wire to real data later.",
          dev_notes: "Do not run init protocol; this is a separate prototype.",
          tags: ["note"]
        }
      }
    ],
    edges: [
      { from: "root", to: "mem_map", type: "CONTAINS" },
      { from: "root", to: "init_context_system.md", type: "CONTAINS" },
      { from: "root", to: "README.md", type: "CONTAINS" },
      { from: "root", to: "LICENSE", type: "CONTAINS" },
      { from: "root", to: "CONTRIBUTING.md", type: "CONTAINS" },
      { from: "root", to: "CODE_OF_CONDUCT.md", type: "CONTAINS" },
      { from: "root", to: "SECURITY.md", type: "CONTAINS" },
      { from: "root", to: ".gitignore", type: "CONTAINS" },
      { from: "mem_map", to: "mem_map/index.html", type: "CONTAINS" },
      { from: "mem_map", to: "mem_map/style.css", type: "CONTAINS" },
      { from: "mem_map", to: "mem_map/app.js", type: "CONTAINS" },
      { from: "mem_map", to: "mem_map/data", type: "CONTAINS" },
      { from: "mem_map/data", to: "mem_map/data/context-data.json", type: "CONTAINS" },
      { from: "mem_map", to: "mem_map/server.js", type: "CONTAINS" },
      { from: "mem_map", to: "mem_map/context-mapping-notes.md", type: "CONTAINS" },
      { from: "mem_map", to: "mem_map/context.svg", type: "CONTAINS" },
      { from: "mem_map", to: "context-note", type: "RELATED" }
    ]
  },
  view: {
    layout: { positions: {}, frozen: false },
    filters: { search: "", showExisting: true, showPlanned: true, showNotes: true },
    panels: { details: true, controls: true }
  }
};

const state = {
  board: null,
  selectedId: null,
  panels: {
    details: true,
    controls: true
  },
  filters: {
    search: "",
    showExisting: true,
    showPlanned: true,
    showNotes: true
  },
  layoutFrozen: false,
  layoutPositions: {}
};

const els = {
  graph: document.getElementById("graph"),
  search: document.getElementById("search"),
  toggleExisting: document.getElementById("toggle-existing"),
  togglePlanned: document.getElementById("toggle-planned"),
  toggleNotes: document.getElementById("toggle-notes"),
  stats: document.getElementById("stats"),
  rawJson: document.getElementById("raw-json"),
  detailTitle: document.getElementById("detail-title"),
  detailType: document.getElementById("detail-type"),
  detailBody: document.getElementById("detail-body"),
  copyJson: document.getElementById("copy-json"),
  boardTitle: document.getElementById("board-title"),
  reset: document.getElementById("reset-view"),
  breadcrumb: document.getElementById("breadcrumb"),
  hierarchy: document.getElementById("hierarchy"),
  editNodeId: document.getElementById("edit-node-id"),
  editForm: document.getElementById("edit-form"),
  fieldSummary: document.getElementById("field-summary"),
  fieldContext: document.getElementById("field-context"),
  fieldStatus: document.getElementById("field-status"),
  fieldTags: document.getElementById("field-tags"),
  fieldCode: document.getElementById("field-code"),
  fieldTasks: document.getElementById("field-tasks"),
  saveNode: document.getElementById("save-node"),
  resetForm: document.getElementById("reset-form"),
  toggleDetails: document.getElementById("toggle-details"),
  toggleControls: document.getElementById("toggle-controls"),
  panelDetails: document.getElementById("panel-details"),
  panelControls: document.getElementById("panel-controls"),
  scanPath: document.getElementById("scan-path"),
  scanButton: document.getElementById("scan-button"),
  scanAuto: document.getElementById("scan-auto"),
  scanStatus: document.getElementById("scan-status"),
  freezeLayout: document.getElementById("freeze-layout"),
  saveLayout: document.getElementById("save-layout"),
  rawPanel: document.getElementById("raw-panel"),
  tokenInput: document.getElementById("api-token"),
  fileTree: document.getElementById("file-tree")
};

let graph;
let refreshTimer = null;
let rawJsonTimer = null;
const collapsedDirs = new Set();

const colors = {
  FILE: "#78a9ff",
  DIRECTORY: "#6cf5c4",
  FUTURE_FILE: "#ff9fb6",
  FUTURE_DIRECTORY: "#ff9fb6",
  NOTE: "#f7c266",
  default: "#9cb1d6"
};

const selectHalo = {
  fill: "rgba(108, 245, 196, 0.32)",
  stroke: "#6cf5c4"
};

const statuses = {
  TODO: { label: "TODO", tone: "muted" },
  IN_PROGRESS: { label: "IN PROGRESS", tone: "accent" },
  DONE: { label: "DONE", tone: "accent-2" }
};

function getPathValue(node) {
  return node?.payload?.relPath || node?.payload?.path || "";
}

function getAuthToken() {
  return localStorage.getItem("memmap_token") || "";
}

function setAuthToken(value) {
  if (value) localStorage.setItem("memmap_token", value);
  else localStorage.removeItem("memmap_token");
}

function authHeaders() {
  const token = getAuthToken();
  return token ? { "x-memmap-token": token } : {};
}

async function apiGet(url) {
  const headers = { ...authHeaders() };
  const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
  return res;
}

async function apiPost(url, payload) {
  const headers = {
    "Content-Type": "application/json",
    ...authHeaders()
  };
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });
  return res;
}

function normalizeBoard(raw) {
  if (!raw) return null;
  const isV2 = raw.content && Array.isArray(raw.content.nodes);
  const nodes = isV2 ? raw.content.nodes : raw.nodes || [];
  const edges = isV2 ? raw.content.edges : raw.edges || [];
  const view = raw.view || {};
  return {
    schema_version: raw.schema_version || (isV2 ? 2 : 1),
    board_id: raw.board_id || "unnamed-board",
    board_version: raw.board_version || 1,
    title: raw.title || raw.board_id || "Context Board",
    content: { nodes, edges },
    view: {
      layout: view.layout || { positions: {}, frozen: false },
      filters:
        view.filters || {
          search: "",
          showExisting: true,
          showPlanned: true,
          showNotes: true
        },
      panels: view.panels || { details: true, controls: true }
    },
    scan_meta: raw.scan_meta
  };
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");
}

function normalizeMetadata(meta = {}) {
  return {
    summary: meta.summary || meta.description || meta.title || "",
    context: meta.dev_notes || meta.context || meta.notes || "",
    status: meta.status || (meta.tasks && meta.tasks[0]?.status) || "TODO",
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    code: meta.code || meta.snippet || "",
    tasks: Array.isArray(meta.tasks) ? meta.tasks : [],
    spec: meta.spec,
    raw: meta
  };
}

async function loadContext() {
  try {
    const res = await apiGet("/api/context");
    if (res.ok) {
      const raw = await res.json();
      state.board = normalizeBoard(raw);
    } else {
      throw new Error("Fetch failed");
    }
  } catch (err) {
    console.warn("Falling back to bundled context data", err);
    state.board = normalizeBoard(fallbackContext);
  }

  if (!graph) {
    initGraph();
    attachEvents();
  }
  applyData(state.board);
}

function initGraph() {
  graph = ForceGraph()(els.graph)
    .width(els.graph.clientWidth)
    .height(els.graph.clientHeight)
    .backgroundColor("#0a0f20")
    .nodeLabel(node => formatLabel(node.raw))
    .nodeColor(node => nodeColor(node.raw))
    .nodeVal(node => (state.selectedId && node.raw && node.raw.id === state.selectedId ? 5 : 4))
    .nodeCanvasObjectMode(() => "before")
    .nodeCanvasObject((node, ctx, globalScale) => {
      if (!state.selectedId || !node.raw || node.raw.id !== state.selectedId) return;
      const size = (node.val || 4) * 2.2;
      ctx.save();
      ctx.beginPath();
      ctx.arc(node.x, node.y, size / globalScale, 0, 2 * Math.PI, false);
      ctx.fillStyle = selectHalo.fill;
      ctx.fill();
      ctx.lineWidth = Math.max(1, 1.5 / globalScale);
      ctx.strokeStyle = selectHalo.stroke;
      ctx.stroke();
      ctx.restore();
    })
    .linkColor(() => "rgba(255,255,255,0.15)")
    .linkDirectionalParticles(2)
    .linkDirectionalParticleWidth(1)
    .onNodeClick(node => {
      selectNode(node.raw);
    });
}

function applyData(data) {
  state.board = normalizeBoard(data);
  if (!state.board) return;
  const title = state.board.title || state.board.board_id || "Context Board";
  const versionText = state.board.board_version ? ` (v${state.board.board_version})` : "";
  if (els.boardTitle) els.boardTitle.textContent = `${title}${versionText}`;
  scheduleRawJsonRefresh(true);
  // sync view preferences
  const defaultFilters = {
    search: "",
    showExisting: true,
    showPlanned: true,
    showNotes: true
  };
  state.filters = state.board.view && state.board.view.filters
    ? { ...defaultFilters, ...state.board.view.filters }
    : { ...defaultFilters };
  if (els.search) els.search.value = state.filters.search || "";
  if (els.toggleExisting) els.toggleExisting.checked = !!state.filters.showExisting;
  if (els.togglePlanned) els.togglePlanned.checked = !!state.filters.showPlanned;
  if (els.toggleNotes) els.toggleNotes.checked = !!state.filters.showNotes;

  const defaultPanels = { details: true, controls: true };
  state.panels = state.board.view && state.board.view.panels
    ? { ...defaultPanels, ...state.board.view.panels }
    : { ...defaultPanels };
  applyPanelVisibility();
  applySavedLayout();
  renderFileTree();
  if (graph) {
    if (state.layoutFrozen) graph.pauseAnimation();
    else graph.resumeAnimation();
  }
  state.selectedId = null;
  clearDetail();
  queueRefresh();
}

function nodeColor(node) {
  return colors[node.type] || colors.default;
}

function formatLabel(node) {
  const meta = node.metadata || {};
  const name = node.id;
  const summary = meta.summary || meta.dev_notes || "";
  const spec = meta.spec ? `\n[spec] ${meta.spec.item_text || ""}` : "";
  return `${name}${spec}${summary ? `\n${summary}` : ""}`;
}

function selectNode(node) {
  state.selectedId = node.id;
  renderDetail(node);
  syncForm(node);
  renderHierarchy(node.id);
  renderFileTree(node.id);
  ensurePanelVisible("details");
  queueRefresh();
}

function filterData() {
  if (!state.board || !state.board.content) return { nodes: [], edges: [] };
  const { search, showExisting, showPlanned, showNotes } = state.filters;
  const term = search.trim().toLowerCase();

  const filteredNodes = state.board.content.nodes.filter(node => {
    const isNote = node.type === "NOTE";
    const isPlanned = node.type.startsWith("FUTURE");
    const exists = node.payload?.exists;
    if (!showNotes && isNote) return false;
    if (!showPlanned && isPlanned) return false;
    if (!showExisting && exists) return false;

    if (!term) return true;

    const haystack = [
      node.id,
      node.payload?.relPath,
      node.payload?.path,
      node.metadata?.summary,
      node.metadata?.dev_notes,
      ...(node.metadata?.tags || []),
      node.metadata?.spec?.item_text
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(term);
  });

  const allowedIds = new Set(filteredNodes.map(n => n.id));
  const filteredEdges = state.board.content.edges.filter(
    e => allowedIds.has(e.from) && allowedIds.has(e.to)
  );

  return { nodes: filteredNodes, edges: filteredEdges };
}

function refreshGraph() {
  if (!state.board || !state.board.content || !graph) return;
  const { nodes, edges } = filterData();
  const nodesForGraph = nodes.map(n => {
    const nodeObj = { id: n.id, raw: n };
    const pos = state.layoutPositions?.[n.id];
    if (pos) {
      nodeObj.x = pos.x;
      nodeObj.y = pos.y;
      if (pos.z !== undefined) nodeObj.z = pos.z;
    }
    return nodeObj;
  });
  const linksForGraph = edges.map(e => ({
    source: e.from,
    target: e.to,
    raw: e
  }));

  graph.graphData({ nodes: nodesForGraph, links: linksForGraph });
  renderStats(nodes, edges);
  renderHierarchy(state.selectedId);
  renderFileTree(state.selectedId);

  // Keep the current detail selection valid
  const currentId = els.detailTitle.dataset.nodeId;
  if (currentId && !nodes.find(n => n.id === currentId)) {
    clearDetail();
  }
}

function queueRefresh() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => refreshGraph(), 120);
}

function rawJsonVisible() {
  return els.rawPanel && els.rawPanel.open;
}

function scheduleRawJsonRefresh(force = false) {
  if (!els.rawJson) return;
  if (!force && !rawJsonVisible()) return;
  clearTimeout(rawJsonTimer);
  rawJsonTimer = setTimeout(() => {
    if (els.rawJson && state.board && (force || rawJsonVisible())) {
      els.rawJson.textContent = JSON.stringify(state.board, null, 2);
    }
  }, force ? 0 : 400);
}

function getLayoutKey() {
  return state.board ? `layout:${state.board.board_id}` : null;
}

function loadLayoutCache() {
  const fromBoard = state.board?.view?.layout?.positions || {};
  let fromLocal = {};
  const key = getLayoutKey();
  if (key) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.positions) fromLocal = parsed.positions;
      }
    } catch (_) {
      // ignore
    }
  }
  return { ...fromBoard, ...fromLocal };
}

function applySavedLayout() {
  state.layoutPositions = loadLayoutCache();
  state.layoutFrozen = !!state.board?.view?.layout?.frozen;
  updateFreezeButton();
}

function saveLayout() {
  if (!graph || !state.board) return;
  const data = graph.graphData();
  const positions = {};
  (data.nodes || []).forEach(n => {
    if (n.x != null && n.y != null) {
      positions[n.id] = { x: n.x, y: n.y, z: n.z || 0 };
    }
  });
  state.layoutPositions = positions;
  if (!state.board.view) state.board.view = {};
  state.board.view.layout = { positions, frozen: state.layoutFrozen };
  const key = getLayoutKey();
  if (key) {
    try {
      localStorage.setItem(key, JSON.stringify({ positions }));
    } catch (_) {
      // ignore
    }
  }
  if (els.rawJson) {
    els.rawJson.textContent = JSON.stringify(state.board, null, 2);
  }
}

function toggleFreeze() {
  if (!graph) return;
  if (state.layoutFrozen) {
    graph.resumeAnimation();
    state.layoutFrozen = false;
  } else {
    graph.pauseAnimation();
    state.layoutFrozen = true;
  }
  if (state.board) {
    if (!state.board.view) state.board.view = {};
    state.board.view.layout = state.board.view.layout || {};
    state.board.view.layout.frozen = state.layoutFrozen;
  }
  updateFreezeButton();
}

function updateFreezeButton() {
  if (!els.freezeLayout) return;
  els.freezeLayout.textContent = state.layoutFrozen ? "Unfreeze layout" : "Freeze layout";
}

function renderStats(nodes, edges) {
  const planned = nodes.filter(n => n.type.startsWith("FUTURE")).length;
  const stats = els.stats.querySelectorAll(".stat .value");
  if (stats[0]) stats[0].textContent = nodes.length;
  if (stats[1]) stats[1].textContent = edges.length;
  if (stats[2]) stats[2].textContent = planned;
}

function renderDetail(node) {
  els.detailTitle.textContent = node.id;
  els.detailTitle.dataset.nodeId = node.id;
  els.detailType.textContent = node.type;
  const existsText = node.payload?.exists ? "exists" : "planned";
  const path = node.payload?.relPath || node.payload?.path || "-";

  const metaNorm = normalizeMetadata(node.metadata);
  const meta = node.metadata || {};
  const tags = metaNorm.tags.map(t => `<span class="badge">#${escapeHtml(t)}</span>`).join(" ");

  const tasks = (metaNorm.tasks || [])
    .map(task => {
      const tone = statuses[task.status] || statuses.TODO;
      const toneClass = tone.tone ? ` tone-${tone.tone}` : "";
      return `<div class="task"><strong>${escapeHtml(task.title)}</strong><br/><span class="badge${toneClass}">${tone.label}</span></div>`;
    })
    .join("") || '<p class="meta">No tasks.</p>';

  const spec = meta.spec
    ? `<p class="meta"><strong>Spec:</strong> ${escapeHtml(meta.spec.item_text || "")}</p>`
    : "";

  els.detailBody.innerHTML = `
    <p class="meta">${escapeHtml(path)} - ${escapeHtml(existsText)}</p>
    <p>${escapeHtml(metaNorm.summary || "No summary yet.")}</p>
    ${spec}
    ${metaNorm.context ? `<p class="meta">Context: ${escapeHtml(metaNorm.context)}</p>` : ""}
    ${tags ? `<div class="meta">Tags: ${tags}</div>` : ""}
    <div>${tasks}</div>
    ${metaNorm.code ? `<pre class="meta" style="white-space: pre-wrap;">${escapeHtml(metaNorm.code)}</pre>` : ""}
    ${renderUnknownMetadata(meta)}
  `;

  els.breadcrumb.textContent = node.payload?.path || node.id;
}

function clearDetail() {
  els.detailTitle.textContent = "Select a node";
  els.detailTitle.dataset.nodeId = "";
  els.detailType.textContent = "-";
  els.detailBody.textContent = "Click a node to inspect its metadata, tasks, and spec mapping.";
  els.breadcrumb.textContent = "-";
  state.selectedId = null;
}

function attachEvents() {
  if (els.search) {
    els.search.addEventListener("input", e => {
      state.filters.search = e.target.value;
      queueRefresh();
    });
  }

  if (els.toggleExisting) {
    els.toggleExisting.addEventListener("change", e => {
      state.filters.showExisting = e.target.checked;
      queueRefresh();
    });
  }
  if (els.togglePlanned) {
    els.togglePlanned.addEventListener("change", e => {
      state.filters.showPlanned = e.target.checked;
      queueRefresh();
    });
  }
  if (els.toggleNotes) {
    els.toggleNotes.addEventListener("change", e => {
      state.filters.showNotes = e.target.checked;
      queueRefresh();
    });
  }

  if (els.toggleDetails) {
    els.toggleDetails.addEventListener("click", () => {
      togglePanel("details");
    });
  }
  if (els.toggleControls) {
    els.toggleControls.addEventListener("click", () => {
      togglePanel("controls");
    });
  }

  if (els.freezeLayout) {
    els.freezeLayout.addEventListener("click", () => {
      toggleFreeze();
    });
  }
  if (els.saveLayout) {
    els.saveLayout.addEventListener("click", () => {
      saveLayout();
    });
  }

  if (els.rawPanel) {
    els.rawPanel.addEventListener("toggle", () => {
      if (rawJsonVisible()) {
        scheduleRawJsonRefresh(true);
      }
    });
  }

  if (els.tokenInput) {
    const saved = getAuthToken();
    if (saved) els.tokenInput.value = saved;
    els.tokenInput.addEventListener("change", e => {
      setAuthToken(e.target.value.trim());
    });
  }

  if (els.copyJson) {
    els.copyJson.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(JSON.stringify(state.board || {}, null, 2));
        els.copyJson.textContent = "Copied!";
        setTimeout(() => (els.copyJson.textContent = "Copy JSON"), 1200);
      } catch (err) {
        els.copyJson.textContent = "Clipboard blocked";
        setTimeout(() => (els.copyJson.textContent = "Copy JSON"), 1400);
      }
    });
  }

  if (els.reset) {
    els.reset.addEventListener("click", () => {
      state.filters = {
        search: "",
        showExisting: true,
        showPlanned: true,
        showNotes: true
      };
      if (els.search) els.search.value = "";
      if (els.toggleExisting) els.toggleExisting.checked = true;
      if (els.togglePlanned) els.togglePlanned.checked = true;
      if (els.toggleNotes) els.toggleNotes.checked = true;
      clearDetail();
      queueRefresh();
    });
  }

  if (els.saveNode) {
    els.saveNode.addEventListener("click", () => {
      if (!state.selectedId) return;
      saveNodeEdits();
    });
  }

  if (els.resetForm) {
    els.resetForm.addEventListener("click", () => {
      if (!state.selectedId) return;
      const node = state.board?.content?.nodes.find(n => n.id === state.selectedId);
      if (node) syncForm(node);
    });
  }

  if (els.scanButton) {
    els.scanButton.addEventListener("click", () => scanAndLoad());
  }
  if (els.scanAuto) {
    const savedAuto = localStorage.getItem("memmap.scanAuto");
    els.scanAuto.checked = savedAuto === "true";
    els.scanAuto.addEventListener("change", e => {
      localStorage.setItem("memmap.scanAuto", e.target.checked ? "true" : "false");
    });
  }
  if (els.scanPath) {
    const savedPath = localStorage.getItem("memmap.scanPath");
    if (savedPath) els.scanPath.value = savedPath;
    els.scanPath.addEventListener("change", e => {
      localStorage.setItem("memmap.scanPath", e.target.value);
    });
  }

  maybeAutoScan();
}

loadContext();

function syncForm(node) {
  const metaNorm = normalizeMetadata(node.metadata);
  els.editNodeId.textContent = node.id;
  els.fieldSummary.value = metaNorm.summary || "";
  els.fieldContext.value = metaNorm.context || "";
  els.fieldStatus.value = metaNorm.status || "TODO";
  els.fieldTags.value = metaNorm.tags.join(", ");
  els.fieldCode.value = metaNorm.code || "";
  els.fieldTasks.value = (metaNorm.tasks || [])
    .map(t => `${t.status || "TODO"}: ${t.title || ""}`.trim())
    .join("\n");
}

function parseTasks(text) {
  return text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const parts = line.split(":");
      if (parts.length > 1) {
        const status = parts.shift().trim().toUpperCase();
        const title = parts.join(":").trim();
        return { title, status: status || "TODO" };
      }
      return { title: line, status: "TODO" };
    });
}

function saveNodeEdits() {
  const node = state.board?.content?.nodes.find(n => n.id === state.selectedId);
  if (!node) return;
  const updatedMeta = { ...(node.metadata || {}) };
  updatedMeta.summary = els.fieldSummary.value.trim();
  updatedMeta.dev_notes = els.fieldContext.value.trim();
  updatedMeta.status = els.fieldStatus.value;
  updatedMeta.tags = els.fieldTags.value
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);
  updatedMeta.code = els.fieldCode.value.trim();
  updatedMeta.tasks = parseTasks(els.fieldTasks.value);
  node.metadata = updatedMeta;

  scheduleRawJsonRefresh();
  renderDetail(node);
  queueRefresh();
  persistContext();
}

function renderUnknownMetadata(meta = {}) {
  const known = new Set(["summary", "description", "title", "dev_notes", "context", "notes", "status", "tags", "tasks", "spec", "code", "snippet"]);
  const extras = Object.keys(meta)
    .filter(k => !known.has(k))
    .map(k => `<div class="meta"><strong>${escapeHtml(k)}:</strong> ${escapeHtml(String(meta[k]))}</div>`)
    .join("");
  return extras ? `<div class="meta">Other metadata:</div>${extras}` : "";
}

function buildHierarchy() {
  if (!state.board || !state.board.content) return { roots: [], byId: {} };
  const byId = {};
  state.board.content.nodes.forEach(n => (byId[n.id] = { node: n, children: [] }));
  state.board.content.edges
    .filter(e => e.type === "CONTAINS")
    .forEach(e => {
      const parent = byId[e.from];
      const child = byId[e.to];
      if (parent && child) parent.children.push(child);
    });
  const childIds = new Set(
    state.board.content.edges.filter(e => e.type === "CONTAINS").map(e => e.to)
  );
  const roots = Object.values(byId).filter(entry => !childIds.has(entry.node.id));
  return { roots, byId };
}

function renderHierarchy(selectedId) {
  const { roots } = buildHierarchy();
  const container = els.hierarchy;
  if (!container) return;
  container.innerHTML = "";

  const renderNode = (entry, depth = 0) => {
    const div = document.createElement("div");
    div.className = "node";
    if (entry.node.id === selectedId) {
      div.style.color = "var(--accent)";
      div.style.fontWeight = "700";
    }
    div.innerHTML = `${"&nbsp;&nbsp;".repeat(depth)}${escapeHtml(entry.node.id)}`;
    div.addEventListener("click", () => {
      renderDetail(entry.node);
      syncForm(entry.node);
      state.selectedId = entry.node.id;
      renderHierarchy(entry.node.id);
      queueRefresh();
    });
    container.appendChild(div);
    entry.children.forEach(child => renderNode(child, depth + 1));
  };

  roots.forEach(root => renderNode(root, 0));
}

function renderFileTree(selectedId) {
  const container = els.fileTree;
  if (!container || !state.board || !state.board.content) return;
  container.innerHTML = "";

  const tree = buildFileTreeData();

  const renderItem = (item, depth = 0) => {
    const row = document.createElement("div");
    row.className = "tree-row";
    row.dataset.nodeId = item.nodeId || "";
    row.dataset.type = item.type || "";
    row.dataset.pathKey = item.pathKey || "";
    if (item.nodeId && selectedId === item.nodeId) {
      row.classList.add("selected");
    }

    const caret = document.createElement("span");
    caret.className = "tree-caret";
    const collapsed = collapsedDirs.has(item.pathKey);
    caret.textContent = item.children && item.children.length ? (collapsed ? ">" : "v") : "";

    const indent = document.createElement("span");
    indent.className = "tree-indent";
    indent.innerHTML = "&nbsp;".repeat(depth * 2);

    const label = document.createElement("span");
    label.className = `tree-label ${item.type === "DIRECTORY" ? "dir" : item.type === "NOTE" ? "note" : "file"}`;
    label.textContent = item.name;

    row.appendChild(indent);
    row.appendChild(caret);
    row.appendChild(label);

    row.addEventListener("click", e => {
      e.stopPropagation();
      if (item.type === "DIRECTORY") {
        if (collapsedDirs.has(item.pathKey)) collapsedDirs.delete(item.pathKey);
        else collapsedDirs.add(item.pathKey);
        renderFileTree(selectedId);
        return;
      }
      if (item.node) {
        selectNode(item.node);
      }
    });

    container.appendChild(row);

    if (item.children && item.children.length && !collapsedDirs.has(item.pathKey)) {
      item.children.forEach(child => renderItem(child, depth + 1));
    }
  };

  tree.forEach(root => renderItem(root, 0));
}

function buildFileTreeData() {
  const nodes = state.board?.content?.nodes || [];
  const byId = {};
  nodes.forEach(n => (byId[n.id] = n));

  const rootMap = new Map();

  function ensureDir(pathKey, name) {
    if (!rootMap.has(pathKey)) {
      rootMap.set(pathKey, { name, type: "DIRECTORY", pathKey, children: [] });
    }
    return rootMap.get(pathKey);
  }

  // Build tree from paths
  nodes.forEach(node => {
    const pathVal = getPathValue(node);
    if (!pathVal) return;
    const parts = pathVal.split(/[/\\]+/).filter(Boolean);
    if (!parts.length) return;

    let currentKey = "";
    let parent = null;
    parts.forEach((part, idx) => {
      currentKey = currentKey ? `${currentKey}/${part}` : part;
      const isLast = idx === parts.length - 1;
      const existing = [...rootMap.values(), ...(parent?.children || [])].find(n => n.pathKey === currentKey);
      let entry = existing;
      if (!entry) {
        entry = {
          name: part,
          type: isLast ? node.type : "DIRECTORY",
          pathKey: currentKey,
          children: []
        };
        if (parent) {
          parent.children.push(entry);
        } else {
          rootMap.set(currentKey, entry);
        }
      }
      if (isLast) {
        entry.nodeId = node.id;
        entry.node = node;
        entry.type = node.type;
      }
      parent = entry;
    });
  });

  // Ensure directory nodes without paths are added at top-level
  nodes
    .filter(n => n.type === "DIRECTORY" && !getPathValue(n))
    .forEach(n => {
      const key = n.id;
      if (!rootMap.has(key)) {
        rootMap.set(key, { name: n.id, type: "DIRECTORY", pathKey: key, children: [], nodeId: n.id, node: n });
      }
    });

  // Sort children alphabetically
  function sortTree(items) {
    items.sort((a, b) => a.name.localeCompare(b.name));
    items.forEach(i => {
      if (i.children && i.children.length) sortTree(i.children);
    });
  }
  const roots = Array.from(rootMap.values());
  sortTree(roots);
  return roots;
}
async function persistContext() {
  try {
    if (state.board) {
      state.board.view = {
        layout: { positions: state.layoutPositions || {}, frozen: state.layoutFrozen },
        filters: state.filters,
        panels: state.panels
      };
    }
    els.saveNode.textContent = "Saving...";
    const res = await apiPost("/api/context", state.board);
    if (res.status === 409) {
      els.saveNode.textContent = "Version conflict";
      setTimeout(() => (els.saveNode.textContent = "Save node"), 1600);
      return;
    }
    if (!res.ok) throw new Error("Save failed");
    const payload = await res.json().catch(() => ({}));
    if (payload.board_version) {
      state.board.board_version = payload.board_version;
      if (els.boardTitle) {
        const title = state.board.title || state.board.board_id || "Context Board";
        els.boardTitle.textContent = `${title} (v${payload.board_version})`;
      }
    }
    els.saveNode.textContent = "Saved";
    setTimeout(() => (els.saveNode.textContent = "Save node"), 1200);
  } catch (err) {
    console.error(err);
    els.saveNode.textContent = "Save failed";
    setTimeout(() => (els.saveNode.textContent = "Save node"), 1400);
  }
}

async function scanAndLoad() {
  const pathValue = (els.scanPath?.value || "").trim();
  if (!pathValue) {
    setScanStatus("Provide a local path to scan.", true);
    return;
  }
  setScanStatus("Scanning...", false);
  try {
    const res = await apiPost("/api/scan", { path: pathValue });
    if (!res.ok) {
      const msg = await res.text().catch(() => `Scan failed (${res.status})`);
      throw new Error(msg || `Scan failed (${res.status})`);
    }
    const data = await res.json();
    applyData(data);
    setScanStatus(`Loaded scan: ${data.title || pathValue}`, false);
  } catch (err) {
    console.error(err);
    setScanStatus(`Scan failed; using existing data. ${err.message || err}`, true);
  }
}

function maybeAutoScan() {
  if (els.scanAuto && els.scanAuto.checked && els.scanPath && els.scanPath.value.trim()) {
    scanAndLoad();
  }
}

function setScanStatus(msg, isError) {
  if (!els.scanStatus) return;
  els.scanStatus.textContent = msg;
  els.scanStatus.style.color = isError ? "#ff9fb6" : "var(--muted)";
}

function togglePanel(name) {
  state.panels[name] = !state.panels[name];
  applyPanelVisibility();
}

function ensurePanelVisible(name) {
  if (!state.panels[name]) {
    state.panels[name] = true;
    applyPanelVisibility();
  }
}

function applyPanelVisibility() {
  if (els.panelDetails) {
    if (state.panels.details) {
      els.panelDetails.classList.remove("hidden-panel");
      els.toggleDetails.textContent = "Hide details";
    } else {
      els.panelDetails.classList.add("hidden-panel");
      els.toggleDetails.textContent = "Show details";
    }
  }
  if (els.panelControls) {
    if (state.panels.controls) {
      els.panelControls.classList.remove("hidden-panel");
      els.toggleControls.textContent = "Hide controls";
    } else {
      els.panelControls.classList.add("hidden-panel");
      els.toggleControls.textContent = "Show controls";
    }
  }
}
