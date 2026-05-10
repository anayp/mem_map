# Expert Sweep Round 2 — Deliberation, Plan, Execution

Date: 2026-05-09

## Question
Are we proud of this yet? Not fully. The foundation is better, but production-readiness still needed stronger import controls, better onboarding behavior, and richer test assertions.

## 10-Expert Deliberation
1. Legal expert: keep clean-room provenance active and avoid clone-like semantics.
2. Security expert: add import caps + explicit dry-run path.
3. Backend expert: add warnings/truncation reporting for oversized imports.
4. Data model expert: preserve canonical schema while allowing foreign shape adapters.
5. QA expert: expand tests for import report and dry-run semantics.
6. DevEx expert: installer should install only; starting a server should be explicit.
7. Agent expert: CLI should support `--dry-run` for preview-only workflows.
8. Performance expert: cap import graph cardinality with environment knobs.
9. Product expert: improve trust by returning import warnings in API response.
10. Adoption expert: keep docs explicit around safe defaults.

## Planned Actions
- Add `MAX_IMPORT_NODES` and `MAX_IMPORT_EDGES` limits.
- Add import warnings and truncation report metadata.
- Add `options.dry_run` support on `/api/import`.
- Add `--dry-run` support to `import_mem_map.js`.
- Fix installer to avoid auto-running long-lived process.
- Expand test coverage for dry-run semantics.

## Executed This Iteration
All planned actions above were implemented.
