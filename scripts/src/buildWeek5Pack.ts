// Week 5+ pack planner.
//
// Reads the production scheduled_posts table, ranks pieces by attributed
// waitlist signups (rolled up from utm_campaign), and overwrites the
// "Generated outline" section of `content-pack/week5-plus-template.md` with
// a recommended outline for the next pack.
//
// This intentionally produces only the *outline* (slot-by-slot pillar +
// hook + platform + angle hint). The actual copy is written by hand using
// `voice-guide.md` and verified proof points from `proof-points.md` —
// auto-generated copy is banned per the content-pack rules.
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
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Run from a workspace that has the Replit Postgres binding.",
    );
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
  const m = new Map<K, { signups: number; pieces: number }>();
  for (const r of rows) {
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

function buildOutline(posts: PostRow[]): string {
  const totalSignups = posts.reduce((s, r) => s + r.waitlistSignups, 0);
  if (totalSignups === 0) {
    return [
      "_No attributed signups found yet. Either no leads have come in, or the_",
      "_attribution rollup has not been run. Hit **Run rollup** in the admin_",
      "_Performance page (or POST /api/admin/scheduled-posts/attribution-rollup)_",
      "_and re-run this script._",
    ].join("\n");
  }

  const byPillar = aggregate(posts, (r) => r.pillar);
  const byHook = aggregate(posts, (r) => r.hookPattern);
  const byPlatform = aggregate(posts, (r) => r.platform);

  const ranked = [...posts].sort((a, b) => {
    if (b.waitlistSignups !== a.waitlistSignups)
      return b.waitlistSignups - a.waitlistSignups;
    return b.clicks - a.clicks;
  });
  const winners = ranked.filter((r) => r.waitlistSignups > 0).slice(0, 10);
  const noiseCount = posts.filter((r) => r.clicks < NOISE_FLOOR_CLICKS).length;

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

  return [
    `_Generated ${new Date().toISOString()} from ${posts.length} scheduled posts (${totalSignups} attributed signups)._`,
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
    "_Re-author each recommended slot by hand — do not ship script-generated copy. See voice-guide.md and proof-points.md._",
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
