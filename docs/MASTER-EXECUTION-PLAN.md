# SYSmoAI — Master Execution Plan

**Last updated:** 2026-07-19  
**Branch:** commandcode/sysmoai-quality-2026-07-19  
**HEAD:** a7246af

## Execution Order

### Batch 1 (✅ Complete)
Fix blog metadata — 16 truncated descriptions, 2 duplicate titles, validation scripts.

### Batch 2 (✅ Complete)
Central content system (`content.ts`), Bangla hub (`/bn`), testing infra (12 tests), docs (4 files).

### Batch 3 (✅ Complete)
Unify service page pricing — all 9 service wrappers drop hardcoded USD prices, template falls back to content.ts.

### Batch 4 (⬅️ Current)
Add illustrative-scenario disclaimers to blog posts. Label invented examples clearly.

### Batch 5 (✅ Complete)
Fix mockup-sandbox typecheck — bumped tsx catalog to 4.23.0.

### Batch 6
Add basic API server endpoint tests. Ensure public form endpoints are testable.

### Batch 7
Final verification: typecheck, test, build, commit, state update.

## Completion Criteria

- [ ] All 9 service pages use content.ts for pricing
- [ ] ServicePageTemplate can optionally accept pricing from content.ts
- [ ] Blog illustrative examples labeled
- [ ] Mockup-sandbox typecheck passes
- [ ] 12+ tests pass
- [ ] Typecheck passes (website + admin + API)
- [ ] Production build succeeds
- [ ] State files updated
