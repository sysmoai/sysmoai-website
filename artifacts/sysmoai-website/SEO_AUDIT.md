# SYSmoAI SEO Audit Report

**Date:** 2026-05-02  
**Auditor:** SYSmoAI Technical SEO Review  
**Scope:** `sysmoai-website` Vite + React SPA (Wouter router)

---

## Executive Summary

The SYSmoAI website had a strong homepage SEO foundation (good title, OG tags, Organization + LocalBusiness schema, robots.txt, sitemap) but suffered from a critical SPA indexing problem: all 50+ routes returned the **identical HTML shell** to crawlers. Every service page, "For You" page, and blog post shared the same homepage title, description, canonical URL, and OG tags — making inner pages effectively invisible in search.

This overhaul fixes the root issue with a two-layer approach: (1) **runtime head management** via `useSeo` hook that updates all document head tags on client-side navigation, and (2) a **post-build static HTML generator** that bakes per-route meta into individual `index.html` files for each route — making the metadata crawler-visible.

**Estimated SEO impact:** Significant improvement to inner-page indexing, CTR, and Rich Results eligibility. Core Web Vitals also improved by fixing the render-blocking Google Fonts load.

---

## Issues Found & Fixes Applied

### CRITICAL: All routes returned identical metadata ❌ → ✅ Fixed

