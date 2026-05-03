-- Hardening pass:
--   1. Prevent infinite duplicate waitlist signups for the same email
--      (case-insensitive). Audit requests intentionally allow repeats so a
--      lead can resubmit with new context.
--   2. Add supporting indexes on UTM source/medium and created_at for the
--      campaign rollups in the admin dashboard. utm_campaign was already
--      indexed in migration 0004.

CREATE UNIQUE INDEX IF NOT EXISTS "waitlist_signups_email_lower_uniq"
  ON "waitlist_signups" (LOWER("email"));

CREATE INDEX IF NOT EXISTS "audit_requests_utm_source_idx"
  ON "audit_requests" ("utm_source");
CREATE INDEX IF NOT EXISTS "audit_requests_created_at_idx"
  ON "audit_requests" ("created_at");

CREATE INDEX IF NOT EXISTS "waitlist_signups_utm_source_idx"
  ON "waitlist_signups" ("utm_source");
CREATE INDEX IF NOT EXISTS "waitlist_signups_created_at_idx"
  ON "waitlist_signups" ("created_at");

CREATE INDEX IF NOT EXISTS "contact_submissions_created_at_idx"
  ON "contact_submissions" ("created_at");
