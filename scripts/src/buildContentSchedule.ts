/**
 * Parses the SYSmoAI content-pack into a structured publishing queue JSON.
 *
 * Input:  artifacts/sysmoai-website/content-pack/{calendar,linkedin,x,
 *         instagram-feed,instagram-stories,tiktok-reels,newsletter}.md
 * Output: artifacts/api-server/src/data/contentSchedule.json
 *
 * Each row carries: sequenceNo, fileRef, platform, pillar, hookPattern,
 * funnel, ctaCode, title, hookLine, content, scheduledFor (UTC ISO).
 *
 * BDT (Asia/Dhaka, UTC+6) optimal slots — peak engagement windows:
 *   LinkedIn         09:00 BDT (workday morning)
 *   X Standalone     12:30 BDT (lunch peak)
 *   X Thread         21:00 BDT (evening peak)
 *   Instagram Feed   13:00 BDT (lunch)
 *   Instagram Story  20:00 BDT (evening)
 *   TikTok / Reel    21:00 BDT (peak)
 *   Newsletter       10:00 BDT (mid-morning send)
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const PACK_DIR = resolve(
  REPO_ROOT,
  "artifacts/sysmoai-website/content-pack",
);
const OUT_PATH = resolve(
  REPO_ROOT,
  "artifacts/api-server/src/data/contentSchedule.json",
);

type Platform =
  | "linkedin"
  | "x_standalone"
  | "x_thread"
  | "instagram_feed"
  | "instagram_story"
  | "tiktok_reel"
  | "newsletter";

type Funnel = "TOF" | "MOF" | "MOF_BOF" | "BOF";

interface CalendarRow {
  sequenceNo: number;
  dateLabel: string; // e.g. "11 May"
  weekday: string;
  platformLabel: string;
  fileRefRaw: string;
  pillar: string;
  hookPattern: string;
  funnelRaw: string;
  ctaRaw: string;
}

interface ScheduledRow {
  sequenceNo: number;
  assetUrl: string | null;
  fileRef: string;
  platform: Platform;
  pillar: string;
  hookPattern: string;
  funnel: Funnel;
  ctaCode: string; // "A" or "W"
  title: string;
  hookLine: string | null;
  content: string;
  scheduledFor: string; // ISO UTC
}

const MONTHS: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

function parseDate(label: string, year: number): { y: number; m: number; d: number } {
  // "11 May" or "1 Jun"
  const [dStr, mStr] = label.trim().split(/\s+/);
  const d = parseInt(dStr, 10);
  const m = MONTHS[mStr.slice(0, 3)];
  if (!m || !Number.isFinite(d)) {
    throw new Error(`Bad date label: "${label}"`);
  }
  return { y: year, m, d };
}

/** Build a UTC instant for a given Asia/Dhaka local time. BDT = UTC+6, no DST. */
function bdtToUtc(
  y: number,
  m: number,
  d: number,
  hour: number,
  minute: number,
): string {
  // BDT 09:00 = 03:00 UTC; subtract 6 hours.
  const utc = Date.UTC(y, m - 1, d, hour - 6, minute, 0);
  return new Date(utc).toISOString();
}

function platformFromLabel(label: string): Platform {
  switch (label.trim()) {
    case "LinkedIn":
      return "linkedin";
    case "X Standalone":
      return "x_standalone";
    case "X Thread":
      return "x_thread";
    case "Instagram Feed":
      return "instagram_feed";
    case "Instagram Story":
      return "instagram_story";
    case "TikTok/Reel":
      return "tiktok_reel";
    case "Newsletter":
      return "newsletter";
    default:
      throw new Error(`Unknown platform label: "${label}"`);
  }
}

function bdtSlotForPlatform(p: Platform): { hour: number; minute: number } {
  switch (p) {
    case "linkedin": return { hour: 9, minute: 0 };
    case "x_standalone": return { hour: 12, minute: 30 };
    case "x_thread": return { hour: 21, minute: 0 };
    case "instagram_feed": return { hour: 13, minute: 0 };
    case "instagram_story": return { hour: 20, minute: 0 };
    case "tiktok_reel": return { hour: 21, minute: 0 };
    case "newsletter": return { hour: 10, minute: 0 };
  }
}

