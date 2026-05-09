# Clean-Room Expert Sweep (10 Experts)

Date: 2026-05-09
Scope: Memory Map next-step architecture, legal-risk minimization, and implementation readiness.

## Clean-Room Guardrails (applies to all work)
1. No code-copying from Graphify or any external implementation.
2. No test-copying, fixture-copying, or schema text-copying from external repos.
3. Use independent naming and independent module boundaries.
4. Treat external projects as behavior references only.
5. Capture provenance in commit/PR messages for legal review.

## Expert Panel Review

### 1) Open-Source Counsel Lens
- Risk: "look and feel" concerns if module names and API patterns are too derivative.
- Recommendation: create Memory Map-native API verbs and docs language.
- Sprint implication: all new APIs carry a short rationale section.

### 2) Compliance Program Expert
- Risk: accidental contamination through copied examples/snippets.
- Recommendation: add explicit clean-room checklist to PR template and contribution guide.
- Sprint implication: include checklist completion in done criteria.

### 3) Security Architect
- Risk: import endpoints can expand attack surface.
- Recommendation: size limits, schema validation, and token gating on import.
- Sprint implication: importer ships with strict payload validation and max-size safeguards.

### 4) Backend Reliability Expert
- Risk: importer could produce malformed graphs.
- Recommendation: normalize all imported records into schema v2 + deterministic IDs.
- Sprint implication: importer uses canonical normalization pipeline before save.

### 5) Data Model Expert
- Risk: tool-specific metadata collision.
- Recommendation: namespace foreign metadata under `metadata.source` and keep core fields canonical.
- Sprint implication: mapping spec document and fixtures for unknown-key preservation.

### 6) UX/Graph Product Expert
- Risk: complexity creep from importer settings.
- Recommendation: default-presets + concise “import report” summary.
- Sprint implication: add import report (`nodes`, `edges`, dropped records, warnings).

### 7) Agent/CLI Integration Expert
- Risk: onboarding fragmentation across Codex/Gemini/other CLI agents.
- Recommendation: single install script + generic instructions + optional agent adapters.
- Sprint implication: ship `scripts/install-memory-map.sh` with local verification.

### 8) Performance Expert
- Risk: large imports/scans degrade responsiveness.
- Recommendation: stream parse where practical, enforce caps, and report truncation.
- Sprint implication: add caps + warnings in importer and scan report.

### 9) QA/Test Strategy Expert
- Risk: regressions in board versioning and save semantics.
- Recommendation: baseline contract tests for `/api/context`, `/api/scan`, and importer path.
- Sprint implication: test matrix with pass/fail criteria and fixture corpus.

### 10) OSS Adoption/GTM Expert
- Risk: unclear positioning vs Graphify leads to market confusion.
- Recommendation: clearly position Memory Map as editable, local-first memory graph ops layer.
- Sprint implication: README messaging refresh aligned to clean-room + differentiation.

## Consolidated Next Steps (Refined)
1. Build clean-room importer (`/api/import` + CLI wrapper) with strict validation and reporting.
2. Add contract tests for scan/save/import/version behavior.
3. Add unified installer script and docs for CLI agent usage.
4. Add metadata hover + task-focused filters to strengthen differentiated UX.
5. Add PR checklist artifact to enforce clean-room provenance.

## Definition of Done for Sprint Planning
- Functional: import, save, and scan paths are validated and tested.
- Legal: clean-room checklist completed for every PR.
- Security: token gating + payload limits enforced on write paths.
- UX: import results are transparent via report summary.
