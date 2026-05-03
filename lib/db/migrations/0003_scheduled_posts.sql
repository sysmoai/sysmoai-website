CREATE TYPE "public"."scheduled_post_funnel" AS ENUM('TOF', 'MOF', 'MOF_BOF', 'BOF');--> statement-breakpoint
CREATE TYPE "public"."scheduled_post_platform" AS ENUM('linkedin', 'x_standalone', 'x_thread', 'instagram_feed', 'instagram_story', 'tiktok_reel', 'newsletter');--> statement-breakpoint
CREATE TYPE "public"."scheduled_post_status" AS ENUM('queued', 'posted', 'skipped', 'failed');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scheduled_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"sequence_no" integer NOT NULL,
	"file_ref" text NOT NULL,
	"platform" "scheduled_post_platform" NOT NULL,
	"pillar" text NOT NULL,
	"hook_pattern" text NOT NULL,
	"funnel" "scheduled_post_funnel" NOT NULL,
	"cta_code" text NOT NULL,
	"title" text NOT NULL,
	"hook_line" text,
	"content" text NOT NULL,
	"asset_url" text,
	"scheduled_for" timestamp with time zone NOT NULL,
	"status" "scheduled_post_status" DEFAULT 'queued' NOT NULL,
	"posted_at" timestamp with time zone,
	"post_url" text,
	"impressions" integer DEFAULT 0 NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"waitlist_signups" integer DEFAULT 0 NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "scheduled_posts_sequence_no_uniq" ON "scheduled_posts" USING btree ("sequence_no");
