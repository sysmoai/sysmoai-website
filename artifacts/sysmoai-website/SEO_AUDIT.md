# SYSmoAI SEO Audit Report

**Date:** 2026-05-02  
**Auditor:** SYSmoAI Technical SEO Review  
**Scope:** `sysmoai-website` Vite + React SPA (Wouter router)

---

## Executive Summary

The SYSmoAI website had a strong homepage SEO foundation but suffered from a critical SPA indexing problem: all 50+ routes returned the **identical HTML shell** to crawlers. Every service page, "For You" page, and blog post shared the same homepage title, description, canonical URL, and OG tags — making inner pages effectively invisible in search.

This overhaul fixes the root issue with a two-layer approach: (1) **runtime head management** via `useSeo` hook that updates all document head tags on client-side navigation, and (2) a **post-build static HTML generator** that bakes per-route meta into individual `index.html` files for each route — making metadata crawler-visible. A **custom production server** (`server.mjs`) serves the route-specific HTML files for clean URLs (without trailing slash), which is what crawlers actually request.

**Estimated SEO impact:** Significant improvement to inner-page indexing, CTR, and Rich Results eligibility. Core Web Vitals also improved by fixing the render-blocking Google Fonts load and reducing the main JS bundle by 48%.

---

## Validation Results

### curl Checks (Production Server)

Tested against `node server.mjs` (the production server) after `pnpm run build`:

```
curl http://localhost/services/ai-sprint
→ <title>AI Sprint — Full AI Stack Deployed in 14 Days | SYSmoAI</title>
→ <link rel="canonical" href="https://sysmoai.com/services/ai-sprint" />
→ <meta property="og:title" content="AI Sprint — Full AI Stack Deployed in 14 Days | SYSmoAI" />
→ Service JSON-LD schema present ✓

curl http://localhost/about
→ <title>About SYSmoAI | Emon Hossain — AI Systems Architect Bangladesh</title>
→ <link rel="canonical" href="https://sysmoai.com/about" />
→ Person JSON-LD schema (Emon Hossain) present ✓

curl http://localhost/faq
→ <title>Frequently Asked Questions | SYSmoAI Bangladesh AI Consulting</title>
→ <link rel="canonical" href="https://sysmoai.com/faq" />
→ FAQPage JSON-LD schema with 15 Q&As present ✓ (Rich Results eligible)

curl http://localhost/results
→ <link rel="canonical" href="https://sysmoai.com/proof" /> (correctly deduped)

curl http://localhost/blog/consultants-future-shock-ai-deliverables-2027
→ <title>By 2027, Clients Will Expect AI-Powered Deliverables. Can You Deliver? | SYSmoAI</title>
→ BlogPosting JSON-LD schema with author, publisher, datePublished present ✓
```

### Schema Coverage — Rich Results Eligible

The following schema types were validated to be present in static HTML:

| Route | Schema Type | Status |
|-------|------------|--------|
| `/` | Organization, LocalBusiness | ✓ |
| `/services` | ItemList (9 services) | ✓ |
| `/services/*` | Service | ✓ |
| `/about` | Person (Emon Hossain) | ✓ |
| `/faq` | FAQPage (15 Q&As) | ✓ |
| `/blog/:slug` | BlogPosting | ✓ |
| `/blog` | ItemList (top 10 posts) | ✓ |
| All pages | BreadcrumbList, Organization | ✓ |

### Bundle Size Verification

Before (with full blogPosts in client bundle):
- Main chunk: 935KB │ gzip: 284KB

After (`useSeo` uses lightweight `seoRuntime.ts`, no blogPosts import):
- Main chunk: **491KB │ gzip: 152KB** — 48% reduction

The ~449KB reduction comes from removing the full `blogPosts.ts` article bodies from the client bundle. All schemas are now handled at build time only (static HTML) and never re-injected at runtime.

### Security Verification

Path traversal protection in `server.mjs`:
```
curl --path-as-is /../../package.json      → 403 Forbidden ✓
curl --path-as-is /../../../etc/passwd     → 403 Forbidden ✓
curl /%2e%2e%2fpackage.json                → 403 Forbidden ✓
curl --path-as-is /../../../../etc/shadow  → 403 Forbidden ✓
```

SPA fallback still works for unknown routes:
```
curl /some-unknown-route-xyz  → 200 (SPA shell served, not 404) ✓
```

---

## Issues Found & Fixes Applied

### CRITICAL: All routes returned identical metadata ❌ → ✅ Fixed

**Problem:** 50+ routes returned the homepage `<title>`, `<meta description>`, and canonical to crawlers. Zero unique CTR signals per page.

