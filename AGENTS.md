# AGENTS.md — SYSmoAI Website (sysmoai.com)

## Project
- Domain: sysmoai.com
- Repo: github.com/sysmoai/sysmoai-website
- Stack: React+Vite (pnpm workspace monorepo, artifact: artifacts/sysmoai-website)
- Live: Cloudflare Pages via GitHub Actions
- Owner: Emon Hossain <hello@sysmoai.com>

## Truth Rules
- NEVER claim: "500+ projects", "Private Limited", "Credit card via Stripe"
- NEVER claim: "Results Guaranteed" or "guaranteed or rebuilt free"
- Payment phrasing: "Payment details confirmed at proposal stage"
- International: "Global delivery. Payment details confirmed at proposal stage."

## Build
- pnpm install + pnpm build from artifacts/sysmoai-website
- Output: dist/ → CF Pages deploy

## Deploy
- Push to main → GitHub Actions → CF Pages
- CF project: sysmoai-website
- Requires: CF_API_TOKEN + CF_ACCOUNT_ID secrets in GitHub
