---
name: memory-map-init
description: Initialize or refresh the Memory Map context system (UI + server + schema v2 JSON) for a repo.
---

# Memory Map Init Skill

Purpose: Bootstrap or refresh the Memory Map system without overwriting existing files.

## When to use
- A repo needs the Memory Map UI + server + context JSON.
- You want to add or update the Memory Map system in-place.

## Core files
- mem_map/index.html
- mem_map/style.css
- mem_map/app.js
- mem_map/server.js
- mem_map/data/context-data.json
- init_context_system.md

## Safe init steps (non-destructive)
1) Ensure mem_map/ and mem_map/data/ exist. Do not overwrite existing files.
2) If missing, create templates from init_context_system.md.
3) Start server: node mem_map/server.js
4) Open: http://127.0.0.1:4500
5) Optional scan via UI: set path and click Scan.

## Server environment
- HOST (default 127.0.0.1)
- PORT (default 4500)
- MEMMAP_TOKEN (optional token for API calls; send via x-memmap-token)
- MEMMAP_SCAN_ROOT (sandbox root)
- MEMMAP_MAX_FILES, MEMMAP_MAX_DEPTH, MEMMAP_MAX_BYTES
- MEMMAP_DEBUG_ABS (if set, include absPath in scan payload)

## Client expectations
- Load via GET /api/context
- Save via POST /api/context (versioned)
- Scan via POST /api/scan
- Preserve unknown metadata keys
- Use schema_version 2 (content/view separation)
