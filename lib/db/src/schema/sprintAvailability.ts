import { pgTable, integer, text, timestamp } from "drizzle-orm/pg-core";

// Singleton row (id = 1) holding the public Sprint slot availability
// shown on the F-Commerce pages. Updated by admins.
export const sprintAvailabilityTable = pgTable("sprint_availability", {
  id: integer("id").primaryKey().notNull(),
  slotsAvailable: integer("slots_available").notNull().default(0),
  monthLabel: text("month_label").notNull().default(""),
  nextStartDate: text("next_start_date"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type SprintAvailability = typeof sprintAvailabilityTable.$inferSelect;
