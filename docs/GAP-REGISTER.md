# SYSmoAI — Gap Register

## Content Gaps

| Gap | Location | Impact | Effort |
|-----|----------|--------|--------|
| No verified case studies | /proof | Low trust | High |
| No verified founder credentials | /about | Low trust | Medium |
| No analytics running | All pages | No conversion data | Low |
| No email capture backend | Footer form | Wired now, API exists | ✅ Fixed |
| No Bangla language hub | Missing | Lost Bangladesh traffic | Medium |
| No sitemap for alternate languages | All | SEO gap | Low |
| No structured data for services | Service pages | SEO gap | Medium |
| No breadcrumb navigation | All pages | UX/SEO gap | Medium |

## Technical Gaps

| Gap | Location | Impact | Effort |
|-----|----------|--------|--------|
| No tests | Whole repo | Risk | High |
| 470KB embedded blog data | blogPosts.ts | Performance | High |
| No error boundary in admin | admin | Risk | Low |
| 3MB MP4 video in public/images | Website assets | Performance | Low |
| No image CDN | Website | Performance | Medium |
| No environment validation | All projects | Dev UX | Low |
| CSV injection protection present | api-server | Good | ✅ |

## Security Gaps

| Gap | Location | Impact | Effort |
|-----|----------|--------|--------|
| CLERK_SECRET_KEY in env output | Runtime | Secret exposure | High |
| No rate limit on admin routes | api-server | Abuse risk | Medium |
| No CSRF protection | api-server | Medium risk | Medium |

## UX Gaps

| Gap | Location | Impact | Effort |
|-----|----------|--------|--------|
| Navigation overload | Header | User confusion | Medium |
| Competing CTAs | Homepage, header | Conversion loss | Medium |
| No skip-to-content | All pages | Accessibility | Low |
| Inconsistent dark/light theme patterns | All pages | Code debt | High |
| No mobile navigation for admin | Admin | UX gap | Low |

## SEO Gaps

| Gap | Location | Impact | Effort |
|-----|----------|--------|--------|
| No hreflang tags | All pages | International SEO | Low |
| Duplicate page titles ("All Automated") | Blog | ✅ Fixed |
| Some thin service pages | Services | Index quality | Medium |
| No blog author schema | Blog posts | Rich snippets | Low |
| Unsupported claims may trigger review | Blog posts | Trust/rank risk | High |

## Notion Gaps

- No Notion API access available in this environment
- Cannot verify business information against source of truth
- All content must be treated as "awaiting Notion reconciliation"