function funnelFromRaw(raw: string): Funnel {
  const t = raw.trim();
  if (t === "TOF") return "TOF";
  if (t === "MOF") return "MOF";
  if (t === "BOF") return "BOF";
  if (t === "MOF→BOF" || t === "MOF->BOF" || t.includes("MOF") && t.includes("BOF"))
    return "MOF_BOF";
  throw new Error(`Unknown funnel: "${raw}"`);
}

function ctaCodeFromRaw(raw: string): string {
  const t = raw.trim();
  if (t === "[A]") return "A";
  if (t === "[W]") return "W";
  throw new Error(`Unknown CTA: "${raw}"`);
}

/** Normalise raw fileRef from calendar table to canonical form. */
function normaliseFileRef(raw: string): string {
  const t = raw.trim();
  // "L5 [CAROUSEL]" → "L5"
  // "IS2 — Poll + Reveal" → "IS2"
  // "Thread W1 (6 tweets)" → "Thread W1"
  // "IF8 [CAROUSEL]" → "IF8"
  if (t.startsWith("Thread ")) {
    const m = t.match(/^(Thread\s+W\d+)/);
    return m ? m[1] : t;
  }
  const m = t.match(/^([A-Z]+\d+)/);
  return m ? m[1] : t;
}

/** Hook label from calendar: "L5 [CAROUSEL]" → "[CAROUSEL]"; otherwise empty. */
function carouselNote(raw: string): string {
  return /\[CAROUSEL\]/.test(raw) ? " [CAROUSEL]" : "";
}

// ───────────────────────────────────────────── Calendar table parsing

function parseCalendar(): CalendarRow[] {
  const md = readFileSync(resolve(PACK_DIR, "calendar.md"), "utf8");
  const rows: CalendarRow[] = [];
  for (const line of md.split("\n")) {
    const m = line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*(\w+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(\[[AW]\])\s*\|\s*(.+?)\s*\|\s*$/);
    if (!m) continue;
    rows.push({
      sequenceNo: parseInt(m[1], 10),
      dateLabel: m[2],
      weekday: m[3],
      platformLabel: m[4],
      fileRefRaw: m[5],
      pillar: m[6],
      hookPattern: m[7],
      funnelRaw: m[8],
      ctaRaw: m[9],
    });
  }
  return rows;
}

// ───────────────────────────────────────────── Per-platform body extraction

interface ExtractedBody {
  hookLine: string | null;
  content: string;
}

/**
 * Extracts a section between a heading line and the next heading at the same
 * level (or end of file).
 */
function extractSection(
  md: string,
  startMatcher: RegExp,
  endMatcher: RegExp,
): string | null {
  const lines = md.split("\n");
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (startMatcher.test(lines[i])) {
      start = i;
      break;
    }
  }
  if (start === -1) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (endMatcher.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n");
}

/** Pull the first fenced ``` ... ``` block out of a section. */
function firstCodeBlock(section: string): string | null {
  const m = section.match(/```(?:\w*)?\n([\s\S]*?)\n```/);
  return m ? m[1].trim() : null;
}

/** Pull all fenced ``` ... ``` blocks out of a section, joined with separators. */
function allCodeBlocks(section: string): string[] {
  const out: string[] = [];
  const re = /```(?:\w*)?\n([\s\S]*?)\n```/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section)) !== null) {
    out.push(m[1].trim());
  }
  return out;
}

const linkedinMd = readFileSync(resolve(PACK_DIR, "linkedin.md"), "utf8");
const xMd = readFileSync(resolve(PACK_DIR, "x.md"), "utf8");
const igFeedMd = readFileSync(resolve(PACK_DIR, "instagram-feed.md"), "utf8");
const igStoryMd = readFileSync(resolve(PACK_DIR, "instagram-stories.md"), "utf8");
const tiktokMd = readFileSync(resolve(PACK_DIR, "tiktok-reels.md"), "utf8");
const newsletterMd = readFileSync(resolve(PACK_DIR, "newsletter.md"), "utf8");

