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
- **Type**: Vanilla HTML5 + CSS3 + JavaScript (served via Vite static)
- **Preview path**: `/`
- **Purpose**: Full production marketing website for SYSmoAI — Bangladesh's premier AI consultancy
- **Tech**: Pure HTML/CSS/JS — no React/framework. All libraries via CDN.
- **Brand**: SYSmoAI — AI Systems That Work For You
- **Founder**: Emon Hossain | emon@sysmoai.com | WhatsApp: +880 1711-638693
- **Files**:
  - `index.html` — Full page structure (12 sections)
  - `public/style.css` — Complete styles + responsive + animations
  - `public/script.js` — All interactivity (tabs, FAQ, particles, typewriter, counters)
- **Sections built**:
  0. Preloader (SVG stroke animation)
  1. Navbar (sticky, scroll-aware, hamburger)
  2. Hero (particles, typewriter, stats, split visual)
  3. Story (6 narrative cards)
  4. Who We Help (8 tabs, business sub-tabs)
  5. Services (9 flip cards, BD/international pricing toggle)
  6. How It Works (4-step process)
  7. Results (counters, Swiper testimonials, video)
  8. About (founder, skill badges)
  9. Pricing (3 tiers)
  10. FAQ (accordion)
  11. Contact (CTA + form)
  12. Footer (4 columns)
- **CDN Libraries**: GSAP + ScrollTrigger, AOS, Swiper.js, tsParticles, Lottie Player
- **Features**: Custom cursor, scroll progress bar, WhatsApp FAB, video modal
- **Status**: Complete ✓

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
