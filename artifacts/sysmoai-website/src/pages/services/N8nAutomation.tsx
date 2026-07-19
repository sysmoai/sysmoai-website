import { Settings } from 'lucide-react';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export default function N8nAutomation() {
  return (
    <ServicePageTemplate
      metaTitle="n8n Workflow Automation Bangladesh | SYSmoAI"
      icon={Settings}
      title="n8n Workflow Automation"
      headline="Stop Doing Manually What Machines Can Do Automatically."
      bdPrice="৳2,000–10,000/workflow"
      whatItIs="n8n is an open-source workflow automation platform — like Zapier but more powerful, more flexible, and significantly cheaper to run. We build custom n8n workflows that connect your apps, automate your data flows, and eliminate repetitive manual tasks. Priced per workflow, so you only pay for what you need."
      deliverables={[
        'Per-workflow automation — fully built and tested',
        'Integration with any app in your stack',
        'Error handling and retry logic built in',
        'Full documentation for each workflow',
        'Video walkthrough of how the workflow operates',
        '7-day bug fix guarantee post-delivery',
      ]}
      bestFor={[
        'Anyone with repetitive manual tasks between multiple apps',
        'SMEs automating internal operations',
        'Agencies automating client reporting',
        'E-commerce automating order management',
        'Businesses moving from expensive Zapier to n8n',
      ]}
      beforeAfter={[
        { before: 'Copying data manually between 3 apps every morning — 45 minutes wasted daily', after: 'n8n workflow runs automatically at 9 AM — zero manual work required' },
        { before: 'Lead comes in via form, manually copied to CRM, manually emailed — 30 mins per lead', after: 'Lead triggers instant CRM entry, welcome email, and Slack notification — zero human touch' },
        { before: 'Monthly report takes team 3 days to compile from 5 different sources', after: 'n8n pulls data automatically, generates report, sends to stakeholders — done in 10 minutes' },
      ]}
      steps={[
        { title: 'Workflow Scoping', desc: 'You describe the task. We map the exact automation logic, tools involved, and edge cases. We confirm the scope before building.' },
        { title: 'Build + Test', desc: 'We build the n8n workflow, test with real data, and handle error cases. Typically 1–3 days per workflow.' },
        { title: 'Deploy + Document', desc: 'Workflow goes live. You receive full documentation and a video walkthrough. 7-day bug fix guarantee.' },
      ]}
      faqs={[
        { q: 'Do I need to host n8n myself?', a: 'We recommend n8n Cloud (from $20/month) for most clients — easy to manage, no server required. We can also help with self-hosting if you prefer.' },
        { q: 'What apps can n8n integrate with?', a: 'n8n has 400+ native integrations: Gmail, Google Sheets, Notion, Airtable, Slack, HubSpot, WhatsApp, Telegram, Shopify, WooCommerce, Stripe, and custom webhooks for any API.' },
        { q: 'Why n8n over Zapier?', a: 'n8n is more powerful for complex workflows, significantly cheaper for high-volume automations, and gives you full control over your data. Zapier charges per task — n8n doesn\'t.' },
        { q: 'What\'s the price range based on?', a: 'Simple 2-step automations: ৳2,000–4,000. Multi-step workflows with conditions and error handling: ৳5,000–10,000. Complex multi-app pipelines: custom quote.' },
        { q: 'Can you build an automation for any tool?', a: 'If it has an API or webhook, yes. For Bangladesh-specific tools (bKash, Nagad, local platforms), we have experience integrating those too.' },
      ]}
      relatedServices={[
        { href: '/services/ai-quick-win', label: 'AI Quick Win', price: '৳3,750–7,500' },
        { href: '/services/ai-sprint', label: 'AI Sprint (full system)', price: '৳25,000–50,000' },
        { href: '/services/notion-os', label: 'Notion OS Build', price: '৳15,000–50,000' },
      ]}
    />
  );
}
