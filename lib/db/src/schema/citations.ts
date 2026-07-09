import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  date,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const citationEngineEnum = pgEnum("citation_engine", [
  "chatgpt",
  "perplexity",
  "google_ai_overviews",
  "bing_copilot",
  "other",
]);

export const citationPriorityEnum = pgEnum("citation_priority", [
  "critical",
  "high",
  "medium",
]);

export const citationQueriesTable = pgTable("citation_queries", {
  id: serial("id").primaryKey(),
  query: text("query").notNull().unique(),
  engines: text("engines").notNull(),
  priority: citationPriorityEnum("priority").notNull(),
  sortOrder: integer("sort_order").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const citationChecksTable = pgTable("citation_checks", {
  id: serial("id").primaryKey(),
  checkedOn: date("checked_on").notNull(),
  engine: citationEngineEnum("engine").notNull(),
  query: text("query").notNull(),
  queryId: integer("query_id"),
  cited: boolean("cited").notNull(),
  urlCited: text("url_cited"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type CitationQuery = typeof citationQueriesTable.$inferSelect;
export type CitationCheck = typeof citationChecksTable.$inferSelect;
