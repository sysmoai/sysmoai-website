#!/bin/bash
set -e
pnpm install --frozen-lockfile 2>/dev/null || pnpm install --no-frozen-lockfile
# Apply additive migration for existing databases, then sync full schema
# Only run if DATABASE_URL is set and psql is available
if [ -n "$DATABASE_URL" ] && command -v psql &>/dev/null; then
  psql "$DATABASE_URL" -f lib/db/migrations/0001_add_fcommerce_qualifying_fields.sql 2>/dev/null || true
  pnpm --filter @workspace/db run push-force 2>/dev/null || true
else
  echo "No database configured — skipping migration (safe for dev/preview)"
fi