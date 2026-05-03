/**
 * Regenerate artifacts/sysmoai-website/public/sitemap.xml from the actual
 * routes registered in artifacts/sysmoai-website/src/App.tsx, plus the
 * blog/answer slugs declared in src/data. Excludes wildcard routes (/blog/:slug
 * is expanded from blogMeta) and routes that just redirect (handled via
 * `_redirects` 301s in production).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const SITE = "https://sysmoai.com";
const APP_TSX = path.join(
  ROOT,
  "artifacts/sysmoai-website/src/App.tsx",
);
const OUT = path.join(
  ROOT,
  "artifacts/sysmoai-website/public/sitemap.xml",
);

const appSrc = fs.readFileSync(APP_TSX, "utf8");

// Match `<Route path="/foo" component={X} />` (i.e. real pages, not redirects).
const ROUTE_RE = /<Route\s+path="([^"]+)"\s+component=\{/g;
const realRoutes = new Set<string>();
for (const m of appSrc.matchAll(ROUTE_RE)) {
  const p = m[1];
  if (p.includes(":")) continue; // dynamic, expanded below
  realRoutes.add(p);
}

// Blog + answer slugs — best-effort. We just want canonical static URLs so
// duplicates and missing files are silently skipped.
function readSlugsFromExport(file: string, exportName: string): string[] {
  try {
    const src = fs.readFileSync(file, "utf8");
    const slugs: string[] = [];
    const re = /slug:\s*['"]([^'"]+)['"]/g;
    for (const m of src.matchAll(re)) slugs.push(m[1]);
    return slugs;
  } catch {
    return [];
  }
}

const blogSlugs = readSlugsFromExport(
  path.join(ROOT, "artifacts/sysmoai-website/src/data/blogMeta.ts"),
  "BLOG_POSTS",
);
const answerSlugs = readSlugsFromExport(
  path.join(ROOT, "artifacts/sysmoai-website/src/data/answersPosts.ts"),
  "ANSWERS",
);

const today = new Date().toISOString().slice(0, 10);

const urls: { loc: string; priority: string; changefreq: string }[] = [];

function add(loc: string, priority: string, changefreq: string) {
  urls.push({ loc: `${SITE}${loc}`, priority, changefreq });
}

// Priority hierarchy
const PRIORITY: Record<string, string> = {
  "/": "1.0",
  "/services": "0.9",
  "/services/ai-sprint": "0.9",
  "/services/ai-retainer": "0.9",
  "/services/ai-quick-win": "0.9",
  "/services/international": "0.8",
  "/services/other-engagements": "0.7",
  "/for/f-commerce": "0.9",
  "/about": "0.8",
  "/pricing": "0.8",
  "/proof": "0.8",
  "/contact": "0.8",
  "/free-ai-audit": "0.9",
  "/faq": "0.7",
  "/blog": "0.8",
  "/answers": "0.7",
};

const CHANGEFREQ: Record<string, string> = {
  "/": "weekly",
  "/blog": "weekly",
  "/answers": "weekly",
};

const SKIP = new Set(["/results"]); // alias of /proof — drop dupes

for (const r of [...realRoutes].sort()) {
  if (SKIP.has(r)) continue;
  add(r, PRIORITY[r] ?? "0.6", CHANGEFREQ[r] ?? "monthly");
}
for (const slug of blogSlugs) add(`/blog/${slug}`, "0.6", "monthly");
for (const slug of answerSlugs) add(`/answers/${slug}`, "0.5", "monthly");

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  ),
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(OUT, xml);
// eslint-disable-next-line no-console
console.log(
  `Wrote ${urls.length} URLs to ${path.relative(ROOT, OUT)} (${realRoutes.size} static + ${blogSlugs.length} blog + ${answerSlugs.length} answers)`,
);
