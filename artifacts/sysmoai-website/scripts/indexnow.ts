/**
 * IndexNow auto-notification script
 * Pings Bing, Yandex, and Seznam whenever site content changes.
 *
 * Run after build/deploy: tsx scripts/indexnow.ts
 *
 * Docs: https://www.indexnow.org/documentation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const INDEXNOW_KEY = 'sysmoai-indexnow-7a3f9e2b';
const INDEXNOW_HOST = 'https://sysmoai.com';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

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
    console.error(`❌ IndexNow failed (${res.status}): ${body}`);
    process.exit(1);
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

  // Batch to stay under IndexNow's 10,000 URL limit per request
  const BATCH_SIZE = 10000;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    await notifyIndexNow(batch);
  }

  console.log(`✅ Total URLs notified: ${urls.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
