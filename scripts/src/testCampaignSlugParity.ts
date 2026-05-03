// Parity test for the canonical campaign-slug logic.
//
// The slug `w<week>-<fileref-slug>` is computed in TWO places:
//   1. scripts/src/buildContentSchedule.ts → bakes UTM into contentSchedule.json
//   2. artifacts/api-server/src/routes/scheduledPosts.ts → recomputes at
//      rollup time to join audit_requests.utm_campaign back to scheduled_posts
// If those two implementations drift, attribution silently breaks. This
// test asserts they produce identical output for a frozen set of cases
// AND that the source code of both `fileRefSlug` definitions is
// byte-identical, so we catch drift even before runtime behaviour shifts.
//
// Run via: pnpm --filter @workspace/scripts run test-slug-parity

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { campaignSlugFor as scriptsSlug } from "./buildContentSchedule.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "../..");
const SERVER_FILE = resolve(
  REPO_ROOT,
  "artifacts/api-server/src/routes/scheduledPosts.ts",
);
const SCRIPTS_FILE = resolve(REPO_ROOT, "scripts/src/buildContentSchedule.ts");

const FROZEN_CASES: { week: number; fileRef: string; expected: string }[] = [
  { week: 1, fileRef: "L1",                 expected: "w1-l1" },
  { week: 2, fileRef: "X3",                 expected: "w2-x3" },
  { week: 3, fileRef: "IF7",                expected: "w3-if7" },
  { week: 4, fileRef: "TR5",                expected: "w4-tr5" },
  { week: 1, fileRef: "Thread W1",          expected: "w1-threadw1" },
  { week: 1, fileRef: "IS3 — 3-Frame Seq",  expected: "w1-is33frameseq" },
  { week: 1, fileRef: "L5 [CAROUSEL]",      expected: "w1-l5carousel" },
  { week: 2, fileRef: "NL2",                expected: "w2-nl2" },
];

function extractFileRefSlugBody(src: string): string | null {
  // Match the body of `function fileRefSlug(fileRef: string): string { ... }`
  // tolerant to whitespace.
  const m = src.match(
    /function\s+fileRefSlug\s*\(\s*fileRef\s*:\s*string\s*\)\s*:\s*string\s*\{([^}]+)\}/,
  );
  return m ? m[1].trim() : null;
}

let failures = 0;
function fail(msg: string): void {
  failures++;
  console.error(`✗ ${msg}`);
}
function pass(msg: string): void {
  console.log(`✓ ${msg}`);
}

// 1. Behaviour parity on frozen cases (the scripts implementation).
for (const c of FROZEN_CASES) {
  const got = scriptsSlug(c.week, c.fileRef);
  if (got !== c.expected) {
    fail(`scriptsSlug(${c.week}, ${JSON.stringify(c.fileRef)}) = ${JSON.stringify(got)}, expected ${JSON.stringify(c.expected)}`);
  } else {
    pass(`scripts slug ok: ${JSON.stringify(c.fileRef)} → ${got}`);
  }
}

// 2. Source-level parity: both `fileRefSlug` bodies must be identical.
const serverSrc = readFileSync(SERVER_FILE, "utf8");
const scriptsSrc = readFileSync(SCRIPTS_FILE, "utf8");
const serverBody = extractFileRefSlugBody(serverSrc);
const scriptsBody = extractFileRefSlugBody(scriptsSrc);
if (!serverBody) fail(`could not locate fileRefSlug in ${SERVER_FILE}`);
if (!scriptsBody) fail(`could not locate fileRefSlug in ${SCRIPTS_FILE}`);
if (serverBody && scriptsBody) {
  if (serverBody !== scriptsBody) {
    fail(
      `fileRefSlug source drift between scheduledPosts.ts and buildContentSchedule.ts:\n` +
      `  server: ${JSON.stringify(serverBody)}\n` +
      `  scripts: ${JSON.stringify(scriptsBody)}`,
    );
  } else {
    pass("fileRefSlug source bodies are byte-identical");
  }
}

// 3. campaignSlugFor wrapper parity by string match — both must follow
// the `w<week>-<slug>` convention. We assert the literal template is
// present in both files.
const tmpl = "`w${weekNumber}-${fileRefSlug(fileRef)}`";
if (!serverSrc.includes(tmpl)) fail(`server scheduledPosts.ts missing canonical template ${tmpl}`);
else pass("server file uses canonical campaignSlugFor template");
if (!scriptsSrc.includes(tmpl)) fail(`buildContentSchedule.ts missing canonical template ${tmpl}`);
else pass("scripts file uses canonical campaignSlugFor template");

if (failures > 0) {
  console.error(`\n${failures} parity check(s) failed`);
  process.exit(1);
}
console.log(`\nAll ${FROZEN_CASES.length + 4} parity checks passed.`);
