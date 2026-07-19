import { Timer } from 'lucide-react';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export default function AISprint() {
  return (
    <ServicePageTemplate
      metaTitle="AI Sprint — Full AI Stack Deployed in 14 Days | SYSmoAI"
      icon={Timer}
      title="AI Implementation Sprint"
      headline="Full AI Stack. Deployed in 14 Days."
      bdPrice="৳25,000–50,000"
      whatItIs="The AI Sprint is our most comprehensive implementation service — a full custom AI operating system designed, built, and deployed for your business in 14 days. We handle everything: process analysis, tool selection, automation build, team training, and 3 months of post-launch support. This is the service for businesses that are serious about AI transformation."
      deliverables={[
        'Complete AI system designed and deployed (3–5 workflows)',
        'Full team training session (2–4 hours)',
        '3 months of post-launch support and optimization',
        'Video documentation for every system built',
        'Standard Operating Procedures (SOPs) written',
        'Integration with your existing tools',
      ]}
      bestFor={[
        'Digital agencies',
        'SME founders',
        'E-commerce businesses',
        'Growing teams with multiple workflow problems',
        'Businesses after a successful Quick Win',
      ]}
      beforeAfter={[
        { before: 'Multiple manual workflows eating 20+ hours/week across your team', after: 'AI handles the repetitive work — your team focuses on growth' },
        { before: 'Disconnected tools, manual data transfer, no central system', after: 'Everything connected in one AI operating system' },
        { before: 'No documentation, no training — if you\'re sick, the business stops', after: 'SOPs, training, and systems that run without you in the room' },
      ]}
      steps={[
        { title: 'Audit (Days 1–2)', desc: 'Deep-dive into your operations. We map every workflow, identify the top 3–5 bottlenecks, and design your AI system architecture.' },
        { title: 'Build (Days 3–12)', desc: 'We build every automation and system, testing as we go. Daily progress updates via WhatsApp. You review before we finalize.' },
        { title: 'Launch + Train (Days 13–14)', desc: 'Full team training session. System goes live. 3-month support period begins. We optimize based on real-world usage.' },
      ]}
      faqs={[
        { q: 'What\'s included in "3 months of support"?', a: 'Priority WhatsApp access, bug fixes, optimization tweaks, and one additional workflow addition per month. It\'s full ongoing support — not just email.' },
        { q: 'What tools will you use?', a: 'Notion, n8n, Zapier, ChatGPT, Claude, WhatsApp Business API, Google Workspace, and any tools you already use. We work with your existing stack.' },
        { q: 'How does payment work?', a: '50% upfront to begin, 50% on delivery. We accept bKash, Nagad, bank transfer, Wise, and Payoneer.' },
        { q: 'What if I need more than 5 workflows?', a: 'We scope the Sprint for the highest-ROI workflows. Additional workflows can be added via the AI Retainer post-Sprint.' },
        { q: 'Is this service right for me if I\'m not technical?', a: 'Absolutely. The Sprint is designed for non-technical founders and teams. We handle 100% of the technical work. You just show up for briefings and approvals.' },
      ]}
      relatedServices={[
        { href: '/services/ai-retainer', label: 'AI Retainer (ongoing)', price: '৳20,000/month' },
        { href: '/services/ai-quick-win', label: 'AI Quick Win (start small)', price: '৳3,750–7,500' },
        { href: '/services/corporate-training', label: 'Corporate Training', price: '৳50,000–2,00,000' },
      ]}
    />
  );
}
