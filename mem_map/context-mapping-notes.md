# Memory Map Prototype - Learnings & Working Notes

Purpose: Capture how the current context mapping prototype works, what design choices we made, and what to optimize next.

## 1) Current Capabilities
- UI: Force-graph view (ForceGraph CDN), detail panel (left), controls panel (right/bottom). Panels are hide/show toggleable; detail auto-opens on node click. Raw JSON lives in a collapsible accordion inside the detail panel.
- Navigation: Search, filters (existing/planned/notes), hierarchy list from `CONTAINS` edges, breadcrumb, stats.
- Metadata handling: Normalizes `summary`, `dev_notes/context/notes`, `status`, `tags`, `code/snippet`, `tasks`; preserves unknown keys and shows them in the detail view. Hover labels include summary/spec.
- Editing: Inline form edits mapped metadata fields, updates graph view and raw JSON, and persists via POST `/api/context` (writes `data/context-data.json` and `.bak` backup).
- Data sources: Loads bundled `data/context-data.json` (or fallback). Optional filesystem scan via POST `/api/scan` with a local path; auto-scan toggle + last path remembered in localStorage.
- Server: Static hosting plus `/api/context` (save) and `/api/scan` (walks filesystem, skips `.git`/`node_modules`, basic validation). No auth/rate-limit yet.

## 2) Metadata Contract (flexible but mapped)
- Basic description: `metadata.summary` (also accepts `description`/`title`).
- Higher-level context: `metadata.dev_notes` (also accepts `context`/`notes`).
- Status: `metadata.status` or first task status.
- Tags: `metadata.tags` (array).
- Code pointer: `metadata.code` or `snippet`.
- Tasks: `metadata.tasks` (array of `{title, status}`).
- Spec: `metadata.spec` (unchanged schema). Unknown keys are preserved and displayed.

## 3) File/Component Overview (repo-level)
- `mem_map/index.html`: Shell for graph, detail/edit, hierarchy, raw JSON accordion, controls, scan UI.
- `mem_map/style.css`: Dark gradient theme, responsive grid, panel max-heights + scrolling, badge tones, accordion styling, hidden-panel helper.
- `mem_map/app.js`: Client logic (load/apply context, filters, detail/edit, save, scan/auto-scan, hierarchy). Guards for missing DOM nodes; hover labels show summary/spec.
- `mem_map/server.js`: Static server + APIs (`/api/context` save with backup, `/api/scan` filesystem walker). Skips `.git`/`node_modules`.
- `mem_map/data/context-data.json`: Bundled demo context; overwritten by save/scan. (Fallback in `app.js` mirrors this.)
- `init_context_system.md`: Reference init protocol; inspiration only.

## 4) Known Gaps / TODOs
- UI polish: Finish responsive tweaks; ensure all panels scroll cleanly on small screens. Improve hover previews (more metadata snippets).
- Interaction: Consider hover popovers for nodes (summary/context), not just clicks.
- Data safety: Add auth/rate limits to `/api/context` and `/api/scan`; validate paths more strictly; consider sandboxing scans.
- Concurrency: No locking/merge handling if multiple editors run; last write wins.
- Persistence UX: Show toast/status on save/scan results; surface backup location.
- Performance: Large graphs may need pagination or virtualized lists; debounce search/filters; optional physics tuning or frozen layout for big boards.
- Schema sync: Optional spec parser to pull from a spec file (not wired yet).

## 5) How to Use (local)
1. Run the server: `PORT=4501 node mem_map/server.js` (use a free port).
2. Open the browser at `http://localhost:4501`.
3. (Optional) In "Data source", set a local path (e.g., `D:\context_mapping`), enable auto-scan if desired, click "Scan path". If it fails, bundled data remains.
4. Click nodes to view/edit metadata; save writes `data/context-data.json` and a `.bak`.

## 6) Optimization Ideas (next steps)
- Add caching for scans; allow incremental sync based on mtime hashes.
- Defer force-layout after initial stabilization; provide a "freeze layout" toggle.
- Lazy-load node details (render fewer DOM nodes in hierarchy/stats on large sets).
- Optional import/export: allow downloading/uploading context JSON snapshots.
- Path filters in scan: allow ignore globs beyond `.git`/`node_modules`.
- Optional auth/token gate for write APIs if exposed beyond localhost.

## Expert Notes & Optimizations

### Expert 1 - Frontend Performance
- Use a fixed-size link particle count; cap node render size and debounce graph redraws (search/filter) to avoid layout thrash on large sets.
- Add a "freeze layout" + "reheat" control; default to freeze after 2s to stop force iterations.
- Virtualize hierarchy list and stats on large graphs (>2k nodes) to keep DOM light.
- Consider local caching of graph positions per board_id to restore layout quickly after reload.

