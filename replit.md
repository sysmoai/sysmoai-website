# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### SYSmoAI Website (`artifacts/sysmoai-website`)
- **Type**: React + Vite (frontend-only, no backend)
- **Preview path**: `/`
- **Purpose**: Complete 5-page B2B marketing website for SYSmoAI Pvt Ltd
- **Pages**: Home, Services, About, Contact, Blog
- **Brand**: SYSmoAI Pvt Ltd — AI systems consultancy, Dhaka, Bangladesh
- **Founder**: Md. Emon Hossain
- **Contact**: support@sysmoai.com | WhatsApp: +880 1711-638693
- **Key components**:
  - `SYSmoAILogo` — 3-layer hexagonal SVG mark
  - `SYSmoAIWordmark` — SYS(bold)+mo(regular,65%)+AI(bold)
  - `Header` — sticky dark nav with mobile hamburger
  - `Footer` — dark footer with company info
  - `WhatsAppFAB` — floating WhatsApp CTA (bottom-right)
- **Routing**: wouter
- **Animations**: framer-motion

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
