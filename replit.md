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
- **Brand**: SYSmoAI — "Build Your AI-Powered Business in 72 Hours"
- **Founder**: Emon Hossain | hello@sysmoai.com | WhatsApp: +880 1711-638693
- **WhatsApp link helper**: `src/lib/whatsapp.ts` — exports `getWhatsAppUrl()` + `WA_URLS` (general, audit, quickwin, sprint, retainer, consultation)

### Architecture
- **Routing**: wouter (30+ routes, lazy-loaded via React.lazy/Suspense)
- **Constants**: `src/lib/config.ts` (WA_LINK, EMAIL, BRAND) + `src/lib/whatsapp.ts` (WA_URLS)
- **Global components**: Header (mega-dropdown), Footer (4-column), WhatsAppFAB, CookieConsent

### Pages Built (32 total)

**Core**
- `/` — Homepage (8 sections: Hero, Problem, Who We Help tabs, Services + pricing toggle, How It Works, Proof, Tools, CTA)
- `/services` — Services hub with featured + all-service grid
- `/about` — Founder story timeline + operating principles
- `/pricing` — BDT/USD toggle pricing grid (all 9 services)
- `/proof` — Case studies + testimonials
- `/faq` — FAQ accordion (12 questions)
- `/blog` — Blog index (50 articles, filterable by 10 audience groups)
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

### Theme System
- **Context**: `src/contexts/ThemeContext.tsx` — `isDark` boolean, defaults to dark mode, saved to localStorage
- **Pattern**: All pages use `const { isDark } = useTheme()` and inline `style={{...}}` props with isDark-conditional values
- **Color tokens** (dark → light):
  - bg primary: `#0A0B0F` → `#FFFFFF`
  - bg alternate: `#0D0F14` → `#F8FAFF`
  - card bg: `rgba(255,255,255,0.04)` → `#FFFFFF`
  - card border: `rgba(255,255,255,0.08)` → `#E2E8F0`
  - heading: `#F1F5F9` → `#0A0B0F`
  - body: `#94A3B8` → `#475569`
- **Fully themed pages**: Home, Services, About, Pricing, FAQ, Contact, Blog, BlogPost, Footer, ServicePageTemplate (×9), AudiencePageTemplate (×10)

### Blog System
- **Data**: `src/data/blogPosts.ts` — 50 articles total
- **Structure**: 10 target groups × 5 article types = 50 articles
  - Groups: students, job-seekers, freelancers, researchers, creators, agencies, sme-founders, f-commerce, consultants, corporates
  - Types: wake-up-call, system-reveal, transformation, free-value, future-shock
- **Exports**: `blogPosts`, `getBlogPost(slug)`, `getBlogPostsByGroup(group)`, `groupLabels`, `articleTypeLabels`
- **Filtering**: Blog.tsx uses URL query param `?group=<slug>` for group-based filtering
- **Individual pages**: `/blog/:slug` via BlogPost.tsx

### SEO
- `public/sitemap.xml` — 82 URLs (all 50 blog posts + core pages + service/audience pages)
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