**Fix:**
- Created `src/data/seo.ts` — source of truth mapping every route to full SEO config including JSON-LD schemas. Blog post routes are generated dynamically from `blogPosts.ts`. Used only by the build tool.
- Created `src/data/seoRuntime.ts` — lightweight client-side config (title, description, canonical, ogType only — no schemas, no blogPosts import). Used by the runtime hook.
- Created `src/hooks/useSeo.ts` — React hook that reads from `seoRuntime.ts` on every Wouter location change and updates `document.title`, `meta[name="description"]`, `link[rel="canonical"]`, all OG tags, and Twitter Card tags.
- Created `scripts/generate-static.ts` — build-time script (run via `tsx` after `vite build`) that generates `dist/public/<route>/index.html` for every route with the correct meta + schemas baked in.
- Created `server.mjs` — minimal Node.js production server that serves `dist/public/<route>/index.html` for clean route URLs (no trailing slash), with SPA fallback for unknown routes.
- Updated `package.json` build script: `vite build && tsx scripts/generate-static.ts`.

### HIGH: Render-blocking Google Fonts caused poor LCP ❌ → ✅ Fixed

**Problem:** `index.html` used a synchronous `<link rel="stylesheet">` for Google Fonts — blocking first paint on slow connections.

**Fix:** Replaced with the async pattern:
```html
<link rel="preload" as="style" href="...fonts..." />
<link rel="stylesheet" href="...fonts..." media="print" onload="this.media='all'" />
<noscript><link rel="stylesheet" href="...fonts..." /></noscript>
```

### HIGH: blog post article bodies in client bundle caused slow initial load ❌ → ✅ Fixed

**Problem:** `useSeo` originally imported `seo.ts` → `blogPosts.ts` (449KB of article body text), inflating the main bundle by 91% (491KB → 939KB gzipped: 152KB → 286KB).

**Fix:** Runtime hook now imports `seoRuntime.ts` (lightweight, no blogPosts). Schemas are baked into static HTML at build time and never re-injected at runtime. Main bundle: 491KB / 152KB gzip.

### HIGH: No per-page JSON-LD schemas ❌ → ✅ Fixed

**Problem:** Only the homepage had schema (Organization + LocalBusiness). No Service, BlogPosting, BreadcrumbList, or FAQPage schemas on inner pages.

**Fix applied per page type:**
- **`/services/*`** → `Service` schema with name, description, provider, areaServed, priceSpecification.
- **`/blog/:slug`** → `BlogPosting` schema with headline, author, publisher, datePublished, dateModified, image, mainEntityOfPage, keywords.
- **`/blog` index** → `ItemList` schema listing top 10 posts.
- **`/services` index** → `ItemList` schema listing all 9 services.
- **Every page** → `BreadcrumbList` schema reflecting visible breadcrumb hierarchy.
- **`/about`** → `Person` schema for Emon Hossain.
- **`/faq`** → `FAQPage` schema (15 Q&As) — rich results eligible.
- **Every page** → `Organization` + `LocalBusiness` schema included.

### MEDIUM: Static sitemap with hardcoded `lastmod` ❌ → ✅ Fixed

**Fix:** `scripts/generate-static.ts` generates `sitemap.xml` dynamically at build time. URLs are derived from `seoConfig` keys (not hard-coded), filtered to include only routes where `canonical === SITE_URL + route`. Non-canonical routes (like `/results`) are automatically excluded. Blog posts use per-post `publishDate` for accurate `lastmod`. Total: 82 URLs (33 static + 49 blog).

### MEDIUM: Missing `og:locale` and `twitter:site` ❌ → ✅ Fixed

Added `og:locale` (en_US) and `twitter:site` (@sysmoai) to `index.html` and all routes via `useSeo` hook.

### MEDIUM: `/results` route uncovered ❌ → ✅ Fixed

Added `/results` to `seoConfig` and `seoRuntime.ts` with canonical pointing to `https://sysmoai.com/proof`. Static HTML generated. Sitemap excludes it automatically (non-canonical filter).

### MEDIUM: `vite preview` served root index.html for all clean URLs ❌ → ✅ Fixed

Added `configurePreviewServer` middleware to `vite.config.ts` that intercepts clean URL requests and serves `dist/public/<route>/index.html` before vite's SPA fallback.

---

## Schema Coverage by Route

| Route | Schemas |
|-------|---------|
| `/` | Organization + LocalBusiness |
| `/services` | Organization, ItemList (9 services), BreadcrumbList |
| `/services/*` | Organization, Service, BreadcrumbList |
| `/for/*` | Organization, BreadcrumbList |
| `/blog` | Organization, ItemList (top 10 posts), BreadcrumbList |
| `/blog/:slug` | Organization, BlogPosting, BreadcrumbList |
| `/about` | Organization, Person (Emon Hossain), BreadcrumbList |
| `/faq` | Organization, FAQPage (15 Q&As), BreadcrumbList |
| `/pricing` | Organization, BreadcrumbList |
| `/proof` | Organization, BreadcrumbList |
| `/contact` | Organization, BreadcrumbList |
| `/free-ai-audit` | Organization, BreadcrumbList |
| `/privacy-policy`, `/terms-of-service`, `/refund-policy` | Organization |

