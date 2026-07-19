# SYSmoAI — Website & Web Application

**AI-powered operating systems for ambitious businesses.**  
Monorepo for the SYSmoAI public website, admin dashboard, API server, database, and shared libraries.

**Live site:** https://sysmoai.com  
**Brand:** Systems in Motion.  
**Founder:** Emon Hossain — hello@sysmoai.com  

---

## Repository Structure

```
.
├── artifacts/
│   ├── sysmoai-website/       # Public marketing website (React + Vite + Tailwind)
│   ├── sysmoai-admin/         # Admin dashboard (React + Vite + Clerk + TanStack Query)
│   ├── api-server/            # Express API server (Drizzle ORM + PostgreSQL)
│   └── mockup-sandbox/        # UI mockup preview environment (dev only)
├── lib/
│   ├── api-spec/              # OpenAPI 3.1 spec — single source of truth
│   ├── api-client-react/      # Generated React Query hooks from API spec
│   ├── api-zod/               # Generated Zod validators from API spec
│   └── db/                    # Drizzle ORM schema + database connection
├── scripts/                   # Workspace-level CI scripts
├── pnpm-workspace.yaml        # Workspace catalog + overrides
└── tsconfig.base.json         # Shared TypeScript config
```

---

## Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, Vite 7, Tailwind CSS v4 |
| **Routing** | Wouter (hash-free SPA router) |
| **UI Components** | shadcn/ui (Radix primitives, 55+ components) |
| **Animation** | Framer Motion, GSAP + ScrollTrigger |
| **Forms** | react-hook-form + zod |
| **API Client** | TanStack React Query (auto-generated from OpenAPI) |
| **Backend** | Express 5, esbuild bundling |
| **Database** | PostgreSQL 16, Drizzle ORM |
| **Auth** | Clerk (admin dashboard only) |
| **Deployment** | Replit Autoscale |
| **Analytics** | Plausible (privacy-friendly) |
| **Search Indexing** | IndexNow (Bing), Google Indexing API |

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Run typecheck across all projects
pnpm run typecheck

# Build the website (typecheck → vite build → static HTML → sitemap → IndexNow)
pnpm --filter @workspace/sysmoai-website run build

# Start dev server
cd artifacts/sysmoai-website && pnpm run dev

# Run the API server
cd artifacts/api-server && pnpm run dev
```

---

## Environment Variables

Copy `.env.example` files for each project you need:

- **Root:** `.env.example`
- **Website:** `artifacts/sysmoai-website/.env.example`
- **Admin:** `artifacts/sysmoai-admin/.env.example`
- **API Server:** `artifacts/api-server/.env.example`

**Key required variables:**
- `DATABASE_URL` — PostgreSQL connection string (API server)
- `CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` — Clerk auth (admin + API)
- `PORT` — Server port per service

---

## Architecture

### Data Flow

```
User Browser → sysmoai-website (SPA)
                  │
                  ├── Direct: WhatsApp links, email, social
                  │
                  └── API calls via @workspace/api-client-react
                           │
                           ▼
                     api-server (Express + Clerk auth)
                           │
                           └── PostgreSQL (via Drizzle ORM)
                              ├── contact_submissions
                              ├── audit_requests
                              ├── waitlist_signups
                              ├── citation_queries
                              └── citation_checks

Admin Browser → sysmoai-admin (protected SPA)
                   │
                   ├── Clerk auth → sign-in/admin gate
                   │
                   └── API calls (same api-server, admin endpoints)
```

### Content Flow

- **Pages:** React components in `src/pages/` and `src/pages/{services,for,legal}/`
- **Blog:** 50 articles in `src/data/blogPosts.ts` (static, embedded)
- **SEO:** Per-route config in `src/data/seo.ts` and `src/data/seoRuntime.ts`
- **Static HTML Generation:** `scripts/generate-static.ts` bakes SEO into per-route HTML
- **Sitemap:** Generated from route config, 81+ URLs

### API Endpoints

- `POST /api/contact` — Contact form submissions (rate-limited)
- `POST /api/audit-requests` — Free AI Audit requests (rate-limited)
- `POST /api/waitlist` — Newsletter/waitlist signups (rate-limited)
- `GET /api/admin/*` — Admin-only CRUD (Clerk auth + email allowlist)

Full API spec: `lib/api-spec/openapi.yaml`

---

## Developing

### Creating a new service page

Create `src/pages/services/YourService.tsx` with a thin wrapper around `ServicePageTemplate`:

```tsx
import { Zap } from 'lucide-react';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export default function YourService() {
  return (
    <ServicePageTemplate
      icon={Zap}
      title="Your Service"
      headline="Your Headline"
      bdPrice="৳X,XXX"
      usdPrice="$XXX"
      whatItIs="Description"
      deliverables={['Deliverable 1', 'Deliverable 2']}
      bestFor={['Audience 1', 'Audience 2']}
      beforeAfter={[{ before: 'Before', after: 'After' }]}
      steps={[{ title: 'Step 1', desc: 'Description' }]}
      faqs={[{ q: 'Question?', a: 'Answer.' }]}
    />
  );
}
```

Then add the lazy import and route in `App.tsx`.

### Code generation

The API client and Zod schemas are generated from `lib/api-spec/openapi.yaml` using Orval:

```bash
cd lib/api-spec && npx orval
```

---

## Deployment

The website deploys automatically via Replit Autoscale:

1. Run `pnpm run build` (typecheck → vite build → static HTML → sitemap)
2. Static files are served from `dist/public/` by `server.mjs`
3. Route-aware HTML serving: clean URLs serve page-specific `index.html` with baked-in SEO
4. SPA fallback: unmatched routes serve root `index.html`

**Pre-deployment checklist:**
- [ ] Typecheck passes (`pnpm run typecheck`)
- [ ] Production build succeeds (`pnpm --filter @workspace/sysmoai-website run build`)
- [ ] Required env vars are set in production environment
- [ ] API server is reachable
- [ ] Sitemap and robots.txt are up-to-date

---

## Changelog

### 2026-07-19 — Quality audit and fixes

- Fixed: 13 truncated blog meta descriptions (cut off mid-sentence)
- Fixed: Footer email subscribe form now wired to waitlist API
- Added: React error boundary wrapping all lazy-loaded routes
- Added: Plausible analytics script (privacy-friendly, no cookie banner needed)
- Added: `.env.example` files for all projects
- Removed: Unused legacy `public/script.js` and `public/style.css`
- Improved: Code-split vendor chunks (extracted API client, TanStack Query)
- Improved: Reduced main JS bundle from 523KB to 492KB

---

## Remaining Work

- [ ] Notion integration for content management workflow
- [ ] API server end-to-end tests
- [ ] Full responsive review for all audience pages
- [ ] Upgrade blog posts to MDX/data-fetch pattern (remove 470KB embedded content)
- [ ] Website automated accessibility audit
- [ ] Lead tracking analytics (conversion funnels)
- [ ] Database migration automation for production deployments
