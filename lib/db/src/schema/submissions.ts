import { pgTable, text, serial, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const submissionStatusEnum = pgEnum("submission_status", [
  "new",
  "contacted",
  "archived",
]);

export const contactSubmissionsTable = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  contact: text("contact").notNull(),
  message: text("message").notNull(),
  service: text("service"),
  status: submissionStatusEnum("status").notNull().default("new"),
  internalNote: text("internal_note"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(
  contactSubmissionsTable,
).omit({ id: true, status: true, internalNote: true, createdAt: true });
export type InsertContactSubmission = z.infer<
  typeof insertContactSubmissionSchema
>;
export type ContactSubmission = typeof contactSubmissionsTable.$inferSelect;

export const auditRequestsTable = pgTable("audit_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  whatsapp: text("whatsapp"),
  company: text("company"),
  biggestChallenge: text("biggest_challenge").notNull(),
  businessType: text("business_type"),
  monthlyOrders: text("monthly_orders"),
  dailyDmVolume: text("daily_dm_volume"),
  currentTools: text("current_tools"),
  usesBkashNagad: text("uses_bkash_nagad"),
  preferredCurrency: text("preferred_currency"),
  // UTM attribution — captured from URL query params on the FreeAudit page
  // and stored alongside the lead so we can roll up which scheduled_posts
  // row drove which signup. utm_campaign matches scheduled_posts.fileRef
  // slug (e.g. "w1-l1", "w2-thread2", "w3-if7").
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmContent: text("utm_content"),
  utmTerm: text("utm_term"),
  referrer: text("referrer"),
  status: submissionStatusEnum("status").notNull().default("new"),
  internalNote: text("internal_note"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertAuditRequestSchema = createInsertSchema(
  auditRequestsTable,
).omit({ id: true, status: true, internalNote: true, createdAt: true });
export type InsertAuditRequest = z.infer<typeof insertAuditRequestSchema>;
export type AuditRequest = typeof auditRequestsTable.$inferSelect;

export const waitlistSignupsTable = pgTable("waitlist_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  source: text("source"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmContent: text("utm_content"),
  utmTerm: text("utm_term"),
  referrer: text("referrer"),
  status: submissionStatusEnum("status").notNull().default("new"),
  internalNote: text("internal_note"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertWaitlistSignupSchema = createInsertSchema(
  waitlistSignupsTable,
).omit({ id: true, status: true, internalNote: true, createdAt: true });
export type InsertWaitlistSignup = z.infer<typeof insertWaitlistSignupSchema>;
export type WaitlistSignup = typeof waitlistSignupsTable.$inferSelect;
