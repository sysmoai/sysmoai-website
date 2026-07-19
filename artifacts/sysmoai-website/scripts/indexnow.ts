/**
 * IndexNow auto-notification script
 * Pings Bing, Yandex, and Seznam whenever site content changes.
 *
 * Run after build/deploy: tsx scripts/indexnow.ts
 *
 * Docs: https://www.indexnow.org/documentation
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { notifyGoogle } from './google-indexing';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist', 'public');

const INDEXNOW_KEY = 'sysmoai-indexnow-7a3f9e2b';
const INDEXNOW_HOST = 'https://sysmoai.com';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const MANIFEST_PATH = path.join(ROOT, '.indexnow-manifest.json');

/**
 * Map a site URL to its generated static HTML file in dist/public.
 * e.g. https://sysmoai.com/blog/foo -> dist/public/blog/foo/index.html
 */
function htmlFileForUrl(url: string): string | null {
  let routePath: string;
  try {
    routePath = new URL(url).pathname;
  } catch {
    return null;
  }
  const rel = routePath === '/' ? 'index.html' : path.join(routePath.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
  const file = path.join(DIST, rel);
  return fs.existsSync(file) ? file : null;
}

/**
 * Hash the content of a page, ignoring build-artifact noise (hashed JS/CSS
 * bundle filenames) so that a rebuild without content changes does not mark
 * every page as changed.
 */
function hashPage(file: string): string {
  let html = fs.readFileSync(file, 'utf-8');
  // Normalize hashed asset references like /assets/index-BX3k9f2a.js
  html = html.replace(/\/assets\/[\w.-]+-[\w]{8,}\.(js|css)/g, '/assets/ASSET.$1');
  return crypto.createHash('sha256').update(html).digest('hex');
}

type Manifest = Record<string, string>;

function loadManifest(): Manifest | null {
  try {
    if (!fs.existsSync(MANIFEST_PATH)) return null;
    const parsed = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed as Manifest;
    return null;
  } catch {
    return null;
  }
}

async function notifyIndexNow(urls: string[]): Promise<void> {
  const payload = {
    host: 'sysmoai.com',
    key: INDEXNOW_KEY,
    keyLocation: `${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const body = await res.text();
  if (!res.ok) {
    console.warn(`⚠️ IndexNow failed (${res.status}): ${body} — continuing (non-fatal)`);
    return;
  }
  console.log(`✅ IndexNow: ${urls.length} URLs submitted (${res.status})`);
}

async function main(): Promise<void> {
  // Generate the key file
  const keyPath = path.join(ROOT, 'public', `${INDEXNOW_KEY}.txt`);
  fs.writeFileSync(keyPath, INDEXNOW_KEY, 'utf-8');
  console.log(`✅ Key file: ${keyPath}`);

  // Also write to dist if it exists
  const distKeyPath = path.join(ROOT, 'dist', 'public', `${INDEXNOW_KEY}.txt`);
  if (fs.existsSync(path.dirname(distKeyPath))) {
    fs.writeFileSync(distKeyPath, INDEXNOW_KEY, 'utf-8');
    console.log(`✅ Key file (dist): ${distKeyPath}`);
  }

  // Derive URLs from sitemap.xml
  const sitemapPath = path.join(ROOT, 'public', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error(`❌ sitemap.xml not found at ${sitemapPath}`);
    process.exit(1);
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  // Build the current content-hash manifest from the generated static HTML
  const newManifest: Manifest = {};
  let unhashable = 0;
  for (const url of urls) {
    const file = htmlFileForUrl(url);
    if (file) {
      newManifest[url] = hashPage(file);
    } else {
      unhashable++;
    }
  }

  // Compare against the previous manifest; submit only new/changed URLs.
  // If no previous manifest exists, fall back to a full submission.
  const oldManifest = loadManifest();
  let urlsToSubmit: string[];
  if (!oldManifest) {
    console.log('ℹ️ No previous manifest found — submitting all URLs (full submission)');
    urlsToSubmit = urls;
  } else {
    urlsToSubmit = urls.filter((url) => {
      const newHash = newManifest[url];
      // No generated HTML to hash (unexpected) — submit to be safe
      if (!newHash) return true;
      return oldManifest[url] !== newHash;
    });
    console.log(
      `ℹ️ ${urlsToSubmit.length} of ${urls.length} URLs are new or changed since last run` +
        (unhashable > 0 ? ` (${unhashable} without static HTML, always submitted)` : ''),
    );
  }

  // Batch to stay under IndexNow's 10,000 URL limit per request
  const BATCH_SIZE = 10000;
  for (let i = 0; i < urlsToSubmit.length; i += BATCH_SIZE) {
    const batch = urlsToSubmit.slice(i, i + BATCH_SIZE);
    await notifyIndexNow(batch);
  }
  if (urlsToSubmit.length === 0) {
    console.log('✅ Nothing changed — no URLs submitted to IndexNow');
  }

  // Also surface the same changed URLs to Google (Indexing API); Google does
  // not support IndexNow. Non-fatal on failure or missing credentials.
  await notifyGoogle(urlsToSubmit);

  // Persist the manifest for the next run (only after successful processing)
  try {
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(newManifest, null, 2), 'utf-8');
    console.log(`✅ Manifest saved: ${MANIFEST_PATH} (${Object.keys(newManifest).length} entries)`);
  } catch (err) {
    console.warn('⚠️ Failed to save manifest (non-fatal):', err);
  }

  console.log(`✅ Done. ${urlsToSubmit.length}/${urls.length} URLs submitted from sitemap.xml`);
}

main().catch((err) => {
  // Never break the build/deploy over a notification failure
  console.warn('⚠️ IndexNow notification failed (non-fatal):', err);
});