**Problem:** 50+ routes (services, for/*, blog, legal) returned the homepage `<title>`, `<meta description>`, and canonical to crawlers. Zero unique CTR signals per page.

**Fix:**
- Created `src/data/seo.ts` — single source of truth mapping every route to `{ title, description, canonical, ogTitle, ogDescription, ogType, schemas[] }`. Blog post routes are generated dynamically from `blogPosts.ts`.
- Created `src/hooks/useSeo.ts` — React hook that reads from `seo.ts` on every Wouter location change and updates `document.title`, `meta[name="description"]`, `link[rel="canonical"]`, all OG tags, Twitter Card tags, and injects page-specific JSON-LD schemas.
- Created `scripts/generate-static.ts` — build-time script (run via `tsx` after `vite build`) that generates `dist/public/<route>/index.html` for every route with the correct meta tags baked in, making them visible to crawlers.
- Updated `package.json` build script: `vite build && tsx scripts/generate-static.ts`.

### HIGH: Missing `og:locale` and `twitter:site` on all pages ❌ → ✅ Fixed

**Problem:** `og:locale` was absent; `twitter:site` was absent. Both are recommended for social sharing correctness.

**Fix:**
- Added `<meta property="og:locale" content="en_US" />` to `index.html` and to all routes via `useSeo` hook.
- Added `<meta name="twitter:site" content="@sysmoai" />` to `index.html` and all routes.

### HIGH: No per-page JSON-LD schemas ❌ → ✅ Fixed

**Problem:** Only the homepage had schema (Organization + LocalBusiness). No Service, BlogPosting, BreadcrumbList, or FAQPage schemas on inner pages.

**Fix applied per page type:**
- **`/services/*`** → `Service` schema with name, description, provider, areaServed, priceSpecification.
- **`/blog/:slug`** → `BlogPosting` schema with headline, author, publisher, datePublished, dateModified, image, mainEntityOfPage, keywords.
- **`/blog` index** → `ItemList` schema listing top 10 posts.
- **`/services` index** → `ItemList` schema listing all 9 services.
- **Every page** → `BreadcrumbList` schema reflecting visible breadcrumb hierarchy.
- **`/about`** → `Person` schema for Emon Hossain.
- **`/faq`** → `FAQPage` schema was already present in `FAQ.tsx` (pre-existing, kept as-is).
- **Every page** → `Organization` + `LocalBusiness` schema included.

### MEDIUM: Render-blocking Google Fonts ❌ → ✅ Fixed

**Problem:** `index.html` used a synchronous `<link rel="stylesheet">` for Google Fonts — blocking first paint on slow connections.

**Fix:** Replaced with the async pattern:
```html
<link rel="preload" as="style" href="...fonts..." />
<link rel="stylesheet" href="...fonts..." media="print" onload="this.media='all'" />
<noscript><link rel="stylesheet" href="...fonts..." /></noscript>
```
This eliminates the fonts as a render-blocking resource, improving LCP on mobile throttled connections.

### MEDIUM: Static sitemap with hardcoded `lastmod` ❌ → ✅ Fixed

**Problem:** `public/sitemap.xml` had hardcoded `<lastmod>2026-04-15</lastmod>` on all entries and was not in sync with actual blog posts being added.

**Fix:** `scripts/generate-static.ts` now generates `sitemap.xml` dynamically at build time:
- Uses today's date for static pages.
- Uses each blog post's `publishDate` field for blog routes.
- Covers all 33 static routes + all blog posts automatically.
- Writes to both `dist/public/sitemap.xml` and `public/sitemap.xml` so dev and prod stay in sync.

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
| `/faq` | Organization, FAQPage (pre-existing), BreadcrumbList |
| `/pricing` | Organization, BreadcrumbList |
| `/proof` | Organization, BreadcrumbList |
| `/contact` | Organization, BreadcrumbList |
| `/free-ai-audit` | Organization, BreadcrumbList |
| `/privacy-policy`, `/terms-of-service`, `/refund-policy` | Organization |

---

## Core Web Vitals — Technical Audit

### LCP (Largest Contentful Paint)
- **Hero images** are preloaded (`<link rel="preload" as="image">`) — good.
- **Google Fonts** were render-blocking — **fixed** (async load pattern).
- **Splash screen** is CSS-only, fires immediately, removed after React hydration — minimal LCP impact.
- **Recommendation:** Monitor LCP on mobile throttled with Lighthouse after deploying.

### CLS (Cumulative Layout Shift)
- Splash screen uses `position: fixed; inset: 0` — doesn't affect document flow, no CLS impact.
- Font loading via async pattern may cause FOUT (Flash of Unstyled Text) on first load — acceptable trade-off for LCP improvement. System font fallbacks are defined.

### INP (Interaction to Next Paint)
- Route lazy loading is in place — `Suspense` + `lazy()` for all pages.
- Idle prefetch of major routes implemented — navigation feels instant.

---

## Social Meta — Baseline After Fix

Every page now emits (client-side via hook, build-time via static generator):

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

## On-Page Notes by Key Route

| Page | H1 | Issues | Status |
|------|----|--------|--------|
| `/` | "Build Your AI-Powered Business in 72 Hours" | Good keyword targeting | ✅ |
| `/services` | Confirmed in Services.tsx | Multiple services listed, good hierarchy | ✅ |
| `/services/ai-quick-win` | "Your #1 Workflow Problem. Automated. In 3 Days." | Strong H1 | ✅ |
| `/services/ai-sprint` | "Full AI Stack. Deployed in 14 Days." | Strong H1 | ✅ |
| `/about` | Emon Hossain section | Founder story, good for E-E-A-T | ✅ |
| `/faq` | FAQ heading | FAQPage schema present | ✅ |
| `/blog` | Blog index | ItemList schema added | ✅ |
| `/blog/:slug` | Post headline from blogPosts.ts | BlogPosting schema with author/dates | ✅ |
| `/for/*` | Audience-specific headlines | Pain points + solutions, strong targeting | ✅ |

---

## Deferred Items (Out of Scope — Recommended Follow-Up)

1. **Per-page OG images** — Currently all pages use `/opengraph.jpg`. Per-page OG images (especially for blog posts and service pages) would significantly improve social sharing CTR. Requires image generation pipeline.

2. **True SSR or prerender for SPA crawling** — The static HTML generator bakes meta into build-time HTML files. For dynamic content (if blog posts are ever fetched from an API rather than bundled), a proper SSR layer (Vite SSR or migration to a meta-framework) would be needed.

3. **Thin pages** — Several `/for/*` pages have strong pain points but thin "proof" sections (no client testimonials, case studies, or data specific to that audience segment). Adding audience-specific social proof would improve conversion and dwell time signals.

4. **Blog content gaps** — No content targeting the keywords: "AI consultant Dhaka", "n8n tutorial Bangladesh", "Notion OS Bangladesh". High-intent, low-competition opportunities.

5. **Internal linking** — Blog posts reference services via CTA links but cross-links between blog posts and between `for/*` and `services/*` pages are sparse. A structured internal linking strategy would improve crawl depth and PageRank distribution.

6. **Google Search Console submission** — After deploying, submit `https://sysmoai.com/sitemap.xml` to Google Search Console for faster indexing of the updated pages.

7. **FAQ schema on service pages** — Each service page has a `faqs` prop with Q&A data. Adding `FAQPage` JSON-LD to service pages would unlock rich results for those pages.

---

## Rendering Approach Decision

**Chosen: (A) Static HTML generation at build time + runtime hook for navigation**

Rationale:
- The site is a Vite + React SPA with 50+ known routes. All routes are statically known (blog slugs come from a bundled `blogPosts.ts` array, not a CMS API).
- Option (B) — API server SSR — would add latency and complexity for a purely static content site.
- The `scripts/generate-static.ts` approach generates per-route HTML at build time, requiring zero framework migration and no new runtime infrastructure. Crawlers see unique meta immediately.
- The `useSeo` hook handles client-side navigation so shared URLs (after in-app navigation) carry the correct social meta.

---

## Files Changed

| File | Change |
|------|--------|
| `src/data/seo.ts` | NEW — per-route SEO config + dynamic blog routes |
| `src/hooks/useSeo.ts` | NEW — runtime hook updating all head tags on navigation |
| `scripts/generate-static.ts` | NEW — post-build static HTML + sitemap generator |
| `src/App.tsx` | Replaced `SEOManager` with `SeoHead` (uses `useSeo`) |
| `index.html` | Added `og:locale`, `twitter:site`; fixed async font loading |
| `package.json` | Added `tsx` devDep; build script now runs static generator |
| `public/sitemap.xml` | Auto-regenerated by build script (dynamic lastmod, all blog posts) |
