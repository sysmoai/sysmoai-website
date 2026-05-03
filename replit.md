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
- **Purpose**: Full production marketing website for SYSmoAI — Bangladesh's F-Commerce AI company
- **Brand**: SYSmoAI — "The F-Commerce Operating System. Built in Dhaka, for Dhaka."
- **Anchor offer**: F-Commerce AI Sprint (৳50,000 / 14 days) + ৳20,000/mo retainer
- **Primary conversion**: `/free-ai-audit` (all primary CTAs point here)
- **Founder**: Emon Hossain | hello@sysmoai.com | WhatsApp: +880 1711-638693
- **WhatsApp link helper**: `src/lib/whatsapp.ts` — exports `getWhatsAppUrl()` + `WA_URLS` (general, audit, quickwin, sprint, retainer, consultation)

### Architecture
- **Routing**: wouter (30+ routes, lazy-loaded via React.lazy/Suspense)
- **Constants**: `src/lib/config.ts` (WA_LINK, EMAIL, BRAND) + `src/lib/whatsapp.ts` (WA_URLS)
- **Global components**: Header (5-item flat nav: F-Commerce / The Sprint / Proof / About / Get Free Audit CTA), Footer (4-column, F-Commerce focused), WhatsAppFAB, CookieConsent, RedirectTo
- **Redirect component**: `src/components/RedirectTo.tsx` — renders a client-side immediate redirect using wouter's `setLocation`

### Pages Built (33 total)

**Core**
- `/` — Homepage — hero leads with F-Commerce "Stop Losing Orders in Your DMs." positioning
- `/services` — Services hub with featured + all-service grid
- `/about` — Founder story timeline + operating principles
- `/pricing` — F-Commerce Sprint + Retainer first, others secondary (by inquiry)
- `/proof` — Case studies + testimonials
- `/faq` — FAQ accordion (12 questions)
- `/blog` — Blog index (50 articles, filterable by audience groups)
- `/contact` — Contact form (react-hook-form + zod) + WhatsApp CTA
- `/free-ai-audit` — Primary conversion — all primary CTAs across site point here

**Service pages** (`/services/`)
- `ai-sprint` — **F-Commerce AI Sprint** (rebranded anchor offer, ৳50,000/14 days)
- `ai-retainer` — Monthly AI ops, ৳20,000/month
- `ai-quick-win` — Entry offer, ৳3,750–7,500
- `other-engagements` — **NEW** hub page for by-inquiry services (6 services listed)
- `ai-coaching`, `group-workshop`, `notion-os`, `ai-agent-dev`, `n8n-automation`, `corporate-training`, `international` — kept as full pages, linked from /services/other-engagements

**Audience pages** (`/for/`)
- `f-commerce` — **PRIMARY WEDGE PAGE** (linked in nav)
- `sme-founders` → **client-side redirect** → `/for/f-commerce`
- `students`, `job-seekers`, `freelancers`, `researchers`, `agencies`, `consultants`, `creators`, `corporates` → **client-side redirect** → `/blog`

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
