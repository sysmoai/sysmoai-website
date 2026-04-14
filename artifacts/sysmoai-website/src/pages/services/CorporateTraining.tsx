import { Building } from 'lucide-react';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export default function CorporateTraining() {
  return (
    <ServicePageTemplate
      metaTitle="Corporate AI Training Bangladesh | Enterprise AI Implementation | SYSmoAI"
      icon={Building}
      title="Corporate AI Training"
      headline="Turn Your Entire Team Into AI-Capable Operators."
      bdPrice="৳50,000–2,00,000"
      usdPrice="$1,500–$8,000"
      whatItIs="Enterprise-grade AI training and implementation for companies with 50+ employees. We don't just run a training day — we deliver a comprehensive AI transformation program: audit your operations, design a custom AI curriculum for your industry, run hands-on training sessions, implement the top 3 workflow automations, and give you a 90-day AI roadmap with KPIs."
      deliverables={[
        'Enterprise AI audit — where AI saves the most time in your operation',
        'Custom AI curriculum for your industry and roles',
        'Full-day hands-on team training (or split across days)',
        'Top 3 workflow automations implemented',
        '90-day AI implementation roadmap with KPIs',
        '30-day follow-up check-in and optimization session',
      ]}
      bestFor={[
        'Corporates with 50+ employees',
        'NGOs and development organizations',
        'Government institutions',
        'Banks and financial institutions',
        'Large teams with AI tools but low adoption',
      ]}
      beforeAfter={[
        { before: '৳50K/month AI tool subscriptions, 10% adoption rate across the team', after: 'AI integrated into daily workflows — 80%+ adoption within 30 days' },
        { before: 'AI strategy document exists — nobody knows how to implement it', after: 'Implemented, measurable AI systems running across departments' },
        { before: 'Monthly reports take 3 days, consumed by the time they\'re finished', after: 'Automated reporting dashboard — report ready in 30 minutes, live at any time' },
      ]}
      steps={[
        { title: 'Enterprise AI Audit', desc: 'We interview key stakeholders, map your workflows, and identify the highest-ROI AI opportunities in your specific operation.' },
        { title: 'Training + Implementation', desc: 'Custom curriculum delivered in-person or remotely. Hands-on exercises using your real work scenarios. Top automations built during the engagement.' },
        { title: '90-Day Roadmap + Follow-up', desc: 'Detailed 90-day implementation plan with assigned owners and KPIs. Follow-up session at Day 30 to review adoption and adjust.' },
      ]}
      faqs={[
        { q: 'Is this training available outside Dhaka?', a: 'Yes. We travel to Chittagong, Sylhet, and other major cities. For international clients, we deliver remotely or with planned travel.' },
        { q: 'Can this be delivered over multiple days?', a: 'Yes. We can split the training into 2–4 sessions to minimize business disruption. Session scheduling is flexible.' },
        { q: 'What industries do you have experience with?', a: 'RMG, NGOs, banking/fintech, e-commerce, media/publishing, consulting firms, educational institutions, and government-adjacent organizations in Bangladesh.' },
        { q: 'How do you measure success?', a: 'We define KPIs at the start: AI adoption rate, time saved per week, tasks automated, and team confidence scores. Measured at the 30-day follow-up.' },
        { q: 'Can you provide a certification?', a: 'Yes. We issue SYSmoAI AI Practitioner certificates for participants. We can also partner with your institution\'s certification program.' },
      ]}
      relatedServices={[
        { href: '/services/ai-sprint', label: 'AI Sprint (implement after)', price: '৳25,000–50,000' },
        { href: '/services/ai-retainer', label: 'AI Retainer (ongoing)', price: '৳20,000/month' },
        { href: '/services/group-workshop', label: 'Group Workshop (smaller team)', price: '৳500/person' },
      ]}
    />
  );
}
