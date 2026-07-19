/**
 * Fix remaining truncated blog meta descriptions.
 * Run: tsx scripts/fix-blog-meta.ts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const metaPath = path.resolve(__dirname, '..', 'artifacts', 'sysmoai-website', 'src', 'data', 'blogMeta.ts');

let content = fs.readFileSync(metaPath, 'utf-8');

const fixes: { slug: string; oldDesc: string; newDesc: string }[] = [
  {
    slug: 'creators-future-shock-ai-native-dominance-2027',
    oldDesc: '"It"',
    newDesc: '"By 2027, creators who use automated AI content pipelines will dominate every platform. Those still posting manually will be outpaced 10x. Here\'s how the creator economy is splitting in two."',
  },
  {
    slug: 'students-free-ai-study-system-setup-2026',
    oldDesc: '"You don"',
    newDesc: '"You don\'t need to spend a single taka to build your AI study system. This guide uses 100% free tools — Notion, ChatGPT free tier, and open resources — to build a complete study system in 30 minutes."',
  },
  {
    slug: 'students-future-shock-2027-ai-hiring-gap',
    oldDesc: '"It"',
    newDesc: '"By 2027, employers will expect candidates to demonstrate AI skills. Job interviewers may ask about AI systems you\'ve built. Students who prepare today will enter the job market with a clear competitive advantage."',
  },
  {
    slug: 'students-transformation-physics-ai-system-2026',
    oldDesc: '"She was staring at her physics midterm result: 42%. Not because she didn\u2019t study \u2014 she studied 6 hours a day. The problem wasn\u2019t effort. The problem was th"',
    newDesc: '"She was staring at her physics midterm result: 42%. Not because she didn\'t study \u2014 she studied 6 hours a day. The problem wasn\'t effort. An AI study system turned her grades around from failing to first class."',
  },
  {
    slug: 'students-chatgpt-failing-wake-up-2026',
    oldDesc: '"You open ChatGPT, type your question, read the answer, and close the tab. You"',
    newDesc: '"You open ChatGPT, type your question, read the answer, and close the tab. You\'ve been doing this for two years and think you know AI. Here\'s the uncomfortable truth about how students misuse AI and what to do instead."',
  },
  {
    slug: 'ai-consulting-practice-system-2026',
    oldDesc: '"The best consultants in 2026 deliver work in half the time \u2014 at double the quality. Their secret isn\u2019t having 20 years of experien"',
    newDesc: '"The best consultants in 2026 deliver work in half the time \u2014 at double the quality. Their secret isn\'t working harder or having more experience. It\'s having AI systems that handle research, proposals, and reporting."',
  },
  {
    slug: 'ai-sme-business-automation-2026',
    oldDesc: '"Rashid earns \u09F340,000/month from his shop in Mirpur. He works 12 hours a day. His phone never stops buzzing \u2014 WhatsApp orders, customer complaints, supplier"',
    newDesc: '"Rashid earns \u09F340,000/month from his shop in Mirpur. He works 12 hours a day. His phone never stops buzzing \u2014 WhatsApp orders, customer complaints, supplier follow-ups. He automated half his workload for just \u09F33,750."',
  },
  {
    slug: 'ai-study-system-students-2026',
    oldDesc: '"It"',
    newDesc: '"It\'s 11 PM. You\'ve been staring at the same thermodynamics chapter for 4 hours. Your classmate finished 2 hours ago and scored 15% higher on the quiz. The difference isn\'t intelligence \u2014 it\'s AI study systems."',
  },
  {
    slug: 'ai-corporate-training-teams-2026',
    oldDesc: '"78% of your team is already using AI. They"',
    newDesc: '"78% of your team is already using AI. They\'re pasting client data into ChatGPT, writing emails with it, generating reports. Without training and governance, you\'re exposed to data leaks, brand risk, and wasted spend."',
  },
  {
    slug: 'agencies-system-reveal-ai-agency-stack-2026',
    oldDesc: '"A mid-size digital agency in Gulshan runs 14 active clients. They have 8 team members. Without AI, 14 clients at this size would require at least 20 people"',
    newDesc: '"A mid-size digital agency in Gulshan runs 14 active clients with 8 team members. Without AI, this would require 20 people. Discover the complete AI agency stack that makes this efficiency possible."',
  },
  {
    slug: 'consultants-free-value-ai-report-generator-2026',
    oldDesc: '"You"',
    newDesc: '"You\'ve just finished a 3-hour client interview with 15 pages of notes and 4 data exports. An AI research and report generator can turn raw insights into a polished client deliverable in minutes, not days."',
  },
  {
    slug: 'consultants-wake-up-non-billable-time-ai-2026',
    oldDesc: '"Track your hours for one week \u2014 not your billable hours, your actual hours. Every email. Every proposal. Every report draft. Every meeting summary. Every a"',
    newDesc: '"Track your hours for one week \u2014 every email, every proposal, every report draft, every meeting summary, every admin task. That\'s up to 60% of your time. AI can automate the non-billable work so you focus on what pays."',
  },
  {
    slug: 'sme-founders-wake-up-847-whatsapp-messages-2026',
    oldDesc: '"You wake up. 847 unread WhatsApp messages. 23 missed calls. Your operations manager is asking about inventory. A customer is complaining about a late deliv"',
    newDesc: '"You wake up. 847 unread WhatsApp messages. 23 missed calls. Your operations manager is asking about inventory. A customer is complaining about a late delivery. Your business is running you. Here\'s how to fix it."',
  },
  {
    slug: 'corporates-free-value-ai-workshop-guide-2026',
    oldDesc: '"Your team already uses AI. ChatGPT for emails, Claude for summaries, Bard for research. They use it individually, unofficially, inconsistently. Some are do"',
    newDesc: '"Your team already uses AI individually, unofficially, inconsistently. Some are doing it well, most aren\'t. Run your first AI team workshop in 1 day with this complete facilitator guide."',
  },
  {
    slug: 'corporates-system-reveal-enterprise-ai-playbook-2026',
    oldDesc: '"Most corporate AI initiatives fail for the same reason: they start with tools, not with a plan. Someone attends a conference, gets excited about ChatGPT, b"',
    newDesc: '"Most corporate AI initiatives fail for the same reason: they start with tools, not with a plan. Someone gets excited about ChatGPT, buys enterprise licenses, and nobody uses them. Here\'s a better 90-day approach."',
  },
  {
    slug: 'agencies-wake-up-competitor-doubled-output-2026',
    oldDesc: '"Somewhere in Dhanmondi right now, an agency you compete with is completing a social media campaign brief in 45 minutes that used to take your team a full d"',
    newDesc: '"Somewhere in Dhanmondi right now, an agency you compete with is completing a social media campaign brief in 45 minutes that used to take your team a full day. AI systems are creating a performance gap that\'s growing every week."',
  },
];

let fixesApplied = 0;
for (const fix of fixes) {
  if (content.includes(fix.oldDesc)) {
    const idx = content.indexOf(fix.oldDesc);
    const before = content.slice(Math.max(0, idx - 100), idx);
    console.log(`Found in ${fix.slug}: "${fix.oldDesc}" at context: ...${before.slice(-60)}`);
    
    content = content.replace(fix.oldDesc, fix.newDesc);
    fixesApplied++;
  } else {
    console.log(`✗ NOT FOUND in ${fix.slug}: "${fix.oldDesc}"`);
  }
}

fs.writeFileSync(metaPath, content, 'utf-8');
console.log(`\nApplied ${fixesApplied}/${fixes.length} fixes.`);

// Now verify
const postContent = fs.readFileSync(metaPath, 'utf-8');
let remaining = 0;
for (const fix of fixes) {
  if (postContent.includes(fix.oldDesc)) {
    console.log(`  STILL PRESENT: ${fix.slug}`);
    remaining++;
  }
}
console.log(`\nRemaining truncated descriptions: ${remaining}`);
