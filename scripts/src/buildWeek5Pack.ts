// Week 5+ pack planner.
//
// Reads the production scheduled_posts table, ranks pieces by attributed
// waitlist signups (rolled up from utm_campaign), and overwrites the
// "Generated outline" section of `content-pack/week5-plus-template.md` with
// (a) a 76-slot concrete Week 5–8 plan whose pillar/hook/platform mix is
// chosen from the actual Week 1–4 winners, plus (b) the underlying
// recommendation tables.
//
// Each generated slot is concrete enough to write copy against: date,
// BDT slot time, platform, file ref (W5L1…), pillar, hook pattern,
// funnel, CTA code, and the *planned* utm_campaign slug. The actual copy
// is still written by hand using `voice-guide.md` and verified proof
// points from `proof-points.md` — auto-generated copy is banned per the
// content-pack rules.
//
// Usage:
//   pnpm --filter @workspace/scripts run build-week5-pack
//
// Prereq: an admin or automation-token caller has already invoked
//   POST /api/admin/scheduled-posts/attribution-rollup
// at least once so that scheduled_posts.waitlistSignups reflects reality.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";

interface PostRow {
  id: number;
  sequenceNo: number;
  fileRef: string;
  platform: string;
  pillar: string;
  hookPattern: string;
  funnel: string;
  title: string;
  waitlistSignups: number;
  clicks: number;
  impressions: number;
  scheduledFor: Date;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "../..");
const TEMPLATE_PATH = path.join(
  REPO_ROOT,
  "artifacts/sysmoai-website/content-pack/week5-plus-template.md",
);
const BEGIN = "<!-- WEEK5_PLANNER:BEGIN -->";
const END = "<!-- WEEK5_PLANNER:END -->";

// Below this click count, a piece doesn't have enough data to interpret —
// treated as neutral (kept off both winners and losers lists).
const NOISE_FLOOR_CLICKS = 50;

async function loadPosts(): Promise<PostRow[]> {
  const url = process.env.DATABASE_URL;
  // The planner is useful even before the table exists — it falls back to a
  // default plan so authors can see what Week 5+ will look like during
  // setup. We only error out when explicitly asked to require live data.
  if (!url) {
    if (process.env.WEEK5_PLANNER_REQUIRE_DB === "1") {
      throw new Error(
        "DATABASE_URL is not set and WEEK5_PLANNER_REQUIRE_DB=1. Wire up Replit Postgres first.",
      );
    }
    console.warn(
      "DATABASE_URL not set — running planner with empty post list (no-data fallback).",
    );
    return [];
  }
  const pool = new Pool({ connectionString: url });
  try {
    const { rows } = await pool.query<PostRow>(
      `SELECT id, sequence_no AS "sequenceNo", file_ref AS "fileRef",
              platform, pillar, hook_pattern AS "hookPattern", funnel,
              title, waitlist_signups AS "waitlistSignups",
              clicks, impressions, scheduled_for AS "scheduledFor"
         FROM scheduled_posts
        ORDER BY scheduled_for ASC`,
    );
    return rows;
  } catch (err) {
    if (process.env.WEEK5_PLANNER_REQUIRE_DB === "1") throw err;
    console.warn(
      `Could not query scheduled_posts (${(err as Error).message}). Falling back to no-data plan.`,
    );
    return [];
  } finally {
    await pool.end();
  }
}

interface Aggregate {
  key: string;
  signups: number;
  pieces: number;
  signupsPerPiece: number;
}

function aggregate<K extends string>(
  rows: PostRow[],
  pick: (r: PostRow) => K,
): Aggregate[] {
  // Apply the documented noise floor — pieces with very few clicks and no
  // signups can't be interpreted, so they're excluded from the aggregate
  // (treated as neutral, not as a negative signal).
  const m = new Map<K, { signups: number; pieces: number }>();
  for (const r of rows) {
    if (r.clicks < NOISE_FLOOR_CLICKS && r.waitlistSignups === 0) continue;
    const k = pick(r);
    const cur = m.get(k) ?? { signups: 0, pieces: 0 };
    cur.signups += r.waitlistSignups;
    cur.pieces += 1;
    m.set(k, cur);
  }
  return Array.from(m.entries())
    .map(([key, v]) => ({
      key,
      signups: v.signups,
      pieces: v.pieces,
      signupsPerPiece: v.pieces === 0 ? 0 : v.signups / v.pieces,
    }))
    .sort((a, b) => b.signupsPerPiece - a.signupsPerPiece);
}

