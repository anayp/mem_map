# Memory Map Init Protocol (init_context_system.md)

Single source of truth for bootstrapping the Memory Map system (UI + server + context JSON).

This protocol is additive and non-destructive:
- Never overwrite existing files.
- If a file already exists, keep it and move on.
- Canonical context lives in `mem_map/data/context-data.json`.

If this repo already contains a `mem_map/` folder, treat it as the canonical template.

---

## 0) Core Ideas

- Additive only. Do not rewrite unrelated project files.
- JSON is the single source of truth; the UI is a lens and editor for that JSON.
- Metadata is flexible. Unknown keys are preserved.
- Server is local-first. Token auth is optional but supported.

---

## 1) Files and Folders

Required:
- `mem_map/index.html`
- `mem_map/style.css`
- `mem_map/app.js`
- `mem_map/server.js`
- `mem_map/data/context-data.json`

Optional:
- `mem_map/context.svg` (favicon)
- `mem_map/context-mapping-notes.md` (roadmap/notes)

---

## 2) Init Flow (non-destructive)

1. Create `mem_map/` and `mem_map/data/` if missing.
2. If `mem_map.zip` exists, you may unpack it into `mem_map/` (only if files are missing).
3. Create missing files using templates below.
4. Start the server:
   - `node mem_map/server.js`
5. Open the UI in a browser:
   - `http://127.0.0.1:4500`
6. Optional scan:
   - Enter a path in the UI and click "Scan path".

---

## 3) Data Model (Schema v2)

Board shape:
```json
{
  "schema_version": 2,
  "board_id": "mem-map-demo",
  "board_version": 1,
  "title": "Memory Map",
  "content": {
    "nodes": [],
    "edges": []
  },
  "view": {
    "layout": { "positions": {}, "frozen": false },
    "filters": { "search": "", "showExisting": true, "showPlanned": true, "showNotes": true },
    "panels": { "details": true, "controls": true }
  },
  "scan_meta": { "root": "C:/", "limits": {}, "ts": "2025-01-01T00:00:00Z" }
}
```

Node schema:
```json
{
  "id": "mem_map/app.js",
  "type": "FILE|DIRECTORY|FUTURE_FILE|FUTURE_DIRECTORY|NOTE",
  "payload": {
    "path": "mem_map/app.js",
    "relPath": "mem_map/app.js",
    "exists": true
  },
  "metadata": {
    "summary": "Short description",
    "dev_notes": "Higher-level context",
    "status": "TODO|IN_PROGRESS|DONE",
    "tags": ["optional"],
    "tasks": [{ "title": "Task", "status": "TODO" }],
    "code": "snippet or pointer",
    "spec": { "item_text": "optional" }
  }
}
```

Edge schema:
```json
{ "from": "mem_map", "to": "mem_map/app.js", "type": "CONTAINS" }
```

Notes:
- Unknown metadata keys are preserved.
- `board_version` is incremented on save; clients should send the current version.

---

## 4) Server API

Endpoints:
- `GET /api/context` -> returns the current board JSON
- `POST /api/context` -> saves board JSON (version-checked)
- `POST /api/scan` -> scans a local path and returns a board

Environment variables:
- `HOST` (default 127.0.0.1)
- `PORT` (default 4500)
- `MEMMAP_TOKEN` (optional token, send via `x-memmap-token`)
- `MEMMAP_SCAN_ROOT` (sandbox root)
- `MEMMAP_MAX_FILES` (default 5000)
- `MEMMAP_MAX_DEPTH` (default 8)
- `MEMMAP_MAX_BYTES` (default 26214400)
- `MEMMAP_DEBUG_ABS` (if set, include absPath in scan payload)

---

## 5) Templates (minimal)

### 5.1 mem_map/data/context-data.json
```json
{
  "schema_version": 2,
  "board_id": "mem-map-demo",
  "board_version": 1,
  "title": "Memory Map",
  "content": { "nodes": [], "edges": [] },
  "view": {
    "layout": { "positions": {}, "frozen": false },
    "filters": { "search": "", "showExisting": true, "showPlanned": true, "showNotes": true },
    "panels": { "details": true, "controls": true }
  }
}
```

### 5.2 mem_map/server.js
Create a static server that serves the UI plus:
- `GET /api/context`
- `POST /api/context` with version checks and backups
- `POST /api/scan` with sandboxing and limits

Use the `mem_map/server.js` in this repo as the canonical template.

### 5.3 mem_map/app.js
Client requirements:
- Load from `/api/context`
- Save to `/api/context`
- Scan via `/api/scan`
- Preserve unknown metadata keys
- Render graph, detail panel, hierarchy, file explorer, and raw JSON accordion

Use the `mem_map/app.js` in this repo as the canonical template.

### 5.4 mem_map/index.html and style.css
The UI shell:
- Left: details + hierarchy + edit form + raw JSON
- Center: graph
- Right: controls + scan + file explorer + stats

Use the `mem_map/index.html` and `mem_map/style.css` in this repo as the canonical templates.

---

## 6) Safety and Non-Interference

- Do not overwrite existing files.
- Do not mass-format or refactor unrelated files.
- Keep metadata flexible and additive.
- If using Git, commit only files created or changed by init.

---

## 7) Summary

This init protocol bootstraps the Memory Map system:
- A local server + UI
- A single canonical context JSON
- Editable metadata with safe persistence
- Optional filesystem scanning

Use the existing `mem_map/` folder in this repo as the source of truth.
