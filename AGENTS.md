# SYSmoAI — Project Memory for AI Agents

## Business Purpose

SYSmoAI builds practical AI systems for growing businesses — lead management, workflow automation, Notion OS, AI agents, and corporate AI training. Based in Dhaka, Bangladesh. Serving Bangladesh and international clients.

## Repository Architecture

- **Root:** `~/workspace` — pnpm monorepo
- **Website:** `artifacts/sysmoai-website` — React 19 + Vite + Tailwind + Wouter
- **Admin:** `artifacts/sysmoai-admin` — React 19 + Clerk auth
- **API:** `artifacts/api-server` — Express 5 + Drizzle ORM + PostgreSQL
- **Libs:** `lib/api-spec`, `lib/api-client-react`, `lib/api-zod`, `lib/db`
- Scripts: `scripts/`, Docs: `docs/`

## Working Rules

- **Branch:** commandcode/sysmoai-quality-2026-07-19
- **English-only public content.** No Bangla or other non-English copy permitted on any public page.
- All claims must be truthful. Invented customers, statistics, and results are not permitted.
- Pricing must be consistent. Unapproved prices use "Contact for a scoped quote."
- Central navigation config in `src/data/navigation.ts` — edit there, not in components.
- Central service/audience data in `src/data/content.ts` — single source of truth.
- Tests in vitest. Must pass before commit.
- Never expose secrets, tokens, or credentials.
- No force-push, no destructive migrations, no billing changes.

## State Files (read these first)

- `COMMAND-CODE-STATE.md`
- `docs/MASTER-EXECUTION-PLAN.md`
- `docs/QUALITY-SCORECARD.md`

## Key Commands

- `pnpm run typecheck` — full workspace typecheck
- `pnpm --filter @workspace/sysmoai-website run test` — website tests
- `pnpm --filter @workspace/sysmoai-website run build` — website build
- `pnpm --filter @workspace/sysmoai-admin run build` — admin build
- `pnpm --filter @workspace/api-server run test` — API tests

## Prohibited

- Printing or committing secrets.
- Force-push.
- Merging unrelated branches.
- Deleting production data.
- Making unsupported business claims.
- Publishing fabricated customer stories.
