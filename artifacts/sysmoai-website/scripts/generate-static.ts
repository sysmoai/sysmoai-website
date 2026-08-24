/**
 * Post-build script: generates per-route static HTML files with the correct
 * title, meta, canonical, Open Graph, and JSON-LD tags baked in.
 *
 * It also creates sitemap.xml from canonical routes only. Historical offer,
 * proof, answer, and article URLs remain eligible for safe static metadata when
 * present in seoConfig, but they are excluded from the sitemap when canonicalized
 * elsewhere.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist', 'public');

const { seoConfig } = (await import('../src/data/seo.js')) as typeof import('../src/data/seo');

const indexPath = path.join(DIST, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error(`ERROR: ${indexPath} not found. Run "vite build" first.`);
  process.exit(1);
}
const baseHtml = fs.readFileSync(indexPath, 'utf-8');

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
  ogType: string,
  schemas: unknown[],
): string {
  const schemaBlocks = schemas
    .map((schema, index) => `  <script type="application/ld+json" data-page-schema="${index}">${JSON.stringify(schema)}</script>`)
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

function injectIntoHtml(html: string, headContent: string): string {
  let result = html;
  result = result.replace(/<title>[^<]*<\/title>/i, '');
  result = result.replace(/<meta\s+name="description"[^>]*>/gi, '');
  result = result.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  result = result.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '');
  result = result.replace(/<meta\s+property="twitter:[^"]*"[^>]*>/gi, '');
  result = result.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '');
  result = result.replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi, '');

  const charsetMatch = result.match(/<meta\s+charset[^>]*>/i);
  if (charsetMatch && charsetMatch.index !== undefined) {
    const insertAt = charsetMatch.index + charsetMatch[0].length;
    return result.slice(0, insertAt) + '\n' + headContent + result.slice(insertAt);
  }
  return result.replace(/<head>/i, `<head>\n${headContent}`);
}

let generated = 0;
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
    seo.ogType ?? 'website',
    seo.schemas ?? [],
  );
  fs.writeFileSync(file, injectIntoHtml(baseHtml, headContent), 'utf-8');
  generated++;
}
console.log(`✓ Generated ${generated} static HTML files`);

const TODAY = new Date().toISOString().slice(0, 10);
const SITE_URL = 'https://sysmoai.com';

function routeMeta(route: string): { changefreq: string; priority: string } {
  if (route === '/') return { changefreq: 'weekly', priority: '1.0' };
  if (route === '/services') return { changefreq: 'monthly', priority: '0.9' };
  if (route === '/about' || route === '/contact') return { changefreq: 'monthly', priority: '0.8' };
  if (route === '/blog') return { changefreq: 'monthly', priority: '0.6' };
  if (route.startsWith('/privacy') || route.startsWith('/terms') || route.startsWith('/refund')) {
    return { changefreq: 'yearly', priority: '0.3' };
  }
  return { changefreq: 'monthly', priority: '0.5' };
}

const entries = Object.entries(seoConfig)
  .filter(([route, seo]) => {
    const expected = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    return seo.canonical === expected || seo.canonical === `${expected}/`;
  })
  .map(([route]) => {
    const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    const { changefreq, priority } = routeMeta(route);
    return { loc, lastmod: TODAY, changefreq, priority };
  });

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.join(ROOT, 'public', 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`✓ Generated sitemap.xml with ${entries.length} canonical URLs`);
