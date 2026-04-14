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
  0. Preloader (SVG stroke animation, brand hex mark)
  1. Navbar (sticky, scroll-aware, hamburger + **MEGA-MENU** with Solutions dropdown)
  2. Hero (particles, typewriter, trust bar, before/after visual)
  3. Tool Stack Bar (scrolling tech pill labels)
  4. Story (6 narrative cards with titles)
  5. Who We Help (8 tabs, problem+solution 2-col grid, business sub-tabs)
  6. Services (9 flip cards, BD/international pricing toggle)
  7. How It Works (4-step process)
  8. Results (fixed stats row, Swiper testimonials x4, video)
  9. About (founder, skill badges)
  10. Pricing (3 tiers with 5 features each)
  11. FAQ (accordion)
  12. Contact (CTA + enhanced form with category dropdown)
  13. Footer (4 columns: Brand, Solutions, Services, Company)
- **CDN Libraries**: GSAP + ScrollTrigger, AOS, Swiper.js, tsParticles, Lottie Player
- **Mega-menu**: Solutions column with 3 groups (Individuals, Business, Expert Services), each expandable, future-proof for new subcategories
- **Future-proof nav**: Adding new target groups = add new tab-btn + tab-panel + mega-link (no JS changes needed)
- **Features**: Custom cursor, scroll progress bar, WhatsApp FAB, video modal, mobile accordion nav
- **Status**: Complete ✓

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
