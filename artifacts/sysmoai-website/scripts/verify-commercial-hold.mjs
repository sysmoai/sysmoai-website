import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const app = read('src/App.tsx');
const publicPage = read('src/pages/PublicReview.tsx');
assert.match(app, /import PublicReview from/);
assert.doesNotMatch(app, /import Home from|component=\{Pricing\}|component=\{Services\}/);
assert.match(publicPage, /No price, delivery deadline, refund guarantee/);
const redirects = read('public/_redirects');
assert.doesNotMatch(redirects, /^\s*\/\*\s+\/index\.html\s+200\s*$/m);
assert.equal((redirects.match(/\s301\s*$/gm) || []).length, 15, 'Keep all historical 301s');
const required = ['index.html', 'services/index.html', 'services/ai-sprint/index.html',
  'pricing/index.html', 'proof/index.html', 'faq/index.html', 'terms-of-service/index.html',
  'refund-policy/index.html', 'contact/index.html'];
for (const relative of required) {
  const html = read(path.join('dist/public', relative));
  assert.match(html, /Information Under Review|Under Review|Practical AI Systems|Evidence Standard|Frequently Asked Questions|About SYSmoAI|Contact Details/);
  assert.doesNotMatch(html, /৳|\$600|\$250\/mo|3-day delivery|14-day build|full refund if|Results-first guarantee|60.80% below/i,
    'Unsafe published claim in ' + relative);
  assert.match(html, /<link\s+rel="canonical"/i);
}
console.log('PASS: public review bundle, neutral static metadata, 15 legacy redirects, and route HTML checks.');
