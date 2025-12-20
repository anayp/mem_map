# Contributing

Thanks for helping improve Memory Map.

## Setup
1) Fork the repo and create a feature branch.
2) Run the local server:
   ```bash
   node mem_map/server.js
   ```
3) Test changes in the browser.

## Guidelines
- Keep changes focused and avoid unrelated refactors.
- Preserve flexible metadata (unknown keys must survive).
- Update `mem_map/data/context-data.json` if schema changes.
- Prefer ASCII in source files unless non-ASCII already exists.

## Pull requests
- Explain the motivation and expected behavior.
- Include screenshots for UI changes.
- Note any breaking changes or migrations.
