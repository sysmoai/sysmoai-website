import { AudiencePageTemplate } from '@/components/AudiencePageTemplate';

export default function Students() {
  return (
    <AudiencePageTemplate
      metaTitle="AI Tools for Students Bangladesh | Study Smarter with SYSmoAI"
      segment="Students"
      heroHeadline="Your Classmates Are Using AI. Are You?"
      heroSub="Don't graduate without AI skills. In Bangladesh's job market right now, AI knowledge is the difference between getting hired and getting ignored."
      painPoints={[
        { emoji: '📚', label: 'My prompts are terrible', desc: 'I use ChatGPT sometimes but I don\'t really know how to use it properly.' },
        { emoji: '💼', label: 'No replies from employers', desc: 'I\'ve applied to 30+ jobs. No replies. My CV looks like everyone else\'s.' },
        { emoji: '🎯', label: 'No freelance portfolio', desc: 'I want to start freelancing on Fiverr but have no portfolio, no skills, no idea where to start.' },
        { emoji: '🐌', label: 'Thesis is taking forever', desc: 'Literature review alone took 3 weeks. There must be a faster way.' },
        { emoji: '📱', label: 'Notes scattered everywhere', desc: 'All my notes and resources are scattered across 5 different apps. Total chaos.' },
        { emoji: '😰', label: '"Learn AI" — but which AI?', desc: 'Everyone says learn AI but nobody explains WHICH AI, for WHAT task, in what order.' },
      ]}
      beforeAfter={[
        { before: 'Applying for 50 jobs, getting 0 replies — CV looks identical to every other student', after: 'CV with AI skills listed, portfolio projects linked, interviews booked' },
        { before: 'Thesis literature review taking 6 months of manual reading', after: 'Literature review done in 3 days using AI tools — organized and cited' },
        { before: 'Zero freelance income, no idea where to start', after: 'First Fiverr order within 30 days of the program' },
      ]}
      solutions={[
        { icon: '🧠', title: 'AI Skills Blueprint', desc: 'We map exactly which AI tools to learn for your specific career goal — no wasted time on the wrong tools.' },
        { icon: '📄', title: 'AI-Powered CV + Portfolio', desc: 'We rewrite your CV with AI skills highlighted and build your first portfolio using your existing projects.' },
        { icon: '💻', title: 'Freelance Launchpad', desc: 'Prompts, tools, and your first Fiverr/Upwork gig set up and ready to receive orders within 30 days.' },
        { icon: '🔬', title: 'Research OS', desc: 'Notion + AI workflow for faster thesis writing — from idea to draft, 3x quicker than manual methods.' },
      ]}
      relevantServices={[
        { href: '/services/ai-coaching', label: '1:1 AI Coaching', price: '৳2,500/session' },
        { href: '/services/group-workshop', label: 'Group AI Workshop', price: '৳500/person' },
        { href: '/services/notion-os', label: 'Notion OS Build', price: '৳15,000–50,000' },
      ]}
      finalCtaHeadline="Ready to build AI skills that get you hired?"
      faqs={[
        { q: 'I\'m a beginner — is this right for me?', a: 'Yes. We start from zero. No prior AI knowledge required. Most students who come to us have only used ChatGPT casually.' },
        { q: 'How long does it take to see results?', a: 'For CV + portfolio work: 1–2 weeks. For AI skills learning: 30 days to competent, 60 days to confident freelancer.' },
        { q: 'Is 1:1 coaching available in Bangla?', a: 'Yes. All coaching sessions can be conducted in Bangla, English, or mixed.' },
        { q: 'What if I\'m still in university and have limited budget?', a: 'The Group Workshop at ৳500/person is our most affordable option. 1:1 coaching at ৳2,500/session is also accessible for most students.' },
        { q: 'Can I start freelancing while still studying?', a: 'Absolutely — and many of our student clients do. We\'ll set up your Fiverr profile and first service package around your study schedule.' },
      ]}
    />
  );
}
