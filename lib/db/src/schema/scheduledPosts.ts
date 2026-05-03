import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const scheduledPostPlatformEnum = pgEnum("scheduled_post_platform", [
  "linkedin",
  "x_standalone",
  "x_thread",
  "instagram_feed",
  "instagram_story",
  "tiktok_reel",
  "newsletter",
]);

export const scheduledPostStatusEnum = pgEnum("scheduled_post_status", [
  "queued",
  "posted",
  "skipped",
  "failed",
]);

export const scheduledPostFunnelEnum = pgEnum("scheduled_post_funnel", [
  "TOF",
  "MOF",
  "MOF_BOF",
  "BOF",
]);

/**
 * One row per piece in the 4-week content pack (76 pieces total).
 * Seeded once from the parsed content-pack/calendar.md + platform files,
 * then operated as a publishing queue from the admin dashboard.
 */
export const scheduledPostsTable = pgTable(
  "scheduled_posts",
  {
    id: serial("id").primaryKey(),
    /** Calendar # column — 1..76 */
    sequenceNo: integer("sequence_no").notNull(),
    /** File ref like "L1", "X1", "IF1", "IS1", "TR1", "NL1", "Thread W1" */
    fileRef: text("file_ref").notNull(),
    platform: scheduledPostPlatformEnum("platform").notNull(),
    pillar: text("pillar").notNull(),
    hookPattern: text("hook_pattern").notNull(),
    funnel: scheduledPostFunnelEnum("funnel").notNull(),
    /** "A" = free-ai-audit | "W" = WhatsApp */
    ctaCode: text("cta_code").notNull(),
    /** Display title for queue rows, e.g. "L1 — Specificity Signal" */
    title: text("title").notNull(),
    /** Hook line (first line / opening tweet / on-screen text) */
    hookLine: text("hook_line"),
    /** Full publishable copy (or production brief for visual formats) */
    content: text("content").notNull(),
    /** Optional asset URL — image/video/carousel deck link */
    assetUrl: text("asset_url"),
    /** Computed UTC instant from {date} + platform-specific BDT slot */
    scheduledFor: timestamp("scheduled_for", { withTimezone: true }).notNull(),
    status: scheduledPostStatusEnum("status").notNull().default("queued"),
    postedAt: timestamp("posted_at", { withTimezone: true }),
    /** Permalink to the live post once published */
    postUrl: text("post_url"),
    impressions: integer("impressions").notNull().default(0),
    clicks: integer("clicks").notNull().default(0),
    waitlistSignups: integer("waitlist_signups").notNull().default(0),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    sequenceUnique: uniqueIndex("scheduled_posts_sequence_no_uniq").on(
      t.sequenceNo,
    ),
  }),
);

export type ScheduledPost = typeof scheduledPostsTable.$inferSelect;
export type ScheduledPostPlatform = ScheduledPost["platform"];
export type ScheduledPostStatus = ScheduledPost["status"];
export type ScheduledPostFunnel = ScheduledPost["funnel"];

export const insertScheduledPostSchema = createInsertSchema(
  scheduledPostsTable,
).omit({
  id: true,
  status: true,
  postedAt: true,
  postUrl: true,
  impressions: true,
  clicks: true,
  waitlistSignups: true,
  notes: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertScheduledPost = z.infer<typeof insertScheduledPostSchema>;
