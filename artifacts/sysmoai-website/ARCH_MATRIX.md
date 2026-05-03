# SYSmoAI — F-Commerce Wedge Implementation Log
## Task #8: Narrow positioning around the F-Commerce wedge

**Date:** 2026-05-03

---

## Anchor Offer (Post-Reposition)
**F-Commerce AI Sprint** — 14 days, ৳50,000 / $600
Followed by: **৳20,000/mo F-Commerce AI Retainer**
Primary conversion: **/free-ai-audit**

---

## Nav Structure (≤5 items)
| Item | Destination |
|---|---|
| F-Commerce | /for/f-commerce |
| The Sprint | /services/ai-sprint |
| Proof | /proof |
| About | /about |
| Get Free Audit (CTA) | /free-ai-audit |

---

## Architecture Decisions

| Route | Decision | Rationale | Redirect target |
|---|---|---|---|
| `/` | REWRITE | Hero leads with F-Commerce DM/order chaos | — |
| `/services` | KEEP + SIMPLIFY | Sprint as anchor, others by-inquiry | — |
| `/services/ai-sprint` | REWRITE as "F-Commerce AI Sprint" | Anchor offer at fixed ৳50,000 | — |
| `/services/ai-retainer` | KEEP | Ladder step 2 — ৳20K/mo | — |
| `/services/ai-quick-win` | KEEP | Entry funnel into Sprint | — |
| `/services/ai-agent-dev` | DEMOTE | By-inquiry only | → /services/other-engagements |
| `/services/notion-os` | DEMOTE | By-inquiry only | → /services/other-engagements |
| `/services/n8n-automation` | DEMOTE | By-inquiry only | → /services/other-engagements |
| `/services/ai-coaching` | DEMOTE | By-inquiry only | → /services/other-engagements |
| `/services/group-workshop` | DEMOTE | By-inquiry only | → /services/other-engagements |
| `/services/corporate-training` | DEMOTE | By-inquiry only | → /services/other-engagements |
| `/services/other-engagements` | NEW PAGE | Hub for all non-anchor services | — |
| `/services/international` | KEEP | USD pricing landing page | — |
| `/for/f-commerce` | KEEP + PROMOTE | Primary wedge audience — now in nav | — |
| `/for/sme-founders` | REDIRECT | Same audience as F-Commerce | → /for/f-commerce |
| `/for/students` | REDIRECT | Out-of-wedge; blog surfaces existing per-audience articles at /blog?group=students | → /blog?group=students |
| `/for/job-seekers` | REDIRECT | Same | → /blog?group=job-seekers |
| `/for/freelancers` | REDIRECT | Same | → /blog?group=freelancers |
| `/for/researchers` | REDIRECT | Same | → /blog?group=researchers |
| `/for/agencies` | REDIRECT | Same | → /blog?group=agencies |
| `/for/consultants` | REDIRECT | Same | → /blog?group=consultants |
| `/for/creators` | REDIRECT | Same | → /blog?group=creators |
| `/for/corporates` | REDIRECT | Same | → /blog?group=corporates |
| `/about` | KEEP | Founder story | — |
| `/pricing` | REWRITE | F-Commerce Sprint + Retainer first | — |
| `/proof` / `/results` | KEEP | Results-first guarantee | — |
| `/faq` | KEEP | Supporting conversion | — |
| `/blog` | KEEP | Content surface; group filter surfaces per-audience posts | — |
| `/free-ai-audit` | KEEP | Primary conversion — all primary CTAs point here | — |
| `/contact` | KEEP | Secondary contact path | — |
| Legal pages | KEEP | — | — |

---

## Redirect Implementation (two layers)
1. **`public/_redirects`** — 15 HTTP 301 rules for Netlify/Cloudflare Pages static host
2. **`RedirectTo` component in `App.tsx`** — client-side SPA fallback via wouter

## CTA Hierarchy (site-wide)
- **Primary:** → `/free-ai-audit` (blue button, all templates and major pages)
- **Secondary:** WhatsApp (outline button, always present but not primary)

## Sitemap
- Derived from `src/data/seoConfig` via `generate-static.ts` at build time — no manual drift possible
- Demoted routes removed from both `seo.ts` and `seoRuntime.ts`
- `/services/other-engagements` added with priority 0.7

## Out of Scope
- Visual redesign
- Bangla full locale
- Admin/DB/auth changes
- F-commerce qualifying fields on audit form (Task #4)
- Email notifications (Task #5)
- Creating new blog posts for demoted audience segments (Task #8 specifies "demote", not "create content")
