# SYSmoAI Website — Route Inventory

## Legend

- **Tier**: Core (primary nav), Service, Audience, Resource, Legal, Utility
- **Quality**: ✅ Good, ⚠️ Needs work, ❌ Broken, 🔴 Redundant
- **Decision**: Keep, Merge, Rewrite, Redirect, Archive

---

## Core Pages

| Route | Title | Tier | Purpose | Quality | Decision | Notes |
|-------|-------|------|---------|---------|----------|-------|
| `/` | Homepage | Core | Primary landing, lead gen | ⚠️ | Rewrite | Overloaded with content, unclear hierarchy |
| `/about` | About SYSmoAI | Core | Company/founder story | ⚠️ | Rewrite | Needs verified founder info only |
| `/contact` | Contact | Core | Lead capture form | ✅ | Keep | Works, uses API |
| `/services` | Services Overview | Core | Service hub | ⚠️ | Rewrite | Needs clearer service grouping |
| `/pricing` | Pricing | Core | Price comparison | ⚠️ | Review | Validated, needs USD/BDT clarity |
| `/blog` | Blog Index | Core | Content hub | ✅ | Keep | 50 articles, filterable |
| `/faq` | FAQ | Core | Common questions | ⚠️ | Rewrite | Needs verified answers |

## Services Pages

| Route | Title | Quality | Decision | Notes |
|-------|-------|---------|----------|-------|
| `/services/ai-quick-win` | AI Quick Win | ⚠️ | Rewrite | Needs verified pricing, clearer offer |
| `/services/ai-sprint` | AI Sprint | ⚠️ | Rewrite | Needs verified deliverables |
| `/services/ai-retainer` | AI Retainer | ⚠️ | Rewrite | Needs verified scope |
| `/services/ai-coaching` | 1:1 AI Coaching | ⚠️ | Rewrite | Needs verified session structure |
| `/services/group-workshop` | Group Workshop | ⚠️ | Rewrite | Needs real client examples |
| `/services/notion-os` | Notion OS Build | ⚠️ | Rewrite | USD/BDT pricing inconsistency |
| `/services/ai-agent-dev` | AI Agent Dev | ⚠️ | Rewrite | Needs verified capabilities |
| `/services/n8n-automation` | n8n Automation | ⚠️ | Rewrite | USD/BDT pricing inconsistency |
| `/services/corporate-training` | Corporate Training | ⚠️ | Rewrite | Needs real client evidence |
| `/services/international` | International | ⚠️ | Rewrite | Thin page, needs more substance |

All service pages use `ServicePageTemplate` with hardcoded data. They'd benefit from a shared data source.

## Audience Pages

| Route | Title | Quality | Decision | Notes |
|-------|-------|---------|----------|-------|
| `/for/students` | For Students | ⚠️ | Rewrite | Duplicate framing with other audience pages |
| `/for/job-seekers` | For Job Seekers | ⚠️ | Rewrite | Overlapping with students |
| `/for/freelancers` | For Freelancers | ⚠️ | Rewrite | Most promising audience |
| `/for/researchers` | For Researchers | ⚠️ | Rewrite | Niche, could consolidate |
| `/for/agencies` | For Agencies | ⚠️ | Rewrite | Key audience, needs better positioning |
| `/for/sme-founders` | For SME Founders | ⚠️ | Rewrite | Core audience |
| `/for/f-commerce` | For F-Commerce | ⚠️ | Rewrite | Bangladesh specific, keep |
| `/for/consultants` | For Consultants | ⚠️ | Rewrite | Overlapping with freelancers |
| `/for/creators` | For Creators | ⚠️ | Rewrite | Niche, could consolidate |
| `/for/corporates` | For Corporates | ⚠️ | Rewrite | Overlapping with corporate training |

All audience pages use `AudiencePageTemplate`. Many overlap significantly. Consider consolidating.

## Lead Capture Pages

| Route | Title | Quality | Decision | Notes |
|-------|-------|---------|----------|-------|
| `/lead-rescue` | Lead Rescue System | ⚠️ | Rewrite | Full Bangla, unique pilot offer |
| `/fit-check` | Fit Check | ✅ | Keep | Bangla form, works with API |
| `/free-ai-audit` | Free AI Audit | ⚠️ | Rewrite | Canonical points to /fit-check |

## Legal Pages

| Route | Title | Quality | Decision | Notes |
|-------|-------|---------|----------|-------|
| `/privacy-policy` | Privacy Policy | ✅ | Keep | Standard |
| `/terms-of-service` | Terms of Service | ✅ | Keep | Standard |
| `/refund-policy` | Refund Policy | ⚠️ | Review | Needs verified refund terms |

## Other Pages

| Route | Title | Quality | Decision | Notes |
|-------|-------|---------|----------|-------|
| `/how-we-work` | How We Work | 🔴 | Redirect | Duplicates /proof |
| `/proof` | Case Studies | ⚠️ | Rewrite | No verified case studies |
| `/results` | Results | 🔴 | Redirect | Canonical to /proof, redundant |
| `*` | 404 Not Found | ✅ | Keep | Standard error page |

## Blog Post Pages (50 total)

All at `/blog/:slug`. Generated from `blogPosts.ts` data. All ✅ for function, ⚠️ for content quality (see CLAIM-REGISTER).

## Routes Not Yet Created

- `/bn/` — Bangla language hub (planned)
- `/resources/` — Resource library (guides, templates)
- `/services/ai-strategy/` — AI Strategy Consulting (if added)
- `/careers/` — Only if real positions exist

## Navigation Analysis

### Current Header Links (Too Many)

The header currently has: Services (10 links), Who We Help (10 links), Blog (by audience + type), along with Fit Check, Free AI Audit, and theme toggle. The dropdown mega-menus are comprehensive but overwhelming.

### Current Footer Links (30+ links)

Services (9), Who We Help (9), Resources (7), Contact info. Plus brand column and legal links. Reasonable for footer.

### Issues

- Header navigation overloaded — 3 mega-menus with 30+ links
- `/how-we-work`, `/results`, `/free-ai-audit` duplicate or compete with other pages
- Primary CTA is unclear: "Fit Check", "WhatsApp", "Free AI Audit" all compete
- Audience pages are not discoverable from main nav dropdown
- 10 audience pages is too many for the current traffic

## Recommended Navigation Structure

**Primary**: Home | Solutions | Who We Help | Insights | Company | Pricing | [Book a Fit Check →]

**Solutions dropdown**: AI Quick Win, AI Sprint, AI Retainer, Notion OS, AI Agent Dev, Automation (n8n), Corporate Training

**Who We Help dropdown**: Agencies & F-Commerce, SMEs & Founders, Freelancers & Consultants, Corporates & NGOs

**Insights**: Blog

**Company**: About SYSmoAI, How We Work, Contact
