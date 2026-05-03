import { Router, type IRouter, type Request, type Response } from "express";
import { sql, desc, asc, eq, and, gte, lte, type SQL } from "drizzle-orm";
// Static JSON import — esbuild inlines this into dist/index.mjs so the seed
// works in production (no relative-path readFileSync against the source tree).
import scheduleSeed from "../data/contentSchedule.json" with { type: "json" };
import {
  db,
  scheduledPostsTable,
  type ScheduledPost,
} from "@workspace/db";
import {
  GetScheduledPostResponse,
  ListScheduledPostsQueryParams,
  ListScheduledPostsResponse,
  UpdateScheduledPostBody,
  UpdateScheduledPostResponse,
  GetScheduledPostsSummaryResponse,
  SeedScheduledPostsResponse,
} from "@workspace/api-zod";
import { requireAdminOrAutomation } from "../middlewares/requireAdminOrAutomation";
import { validateBody, validateListQuery } from "../lib/validation";
import { rowsToCsv } from "../lib/csv";

interface SeedRow {
  sequenceNo: number;
  fileRef: string;
  platform: ScheduledPost["platform"];
  pillar: string;
  hookPattern: string;
  funnel: ScheduledPost["funnel"];
  ctaCode: string;
  title: string;
  hookLine: string | null;
  content: string;
  scheduledFor: string;
  assetUrl?: string | null;
}

function loadSchedule(): SeedRow[] {
  return scheduleSeed as SeedRow[];
}

