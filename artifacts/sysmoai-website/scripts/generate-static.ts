/**
 * Post-build script: generates per-route static HTML files with the correct
 * <title>, <meta>, canonical, OG, and JSON-LD tags baked in, so crawlers
 * that fetch any URL see page-specific meta — not the generic SPA shell.
 *
 * Also generates an up-to-date sitemap.xml from the same route config.
 *
 * Run: tsx scripts/generate-static.ts  (after vite build)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist', 'public');

// tsx resolves .js → .ts automatically in Node ESM mode
const { seoConfig } = (await import('../src/data/seo.js')) as typeof import('../src/data/seo');
const { blogPosts } = (await import('../src/data/blogPosts.js')) as typeof import('../src/data/blogPosts');

// ---------------------------------------------------------------------------
// 1. Read the base index.html produced by vite build
// ---------------------------------------------------------------------------

const indexPath = path.join(DIST, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error(`ERROR: ${indexPath} not found. Run "vite build" first.`);
  process.exit(1);
}
const baseHtml = fs.readFileSync(indexPath, 'utf-8');

// ---------------------------------------------------------------------------
// 2. Helper: inject page-specific tags into the HTML shell
// ---------------------------------------------------------------------------

function escAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function escText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildHead(
  title: string,
  description: string,
  canonical: string,
  ogTitle: string,
  ogDescription: string,
  ogImage: string,
  ogType: string,
  schemas: unknown[],
): string {
  const schemaBlocks = schemas
    .map(
      (s, i) =>
        `  <script type="application/ld+json" data-page-schema="${i}">${JSON.stringify(s)}</script>`,
    )
    .join('\n');

  return `  <title>${escText(title)}</title>
  <meta name="description" content="${escAttr(description)}" />
  <link rel="canonical" href="${escAttr(canonical)}" />
  <meta property="og:title" content="${escAttr(ogTitle)}" />
  <meta property="og:description" content="${escAttr(ogDescription)}" />
  <meta property="og:url" content="${escAttr(canonical)}" />
  <meta property="og:image" content="https://sysmoai.com/opengraph.jpg" />
  <meta property="og:type" content="${escAttr(ogType)}" />
  <meta property="og:site_name" content="SYSmoAI" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@sysmoai" />
  <meta name="twitter:title" content="${escAttr(ogTitle)}" />
  <meta name="twitter:description" content="${escAttr(ogDescription)}" />
  <meta name="twitter:image" content="https://sysmoai.com/opengraph.jpg" />
${schemaBlocks}`;
}

const PLACEHOLDER_COMMENT = '<!-- SEO_PLACEHOLDER -->';

function injectIntoHtml(html: string, headContent: string): string {
  // Remove existing title, description meta, canonical, OG, Twitter, and JSON-LD blocks
  let result = html;

  result = result.replace(/<title>[^<]*<\/title>/i, '');
  result = result.replace(/<meta\s+name="description"[^>]*>/gi, '');
  result = result.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  result = result.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '');
  result = result.replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '');
  result = result.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '');
  result = result.replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi, '');

  // Insert new head content AFTER <meta charset> so charset stays first,
  // then fall back to inserting immediately after <head> if no charset tag.
  const charsetMatch = result.match(/<meta\s+charset[^>]*>/i);
  if (charsetMatch && charsetMatch.index !== undefined) {
    const insertAt = charsetMatch.index + charsetMatch[0].length;
    result = result.slice(0, insertAt) + '\n' + headContent + result.slice(insertAt);
  } else {
    result = result.replace(/<head>/i, `<head>\n${headContent}`);
  }
  return result;
}

// ---------------------------------------------------------------------------
// 3. Write per-route HTML files
// ---------------------------------------------------------------------------

let generated = 0;
let skipped = 0;

for (const [route, seo] of Object.entries(seoConfig)) {
  const routePath = route === '/' ? '' : route;
  const dir = path.join(DIST, routePath);
  const file = path.join(dir, 'index.html');

  fs.mkdirSync(dir, { recursive: true });

  const headContent = buildHead(
    seo.title,
    seo.description,
    seo.canonical,
    seo.ogTitle ?? seo.title,
    seo.ogDescription ?? seo.description,
    seo.ogImage ?? 'https://sysmoai.com/opengraph.jpg',
    seo.ogType ?? 'website',
    seo.schemas ?? [],
  );

  const finalHtml = injectIntoHtml(baseHtml, headContent);
  fs.writeFileSync(file, finalHtml, 'utf-8');
  generated++;
}

console.log(`✓ Generated ${generated} static HTML files (${skipped} skipped)`);

// ---------------------------------------------------------------------------
// 4. Generate dynamic sitemap.xml — URLs derived from seoConfig (not hard-coded)
// ---------------------------------------------------------------------------

const TODAY = new Date().toISOString().slice(0, 10);
const SITE_URL = 'https://sysmoai.com';

// Priority / changefreq rules by route pattern (first match wins)
function routeMeta(route: string): { changefreq: string; priority: string } {
  if (route === '/') return { changefreq: 'weekly', priority: '1.0' };
  if (route === '/services' || route === '/pricing') return { changefreq: 'weekly', priority: '0.9' };
  if (route.startsWith('/services/')) return { changefreq: 'monthly', priority: '0.9' };
  if (route === '/blog') return { changefreq: 'weekly', priority: '0.8' };
  if (route === '/answers') return { changefreq: 'weekly', priority: '0.85' };
  if (route.startsWith('/answers/')) return { changefreq: 'monthly', priority: '0.85' };
  if (route.startsWith('/privacy') || route.startsWith('/terms') || route.startsWith('/refund')) {
    return { changefreq: 'yearly', priority: '0.3' };
  }
  return { changefreq: 'monthly', priority: '0.8' };
}

// Derive static entries from seoConfig, excluding non-canonical routes (e.g. /results → canonical /proof)
const staticUrlEntries = Object.entries(seoConfig)
  // Skip blog post routes (handled separately below with accurate publishDate)
  .filter(([route]) => !route.startsWith('/blog/'))
  // Only include routes where the canonical URL matches the route itself
  .filter(([route, seo]) => {
    const expected = route === '/' ? SITE_URL : `${SITE_URL}${route}`;
    return seo.canonical === expected || seo.canonical === `${expected}/`;
  })
  .map(([route, _seo]) => {
    const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    const { changefreq, priority } = routeMeta(route);
    return { loc, lastmod: TODAY, changefreq, priority };
  });

// Blog posts get accurate lastmod from their publishDate field
const blogUrlEntries = blogPosts.map((post) => ({
  loc: `${SITE_URL}/blog/${post.slug}`,
  lastmod: post.publishDate ?? TODAY,
  changefreq: 'monthly',
  priority: '0.7',
}));

const allEntries = [...staticUrlEntries, ...blogUrlEntries];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    (e) =>
      `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`✓ Generated sitemap.xml with ${allEntries.length} URLs`);

// Also update the public/ copy so dev server serves it too
fs.writeFileSync(path.join(ROOT, 'public', 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`✓ Updated public/sitemap.xml`);
