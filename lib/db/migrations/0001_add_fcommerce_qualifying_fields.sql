-- Additive migration: add F-Commerce qualifying columns to audit_requests
-- Safe to run on existing databases (IF NOT EXISTS guards)
ALTER TABLE "audit_requests"
  ADD COLUMN IF NOT EXISTS "business_type" text,
  ADD COLUMN IF NOT EXISTS "monthly_orders" text,
  ADD COLUMN IF NOT EXISTS "daily_dm_volume" text,
  ADD COLUMN IF NOT EXISTS "current_tools" text,
  ADD COLUMN IF NOT EXISTS "uses_bkash_nagad" text,
  ADD COLUMN IF NOT EXISTS "preferred_currency" text;
