#!/bin/bash
set -e
pnpm install --frozen-lockfile
# Apply additive migration for existing databases, then sync full schema
psql "$DATABASE_URL" -f lib/db/migrations/0001_add_fcommerce_qualifying_fields.sql 2>/dev/null || true
pnpm --filter @workspace/db run push-force
