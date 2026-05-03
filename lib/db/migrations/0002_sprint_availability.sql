-- Singleton sprint availability row used by F-Commerce pages.
CREATE TABLE IF NOT EXISTS "sprint_availability" (
  "id" integer PRIMARY KEY NOT NULL,
  "slots_available" integer DEFAULT 0 NOT NULL,
  "month_label" text DEFAULT '' NOT NULL,
  "next_start_date" text,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
INSERT INTO "sprint_availability" ("id", "slots_available", "month_label", "next_start_date")
VALUES (1, 2, 'May 2026', 'May 19')
ON CONFLICT ("id") DO NOTHING;
