CREATE TYPE "public"."submission_status" AS ENUM('new', 'contacted', 'archived');--> statement-breakpoint
CREATE TABLE "audit_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"whatsapp" text,
	"company" text,
	"biggest_challenge" text NOT NULL,
	"business_type" text,
	"monthly_orders" text,
	"daily_dm_volume" text,
	"current_tools" text,
	"uses_bkash_nagad" text,
	"preferred_currency" text,
	"status" "submission_status" DEFAULT 'new' NOT NULL,
	"internal_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"contact" text NOT NULL,
	"message" text NOT NULL,
	"service" text,
	"status" "submission_status" DEFAULT 'new' NOT NULL,
	"internal_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "waitlist_signups" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"source" text,
	"status" "submission_status" DEFAULT 'new' NOT NULL,
	"internal_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
