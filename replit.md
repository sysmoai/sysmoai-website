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
- **Build**: esbuild (CJS bundle)

## Artifacts

### SYSmoAI Website (`artifacts/sysmoai-website`)
- **Type**: React + Vite + Tailwind CSS + wouter + Framer Motion
- **Preview path**: `/`
- **Purpose**: Full production marketing website for SYSmoAI — Bangladesh's premier AI consultancy
- **Brand**: SYSmoAI — "AI Systems That Work For You"
- **Founder**: Emon Hossain | hello@sysmoai.com | WhatsApp: +880 1711-638693
- **WhatsApp link**: `https://wa.me/8801711638693?text=Hi%20SYSmoAI%2C%20I%20need%20help`

### Architecture
- **Routing**: wouter (30+ routes, lazy-loaded via React.lazy/Suspense)
- **Constants**: `src/lib/config.ts` (WA_LINK, EMAIL, BRAND)
- **Global components**: Header (mega-dropdown), Footer (4-column), WhatsAppFAB, CookieConsent

### Pages Built (32 total)

**Core**
- `/` — Homepage (8 sections: Hero, Problem, Who We Help tabs, Services + pricing toggle, How It Works, Proof, Tools, CTA)
- `/services` — Services hub with featured + all-service grid
- `/about` — Founder story timeline + operating principles
- `/pricing` — BDT/USD toggle pricing grid (all 9 services)
- `/proof` — Case studies + testimonials
- `/faq` — FAQ accordion (12 questions)
- `/blog` — Blog index with seed posts
- `/contact` — Contact form (react-hook-form + zod) + WhatsApp CTA

**Service pages** (`/services/`)
- `ai-quick-win` — 3-day automation, ৳3,750–7,500
- `ai-sprint` — 14-day full AI stack, ৳25,000–50,000
- `ai-retainer` — Monthly managed AI ops, ৳20,000/month
- `ai-coaching` — 1:1 60-min sessions, ৳2,500/session
- `group-workshop` — Team workshops, ৳500/person
- `notion-os` — Custom Notion OS, ৳15,000–50,000
- `ai-agent-dev` — Custom AI agents (NemoClaw), ৳50,000–2,00,000
- `n8n-automation` — Per-workflow automation, ৳2,000–10,000
- `corporate-training` — Enterprise AI, ৳50,000–2,00,000
- `international` — International clients, USD pricing

**Audience pages** (`/for/`)
- `students`, `job-seekers`, `freelancers`, `researchers`, `agencies`
- `sme-founders`, `f-commerce`, `consultants`, `creators`, `corporates`

**Legal** (`/privacy-policy`, `/terms-of-service`, `/refund-policy`)

### Templates
- `ServicePageTemplate.tsx` — Used by all 9 service pages (hero, deliverables, Before/After, steps, FAQ, related)
- `AudiencePageTemplate.tsx` — Used by all 10 audience pages (pain points, Before/After, solutions, FAQ)

### SEO
- `public/sitemap.xml` — All 32 pages with priorities and changefreq
- `public/robots.txt` — Allow all, Sitemap directive
- Every page sets `document.title` via `useEffect`

### Payments & Markets
- Bangladesh: bKash, Nagad, bank transfer
- International: Wise, Payoneer
- Currency toggle: BDT ৳ / USD $ on homepage and Pricing page

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