function serialize(row: ScheduledPost) {
  return {
    id: row.id,
    sequenceNo: row.sequenceNo,
    fileRef: row.fileRef,
    platform: row.platform,
    pillar: row.pillar,
    hookPattern: row.hookPattern,
    funnel: row.funnel,
    ctaCode: row.ctaCode,
    title: row.title,
    hookLine: row.hookLine ?? null,
    content: row.content,
    assetUrl: row.assetUrl ?? null,
    scheduledFor: row.scheduledFor.toISOString(),
    status: row.status,
    postedAt: row.postedAt ? row.postedAt.toISOString() : null,
    postUrl: row.postUrl ?? null,
    impressions: row.impressions,
    clicks: row.clicks,
    waitlistSignups: row.waitlistSignups,
    notes: row.notes ?? null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

const router: IRouter = Router();

router.use(requireAdminOrAutomation);

// ─── Summary ────────────────────────────────────────────────────────────

router.get("/scheduled-posts/summary", async (_req, res) => {
  const all = await db.select().from(scheduledPostsTable);
  const totals = { total: all.length, queued: 0, posted: 0, skipped: 0, failed: 0 };
  type PCounts = { queued: number; posted: number; skipped: number; failed: number; total: number };
  const byPlatformMap = new Map<string, PCounts>();
  const byWeekMap = new Map<string, { queued: number; posted: number; total: number }>();
  let impressions = 0;
  let clicks = 0;
  let waitlistSignups = 0;

  // Robust BDT (Asia/Dhaka) date extractor — avoids manual offset math
  // breaking around month/year boundaries.
  const bdtDateFmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  for (const r of all) {
    totals[r.status] += 1;
    impressions += r.impressions;
    clicks += r.clicks;
    waitlistSignups += r.waitlistSignups;

    const pc = byPlatformMap.get(r.platform) ?? {
      queued: 0,
      posted: 0,
      skipped: 0,
      failed: 0,
      total: 0,
    };
    pc[r.status] += 1;
    pc.total += 1;
    byPlatformMap.set(r.platform, pc);

    // BDT-local Monday-week-start: read year/month/day/weekday in Asia/Dhaka,
    // then subtract days-since-Monday using a UTC-anchored helper Date.
    const parts = bdtDateFmt.formatToParts(r.scheduledFor);
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
    const y = Number(get("year"));
    const m = Number(get("month"));
    const d = Number(get("day"));
    const wkdayShort = get("weekday"); // "Mon", "Tue", ...
    const wkdayIdx: Record<string, number> = {
      Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6,
    };
    const daysSinceMon = wkdayIdx[wkdayShort] ?? 0;
    const monUtc = new Date(Date.UTC(y, m - 1, d) - daysSinceMon * 86_400_000);
    const wkKey = `${monUtc.getUTCFullYear()}-${String(monUtc.getUTCMonth() + 1).padStart(2, "0")}-${String(monUtc.getUTCDate()).padStart(2, "0")}`;
    const wk = byWeekMap.get(wkKey) ?? { queued: 0, posted: 0, total: 0 };
    if (r.status === "queued") wk.queued += 1;
    if (r.status === "posted") wk.posted += 1;
    wk.total += 1;
    byWeekMap.set(wkKey, wk);
  }

  const upcoming = await db
    .select()
    .from(scheduledPostsTable)
    .where(eq(scheduledPostsTable.status, "queued"))
    .orderBy(asc(scheduledPostsTable.scheduledFor))
    .limit(5);

  const byPlatform = Array.from(byPlatformMap.entries())
    .map(([platform, c]) => ({ platform: platform as SeedRow["platform"], ...c }))
    .sort((a, b) => b.total - a.total);
  const byWeek = Array.from(byWeekMap.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([weekStart, c]) => ({ weekStart, ...c }));

  res.json(
    GetScheduledPostsSummaryResponse.parse({
      totals,
      byPlatform,
      byWeek,
      upcoming: upcoming.map(serialize),
      performance: { impressions, clicks, waitlistSignups },
    }),
  );
});

// ─── Seed ───────────────────────────────────────────────────────────────

router.post("/scheduled-posts/seed", async (req, res) => {
  const seed = loadSchedule();
  const existing = await db.select().from(scheduledPostsTable);
  const bySeq = new Map(existing.map((r) => [r.sequenceNo, r]));
  let imported = 0;
  let updated = 0;
  for (const row of seed) {
    const prev = bySeq.get(row.sequenceNo);
    const canonical = {
      sequenceNo: row.sequenceNo,
      fileRef: row.fileRef,
      platform: row.platform,
      pillar: row.pillar,
      hookPattern: row.hookPattern,
      funnel: row.funnel,
      ctaCode: row.ctaCode,
      title: row.title,
      hookLine: row.hookLine,
      content: row.content,
      scheduledFor: new Date(row.scheduledFor),
      updatedAt: new Date(),
    };
    if (!prev) {
      // Honor the seed's assetUrl on first insert (null by default — the
      // operator sets it later from the admin UI for IG / TikTok rows).
      await db.insert(scheduledPostsTable).values({
        ...canonical,
        assetUrl: row.assetUrl ?? null,
      });
      imported += 1;
    } else {
      // Refresh canonical fields, leave operational fields intact (including
      // any assetUrl the operator has already attached).
      await db
        .update(scheduledPostsTable)
        .set(canonical)
        .where(eq(scheduledPostsTable.id, prev.id));
      updated += 1;
    }
  }
  req.log?.info({ imported, updated }, "scheduled-posts.seed.done");
  res.json(
    SeedScheduledPostsResponse.parse({
      imported,
      updated,
      total: seed.length,
    }),
  );
});

// ─── CSV export ─────────────────────────────────────────────────────────

router.get("/scheduled-posts/export.csv", async (_req, res) => {
  const rows = await db
    .select()
    .from(scheduledPostsTable)
    .orderBy(asc(scheduledPostsTable.scheduledFor));
  const csv = rowsToCsv(
    [
      "sequenceNo",
      "fileRef",
      "platform",
      "scheduledFor",
      "pillar",
      "hookPattern",
      "funnel",
      "ctaCode",
      "title",
      "hookLine",
      "content",
      "status",
      "postedAt",
      "postUrl",
      "impressions",
      "clicks",
      "waitlistSignups",
    ],
    rows.map((r) => ({
      sequenceNo: r.sequenceNo,
      fileRef: r.fileRef,
      platform: r.platform,
      scheduledFor: r.scheduledFor,
      pillar: r.pillar,
      hookPattern: r.hookPattern,
      funnel: r.funnel,
      ctaCode: r.ctaCode,
      title: r.title,
      hookLine: r.hookLine,
      content: r.content,
      status: r.status,
      postedAt: r.postedAt,
      postUrl: r.postUrl,
      impressions: r.impressions,
      clicks: r.clicks,
      waitlistSignups: r.waitlistSignups,
    })),
  );
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="scheduled-posts-${new Date()
      .toISOString()
      .slice(0, 10)}.csv"`,
  );
  res.send(csv);
});