---

## Core Web Vitals — Technical Audit

### LCP (Largest Contentful Paint)
- **Google Fonts** were render-blocking — **fixed** (async load pattern).
- **Client bundle reduced 48%**: 935KB → 491KB. gzip: 286KB → 152KB.
- **Hero images** preloaded — good.
- **Splash screen** is CSS-only — no LCP impact.
- **Expected LCP improvement:** significant on mobile throttled; fonts no longer block first paint.

### CLS (Cumulative Layout Shift)
- Splash screen uses `position: fixed; inset: 0` — doesn't affect document flow, no CLS impact.
- Font async loading may cause FOUT on first load — acceptable trade-off. System font fallbacks are defined in the CSS.

### INP (Interaction to Next Paint)
- Route lazy loading in place — `Suspense` + `lazy()` for all pages.
- Blog post article bodies removed from main bundle → faster initial JS parse.

---

## Social Meta — Baseline After Fix

Every page now emits (client-side via hook; build-time in static HTML):

```html
<meta property="og:title" content="[page-specific title]" />
<meta property="og:description" content="[page-specific description]" />
<meta property="og:url" content="https://sysmoai.com/[route]" />
<meta property="og:image" content="https://sysmoai.com/opengraph.jpg" />
<meta property="og:type" content="website|article" />
<meta property="og:site_name" content="SYSmoAI" />
<meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@sysmoai" />
<meta name="twitter:title" content="[page-specific title]" />
<meta name="twitter:description" content="[page-specific description]" />
<meta name="twitter:image" content="https://sysmoai.com/opengraph.jpg" />
```

---

## Rendering Approach Decision

**Chosen: Static HTML generation at build time + runtime hook for navigation + custom production server**

Rationale:
- The site is a Vite + React SPA with 50+ known routes. All routes are statically known (blog slugs come from a bundled `blogPosts.ts` array, not a CMS API).
- `scripts/generate-static.ts` generates per-route HTML at build time, requiring zero framework migration and no new runtime infrastructure beyond a lightweight Node.js server.
- `server.mjs` serves route-specific HTML for clean URLs; unknown routes fall back to the SPA shell.
- The `useSeo` hook handles client-side navigation so shared URLs (after in-app navigation) carry the correct social meta — without importing article content into the bundle.

---

## Deferred Items (Out of Scope — Recommended Follow-Up)

1. **Per-page OG images** — All pages share `/opengraph.jpg`. Per-page images (especially blog posts and service pages) would improve social sharing CTR. Requires image generation pipeline.

2. **FAQPage schema on service pages** — Each service page has a `faqs` prop with Q&A data. Adding `FAQPage` JSON-LD to service pages would unlock rich results for high-intent service queries.

3. **Internal linking** — Blog posts reference services via CTA links but cross-links between posts and between `for/*` and `services/*` pages are sparse. A structured internal linking strategy would improve crawl depth and PageRank distribution.

4. **Google Search Console submission** — After deploying, submit `https://sysmoai.com/sitemap.xml` to Google Search Console for faster indexing of the updated pages.

5. **Blog content gaps** — No content targeting: "AI consultant Dhaka", "n8n tutorial Bangladesh", "Notion OS Bangladesh". High-intent, low-competition opportunities.

6. **Thin pages** — Several `/for/*` pages have strong pain points but thin "proof" sections. Adding audience-specific social proof would improve conversion and dwell time signals.

---

## Files Changed

| File | Change |
|------|--------|
| `src/data/seo.ts` | NEW — per-route SEO config + schemas (build tool only) |
| `src/data/seoRuntime.ts` | NEW — lightweight client-side meta config (no blogPosts import) |
| `src/hooks/useSeo.ts` | NEW — runtime hook updating head tags on navigation |
| `scripts/generate-static.ts` | NEW — post-build static HTML + sitemap generator |
| `server.mjs` | NEW — route-aware production server with path-traversal protection |
| `src/App.tsx` | Replaced `SEOManager` with `SeoHead` (uses `useSeo`) |
| `index.html` | Added `og:locale`, `twitter:site`; fixed async font loading |
| `package.json` | Added `tsx` devDep; build script runs static generator; serve → node server.mjs |
| `public/sitemap.xml` | Auto-regenerated by build script (dynamic lastmod, 82 URLs) |
| `vite.config.ts` | Added `configurePreviewServer` middleware for route-specific HTML in preview |
| `.replit-artifact/artifact.toml` | Production now uses custom run command instead of static serve |
