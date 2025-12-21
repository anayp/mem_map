# Memory Map Context Extension

You have access to the **Memory Map** system, a granular context visualization and planning tool.

## Project Structure
The Memory Map system relies on the following structure:
- `mem_map/`: Core system directory.
- `mem_map/server.js`: Node.js server for the UI and API.
- `mem_map/data/context-data.json`: The **Source of Truth** for the context graph.

## Capabilities & Instructions

### 1. Initialize Memory Map
**Trigger:** User asks to "init" or "setup" Memory Map.
**Action:**
1.  Check if `mem_map/` directory exists.
2.  If missing, you must create the following structure (using templates from `init_context_system.md` or existing source files):
    - `mem_map/server.js`
    - `mem_map/app.js`
    - `mem_map/index.html`
    - `mem_map/style.css`
    - `mem_map/data/context-data.json`
3.  Ensure `mem_map/data/context-data.json` is initialized with the valid v2 schema (see below).

### 2. Start Visualization Server
**Trigger:** User asks to "start server" or "open dashboard".
**Action:**
1.  Run the server in the background:
    ```bash
    node mem_map/server.js &
    ```
2.  Inform the user the UI is available at `http://localhost:4500`.

### 3. Read/Write Context Data
**Trigger:** User asks to "add a task", "update plan", or "check context".
**Action:**
-   **Read:** Read `mem_map/data/context-data.json`.
-   **Write:** Edit `mem_map/data/context-data.json` directly.
    -   **Critical:** Maintain `schema_version: 2`.
    -   **Critical:** Do not break JSON syntax.
    -   **Tip:** When adding tasks, locate the relevant `node` and update its `metadata.tasks` array.
    -   **Tip:** When adding "Planned" files, create a node with type `FUTURE_FILE` or `FUTURE_DIRECTORY`.

### 4. Scan & Update Graph
**Trigger:** User asks to "scan files" or "refresh map".
**Action:**
-   **Preferred (If Server Running):**
    Use the API to ensure consistency and use server-side limits.
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"path": "."}' http://localhost:4500/api/scan
    ```
-   **Alternative (Manual):**
    If the server cannot be run, you may manually traverse the directory and update `content.nodes` and `content.edges` in `mem_map/data/context-data.json`.
    -   *Note:* This is complex/risky to do manually via text edits. Prefer the server or a dedicated script.

## Data Schema (Quick Reference)
**Node:**
```json
{
  "id": "path/to/file",
  "type": "FILE",
  "payload": { "path": "path/to/file", "exists": true },
  "metadata": {
    "summary": "...",
    "status": "TODO",
    "tasks": [{ "title": "Fix bug", "status": "TODO" }]
  }
}
```

## Tools & Snippets

### A. Quick Update (Node.js)
Use this snippet to safely update metadata for a specific file without breaking the JSON structure.

```javascript
const fs = require('fs');
const C = 'mem_map/data/context-data.json';
const d = JSON.parse(fs.readFileSync(C, 'utf8'));
const target = 'path/to/file.js'; // CHANGE THIS

const n = d.content.nodes.find(n => n.id === target);
if (n) {
  n.metadata.status = 'DONE'; // CHANGE THIS
  n.metadata.summary = 'Updated summary...'; // CHANGE THIS
  fs.writeFileSync(C, JSON.stringify(d, null, 2));
  console.log('Updated:', target);
} else {
  console.log('Node not found:', target);
}
```

### B. Sync with Reality (NPM)
If the server is running (port 4500), use the included script to re-scan the directory.

```bash
npm run scan
# OR scan a specific subdir
npm run scan -- ./extensions
```