### Expert 2 - UX / Interaction
- Provide hover popovers on nodes with summary + context + status, reserving click for full detail/edit.
- Add "focus mode": clicking a node filters the list/graph to its neighborhood; "clear focus" button to restore.
- Provide an inline search-hit highlight in the hierarchy and detail to orient users.
- Show save/scan toasts with undo link (restore last .bak) for confidence.

### Expert 3 - Backend / Security
- Gate `/api/context` and `/api/scan` with a simple token header; reject writes without it. Add basic rate limiting if exposed beyond localhost.
- Harden scan: enforce a sandbox root, apply allow/deny globs, and size/entry-count limits; skip symlinks by default.
- Write saves atomically (`.tmp` rename) and include an audit trail (timestamp, user/token) in a sidecar log.
- Add optional CORS restriction and set sensible cache headers (no-store for APIs).

### Expert 4 - Data Modeling / Graph
- Support optional node types `FUTURE_DIRECTORY`/`FUTURE_FILE` from scans by honoring planned entries in JSON, not just existing files.
- Allow per-node `spec` parsing from a configurable spec file to keep plan <-> context alignment.
- Add lightweight schema validation for incoming JSON to avoid corrupt state (id uniqueness, edge endpoints exist).
- Provide import/export versioning (schema version in board) to evolve safely.

### Expert 5 - LLM Integration / DX
- Add a "generate summary" button that calls a local LLM endpoint to draft summary/context from file contents (opt-in).
- Include a small prompt template in UI so users/agents can copy a "context pack" (selected nodes + metadata) for an LLM call.
- Add quick filters by tag/status to feed LLM with only relevant slices; expose a `/api/context?filter=...` read endpoint for programmatic retrieval.
- Expose a read-only `context-data.json` snapshot endpoint for agents to consume without touching the write APIs.

## Synthesis: What's Strong
- Flexible metadata mapping with unknown-key preservation.
- Inline edit + raw JSON accordion (trustable state).
- Optional filesystem scan with existing/planned filters.

## High-Leverage Risks to Fix First
1) Data safety / blast radius  
- Token-gate `/api/context` + `/api/scan`; bind to localhost; restrict CORS.  
- Sandbox scan root (realpath inside allowed root), skip symlinks.  
- Hard limits: max files/depth/bytes; skip huge dirs.  
- Atomic writes with `.tmp` rename + `.bak`, audit log (timestamp, token/user).

2) Consistency / concurrency  
- Add `board_version` (monotonic) to JSON; require it on save; 409 on stale.  
- Append-only journal for saves; optionally move persistence to SQLite for concurrency/history.

## Performance Roadmap (practical)
- Graph: freeze/reheat after stabilization; cache positions per `board_id` (localStorage or view block).  
- Debounce search/filter; avoid full graph rebuild on each keystroke.  
- DOM: virtualize hierarchy/list panels; collapse detail sections on big graphs.  
- Scans: incremental (mtime/size/hash map); merge scan "layer" instead of overwrite; keep planned nodes.

## UX Roadmap
- Focus mode (1-2 hop neighborhood + "clear focus").  
- Hover previews (summary/status/tags/dev_notes snippet); click for full edit.  
- Save/scan toasts with undo (restore last snapshot) + show `board_version` and timestamp.

## Schema Evolution Sketch (v2 draft)
```json
{
  "schema_version": 2,
  "board_id": "repo-context",
  "board_version": 7,          // increment on each save
  "content": {
    "nodes": [ /* as today */ ],
    "edges": [ /* as today */ ]
  },
  "view": {
    "layout": { "positions": { "nodeId": { "x": ..., "y": ... } }, "frozen": true },
    "filters": { "search": "", "showExisting": true, "showPlanned": true, "showNotes": true },
    "panels": { "details": true, "controls": true }
  },
  "scan_meta": {
    "root": "D:/context_mapping",
    "mtime_map": { "path": { "mtime": 123456789, "size": 1234 } },
    "limits": { "maxFiles": 5000, "maxDepth": 8 },
    "ts": "2025-12-19T14:40:00Z"
  }
}
```
- Validation: unique ids, edges reference existing nodes, reserved keys protected, field size caps.  
- Separate `content` vs `view` for portability; `view` can be dropped without losing meaning.

## LLM / Context Pack (disciplined)
- Add multi-select "basket" -> "Copy context pack" (nodes + summaries + dev_notes excerpt + edges among selected).  
- Deterministic templates (no chatty prose) for diffable output.  
- Optional "generate summary" that calls a local LLM endpoint; never mutates metadata without explicit save.

## Suggested Implementation Order
1) Safety: token gate + sandbox scan + atomic saves + board_version + journal.  
2) Usability/perf: freeze/reheat, layout caching, debounced updates, virtualized lists, focus mode.  
3) System: incremental scans + merge, schema_version/view split, import/export with validation, spec parsing hook.