function extractLinkedIn(ref: string): ExtractedBody {
  // ### Post L1 — ...
  const start = new RegExp(`^### Post ${ref} — `);
  const end = /^### Post |^---$/;
  const section = extractSection(linkedinMd, start, end);
  if (!section) throw new Error(`LinkedIn section not found for ${ref}`);
  const block = firstCodeBlock(section);
  if (!block) throw new Error(`LinkedIn body not found for ${ref}`);
  const hookLine = block.split("\n", 1)[0]?.trim() ?? null;
  return { hookLine, content: block };
}

function extractXStandalone(ref: string): ExtractedBody {
  const start = new RegExp(`^### Post ${ref} — `);
  const end = /^### Post |^### \[THREAD/;
  const section = extractSection(xMd, start, end);
  if (!section) throw new Error(`X section not found for ${ref}`);
  const block = firstCodeBlock(section);
  if (!block) throw new Error(`X body not found for ${ref}`);
  return { hookLine: block.split("\n", 1)[0]?.trim() ?? null, content: block };
}

function extractXThread(ref: string): ExtractedBody {
  // ref = "Thread W1" → matches "### [THREAD W1] — ..."
  const week = ref.replace("Thread ", "");
  const start = new RegExp(`^### \\[THREAD ${week}\\] — `);
  const end = /^### Post |^### \[THREAD |^## /;
  const section = extractSection(xMd, start, end);
  if (!section) throw new Error(`X thread section not found for ${ref}`);
  const blocks = allCodeBlocks(section);
  if (blocks.length === 0) throw new Error(`X thread body not found for ${ref}`);
  const numbered = blocks.map((b, i) => `Tweet ${i + 1}/${blocks.length}\n${b}`);
  const content = numbered.join("\n\n---\n\n");
  return { hookLine: blocks[0].split("\n", 1)[0]?.trim() ?? null, content };
}

function extractInstagramFeed(ref: string): ExtractedBody {
  const start = new RegExp(`^### Post ${ref} — `);
  const end = /^### Post |^---$|^## /;
  const section = extractSection(igFeedMd, start, end);
  if (!section) throw new Error(`IG Feed section not found for ${ref}`);
  const blocks = allCodeBlocks(section);
  if (blocks.length === 0) throw new Error(`IG Feed body not found for ${ref}`);
  const content = blocks.join("\n\n---\n\n");
  return { hookLine: blocks[0].split("\n", 1)[0]?.trim() ?? null, content };
}

function extractInstagramStory(ref: string): ExtractedBody {
  const start = new RegExp(`^### Story Set ${ref} — `);
  const end = /^### Story Set |^## /;
  const section = extractSection(igStoryMd, start, end);
  if (!section) throw new Error(`IG Story section not found for ${ref}`);
  const blocks = allCodeBlocks(section);
  // Stories may be entirely outside fences; fall back to the section body.
  const content = blocks.length
    ? blocks.join("\n\n---\n\n")
    : section.split("\n").slice(1).join("\n").trim();
  const hook = blocks[0]?.split("\n", 1)[0]?.trim() ?? null;
  return { hookLine: hook, content };
}

function extractTikTok(ref: string): ExtractedBody {
  const start = new RegExp(`^### Script ${ref} — `);
  const end = /^### Script |^## /;
  const section = extractSection(tiktokMd, start, end);
  if (!section) throw new Error(`TikTok section not found for ${ref}`);
  const blocks = allCodeBlocks(section);
  if (blocks.length === 0) throw new Error(`TikTok body not found for ${ref}`);
  // Block 0 = caption, Block 1 = script
  const caption = blocks[0];
  const script = blocks[1] ?? "";
  const content = `CAPTION\n${caption}\n\n---\n\nSCRIPT\n${script}`;
  return { hookLine: caption.split("\n", 1)[0]?.trim() ?? null, content };
}

