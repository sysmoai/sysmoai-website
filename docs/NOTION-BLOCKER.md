# SYSmoAI — Notion Connection Blocker

**Status:** ❌ Not available

## Missing Integration

No Notion API, MCP, CLI, or environment variables are available in the current environment.

## Minimum Setup Required

1. Create a Notion integration at https://www.notion.so/my-integrations
2. Store the integration token in a Replit Secret named `NOTION_TOKEN`
3. Share the SYSmoAI parent workspace page with the integration
4. Provide at minimum **read permission** on:
   - SYSmoAI Headquarters (parent page)
   - Campaign 01 database
   - Website Planning database
   - Brand System database
   - Services and Pricing database

## Recommended Architecture

- Server-side Notion SDK (`@notionhq/client`) in the API server
- Cached sync at build time or on a schedule
- Never expose the Notion token to browser code
- Use strict validation before publishing any Notion-sourced content to production

## Current Content Status

All website content in this session is derived from repository files only and marked as "awaiting Notion reconciliation."
