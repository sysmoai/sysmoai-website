import { Bot } from 'lucide-react';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export default function AIAgentDev() {
  return (
    <ServicePageTemplate
      metaTitle="Custom AI Agent Development Bangladesh | NemoClaw | SYSmoAI"
      icon={Bot}
      title="AI Agent Development"
      headline="A Custom AI Agent That Works For Your Business. 24/7."
      bdPrice="৳50,000–2,00,000"
      usdPrice="$2,500–$15,000"
      whatItIs="Custom AI agent development (our NemoClaw framework) means building a fully trained, branded AI assistant that handles real business tasks autonomously — customer support, lead qualification, order management, FAQ answering, appointment booking, or any high-volume, repetitive interaction. Deployed on WhatsApp, your website, or any platform."
      deliverables={[
        'Custom-trained AI agent (your brand, your knowledge base)',
        'WhatsApp and/or web integration',
        'Full deployment and live testing',
        '30 days of post-launch support and tuning',
        'Handover with documentation',
        'Admin dashboard for managing the agent',
      ]}
      bestFor={[
        'Businesses with high-volume customer queries',
        'E-commerce and F-commerce sellers',
        'Customer support operations',
        'Lead qualification and sales automation',
        'Appointment-based businesses',
      ]}
      beforeAfter={[
        { before: '500 customer messages per day — one person responding manually, 12 hours/day', after: 'AI agent handles 90% of messages autonomously — human reviews escalations only' },
        { before: 'Leads going cold because nobody follows up within 5 minutes', after: 'AI qualifies leads instantly, 24/7, even at 3 AM' },
        { before: 'FAQs answered 50 times a day by your team — same answers, every time', after: 'Agent handles all FAQs — team focuses on complex issues only' },
      ]}
      steps={[
        { title: 'Discovery + Knowledge Build', desc: 'We map your business, collect your FAQs, workflows, and scripts. We train the agent on your knowledge base and brand voice.' },
        { title: 'Build + Integrate', desc: 'We build and deploy the agent on your chosen platform — WhatsApp, website, or both. We test extensively before launch.' },
        { title: 'Launch + 30-Day Support', desc: 'Agent goes live. We monitor, tune, and improve based on real conversations. Handover after 30 days.' },
      ]}
      faqs={[
        { q: 'What platforms can the agent be deployed on?', a: 'WhatsApp Business API, website chat widget, Facebook Messenger, Telegram, and custom integrations. Most common: WhatsApp.' },
        { q: 'Can the agent handle Bangla language queries?', a: 'Yes. We train agents for Bangla, English, or bilingual conversations — standard for Bangladesh clients.' },
        { q: 'Will the agent sound like a robot?', a: 'No. We design the agent with your brand voice, your phrasing, your personality. Most clients\' customers don\'t realize it\'s an AI.' },
        { q: 'What happens when the agent can\'t answer something?', a: 'It escalates to a human with a full context summary — so your team knows exactly where the conversation stands.' },
        { q: 'What\'s included in the price range?', a: 'Lower end: single-channel agent with limited knowledge base. Higher end: multi-channel, complex workflows, full CRM integration. We quote after discovery.' },
      ]}
      relatedServices={[
        { href: '/services/n8n-automation', label: 'n8n Automation', price: '৳2,000–10,000/workflow' },
        { href: '/services/ai-sprint', label: 'AI Sprint', price: '৳25,000–50,000' },
        { href: '/services/ai-retainer', label: 'AI Retainer (manage ongoing)', price: '৳20,000/month' },
      ]}
    />
  );
}
