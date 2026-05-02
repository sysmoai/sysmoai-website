# Threat Model

## Project Overview

SYSmoAI is a pnpm monorepo that primarily ships a public marketing website (`artifacts/sysmoai-website`) for an AI consultancy and a minimal Express API server (`artifacts/api-server`). The website is a React + Vite single-page application with static service pages, static blog content embedded in source, WhatsApp/email outbound links, and client-only forms. The backend currently exposes only a health endpoint and shared logging middleware. The mockup sandbox (`artifacts/mockup-sandbox`) is a development/experimental artifact and is not considered production-reachable unless future scans show otherwise.

Assumptions propagated from the scan policy: production runs with `NODE_ENV=production`; TLS is platform-managed; the mockup sandbox is never deployed to production.

## Assets

- **Brand and content integrity** — service descriptions, blog content, legal pages, and outbound CTA links. Compromise would let an attacker deface the business site or misdirect leads.
- **Lead/contact information** — names, contact details, and inquiry text entered into the public contact form. Even though the current implementation is client-only, any future server-side handling would make this data sensitive.
- **Application availability** — the public website and health endpoint must remain available because the site is primarily a lead-generation surface.
- **Operational secrets** — environment variables such as `DATABASE_URL` and any future API keys or service credentials used by the API server or build pipeline.
- **Outbound trust relationships** — links to WhatsApp, email, and public social profiles. If these are tampered with, users can be redirected to attacker-controlled destinations.

## Trust Boundaries

- **Browser → Website runtime** — all route params, query params, and form inputs come from an untrusted browser context.
- **Browser → API server** — requests crossing into `artifacts/api-server` must be treated as untrusted even if the current server surface is minimal.
- **Application → Third-party destinations** — outbound links to `wa.me`, `mailto:`, and public social sites cross into external systems outside the app's control.
- **Application → Database** — shared DB code exists in `lib/db`, but no current production route appears to use it. Future production reachability would make this a high-priority trust boundary.
- **Production → Dev-only artifacts** — `artifacts/mockup-sandbox`, `attached_assets`, generated build outputs, and prompt archives are out of scope for production security findings unless concrete production reachability is demonstrated.

## Scan Anchors

- **Production entry points:** `artifacts/sysmoai-website/src/main.tsx`, `artifacts/sysmoai-website/src/App.tsx`, `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`
- **Highest-risk code areas:** `artifacts/sysmoai-website/src/pages/BlogPost.tsx` (HTML rendering), `artifacts/sysmoai-website/src/data/blogPosts.ts` (embedded HTML content), `artifacts/sysmoai-website/src/pages/Contact.tsx` (public form), `artifacts/api-server/src/app.ts` (request handling / CORS), `artifacts/api-server/src/lib/logger.ts` (log redaction)
- **Public surface:** all website routes and `/api/healthz`
- **Authenticated/admin surface:** none currently implemented
- **Usually dev-only / ignore unless proven reachable:** `artifacts/mockup-sandbox/**`, `attached_assets/**`, `**/dist/**`, local scripts and prompt artifacts

## Threat Categories

### Spoofing

There is no authentication surface in the current production code, so classic account spoofing is not presently applicable. The relevant guarantee is narrower: any future protected API or admin surface must require server-side authentication and must not rely on client-side routing or hidden UI states as a security boundary.

### Tampering

The main tampering risk is modification of site content, CTA destinations, or any future form-processing path. User-controlled route parameters, query parameters, and future form submissions must never influence security-sensitive behavior without validation. Outbound contact destinations and structured-data injections should remain hardcoded or derived from trusted source data.

### Information Disclosure

The public site should not expose secrets, internal error details, or sensitive lead data. Any future server-side processing for contact or newsletter flows must avoid logging personal data unnecessarily, and API responses must not disclose stack traces or environment-derived secrets. Shared logging code must continue redacting credential-bearing headers.

### Denial of Service

The current backend is small, but public routes and any future form or API endpoints could be abused for high-volume traffic. If the API surface expands beyond health checks, endpoints handling user input should enforce reasonable body size limits, timeouts, and rate limiting where abuse would materially affect availability or cost.

### Elevation of Privilege

There is no current role or authorization model, so privilege escalation is only relevant as a future-facing guarantee: new server routes, database access paths, webhook handlers, or admin tools must enforce authorization server-side. Any future database queries must use parameterized ORM/query-builder paths only, and any future dynamic HTML or file handling must preserve strict trust boundaries.