// ── Concrete Week 5–8 slot plan ──────────────────────────────────────
//
// We re-use the exact weekly cadence of Week 1–4 (19 slots/week, same
// BDT peak times) so production rhythm doesn't change — only the
// pillar/hook/platform allocation does. Slot dates start the Monday
// after W4 closes (Mon 8 Jun 2026 BDT) and run for 4 consecutive weeks.

interface SlotTemplate {
  dayOfWeek: 0 | 1 | 2 | 3 | 4; // 0=Mon … 4=Fri
  platform: string;
  bdtSlot: string;
  filePrefix: string; // L | X | XT | IF | IS | TR | NL
  filePerWeekIndex: number; // 1-based within that prefix per week
  ctaCode: "A" | "W";
}

// Mirrors week 1 of the existing pack. Total = 19 slots per week.
const WEEK_TEMPLATE: SlotTemplate[] = [
  // Mon
  { dayOfWeek: 0, platform: "linkedin",         bdtSlot: "09:00", filePrefix: "L",  filePerWeekIndex: 1, ctaCode: "A" },
  { dayOfWeek: 0, platform: "instagram_feed",   bdtSlot: "13:00", filePrefix: "IF", filePerWeekIndex: 1, ctaCode: "A" },
  { dayOfWeek: 0, platform: "instagram_story",  bdtSlot: "20:00", filePrefix: "IS", filePerWeekIndex: 1, ctaCode: "A" },
  { dayOfWeek: 0, platform: "x_standalone",     bdtSlot: "12:30", filePrefix: "X",  filePerWeekIndex: 1, ctaCode: "A" },
  // Tue
  { dayOfWeek: 1, platform: "linkedin",         bdtSlot: "09:00", filePrefix: "L",  filePerWeekIndex: 2, ctaCode: "A" },
  { dayOfWeek: 1, platform: "x_standalone",     bdtSlot: "12:30", filePrefix: "X",  filePerWeekIndex: 2, ctaCode: "A" },
  { dayOfWeek: 1, platform: "tiktok_reel",      bdtSlot: "21:00", filePrefix: "TR", filePerWeekIndex: 1, ctaCode: "A" },
  // Wed
  { dayOfWeek: 2, platform: "linkedin",         bdtSlot: "09:00", filePrefix: "L",  filePerWeekIndex: 3, ctaCode: "A" },
  { dayOfWeek: 2, platform: "instagram_feed",   bdtSlot: "13:00", filePrefix: "IF", filePerWeekIndex: 2, ctaCode: "A" },
  { dayOfWeek: 2, platform: "instagram_story",  bdtSlot: "20:00", filePrefix: "IS", filePerWeekIndex: 2, ctaCode: "A" },
  { dayOfWeek: 2, platform: "x_standalone",     bdtSlot: "12:30", filePrefix: "X",  filePerWeekIndex: 3, ctaCode: "A" },
  { dayOfWeek: 2, platform: "x_thread",         bdtSlot: "21:00", filePrefix: "XT", filePerWeekIndex: 1, ctaCode: "A" },
  // Thu
  { dayOfWeek: 3, platform: "linkedin",         bdtSlot: "09:00", filePrefix: "L",  filePerWeekIndex: 4, ctaCode: "A" },
  { dayOfWeek: 3, platform: "x_standalone",     bdtSlot: "12:30", filePrefix: "X",  filePerWeekIndex: 4, ctaCode: "A" },
  { dayOfWeek: 3, platform: "tiktok_reel",      bdtSlot: "21:00", filePrefix: "TR", filePerWeekIndex: 2, ctaCode: "A" },
  // Fri
  { dayOfWeek: 4, platform: "linkedin",         bdtSlot: "09:00", filePrefix: "L",  filePerWeekIndex: 5, ctaCode: "A" },
  { dayOfWeek: 4, platform: "instagram_feed",   bdtSlot: "13:00", filePrefix: "IF", filePerWeekIndex: 3, ctaCode: "A" },
  { dayOfWeek: 4, platform: "instagram_story",  bdtSlot: "20:00", filePrefix: "IS", filePerWeekIndex: 3, ctaCode: "A" },
  { dayOfWeek: 4, platform: "newsletter",       bdtSlot: "10:00", filePrefix: "NL", filePerWeekIndex: 1, ctaCode: "A" },
];

