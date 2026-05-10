# Memory Map

Memory Map is a local-first context mapping system for codebases. It gives you a
graph view, file explorer, and editable metadata so humans and agents can keep a
shared understanding of a repo as it evolves.

## Features
- Graph view with selected-node highlighting.
- Collapsible file explorer synced with selection.
- Detail panel with metadata editing and tasks.
- Canonical JSON (schema v2) with flexible metadata.
- Local server with safe, token-gated APIs.
- Optional filesystem scan (sandboxed and limited).

## Quick start
1) Install Node.js (18+ recommended).
2) From the repo root:
   ```bash
   node mem_map/server.js
   ```
3) Open:
   ```
   http://127.0.0.1:4500
   ```
4) Optional: scan a local path from the UI.

### One-command bootstrap (shareable with CLI agents)
You can share this single command with Codex, Gemini CLI, Antigravity, or any shell-capable agent:

```bash
bash scripts/install-memory-map.sh
```

For local-only use in an already cloned repo:
```bash
npm i && npm run start
```

## Configuration
The server reads these environment variables:
- `HOST` (default `127.0.0.1`)
- `PORT` (default `4500`)
- `MEMMAP_TOKEN` (optional API token; send via `x-memmap-token`)
- `MEMMAP_SCAN_ROOT` (sandbox root for scans)
- `MEMMAP_MAX_FILES`, `MEMMAP_MAX_DEPTH`, `MEMMAP_MAX_BYTES`
- `MEMMAP_MAX_IMPORT_NODES`, `MEMMAP_MAX_IMPORT_EDGES`
- `MEMMAP_DEBUG_ABS` (include `absPath` in scan output)

Example:
```bash
PORT=4501 MEMMAP_TOKEN=yourtoken MEMMAP_SCAN_ROOT=D:\repos node mem_map/server.js
```

## API (local server)
- `GET /api/context` -> current board JSON
- `POST /api/context` -> save board (version-checked)
- `POST /api/scan` -> scan a path and return a board (optionally persist with `save: true`)
- `POST /api/import` -> import external graph JSON and persist canonical board
  - pass `options.dry_run: true` to preview import report without persisting

## Repo structure
- `mem_map/index.html` - UI shell
- `mem_map/style.css` - layout and theming
- `mem_map/app.js` - client logic (load/save/scan)
- `mem_map/server.js` - local server + APIs
- `mem_map/data/context-data.json` - canonical board JSON
- `init_context_system.md` - init protocol and schema notes
- `extensions/codex/` - Codex CLI skill bundle

## Safety notes
This tool is local-first and sandboxed by default. If you enable scanning
outside the repo, treat the API like a local admin surface:
- Keep it bound to localhost.
- Use a token if sharing or port-forwarding.
- Consider scan limits for large directories.

## License
MIT (see `LICENSE`).

## Codex CLI extension
Memory Map ships a Codex skill bundle in `extensions/codex/`.

Install:
1) Enable Codex skills (`skills = true` in `~/.codex/config.toml` or run `codex --enable skills`).
2) Copy:
   - `extensions/codex/SKILL.md` -> `~/.codex/skills/memory-map/SKILL.md`
3) Restart Codex.

Use:
```
$memory-map-init
```

## Agent install links (copy/paste friendly)
- Codex: share `extensions/codex/SKILL.md`
- Gemini CLI: share `extensions/gemini/GEMINI.md`
- Generic agents: run `npm run start` then `npm run scan -- .`
  - External graph ingest: `npm run import -- ./graph.json`
  - Preview only (no persistence): `npm run import -- ./graph.json --dry-run`

## Apache-2 friendly positioning
Memory Map is MIT-licensed (permissive and Apache-2 compatible for most reuse flows). If you want strict Apache-2 distribution posture, add an Apache-2 relicense track and contributor sign-off process.

## Clean-room development
To reduce legal risk when taking inspiration from adjacent tools, use a clean-room process:
- independent design and naming,
- no copying of external code/tests/docs,
- provenance notes in PRs.

See: `docs/CLEAN_ROOM_EXPERT_SWEEP.md`.
