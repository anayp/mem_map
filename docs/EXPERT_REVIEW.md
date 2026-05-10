# Memory Map vs Graphify — 10-Expert Review Panel

Date: 2026-05-09

## Sources Compared
- Local Memory Map codebase (this repository)
- Graphify public README and repository metadata (safishamsi/graphify)

## Panel Findings
1. **Product Strategy Expert**: Memory Map is strongest as a *local-first editable workspace*; Graphify is stronger at *automated extraction + multi-format breadth*. Recommendation: keep Memory Map focused on curation + fast onboarding.
2. **Developer Experience Expert**: Install friction exists (manual steps, no one-line bootstrap). Recommendation: provide agent-friendly curl/wget bootstrap command and extension docs.
3. **Security Expert**: Tokenized API and scan sandbox are good foundations. Recommendation: ensure sync clients pass `x-memmap-token`; keep localhost default.
4. **Backend Reliability Expert**: Scan endpoint produced data but did not persist by default; sync message implied persistence. Recommendation: add explicit `save` scan mode.
5. **Data Modeling Expert**: Schema v2 is flexible; versioning behavior previously risked conflicts and stale writes. Recommendation: normalize writes and always bump safe `board_version`.
6. **Graph UX Expert**: Existing UI is useful but can improve discoverability with richer metadata hover, filters, and task-centric views.
7. **Agent Integration Expert**: Great direction with Codex skill. Recommendation: add explicit install recipes for Codex + Gemini + “any CLI agent” skill-link sharing.
8. **Performance Expert**: Current filesystem traversal limits are good; next wins are incremental updates and cached scans.
9. **Open Source Program Expert**: Apache-2 compatibility goal is achievable by relicensing and dependency audit. Current repo is MIT; both are permissive and compatible.
10. **Adoption/GTM Expert**: Position as “editable operational memory graph” complementing extractors like Graphify, not a clone.

## Implementation Plan (Prioritized)
1. Fix sync persistence and auth passthrough (done).
2. Harden save normalization/version bump logic (done).
3. Publish one-command install/bootstrap snippets for CLI agents (done in README).
4. Add optional import bridge from external graph JSON (next).
5. Add richer node summaries/hover and task workflows (next).
6. Add test coverage for API save/scan/version semantics (next).

## Execution Notes
This iteration implemented items 1–3.