function extractNewsletter(ref: string): ExtractedBody {
  // Newsletter sections contain `---` dividers between metadata, body, and
  // sign-off — so we must NOT terminate the section on bare `---`. We bound
  // strictly on the next `## Issue` heading (or top-level `# `).
  const start = new RegExp(`^## Issue ${ref} — `);
  const end = /^## Issue |^# /;
  const section = extractSection(newsletterMd, start, end);
  if (!section) throw new Error(`Newsletter section not found for ${ref}`);
  // Subject is in the form: **Subject (NN chars):** `...`
  const subjMatch = section.match(/\*\*Subject[^:]*:\*\*\s*`([^`]+)`/);
  const preMatch = section.match(/\*\*Preheader[^:]*:\*\*\s*`([^`]+)`/);
  // Body runs from `**Body:**` to the end of the section. We deliberately
  // keep the `---` separators and the sign-off ("→ Book here: ..." CTA)
  // so UTM substitution can find every audit URL inside the issue.
  const bodyMatch = section.match(/\*\*Body:\*\*\s*\n([\s\S]+)$/);
  const subject = subjMatch?.[1]?.trim() ?? "";
  const preheader = preMatch?.[1]?.trim() ?? "";
  const body = bodyMatch?.[1]?.trim() ?? section.trim();
  const content = `Subject: ${subject}\nPreheader: ${preheader}\n\n${body}`;
  return { hookLine: subject || null, content };
}

function extractBody(platform: Platform, fileRef: string): ExtractedBody {
  switch (platform) {
    case "linkedin": return extractLinkedIn(fileRef);
    case "x_standalone": return extractXStandalone(fileRef);
    case "x_thread": return extractXThread(fileRef);
    case "instagram_feed": return extractInstagramFeed(fileRef);
    case "instagram_story": return extractInstagramStory(fileRef);
    case "tiktok_reel": return extractTikTok(fileRef);
    case "newsletter": return extractNewsletter(fileRef);
  }
}

// ───────────────────────────────────────────── UTM URL substitution
//
// Every published audit CTA must carry UTM params so attribution lands on
// the correct scheduled_posts row when the visitor submits the form. The
// canonical URL builder lives here so there's exactly one place where the
// scheme is encoded — `utm-scheme.md` documents it for content writers.
//
// utm_source is the human-friendly platform name (linkedin / x / instagram
// / tiktok / newsletter), utm_medium is "social" for everything except
// newsletter ("email"), and utm_campaign is `w<weekNumber>-<fileref-slug>`
// where weekNumber is the BDT-Monday week index over the whole pack.

const AUDIT_BASE = "https://sysmoai.com/free-ai-audit";

function utmSourceForPlatform(platform: Platform): string {
  switch (platform) {
    case "linkedin": return "linkedin";
    case "x_standalone":
    case "x_thread": return "x";
    case "instagram_feed":
    case "instagram_story": return "instagram";
    case "tiktok_reel": return "tiktok";
    case "newsletter": return "newsletter";
  }
}

function utmMediumForPlatform(platform: Platform): string {
  return platform === "newsletter" ? "email" : "social";
}

function fileRefSlug(fileRef: string): string {
  return fileRef.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function campaignSlugFor(weekNumber: number, fileRef: string): string {
  return `w${weekNumber}-${fileRefSlug(fileRef)}`;
}

export function auditUrlWithUtm(
  weekNumber: number,
  fileRef: string,
  platform: Platform,
): string {
  const params = new URLSearchParams({
    utm_source: utmSourceForPlatform(platform),
    utm_medium: utmMediumForPlatform(platform),
    utm_campaign: campaignSlugFor(weekNumber, fileRef),
  });
  return `${AUDIT_BASE}?${params.toString()}`;
}

/**
 * Assign 1-based week numbers to rows by sorting unique BDT-Monday anchors.
 * Mirrors scheduledPosts.ts so the canonical slug stays in sync between
 * build-time (this script) and rollup-time (the API).
 */
function bdtMondayUtcMs(d: Date): number {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
  const parts = fmt.formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const y = Number(get("year"));
  const m = Number(get("month"));
  const day = Number(get("day"));
  const wkdayShort = get("weekday");
  const wkdayIdx: Record<string, number> = {
    Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6,
  };
  const daysSinceMon = wkdayIdx[wkdayShort] ?? 0;
  return Date.UTC(y, m - 1, day) - daysSinceMon * 86_400_000;
}

function assignWeekNumbers(rows: ScheduledRow[]): number[] {
  const unique = Array.from(
    new Set(rows.map((r) => bdtMondayUtcMs(new Date(r.scheduledFor)))),
  ).sort((a, b) => a - b);
  const weekByMonday = new Map<number, number>();
  unique.forEach((ms, i) => weekByMonday.set(ms, i + 1));
  return rows.map((r) => weekByMonday.get(bdtMondayUtcMs(new Date(r.scheduledFor))) ?? 1);
}

/**
 * Replace every plain audit URL in the post body with its UTM-tagged
 * variant. Matches `https://sysmoai.com/free-ai-audit` with an optional
 * trailing slash and only when not already followed by a query string —
 * so re-running the build is idempotent.
 */
const PLAIN_AUDIT_RE = new RegExp(
  AUDIT_BASE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?!\\?)/?",
  "g",
);

