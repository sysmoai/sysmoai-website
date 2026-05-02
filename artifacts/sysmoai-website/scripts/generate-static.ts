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

// ---------------------------------------------------------------------------
// Inline the minimal data we need so this script has zero extra imports
// (blogPosts is huge — we pull only slug + title + metaDescription + publishDate)
// ---------------------------------------------------------------------------

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

  // Insert new head content just after <head>
  result = result.replace(/<head>/i, `<head>\n${headContent}`);
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
// 4. Generate dynamic sitemap.xml
// ---------------------------------------------------------------------------

const TODAY = new Date().toISOString().slice(0, 10);

const staticUrlEntries = [
  { loc: 'https://sysmoai.com/', lastmod: TODAY, changefreq: 'weekly', priority: '1.0' },
  { loc: 'https://sysmoai.com/services', lastmod: TODAY, changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://sysmoai.com/about', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/contact', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/pricing', lastmod: TODAY, changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://sysmoai.com/proof', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/free-ai-audit', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/faq', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/blog', lastmod: TODAY, changefreq: 'weekly', priority: '0.8' },
  // Service pages
  { loc: 'https://sysmoai.com/services/ai-quick-win', lastmod: TODAY, changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://sysmoai.com/services/ai-sprint', lastmod: TODAY, changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://sysmoai.com/services/ai-retainer', lastmod: TODAY, changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://sysmoai.com/services/ai-coaching', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/services/group-workshop', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/services/notion-os', lastmod: TODAY, changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://sysmoai.com/services/ai-agent-dev', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/services/n8n-automation', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/services/corporate-training', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/services/international', lastmod: TODAY, changefreq: 'monthly', priority: '0.7' },
  // For pages
  { loc: 'https://sysmoai.com/for/students', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/for/job-seekers', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/for/freelancers', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/for/researchers', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/for/agencies', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/for/sme-founders', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/for/f-commerce', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/for/consultants', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/for/creators', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://sysmoai.com/for/corporates', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  // Legal
  { loc: 'https://sysmoai.com/privacy-policy', lastmod: TODAY, changefreq: 'yearly', priority: '0.3' },
  { loc: 'https://sysmoai.com/terms-of-service', lastmod: TODAY, changefreq: 'yearly', priority: '0.3' },
  { loc: 'https://sysmoai.com/refund-policy', lastmod: TODAY, changefreq: 'yearly', priority: '0.3' },
];

// Add blog posts dynamically
const blogUrlEntries = blogPosts.map((post) => ({
  loc: `https://sysmoai.com/blog/${post.slug}`,
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
