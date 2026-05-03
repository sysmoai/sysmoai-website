import { RefreshCw } from 'lucide-react';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export default function AIRetainer() {
  return (
    <ServicePageTemplate
      metaTitle="AI Retainer — Monthly AI Operations Management | SYSmoAI"
      icon={RefreshCw}
      title="AI Operations Retainer"
      headline="Your AI Systems. Managed. Every Month."
      bdPrice="৳20,000/month"
      usdPrice="$250/month"
      guarantee="Cancel anytime"
      directAnswer="The AI Retainer is SYSmoAI's monthly managed service at ৳20,000/month ($250/month) — 4–8 hours of hands-on AI work, monthly system improvements, priority WhatsApp support (2-hour response), and a monthly performance report. Cancel anytime, no lock-in."
      whatItIs="The AI Retainer is a monthly managed service where SYSmoAI acts as your ongoing AI operations partner. Each month, we improve your existing systems, add new automations, fix issues, and identify new AI opportunities as your business evolves. Perfect for post-Sprint clients or businesses that want continuous AI improvement without hiring a full-time AI person."
      deliverables={[
        '4–8 hours of hands-on AI work per month',
        'Monthly improvements to existing automations',
        'Priority WhatsApp support (we respond within 2 hours)',
        'Monthly AI performance report',
        'Up to 2 new workflow automations per month',
        'Proactive AI opportunity identification',
      ]}
      bestFor={[
        'Post-Sprint clients (continue what we started)',
        'Operations-heavy businesses',
        'Teams that want AI to keep evolving',
        'Founders who want an AI partner, not just a vendor',
        'Businesses with changing needs month to month',
      ]}
      beforeAfter={[
        { before: 'AI systems built once and left to degrade or become outdated', after: 'Systems evolve monthly — always improving, always relevant' },
        { before: 'New workflow problems pile up with no one to solve them', after: 'New automations added each month as your business grows' },
        { before: 'No visibility into how your AI systems are actually performing', after: 'Monthly report with usage, savings, and next improvement plan' },
      ]}
      steps={[
        { title: 'Month 1 Kickoff', desc: 'We audit your current systems, identify top priorities, and build your first monthly improvement plan.' },
        { title: 'Monthly Build Cycle', desc: 'We execute the agreed improvements, keep you updated via WhatsApp, and deliver a summary at month end.' },
        { title: 'Continuous Optimization', desc: 'Each month builds on the last. Your AI OS gets smarter, faster, and more comprehensive over time.' },
      ]}
      faqs={[
        { q: 'Do I need to have done a Sprint first?', a: 'Not required, but recommended. We can start a Retainer from scratch — we\'ll just spend the first month auditing and building a foundation.' },
        { q: 'Can I cancel anytime?', a: 'Yes. Monthly billing, cancel before the next billing cycle. No lock-in, no cancellation fee.' },
        { q: 'What if I need more than 4–8 hours this month?', a: 'We\'ll let you know in advance and offer an add-on block at a discounted hourly rate for Retainer clients.' },
        { q: 'How does communication work?', a: 'Priority WhatsApp channel — we respond within 2 hours during working hours. Monthly video call for planning.' },
        { q: 'What\'s the minimum commitment?', a: '1 month. Most clients stay 6–12+ months because the value compounds over time.' },
      ]}
      relatedServices={[
        { href: '/services/ai-sprint', label: 'F-Commerce AI Sprint (start here)', price: '৳50,000' },
        { href: '/services/ai-quick-win', label: 'AI Quick Win (try first)', price: '৳3,750–7,500' },
        { href: '/services/other-engagements', label: 'Other Engagements', price: 'By inquiry' },
      ]}
    />
  );
}
