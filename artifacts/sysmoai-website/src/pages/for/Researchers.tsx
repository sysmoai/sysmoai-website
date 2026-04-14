import { AudiencePageTemplate } from '@/components/AudiencePageTemplate';

export default function Researchers() {
  return (
    <AudiencePageTemplate
      metaTitle="AI for Researchers Bangladesh | Research OS for Faster Papers | SYSmoAI"
      segment="Researchers & Academics"
      heroHeadline="Your Research Is Taking 3x Longer Than It Should."
      heroSub="Literature reviews. Note organization. Paper writing. Institutional deadlines. AI can cut your research timeline in half. We build the system for you."
      painPoints={[
        { emoji: '📚', label: 'Literature review took 4 weeks', desc: 'I read 200 papers manually. There has to be a better way than this.' },
        { emoji: '🗂️', label: 'Notes in 6 different places', desc: 'Google Docs, Zotero, physical notebooks, WhatsApp, email drafts. I can never find anything.' },
        { emoji: '✍️', label: 'Structuring takes longer than researching', desc: 'I know what I want to say but structuring the paper takes me longer than the research itself.' },
        { emoji: '⏰', label: '3 publications needed. 0 finished.', desc: 'My institution wants 3 publications this year. I\'ve finished 0. The writing bottleneck is killing me.' },
        { emoji: '🔗', label: 'Citation management nightmare', desc: 'Managing citations and references is a nightmare. I\'ve had wrong citations in final papers.' },
        { emoji: '🤝', label: 'Collaboration is a disaster', desc: 'I collaborate with co-authors in different cities. Version control is a disaster.' },
      ]}
      beforeAfter={[
        { before: '4-week literature review — reading 200 papers manually, no systematic process', after: '3-day AI-assisted literature review with organized, cited, searchable notes' },
        { before: 'Notes scattered across 6 apps — can\'t find your own ideas 3 months later', after: 'Single Research OS in Notion — everything searchable, tagged, and linked' },
        { before: 'Paper writing takes months — structure unclear, drafting slow and painful', after: 'Structured outline generated in 1 hour, full draft 3x faster with AI assistance' },
      ]}
      solutions={[
        { icon: '📖', title: 'Research OS Build', desc: 'Custom Notion workspace for notes, papers, references, timelines, and co-author collaboration.' },
        { icon: '🤖', title: 'AI Literature Review Workflow', desc: 'Systematic process using AI tools to screen, summarize, and organize papers — 3 days instead of 4 weeks.' },
        { icon: '✍️', title: 'Academic Writing Assistant Setup', desc: 'Prompt templates for structuring and drafting academic papers in your institution\'s required format.' },
        { icon: '📊', title: 'Research Project Management', desc: 'Deadlines, co-author coordination, publication tracker, and reviewer response management in one system.' },
      ]}
      relevantServices={[
        { href: '/services/notion-os', label: 'Notion OS Build', price: '৳15,000–50,000' },
        { href: '/services/ai-coaching', label: '1:1 AI Coaching', price: '৳2,500/session' },
        { href: '/services/ai-quick-win', label: 'AI Quick Win', price: '৳3,750–7,500' },
      ]}
      finalCtaHeadline="Ready to publish faster with AI?"
      faqs={[
        { q: 'Will AI compromise the academic integrity of my research?', a: 'No. We use AI as a research and organization tool, not to write your research for you. All literature review, analysis, and conclusions remain 100% yours. AI handles the administrative and organizational tasks.' },
        { q: 'Which AI tools work best for academic research?', a: 'Elicit, Consensus, Perplexity, and Claude for literature review. Notion for organization. Grammarly and Claude for writing refinement. We select based on your field.' },
        { q: 'Can this work for any research field?', a: 'Yes — we\'ve built Research OSes for social science, engineering, medicine, economics, and humanities researchers.' },
        { q: 'My institution has specific formatting requirements — can you accommodate?', a: 'Yes. We build your writing templates around your institution\'s requirements from the start.' },
        { q: 'I work with a research team of 5 people — can you build a shared OS?', a: 'Absolutely. Team Research OSes with role-based views and shared databases are one of our most requested builds.' },
      ]}
    />
  );
}
