import { BookOpen } from 'lucide-react';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export default function GroupWorkshop() {
  return (
    <ServicePageTemplate
      metaTitle="Group AI Workshop Bangladesh | Team AI Training | SYSmoAI"
      icon={BookOpen}
      title="Group AI Workshop"
      headline="Upskill Your Entire Team in Half a Day."
      bdPrice="৳500/person (min 10)"
      usdPrice="$15/person"
      whatItIs="A hands-on group AI training workshop designed for teams of 10 or more. We build a custom curriculum for your industry and use cases, run practical exercises using AI tools, and leave every participant with a personal action plan. This isn't a lecture — it's a workshop where people actually do things with AI."
      deliverables={[
        'Custom curriculum tailored to your industry',
        'Hands-on exercises with real AI tools (not theory)',
        'Prompt library relevant to your team\'s work',
        'Post-workshop resource pack (guides, templates)',
        'Follow-up Q&A session (1 week post-workshop)',
        'Team completion certificates',
      ]}
      bestFor={[
        'Digital agencies and IT teams',
        'Corporate departments',
        'Educational institutions',
        'NGOs and nonprofits',
        'Teams of 10 to 200+ participants',
      ]}
      beforeAfter={[
        { before: 'Team using AI inconsistently — some use it, most don\'t, zero structure', after: 'Entire team equipped with a shared AI workflow and prompt library' },
        { before: 'AI training budget spent on generic online courses nobody finishes', after: 'Half-day hands-on workshop with industry-specific exercises, 100% completion' },
        { before: 'Leaders pushing AI adoption, team resistant or confused', after: 'Team excited and confident — they\'ve already built something in the workshop' },
      ]}
      steps={[
        { title: 'Pre-Workshop Audit', desc: 'We assess your team\'s current AI level and build a curriculum specific to your industry and tools.' },
        { title: 'Half-Day Workshop', desc: 'Live, hands-on session — remote or in-person. Exercises use your actual work scenarios. Maximum engagement.' },
        { title: 'Post-Workshop Support', desc: 'Resource pack delivered within 24 hours. Follow-up Q&A session after 1 week to address questions from practice.' },
      ]}
      faqs={[
        { q: 'Can you run this workshop in Bangla?', a: 'Yes. We run in Bangla, English, or mixed — based on your team\'s preference.' },
        { q: 'Is this remote or in-person?', a: 'Both. Remote via Zoom for distributed teams. In-person in Dhaka, or travel available for larger groups (travel fee applies).' },
        { q: 'What AI tools will we use?', a: 'ChatGPT, Claude, Notion AI, and industry-specific tools. We provide temporary access if needed.' },
        { q: 'What\'s the maximum group size?', a: 'We\'ve run workshops for groups from 10 to 300. For very large groups, we use breakout sessions.' },
        { q: 'How do we customize the curriculum?', a: 'We send a pre-workshop questionnaire. You tell us your industry, team size, and goals. We build the curriculum in 3–5 days.' },
      ]}
      relatedServices={[
        { href: '/services/corporate-training', label: 'Corporate Training (enterprise)', price: '৳50,000–2,00,000' },
        { href: '/services/ai-coaching', label: '1:1 AI Coaching', price: '৳2,500/session' },
        { href: '/services/ai-sprint', label: 'F-Commerce AI Sprint', price: '৳50,000' },
      ]}
    />
  );
}
