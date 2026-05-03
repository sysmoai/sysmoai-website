import { AudiencePageTemplate } from '@/components/AudiencePageTemplate';

export default function Agencies() {
  return (
    <AudiencePageTemplate
      metaTitle="AI for Digital Agencies Bangladesh | Scale Delivery with SYSmoAI"
      segment="Digital Agencies"
      heroHeadline="Your Clients Are Asking For AI Services. Can You Deliver?"
      heroSub="While you figure out AI, AI-powered agencies are closing YOUR clients. SYSmoAI deploys your complete agency AI stack — in 14 days."
      painPoints={[
        { emoji: '🏃', label: 'Competitor just pitched with AI — you had nothing', desc: 'A competitor agency just pitched our client with AI-powered content production. We had nothing to show.' },
        { emoji: '⏳', label: 'Content production takes 3x too long', desc: 'Content production is a bottleneck for our own clients. We\'re the slow link in the chain.' },
        { emoji: '📝', label: 'Proposals take 3-5 hours each', desc: 'We lose 1-2 days per week just writing proposals. It\'s unsustainable at our growth stage.' },
        { emoji: '📉', label: 'Losing retainer clients to AI agencies', desc: 'They say our output is "slow compared to AI-powered agencies." We\'re losing contracts we should be winning.' },
        { emoji: '🧑‍💼', label: 'Team has no AI skills', desc: 'I can\'t start this transition without a training budget I don\'t have. Nobody on the team knows where to begin.' },
        { emoji: '🔧', label: 'Zero systems — every project from scratch', desc: 'We deliver projects but have no repeatable systems. Every project reinvents the wheel.' },
      ]}
      beforeAfter={[
        { before: '3-5 hour proposal writing — starting from scratch every time, inconsistent quality', after: '30-minute AI-assisted proposal using your templates, consistent and faster' },
        { before: 'Manual content production bottleneck — team can\'t keep up with client demand', after: 'AI content workflow — 5x output from the same team, same hours' },
        { before: 'No AI services to offer — watching AI agencies take your clients', after: 'AI consulting added to your service menu as a new, high-margin revenue stream' },
      ]}
      solutions={[
        { icon: '⚡', title: 'AI Content Production System', desc: 'Workflow that cuts production time by 60%+ — from brief to final delivery, systematized with AI.' },
        { icon: '📋', title: 'Agency OS in Notion', desc: 'Project management, client dashboards, SOPs, and delivery tracking — everything your team needs in one place.' },
        { icon: '🤖', title: 'AI Proposal Builder', desc: 'Template system that generates winning proposals in 30 minutes — consistent, professional, on-brand.' },
        { icon: '🧠', title: 'Team AI Training', desc: 'Half-day hands-on workshop that upskills your entire team with industry-specific exercises.' },
      ]}
      relevantServices={[
        { href: '/services/ai-sprint', label: 'F-Commerce AI Sprint', price: '৳50,000' },
        { href: '/services/ai-retainer', label: 'AI Retainer', price: '৳20,000/month' },
        { href: '/services/group-workshop', label: 'Group AI Workshop', price: '৳500/person' },
      ]}
      finalCtaHeadline="Ready to become the AI agency your clients want?"
      faqs={[
        { q: 'Can you build us AI services we can sell to our own clients?', a: 'Yes. This is one of the most valuable outcomes of working with SYSmoAI. We help you productize AI services you can offer under your own brand at premium rates.' },
        { q: 'How long does the full agency AI stack deployment take?', a: 'The AI Sprint takes 14 days. Realistically, your team is using the new systems by Day 10 and trained by Day 14.' },
        { q: 'What if our team is resistant to change?', a: 'Resistance usually comes from fear of being replaced. Our training reframes AI as a tool that makes them more valuable, not redundant. The hands-on workshop approach converts skeptics fast.' },
        { q: 'Can you work with white-label arrangements?', a: 'Yes. Some agencies work with SYSmoAI as a backend AI partner — we build, you deliver under your brand. Available on Retainer.' },
        { q: 'Do you have experience with agencies specifically?', a: 'Agencies are one of our primary client segments. We understand your business model, margins, and client management challenges.' },
      ]}
    />
  );
}