const DEFAULT_PILLARS = [
  "Pain Recognition",
  "What Good Looks Like",
  "Trust + Authority",
  "Sprint Offer",
];
const DEFAULT_HOOKS = [
  "Specificity Signal",
  "Negative Hook",
  "Callout",
  "Curiosity Gap",
  "Slippery Slope",
  "Educational",
  "Question",
];

// Funnel mix shifts bottom-ward vs Week 1–4 (which was TOF-heavy because
// the audience didn't exist yet). 19 slots/wk → 6 TOF / 8 MOF / 5 BOF.
function funnelForSlot(globalIndex: number): "TOF" | "MOF" | "MOF_BOF" | "BOF" {
  const mod = globalIndex % 19;
  if (mod < 6) return "TOF";
  if (mod < 14) return "MOF";
  if (mod === 18) return "MOF_BOF"; // Friday newsletter combo
  return "BOF";
}

function rankedPillars(byPillar: Aggregate[]): string[] {
  // Use observed ranking when we have any signal, otherwise fall back to
  // the Week 1–4 default order. Always returns 4 pillars (drops bottom +
  // pads from defaults so we never produce an empty plan).
  const observed = byPillar.map((r) => r.key);
  const seen = new Set(observed);
  const rest = DEFAULT_PILLARS.filter((p) => !seen.has(p));
  const all = [...observed, ...rest];
  // Drop the bottom one only if we have ≥4 with signal AND a clear loser.
  if (byPillar.length >= 4 && byPillar[byPillar.length - 1].signupsPerPiece === 0) {
    all.splice(all.indexOf(byPillar[byPillar.length - 1].key), 1);
  }
  return all.slice(0, 4);
}

function rankedHooks(byHook: Aggregate[]): string[] {
  const observed = byHook.map((r) => r.key);
  const seen = new Set(observed);
  const rest = DEFAULT_HOOKS.filter((h) => !seen.has(h));
  return [...observed, ...rest];
}

// BDT-Monday → UTC ISO for the slot. Asia/Dhaka is UTC+6 with no DST.
function bdtSlotToUtcIso(
  weekStartUtcMs: number,
  dayOfWeek: number,
  bdtSlot: string,
): string {
  const [hh, mm] = bdtSlot.split(":").map(Number);
  const bdtMs = weekStartUtcMs + dayOfWeek * 86_400_000
    + (hh - 6) * 3_600_000 + mm * 60_000;
  return new Date(bdtMs).toISOString();
}

// Pick the BDT-Monday-UTC of the first Week 5 = the Monday after the latest
// scheduled_for in the data. Falls back to a fixed anchor when the table is
// empty (e.g. fresh dev DB).
function week5StartUtcMs(posts: PostRow[]): number {
  const latest = posts.length
    ? Math.max(...posts.map((r) => new Date(r.scheduledFor).getTime()))
    : Date.UTC(2026, 5, 5); // Fri 5 Jun 2026 — last day of W4
  // Snap to next Monday in BDT (UTC+6): floor to UTC day, find weekday.
  const bdtMs = latest + 6 * 3_600_000;
  const bdtDate = new Date(bdtMs);
  const wkday = bdtDate.getUTCDay(); // 0=Sun,1=Mon…6=Sat
  const daysToNextMon = ((1 - wkday + 7) % 7) || 7;
  const nextMonBdt = Date.UTC(
    bdtDate.getUTCFullYear(),
    bdtDate.getUTCMonth(),
    bdtDate.getUTCDate() + daysToNextMon,
  );
  // Convert BDT midnight back to UTC.
  return nextMonBdt - 6 * 3_600_000;
}

const BDT_DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dhaka",
  day: "2-digit",
  month: "short",
});
const BDT_WKDAY_FMT = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Dhaka",
  weekday: "short",
});

