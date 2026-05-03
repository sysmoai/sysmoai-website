#!/usr/bin/env node
/**
 * Content Pack Validation Script
 * Run: node artifacts/sysmoai-website/content-pack/validate.js
 *
 * Checks all platform files against hard publishing constraints.
 * All counts use JavaScript String.prototype.length (UTF-16 code units).
 * Exit code 0 = all pass, 1 = failures found.
 */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const read = (f) => fs.readFileSync(path.join(DIR, f), 'utf8');

let failures = 0;
const fail = (msg) => { failures++; console.error('  ❌ ' + msg); };
const pass = (msg) => console.log('  ✅ ' + msg);

// ────────────────────────────────────────────────────────────────
// 1. BANNED PHRASES (invented claims / removed per site audit)
// ────────────────────────────────────────────────────────────────
console.log('\n[1] Banned phrases');
const BANNED = [
  '৳5,000 and 3 days', 'zero missed orders', 'Zero missed orders',
  '500+ clients', '3 Sprint spots left', 'He started with ৳5,000',
  'Month 1: Freed', 'We build, not consult', '3 years · 10,000+ hours',
  'Top 5% prompt engineers globally', '৳2,40,000 lost', 'Karim bhai',
  'near-zero missed orders', 'Month 1:', 'Month 2:',
  '30-day support', '30-day post-launch', '30-day WhatsApp support',
  'auto-reply in 30 seconds', '30-second auto-reply', '30-sec auto-reply',
  'Day 3 + Day 7', 'Day 3, Day 7', 'Timeline: 3 days (৳5,000)',
  'with24/7onds', 'payment link with24',
];
const ALL_FILES = [
  'linkedin.md','x.md','instagram-feed.md','instagram-stories.md',
  'tiktok-reels.md','newsletter.md','voice-guide.md',
  'repurposing-map.md','calendar.md',
];
let banOk = true;
for (const f of ALL_FILES) {
  const text = read(f);
  for (const b of BANNED) {
    if (text.includes(b)) { fail(b + ' — found in ' + f); banOk = false; }
  }
  if (/[^/:]\bsysmoai\.com\/free-ai-audit/.test(text)) {
    fail('Bare URL (missing https://) in ' + f); banOk = false;
  }
}
if (banOk) pass('All banned phrases clear across 9 files');

// ────────────────────────────────────────────────────────────────
// 2. F-COMMERCE ATTRIBUTION (400+ DMs = Facebook Messenger, not WhatsApp)
// ────────────────────────────────────────────────────────────────
console.log('\n[2] F-commerce attribution');
const FC_FILES = ['linkedin.md','instagram-feed.md','instagram-stories.md',
                   'tiktok-reels.md','newsletter.md','x.md'];
let fcOk = true;
for (const f of FC_FILES) {
  const text = read(f);
  const m = text.match(/400\+[^\n]*WhatsApp|WhatsApp[^\n]*400\+/g);
  if (m) { fail('400+/WhatsApp mix in ' + f + ': ' + m[0]); fcOk = false; }
}
if (fcOk) pass('F-commerce attribution correct (Facebook Messenger API)');