function applyUtmToBody(body: string, utmUrl: string): string {
  return body.replace(PLAIN_AUDIT_RE, utmUrl);
}

// ───────────────────────────────────────────── Build

function build() {
  const calendar = parseCalendar();
  if (calendar.length !== 76) {
    throw new Error(`Expected 76 calendar rows, got ${calendar.length}`);
  }
  const out: ScheduledRow[] = [];
  for (const row of calendar) {
    const platform = platformFromLabel(row.platformLabel);
    const fileRef = normaliseFileRef(row.fileRefRaw);
    // The 4-week pack runs in calendar year 2026 — both May and June dates
    // belong to the same year.
    const { y, m, d } = parseDate(row.dateLabel, 2026);
    const slot = bdtSlotForPlatform(platform);
    const scheduledFor = bdtToUtc(y, m, d, slot.hour, slot.minute);
    const body = extractBody(platform, fileRef);
    const title = `${fileRef}${carouselNote(row.fileRefRaw)} — ${row.hookPattern}`;
    out.push({
      sequenceNo: row.sequenceNo,
      fileRef,
      platform,
      pillar: row.pillar,
      hookPattern: row.hookPattern,
      funnel: funnelFromRaw(row.funnelRaw),
      ctaCode: ctaCodeFromRaw(row.ctaRaw),
      title,
      hookLine: body.hookLine,
      content: body.content,
      scheduledFor,
      // Operators populate assetUrl via the admin UI for IG / TikTok rows.
      // When set, n8n hands the post to Buffer with media[photo|video]; when
      // null, n8n falls back to a Slack manual-publish alert at the slot.
      assetUrl: null,
    });
  }
  // Sanity: unique sequence numbers
  const seen = new Set<number>();
  for (const r of out) {
    if (seen.has(r.sequenceNo)) {
      throw new Error(`Duplicate sequenceNo ${r.sequenceNo}`);
    }
    seen.add(r.sequenceNo);
  }

  // ── Bake UTM-tagged audit URLs into every row's content + hookLine.
  // We do this AFTER initial build so the BDT-week index is computed across
  // the full pack (W1 = first week, W2 = second, etc).
  const weekNumbers = assignWeekNumbers(out);
  let substitutions = 0;
  for (let i = 0; i < out.length; i++) {
    const row = out[i];
    const week = weekNumbers[i];
    const utmUrl = auditUrlWithUtm(week, row.fileRef, row.platform);
    const newContent = applyUtmToBody(row.content, utmUrl);
    if (newContent !== row.content) {
      substitutions += (row.content.match(PLAIN_AUDIT_RE) ?? []).length;
      row.content = newContent;
    }
    if (row.hookLine) {
      row.hookLine = applyUtmToBody(row.hookLine, utmUrl);
    }
  }
  // eslint-disable-next-line no-console
  console.log(`Applied UTM to ${substitutions} audit URL occurrences.`);

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n", "utf8");
  // eslint-disable-next-line no-console
  console.log(
    `Wrote ${out.length} scheduled posts → ${OUT_PATH.replace(REPO_ROOT + "/", "")}`,
  );
  // Per-platform breakdown
  const counts: Record<string, number> = {};
  for (const r of out) counts[r.platform] = (counts[r.platform] ?? 0) + 1;
  // eslint-disable-next-line no-console
  console.log("Counts:", counts);
}

build();