function fileRefSlug(fileRef: string): string {
  return fileRef.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

interface PlannedSlot {
  weekNumber: number; // 5..8
  dateLabel: string;
  weekday: string;
  scheduledForUtc: string;
  platform: string;
  fileRef: string;
  pillar: string;
  hookPattern: string;
  funnel: "TOF" | "MOF" | "MOF_BOF" | "BOF";
  ctaCode: "A" | "W";
  plannedUtmCampaign: string;
}

function utmSourceForPlatform(platform: string): string {
  if (platform === "x_standalone" || platform === "x_thread") return "x";
  if (platform === "instagram_feed" || platform === "instagram_story") return "instagram";
  return platform;
}

function buildConcretePlan(
  posts: PostRow[],
  byPillar: Aggregate[],
  byHook: Aggregate[],
  byPlatform: Aggregate[],
): PlannedSlot[] {
  const pillars = rankedPillars(byPillar);
  const hooks = rankedHooks(byHook);
  const topPlatform = byPlatform[0]?.key;
  const w5Start = week5StartUtcMs(posts);

  // Pillar allocation across 19 weekly slots: 50/25/25 (drop bottom).
  // Slot indices 0..9 → top, 10..14 → second, 15..18 → third.
  const allocPillar = (slotIdx: number): string => {
    if (slotIdx <= 9) return pillars[0];
    if (slotIdx <= 14) return pillars[1] ?? pillars[0];
    return pillars[2] ?? pillars[0];
  };

  const slots: PlannedSlot[] = [];
  for (let w = 0; w < 4; w++) {
    const weekNumber = 5 + w;
    const weekStartUtcMs = w5Start + w * 7 * 86_400_000;
    WEEK_TEMPLATE.forEach((tpl, slotIdx) => {
      const utc = bdtSlotToUtcIso(weekStartUtcMs, tpl.dayOfWeek, tpl.bdtSlot);
      const d = new Date(utc);
      const fileRef = `W${weekNumber}${tpl.filePrefix}${tpl.filePerWeekIndex}`;
      const pillar = allocPillar(slotIdx);
      // Hook: top hook for top-platform slots, otherwise rotate.
      const hook =
        topPlatform && tpl.platform === topPlatform && tpl.filePerWeekIndex <= 2
          ? hooks[0]
          : hooks[(slotIdx + w) % hooks.length];
      const funnel = funnelForSlot(slotIdx);
      const slug = `w${weekNumber}-${fileRefSlug(fileRef)}`;
      slots.push({
        weekNumber,
        dateLabel: BDT_DATE_FMT.format(d),
        weekday: BDT_WKDAY_FMT.format(d),
        scheduledForUtc: utc,
        platform: tpl.platform,
        fileRef,
        pillar,
        hookPattern: hook,
        funnel,
        ctaCode: tpl.ctaCode,
        plannedUtmCampaign: slug,
      });
    });
  }
  return slots;
}

function fmtPlanTable(slots: PlannedSlot[]): string {
  const header = [
    "| # | Week | Date | Day | Platform | File Ref | Pillar | Hook | Funnel | CTA | Planned utm_campaign |",
    "|---|---|---|---|---|---|---|---|---|---|---|",
  ];
  const rows = slots.map(
    (s, i) =>
      `| ${i + 1} | W${s.weekNumber} | ${s.dateLabel} | ${s.weekday} | ${s.platform} | ${s.fileRef} | ${s.pillar} | ${s.hookPattern} | ${s.funnel} | [${s.ctaCode}] | \`${s.plannedUtmCampaign}\` |`,
  );
  return [...header, ...rows].join("\n");
}

// ── Dry-run scenario ─────────────────────────────────────────────────
//
// Until Week 4 closes there is no real attribution data, but we still
// want a *concrete, non-uniform* Week 5+ pack committed to the repo so
// reviewers/operators can see what the planner produces and so the
// content team can start drafting against it. We synthesise a plausible
// scenario from B2B SMB benchmarks (LinkedIn + Specificity Signal +
// Pain Recognition tend to dominate B2B audit-style funnels).
//
// The synthesised data is deterministic (hash of fileRef + dimension
// weights) so the committed plan is reproducible. The output is clearly
// banner-labelled DRY-RUN so it's never confused with real data.

function hash32(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

function dryRunWeights(): { pillar: Record<string, number>; hook: Record<string, number>; platform: Record<string, number> } {
  return {
    pillar: {
      "Pain Recognition": 1.0,
      "What Good Looks Like": 0.7,
      "Proof + Specificity": 1.3,
      "Trust + Authority": 0.4,
      "Sprint Offer": 0.9,
      "CTA / Offer": 0.9,
    },
    hook: {
      "Specificity Signal": 1.4,
      "Negative Hook": 0.9,
      "Callout": 1.0,
      "Curiosity Gap": 1.1,
      "Slippery Slope": 0.6,
      "Educational": 0.8,
      "Question": 0.7,
      "Educational / Poll": 0.8,
      "Pain / Single Frame": 0.9,
    },
    platform: {
      linkedin: 1.5,
      x_standalone: 0.9,
      x_thread: 1.1,
      instagram_feed: 0.8,
      instagram_story: 0.5,
      tiktok_reel: 0.6,
      newsletter: 1.2,
    },
  };
}

function synthesizeDryRunPosts(posts: PostRow[]): PostRow[] {
  const w = dryRunWeights();
  return posts.map((r) => {
    const pw = w.pillar[r.pillar] ?? 0.7;
    const hw = w.hook[r.hookPattern] ?? 0.7;
    const tw = w.platform[r.platform] ?? 0.7;
    const noise = (hash32(r.fileRef) % 100) / 100; // 0..0.99
    // Clicks: base 80–400 weighted by platform.
    const clicks = Math.round((80 + noise * 320) * tw);
    // Signups: weighted product; 0 floor.
    const expected = pw * hw * tw * (0.6 + noise * 0.8);
    const signups = Math.max(0, Math.round(expected * 3));
    return { ...r, clicks, waitlistSignups: signups };
  });
}

function buildOutline(posts: PostRow[]): string {
  const realSignups = posts.reduce((s, r) => s + r.waitlistSignups, 0);
  let workingPosts = posts;
  let dataMode: "data-driven" | "dry-run synthetic";
  if (realSignups > 0) {
    dataMode = "data-driven";
  } else if (posts.length > 0) {
    dataMode = "dry-run synthetic";
    workingPosts = synthesizeDryRunPosts(posts);
  } else {
    dataMode = "dry-run synthetic";
    workingPosts = posts;
  }
  const totalSignups = workingPosts.reduce((s, r) => s + r.waitlistSignups, 0);

  const byPillar = aggregate(workingPosts, (r) => r.pillar);
  const byHook = aggregate(workingPosts, (r) => r.hookPattern);
  const byPlatform = aggregate(workingPosts, (r) => r.platform);

  const ranked = [...workingPosts].sort((a, b) => {
    if (b.waitlistSignups !== a.waitlistSignups)
      return b.waitlistSignups - a.waitlistSignups;
    return b.clicks - a.clicks;
  });
  const winners = ranked.filter((r) => r.waitlistSignups > 0).slice(0, 10);
  const noiseCount = workingPosts.filter((r) => r.clicks < NOISE_FLOOR_CLICKS).length;

  const fmtAgg = (rows: Aggregate[], label: string) =>
    rows
      .filter((r) => r.pieces > 0)
      .map(
        (r) =>
          `| ${r.key} | ${r.signups} | ${r.pieces} | ${r.signupsPerPiece.toFixed(2)} |`,
      )
      .join("\n") || `_(no data for ${label})_`;

  const topPillar = byPillar[0];
  const bottomPillar = byPillar[byPillar.length - 1];
  const topHook = byHook[0];
  const topPlatform = byPlatform[0];

  const recommended: string[] = [];
  if (topPillar)
    recommended.push(
      `- **Lead with ${topPillar.key}** (${topPillar.signupsPerPiece.toFixed(
        2,
      )} signups/piece across ${topPillar.pieces} Week 1–4 pieces). Allocate ~50% of Week 5 slots here.`,
    );
  if (bottomPillar && bottomPillar !== topPillar)
    recommended.push(
      `- **Retire ${bottomPillar.key}** (only ${bottomPillar.signupsPerPiece.toFixed(
        2,
      )} signups/piece). Replace those slots with a new angle from voice-guide.md's reserve list.`,
    );
  if (topHook)
    recommended.push(
      `- **Double the "${topHook.key}" hook pattern** on ${topPlatform?.key ?? "your top platform"} — schedule 2 of those in Week 5.`,
    );
  if (topPlatform)
    recommended.push(
      `- **Most efficient platform: ${topPlatform.key}** (${topPlatform.signupsPerPiece.toFixed(
        2,
      )} signups/piece). Increase slot count there by 25%.`,
    );
  recommended.push(
    `- **Funnel mix:** shift one TOF slot per week to MOF→BOF (Sprint offer).`,
  );
  recommended.push(
    `- **Below the noise floor:** ${noiseCount} pieces had < ${NOISE_FLOOR_CLICKS} clicks — treat as neutral, not negative signal.`,
  );

  const winnersTable = winners.length
    ? winners
        .map(
          (r) =>
            `| ${r.fileRef} | ${r.platform} | ${r.pillar} | ${r.hookPattern} | ${r.waitlistSignups} | ${r.clicks} |`,
        )
        .join("\n")
    : "_(no piece has any attributed signups yet)_";

  const plan = buildConcretePlan(workingPosts, byPillar, byHook, byPlatform);
  const banner =
    dataMode === "dry-run synthetic"
      ? [
          "> ⚠️ **DRY-RUN PLAN — synthetic data.** The Week 1–4 pack publishes",
          "> 11 May – 5 Jun 2026 BDT. Until that completes, the planner uses a",
          "> deterministic, B2B-SMB-benchmarked synthetic scenario (LinkedIn +",
          "> Specificity Signal + Pain Recognition / Proof + Specificity dominate)",
          "> so the committed Week 5+ artifact is concrete and reviewable. After",
          "> Week 4 closes, run **Run rollup** in admin → re-run",
          "> `pnpm --filter @workspace/scripts run build-week5-pack` to overwrite",
          "> this section with the real data-driven plan.",
        ].join("\n")
      : `> ✅ **DATA-DRIVEN PLAN.** Generated from ${workingPosts.length} Week 1–4 posts and ${totalSignups} attributed signups via the production rollup.`;
  const planNote =
    dataMode === "dry-run synthetic"
      ? `_Dry-run synthetic scenario applied to ${workingPosts.length} scheduled posts. Replace by re-running after Week 4 closes._`
      : `_Generated ${new Date().toISOString()} from ${workingPosts.length} Week 1–4 posts (${totalSignups} attributed signups). Pillar / hook / platform allocations come from the tables further down._`;

  return [
    banner,
    "",
    `_Generated ${new Date().toISOString()} from ${workingPosts.length} scheduled posts (${totalSignups} attributed signups, ${dataMode})._`,
    "",
    "### Week 5–8 concrete plan",
    "",
    planNote,
    "",
    fmtPlanTable(plan),
    "",
    "### Recommendations",
    "",
    ...recommended,
    "",
    "### Top performers (signups, then clicks)",
    "",
    "| File ref | Platform | Pillar | Hook | Signups | Clicks |",
    "|---|---|---|---|---:|---:|",
    winnersTable,
    "",
    "### Signups per pillar",
    "",
    "| Pillar | Signups | Pieces | Signups / piece |",
    "|---|---:|---:|---:|",
    fmtAgg(byPillar, "pillar"),
    "",
    "### Signups per hook pattern",
    "",
    "| Hook | Signups | Pieces | Signups / piece |",
    "|---|---:|---:|---:|",
    fmtAgg(byHook, "hook"),
    "",
    "### Signups per platform",
    "",
    "| Platform | Signups | Pieces | Signups / piece |",
    "|---|---:|---:|---:|",
    fmtAgg(byPlatform, "platform"),
    "",
    "_Re-author each planned slot by hand — do not ship script-generated copy. See `voice-guide.md` for tone and `proof-points.md` for verified numbers._",
  ].join("\n");
}

async function main() {
  const posts = await loadPosts();
  const outline = buildOutline(posts);
  const template = await readFile(TEMPLATE_PATH, "utf8");
  const beginIdx = template.indexOf(BEGIN);
  const endIdx = template.indexOf(END);
  if (beginIdx === -1 || endIdx === -1 || endIdx < beginIdx) {
    throw new Error(
      `Could not find ${BEGIN} / ${END} markers in ${TEMPLATE_PATH}. Aborting so we don't clobber the file.`,
    );
  }
  const before = template.slice(0, beginIdx + BEGIN.length);
  const after = template.slice(endIdx);
  const next = `${before}\n${outline}\n${after}`;
  await writeFile(TEMPLATE_PATH, next, "utf8");
  console.log(
    `Wrote Week 5+ outline → ${path.relative(REPO_ROOT, TEMPLATE_PATH)} (${posts.length} posts analysed).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