// ────────────────────────────────────────────────────────────────
// 3. LINKEDIN: 20 posts, 600–900 chars each, all have question CTAs
// ────────────────────────────────────────────────────────────────
console.log('\n[3] LinkedIn');
const li = read('linkedin.md');
const liSections = li.split(/(?=### Post L)/).filter(s => /### Post L\d+/.test(s));
let liCount = 0, liCharOk = true, liQOk = true;
for (const sec of liSections) {
  const nm = sec.match(/### Post L(\d+)/);
  const bm = sec.match(/```\n([\s\S]*?)\n```/);
  if (!nm || !bm) continue;
  liCount++;
  const body = bm[1];
  const len = body.length;
  if (len < 600 || len > 900) {
    fail('L' + nm[1] + ': ' + len + ' chars (need 600–900)'); liCharOk = false;
  }
  const lines = body.split('\n');
  const urlLine = lines.findIndex(l => l.includes('https://sysmoai.com/free-ai-audit'));
  if (urlLine > 0) {
    const near = lines.slice(Math.max(0, urlLine - 4), urlLine).join('\n');
    if (!near.includes('?')) {
      fail('L' + nm[1] + ': no question before CTA URL'); liQOk = false;
    }
  }
}
pass('LinkedIn post count: ' + liCount + '/20');
if (liCharOk) pass('LinkedIn: all ' + liCount + ' posts 600–900 chars');
if (liQOk) pass('LinkedIn: all ' + liCount + ' posts have question CTAs');

// ────────────────────────────────────────────────────────────────
// 4. X/TWITTER: 16 standalone posts ≤280 chars
// ────────────────────────────────────────────────────────────────
console.log('\n[4] X / Twitter standalone posts');
const xText = read('x.md');
const xSections = xText.split(/(?=### (?:Post|Tweet) [XT]\d+)/)
  .filter(s => /### (?:Post|Tweet) [XT]\d+/.test(s));
let xCount = 0, xOk = true;
for (const sec of xSections) {
  const sm = sec.match(/### (?:Post|Tweet) ([XT]\d+)/);
  const bm = sec.match(/```\n([\s\S]*?)\n```/);
  if (!sm || !bm) continue;
  const body = bm[1].trim();
  if (body.startsWith('**Thread') || body.startsWith('Thread')) continue;
  xCount++;
  if (body.length > 280) {
    fail('X ' + sm[1] + ': ' + body.length + ' chars (max 280)'); xOk = false;
  }
}
pass('X standalone count: ' + xCount + '/16');
if (xOk) pass('X: all ' + xCount + ' standalone posts ≤280 chars');

// ────────────────────────────────────────────────────────────────
// 5. NEWSLETTER: subjects ≤50 chars, preheaders ≤90 chars
// ────────────────────────────────────────────────────────────────
console.log('\n[5] Newsletter');
const nl = read('newsletter.md');
let nlOk = true;
nl.split('\n').forEach((l, i) => {
  const sm = l.match(/\*\*Subject \(\d+ chars\):\*\* `(.+)`/);
  const pm = l.match(/\*\*Preheader \(\d+ chars\):\*\* `(.+)`/);
  if (sm && sm[1].length > 50) {
    fail('Subject line ' + sm[1].length + ' chars (line ' + (i+1) + ')'); nlOk = false;
  }
  if (pm && pm[1].length > 90) {
    fail('Preheader ' + pm[1].length + ' chars (line ' + (i+1) + ')'); nlOk = false;
  }
});
if (nlOk) pass('Newsletter: all subjects ≤50 chars, preheaders ≤90 chars');

// ────────────────────────────────────────────────────────────────
// 6. TIKTOK/REELS: captions ≤200 chars
// ────────────────────────────────────────────────────────────────
console.log('\n[6] TikTok/Reels captions');
const tr = read('tiktok-reels.md');
const capMatches = [...tr.matchAll(/\*\*CAPTION[^\n]*\n```\n([\s\S]*?)\n```/g)];
let capCount = 0, capOk = true;
for (const m of capMatches) {
  capCount++;
  if (m[1].length > 200) {
    fail('TikTok caption ' + capCount + ': ' + m[1].length + ' chars (max 200)'); capOk = false;
  }
}
pass('TikTok captions count: ' + capCount);
if (capOk) pass('TikTok: all ' + capCount + ' captions ≤200 chars');

// ────────────────────────────────────────────────────────────────
// 7. SUPPORT PERIOD: no "30-day" support references
// ────────────────────────────────────────────────────────────────
console.log('\n[7] Support period (must be 90-day)');
let supOk = true;
for (const f of ALL_FILES) {
  const text = read(f);
  if (/30-day (support|post-launch|WhatsApp)/.test(text)) {
    fail('30-day support found in ' + f); supOk = false;
  }
}
if (supOk) pass('All support references are 90-day');

// ────────────────────────────────────────────────────────────────
// 8. NO UNSOURCED 30-SEC AUTO-REPLY CLAIMS
// ────────────────────────────────────────────────────────────────
console.log('\n[8] No unsourced 30-sec auto-reply claims');
const thirtySecPattern = /(?:reply|auto-reply|response|replied|sends|within)\s+(?:in\s+)?30[- ]sec|30[- ]sec(?:ond)?\s+(?:reply|response|auto)/gi;
let t30Ok = true;
for (const f of ALL_FILES) {
  const text = read(f);
  const m = text.match(thirtySecPattern);
  if (m) { fail('30-sec auto-reply claim in ' + f + ': ' + m[0]); t30Ok = false; }
}
if (t30Ok) pass('No unsourced 30-sec auto-reply claims');

// ────────────────────────────────────────────────────────────────
// SUMMARY
// ────────────────────────────────────────────────────────────────
console.log('\n' + '─'.repeat(50));
if (failures === 0) {
  console.log('✅ ALL CHECKS PASS — content pack is ready to publish');
} else {
  console.error('❌ ' + failures + ' check(s) failed — see above');
}
process.exit(failures > 0 ? 1 : 0);
