/**
 * Blog metadata validation script.
 * Run: tsx scripts/validate-blog-meta.ts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const metaPath = path.resolve(__dirname, '..', 'artifacts', 'sysmoai-website', 'src', 'data', 'blogMeta.ts');
const content = fs.readFileSync(metaPath, 'utf-8');

// Extract all entries by parsing the TypeScript array
const entries: { slug: string; title: string; metaDescription: string; line: number }[] = [];
const lines = content.split('\n');
let current: Partial<{ slug: string; title: string; metaDescription: string; line: number }> | null = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lineNum = i + 1;
  
  if (line.includes('slug:')) {
    current = { line: lineNum };
    const match = line.match(/slug:\s*"([^"]+)"/);
    if (match) current.slug = match[1];
  }
  if (line.includes('title:') && current) {
    const match = line.match(/title:\s*"([^"]+)"/);
    if (match) current.title = match[1];
  }
  if (line.includes('metaDescription:') && current) {
    // Handle multi-line or single-line descriptions
    const match = line.match(/metaDescription:\s*"([^"]*)/);
    if (match) {
      let desc = match[1];
      // Check if it continues on next lines
      if (!line.trim().endsWith('",') && !line.trim().endsWith('"')) {
        // Multi-line - just take what we have
      }
      current.metaDescription = desc;
    }
  }
  if (line.includes('},') && current && current.slug && current.metaDescription !== undefined) {
    entries.push(current as { slug: string; title: string; metaDescription: string; line: number });
    current = null;
  }
}

// Also handle the last entry
if (current && current.slug && current.metaDescription !== undefined) {
  entries.push(current as { slug: string; title: string; metaDescription: string; line: number });
}

console.log(`\nTotal entries found: ${entries.length}\n`);

// Validation checks
let failed = false;

// Check 1: Description too short (< 30 chars suggests truncation or placeholder)
const shortDescriptions = entries.filter(e => e.metaDescription.trim().length < 30);
if (shortDescriptions.length > 0) {
  console.log(`❌ ${shortDescriptions.length} entries have very short descriptions (< 30 chars):`);
  for (const e of shortDescriptions) {
    console.log(`   Line ${e.line}: [${e.slug}] → "${e.metaDescription}"`);
  }
  console.log();
  failed = true;
}

// Check 2: Description ends mid-word (no punctuation at end, ends with incomplete fragment)
const incompleteEndings = entries.filter(e => {
  const d = e.metaDescription.trim();
  // Ends without sentence-ending punctuation and is longer than 30 chars
  if (d.length > 30 && !/[.!?]$/.test(d)) {
    // Check if it ends with a complete word
    const lastWord = d.split(' ').pop() || '';
    return lastWord.length > 2; // Arbitrary: if last word > 2 chars, might be truncated
  }
  return false;
});
if (incompleteEndings.length > 0) {
  console.log(`❌ ${incompleteEndings.length} entries have descriptions ending mid-sentence:`);
  for (const e of incompleteEndings) {
    const end = e.metaDescription.trim().slice(-40);
    console.log(`   Line ${e.line}: [${e.slug}] …${end}`);
  }
  console.log();
  failed = true;
}

// Check 3: Description is just a single word like "It", "You", "They"
const singleWordDescs = entries.filter(e => {
  const d = e.metaDescription.trim();
  const words = d.split(/\s+/);
  return words.length <= 2 && d.length < 15;
});
if (singleWordDescs.length > 0) {
  console.log(`❌ ${singleWordDescs.length} entries have only 1-2 word descriptions:`);
  for (const e of singleWordDescs) {
    console.log(`   Line ${e.line}: [${e.slug}] → "${e.metaDescription}"`);
  }
  console.log();
  failed = true;
}

// Check 4: Duplicate titles
const titles = entries.map(e => e.title);
const dupeTitles = titles.filter((t, i) => titles.indexOf(t) !== i);
if (dupeTitles.length > 0) {
  console.log(`❌ ${dupeTitles.length} duplicate titles found:`);
  for (const t of [...new Set(dupeTitles)]) {
    console.log(`   "${t}"`);
  }
  console.log();
  failed = true;
}

// Check 5: Duplicate slugs
const slugs = entries.map(e => e.slug);
const dupeSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dupeSlugs.length > 0) {
  console.log(`❌ ${dupeSlugs.length} duplicate slugs found:`);
  for (const s of [...new Set(dupeSlugs)]) {
    console.log(`   "${s}"`);
  }
  console.log();
  failed = true;
}

if (!failed) {
  console.log('✅ All blog metadata entries pass validation.');
} else {
  console.log('⚠️ Some entries failed validation. See above.');
  process.exit(1);
}
