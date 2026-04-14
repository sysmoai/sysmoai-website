import { AudiencePageTemplate } from '@/components/AudiencePageTemplate';

export default function Corporates() {
  return (
    <AudiencePageTemplate
      metaTitle="Corporate AI Training Bangladesh | Enterprise AI Implementation | SYSmoAI"
      segment="Corporates & NGOs"
      heroHeadline="You Spent the Budget on AI Tools. But Your Team Still Works the Same Way."
      heroSub="Tools don't transform companies — systems and training do. SYSmoAI delivers enterprise AI implementation that actually changes how your team works."
      painPoints={[
        { emoji: '💸', label: 'ChatGPT for 50 employees — 10% use it', desc: 'We bought ChatGPT licenses for 50 employees 6 months ago. Most of them summarize emails, if that.' },
        { emoji: '📊', label: 'Monthly reports take 3 days', desc: 'Monthly reports take my team 3 days to compile. They\'re almost useless by the time they\'re done.' },
        { emoji: '🤷', label: 'AI strategy = slide deck', desc: 'We have an "AI strategy" but it\'s a slide deck. Nobody knows what to actually implement first.' },
        { emoji: '🎧', label: 'Customer support costs rising', desc: 'Customer support costs are increasing every year. We need automation but don\'t know where to start.' },
        { emoji: '📋', label: 'Processes in email chains', desc: 'Our processes exist in email chains and WhatsApp groups. New hires take 3 months to onboard.' },
        { emoji: '🧑‍💼', label: 'Middle management resistant', desc: 'The CEO wants AI transformation. The team is overwhelmed. Middle management is resistant.' },
      ]}
      beforeAfter={[
        { before: '৳50K/month AI tools, 10% adoption — expensive investment with no visible ROI', after: 'AI integrated into daily workflows, 80%+ adoption within 30 days — measurable time savings' },
        { before: '3-day monthly reporting — consuming senior staff time that should be strategic', after: 'Automated dashboard — report ready in 30 minutes, available live at any moment' },
        { before: 'AI strategy = a slide deck — nobody knows the first thing to actually implement', after: 'Implemented, measurable AI systems running across departments — with KPIs and owners' },
      ]}
      solutions={[
        { icon: '🏢', title: 'Enterprise AI Audit', desc: 'We interview stakeholders and map your workflows to find where AI saves the most time in your specific operation.' },
        { icon: '🧑‍💼', title: 'Team AI Training', desc: 'Full-day hands-on workshop with your industry\'s specific use cases — not generic AI theory.' },
        { icon: '🔄', title: 'Process Automation', desc: 'Your top 3 workflow bottlenecks automated with measurable ROI — designed for your exact operation.' },
        { icon: '📊', title: 'AI Strategy Roadmap', desc: '90-day implementation plan with specific initiatives, KPIs, and assigned owners — not a slide deck.' },
      ]}
      relevantServices={[
        { href: '/services/corporate-training', label: 'Corporate Training', price: '৳50,000–2,00,000' },
        { href: '/services/ai-sprint', label: 'AI Sprint', price: '৳25,000–50,000' },
        { href: '/services/ai-retainer', label: 'AI Retainer', price: '৳20,000/month' },
      ]}
      finalCtaHeadline="Ready for an AI transformation that actually works?"
      faqs={[
        { q: 'We\'ve had failed AI initiatives before — why will this be different?', a: 'Failed AI initiatives usually lack two things: a specific use case and trained users. We start with both — your highest-ROI use case, and a team that knows how to use the tools.' },
        { q: 'How do you handle organizational resistance to change?', a: 'We use a bottom-up approach — training the people who actually do the work, not just management. When staff see the tools make their jobs easier (not replace them), adoption follows.' },
        { q: 'Can you work with our procurement process?', a: 'Yes. We issue formal proposals, sign NDAs, and work within your procurement requirements. Standard contract and invoice available.' },
        { q: 'Do you offer an NDA?', a: 'Yes. All corporate engagements are covered by a mutual NDA before any discussions about your systems or data.' },
        { q: 'Can this be delivered remotely for teams in multiple cities?', a: 'Yes. We\'ve delivered enterprise training for teams split across Dhaka, Chittagong, and Sylhet — both remote and hybrid.' },
      ]}
    />
  );
}
