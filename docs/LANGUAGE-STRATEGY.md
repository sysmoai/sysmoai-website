# SYSmoAI — Language Strategy

## English Canonical Policy

- English is the primary, canonical, and default language for all global public-facing content
- All routes default to English
- English content is the source of truth for SEO metadata, structured data, and social previews
- No automatic or machine translation of English pages

## Bangla Content Strategy

### Rationale

Bangla content exists to serve Bangladesh-focused visitors who prefer reading in Bangla or for whom certain concepts are clearer in Bangla. It does not exist to mirror the full English site.

### Bangla Page Selection

| Page | Route | Priority | Status |
|------|-------|----------|--------|
| SYSmoAI পরিচিতি | /bn | High | ✅ Created |
| SME ও F-Commerce AI সমাধান | /bn (section) | Medium | ✅ Embedded |
| কর্পোরেট AI ট্রেনিং | /bn (section) | Medium | ✅ Embedded |
| Lead Rescue System — Agency Edition | /lead-rescue | High | ✅ Bangla-heavy |
| Fit Check | /fit-check | High | ✅ Bangla form |
| যোগাযোগ | /contact | Medium | ✅ Bangla CTA present |
| মূল্য ও পেমেন্ট FAQ | TBD | Medium | ⏳ Future |
| Bangla educational guides | TBD | Low | ⏳ Future |

### Route Structure

- `/bn` — Bangla hub page (created)
- `/bn/services/*` — Future service-specific pages (if justified by traffic)
- `/bn/guides/*` — Future educational guides

### Translation Ownership

- Content must be written by a native Bangla speaker, not machine-translated
- Technical terms remain in English where Bangla translation would reduce clarity
- No incomplete pages published

### Terminology Glossary

| English | Bangla |
|---------|--------|
| AI | AI (এআই) |
| Automation | অটোমেশন |
| Workflow | ওয়ার্কফ্লো |
| Operating System | অপারেটিং সিস্টেম |
| Dashboard | ড্যাশবোর্ড |
| Agent | এজেন্ট |
| Training | ট্রেনিং |
| System | সিস্টেম |
| Lead | লিড |
| Delivery | ডেলিভারি |

### SEO Handling

- Bangla pages get distinct URLs under `/bn/`
- Correct `lang="bn"` attribute on all Bangla content
- Self-referencing canonical URLs
- No `hreflang` yet — only add when true equivalency exists between English and Bangla pages
- Bangla pages included in sitemap
- Bangla metadata written naturally, not machine-translated

### Content Approval

- All Bangla content must be reviewed by a native speaker before publication
- No incomplete or placeholder Bangla pages deployed
