# SYSmoAI Website

**Corporate website and marketing hub for SYSmoAI — AI automation and no-code systems for Bangladesh.**

High-performance marketing website showcasing SYSmoAI services, case studies, blog, and team information.

**Live:** https://sysmoai.com

## Overview

The SYSmoAI website features:
- Marketing homepage
- Services showcase
- Case studies and client results
- Blog and thought leadership
- Team and company info
- Contact forms and CTAs
- Multi-language support (EN/BN)
- SEO optimization

## Tech Stack

- **Framework:** Next.js 14+ / React 18+
- **Styling:** Tailwind CSS
- **CMS:** Markdown / Contentful (optional)
- **Deployment:** Vercel
- **Analytics:** Google Analytics
- **Forms:** Formspree or custom backend

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── pages/       # Page routes
│   ├── components/  # React components
│   └── layout.tsx   # Shared layouts
├── content/         # Markdown content
├── styles/          # Global styles
├── utils/           # Helper functions
├── lib/             # Libraries
└── config.ts        # Configuration

public/
├── images/          # Static images
├── icons/           # Favicons
└── docs/            # PDFs and documents
```

## Pages

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/` | Main landing page |
| Services | `/services` | Service offerings |
| Cases | `/cases` | Client case studies |
| Blog | `/blog` | Articles and insights |
| About | `/about` | Company information |
| Team | `/team` | Team members |
| Contact | `/contact` | Contact form |
| Privacy | `/privacy` | Privacy policy |
| Terms | `/terms` | Terms of service |

## Features

### Responsive Design
- Mobile-first approach
- Desktop and tablet optimized
- Dark mode support
- Accessibility (WCAG 2.1)

### SEO
- Meta tags on all pages
- Structured data (Schema.org)
- XML sitemap
- Robots.txt
- Dynamic OG images

### Performance
- Image optimization
- Code splitting
- Lazy loading
- CSS minification
- Build optimization

### Content Management
- Markdown-based blog
- Easy content updates
- Image galleries
- Video embeds

### Analytics
- Google Analytics integration
- Conversion tracking
- User behavior tracking
- Performance monitoring

## Development

### Prerequisites
- Node.js 18+
- npm or pnpm

### Install

```bash
npm install
# or
pnpm install
```

### Start Dev Server

```bash
npm run dev
```

Server runs on `http://localhost:3000`

### Build

```bash
npm run build
npm start
```

### Environment Setup

```bash
cp .env.example .env.local
# Configure with your keys:
# - GOOGLE_ANALYTICS_ID
# - API_BASE_URL
# - CONTACT_EMAIL
# etc.
```

## Content Management

### Adding Blog Posts

1. Create markdown file in `src/content/blog/`
2. Add frontmatter:
```markdown
---
title: "Article Title"
date: "2026-07-26"
author: "Author Name"
excerpt: "Short description"
---

Your content here...
```

3. Post automatically appears on `/blog`

### Adding Case Studies

1. Create markdown in `src/content/cases/`
2. Include company info, challenge, solution, results
3. Automatically listed on `/cases`

## Deployment

### To Vercel (Recommended)

```bash
# Connected to GitHub, auto-deploys on push
# Or use Vercel CLI:
vercel --prod
```

### Environment Variables

Deploy-time variables in Vercel:
- `GOOGLE_ANALYTICS_ID`
- `SENDGRID_API_KEY` (for forms)
- `DATABASE_URL` (if backend)
- `API_BASE_URL`

## Forms

Contact forms use Formspree by default. To customize:
1. Update `components/ContactForm.tsx`
2. Configure endpoint in environment
3. Test locally

## API Routes

Optional API routes in `src/app/api/`:
- `POST /api/contact` - Handle form submissions
- `GET /api/blog` - Get blog posts
- `GET /api/cases` - Get case studies
- `POST /api/subscribe` - Newsletter signup

## Configuration

Key files:
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS
- `src/config.ts` - App configuration

## Styling

- Tailwind CSS for utility classes
- CSS Modules for component styles
- Global styles in `src/styles/`
- Dark mode with `next-themes`

## Testing

```bash
npm run test              # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

## Performance

- Lighthouse score: 90+
- Core Web Vitals: All green
- Image optimization active
- CSS minified in production
- JavaScript code-split

## Monitoring

- Vercel Analytics
- Google Analytics
- Error tracking (optional)
- Performance monitoring

## Contributing

See `CONTRIBUTING.md` for guidelines.

## Support

- **Email:** support@sysmoai.com
- **Website:** https://sysmoai.com
- **Team:** Slack channel

## License

Private - SYSmoAI. All rights reserved.

---

Built in Dhaka, Bangladesh 🇧🇩  
Helping businesses automate with AI and no-code systems
