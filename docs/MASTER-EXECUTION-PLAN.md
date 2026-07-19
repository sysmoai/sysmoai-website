# SYSmoAI — Master Execution Plan

**Last updated:** 2026-07-19  
**Branch:** commandcode/sysmoai-quality-2026-07-19  
**HEAD:** a7246af

## Execution Order

### Batch 1 (✅ Complete)
Fix blog metadata — 16 truncated descriptions, 2 duplicate titles, validation scripts.

### Batch 2 (✅ Complete)
Central content system (`content.ts`), Bangla hub (`/bn`), testing infra (12 tests), docs (4 files).

### Batch 3 (⬅️ Current)
**Objective:** Unify service page pricing with shared content data, fix remaining hardcoded USD prices.

Files: AIQuickWin.tsx, AISprint.tsx, AIRetainer.tsx, AICoaching.tsx, GroupWorkshop.tsx, NotionOS.tsx, AIAgentDev.tsx, N8nAutomation.tsx, CorporateTraining.tsx, International.tsx, ServicePageTemplate.tsx

### Batch 4
Add illustrative-scenario disclaimers to blog posts. Update `content.ts` with disclaimer flag.

### Batch 5
Fix mockup-sandbox typecheck. Pin vite versions to resolve version conflict.

### Batch 6
Final verification: typecheck, test, build, commit, state update.

### Batch 7
Deployment preparation and live verification (requires production auth).

## Completion Criteria

- [ ] All 9 service pages use content.ts for pricing
- [ ] ServicePageTemplate can optionally accept pricing from content.ts
- [ ] Blog illustrative examples labeled
- [ ] Mockup-sandbox typecheck passes
- [ ] 12+ tests pass
- [ ] Typecheck passes (website + admin + API)
- [ ] Production build succeeds
- [ ] State files updated