// ─── List ───────────────────────────────────────────────────────────────

router.get("/scheduled-posts", async (req: Request, res: Response) => {
  const q = validateListQuery(ListScheduledPostsQueryParams, req, res);
  if (!q) return;
  const { page, pageSize, status, platform, funnel, from, to, dueBefore } = q;
  const filters: SQL[] = [];
  if (status) filters.push(eq(scheduledPostsTable.status, status));
  if (platform) filters.push(eq(scheduledPostsTable.platform, platform));
  if (funnel) filters.push(eq(scheduledPostsTable.funnel, funnel));
  if (from) filters.push(gte(scheduledPostsTable.scheduledFor, new Date(from)));
  if (to) filters.push(lte(scheduledPostsTable.scheduledFor, new Date(to)));
  if (dueBefore) {
    filters.push(eq(scheduledPostsTable.status, "queued"));
    filters.push(lte(scheduledPostsTable.scheduledFor, new Date(dueBefore)));
  }
  const where = filters.length ? and(...filters) : undefined;

  // Drizzle query builders are immutable — `.where(...)` returns a new builder.
  const countBase = db
    .select({ count: sql<number>`count(*)::int` })
    .from(scheduledPostsTable);
  const [{ count }] = await (where ? countBase.where(where) : countBase);

  const itemsBase = db.select().from(scheduledPostsTable);
  const filtered = where ? itemsBase.where(where) : itemsBase;
  const items = await filtered
    .orderBy(asc(scheduledPostsTable.scheduledFor), asc(scheduledPostsTable.sequenceNo))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  res.json(
    ListScheduledPostsResponse.parse({
      items: items.map(serialize),
      pagination: {
        page,
        pageSize,
        total: count,
        totalPages: Math.max(1, Math.ceil(count / pageSize)),
      },
    }),
  );
});

// ─── Detail ─────────────────────────────────────────────────────────────

router.get("/scheduled-posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "Invalid id." });
    return;
  }
  const [row] = await db
    .select()
    .from(scheduledPostsTable)
    .where(eq(scheduledPostsTable.id, id))
    .limit(1);
  if (!row) {
    res.status(404).json({ error: "Not found." });
    return;
  }
  res.json(GetScheduledPostResponse.parse(serialize(row)));
});

router.patch(
  "/scheduled-posts/:id",
  validateBody(UpdateScheduledPostBody),
  async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ error: "Invalid id." });
      return;
    }
    const data = req.body as ReturnType<typeof UpdateScheduledPostBody.parse>;
    const update: Record<string, unknown> = { updatedAt: new Date() };
    if (data.status !== undefined) {
      update.status = data.status;
      // Auto-stamp postedAt the first time a row flips to "posted"
      if (data.status === "posted" && data.postedAt === undefined) {
        update.postedAt = new Date();
      }
    }
    if (data.scheduledFor !== undefined)
      update.scheduledFor = new Date(data.scheduledFor);
    if (data.postedAt !== undefined)
      update.postedAt = data.postedAt === null ? null : new Date(data.postedAt);
    if (data.postUrl !== undefined) update.postUrl = data.postUrl;
    if (data.assetUrl !== undefined) update.assetUrl = data.assetUrl;
    if (data.impressions !== undefined) update.impressions = data.impressions;
    if (data.clicks !== undefined) update.clicks = data.clicks;
    if (data.waitlistSignups !== undefined)
      update.waitlistSignups = data.waitlistSignups;
    if (data.notes !== undefined) update.notes = data.notes;

    const [row] = await db
      .update(scheduledPostsTable)
      .set(update)
      .where(eq(scheduledPostsTable.id, id))
      .returning();
    if (!row) {
      res.status(404).json({ error: "Not found." });
      return;
    }
    res.json(UpdateScheduledPostResponse.parse(serialize(row)));
  },
);

// keep imports referenced by linter
void desc;

export default router;
