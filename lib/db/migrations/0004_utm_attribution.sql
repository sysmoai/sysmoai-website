-- Add UTM attribution columns to audit_requests and waitlist_signups so
-- inbound leads can be tied back to the scheduled_posts row that drove them.
-- All columns are nullable so historical rows (and direct visits with no
-- query string) remain valid.

ALTER TABLE "audit_requests"
  ADD COLUMN IF NOT EXISTS "utm_source" text,
  ADD COLUMN IF NOT EXISTS "utm_medium" text,
  ADD COLUMN IF NOT EXISTS "utm_campaign" text,
  ADD COLUMN IF NOT EXISTS "utm_content" text,
  ADD COLUMN IF NOT EXISTS "utm_term" text,
  ADD COLUMN IF NOT EXISTS "referrer" text;

ALTER TABLE "waitlist_signups"
  ADD COLUMN IF NOT EXISTS "utm_source" text,
  ADD COLUMN IF NOT EXISTS "utm_medium" text,
  ADD COLUMN IF NOT EXISTS "utm_campaign" text,
  ADD COLUMN IF NOT EXISTS "utm_content" text,
  ADD COLUMN IF NOT EXISTS "utm_term" text,
  ADD COLUMN IF NOT EXISTS "referrer" text;

-- Indexes to make per-piece attribution rollups cheap.
CREATE INDEX IF NOT EXISTS "audit_requests_utm_campaign_idx"
  ON "audit_requests" ("utm_campaign");
CREATE INDEX IF NOT EXISTS "waitlist_signups_utm_campaign_idx"
  ON "waitlist_signups" ("utm_campaign");
