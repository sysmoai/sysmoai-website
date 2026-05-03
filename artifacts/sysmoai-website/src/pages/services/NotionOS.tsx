import { Layout } from 'lucide-react';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export default function NotionOS() {
  return (
    <ServicePageTemplate
      metaTitle="Notion OS Build Bangladesh | Custom Notion Workspace | SYSmoAI"
      icon={Layout}
      title="Notion OS Build"
      headline="Your Business. Organized. In One Place."
      bdPrice="৳15,000–50,000"
      usdPrice="$800–$5,000"
      whatItIs="A custom Notion Operating System (OS) is a fully designed, interconnected Notion workspace that replaces your scattered tools, spreadsheets, and WhatsApp notes with one central system. We architect the databases, build the automations, design the dashboards, and train you to run it independently. SYSmoAI is one of the most advanced Notion OS builders in Asia."
      deliverables={[
        'Custom Notion workspace architecture — designed for your business',
        'All databases built and interconnected',
        'Notion Automations set up',
        'Notion integrations (Zapier, Make, n8n) configured',
        'Dashboard views for different roles (founder, team, client)',
        'Full video tutorial walkthrough',
        'Standard Operating Procedures template library',
      ]}
      bestFor={[
        'Founders drowning in tool fragmentation',
        'Consultants and coaches',
        'Digital agencies',
        'Researchers and academics',
        'Anyone using 5+ separate tools',
      ]}
      beforeAfter={[
        { before: 'Clients in one app, tasks in another, invoices in a spreadsheet, notes in WhatsApp', after: 'Everything in one Notion OS — clients, tasks, finance, content, team — all connected' },
        { before: 'New team members take months to onboard — no documentation', after: 'Onboarding takes 2 days — everything documented in the OS' },
        { before: 'You can\'t see the status of your business without asking 5 people', after: 'Real-time dashboard in Notion — revenue, leads, tasks in 60 seconds' },
      ]}
      steps={[
        { title: 'Discovery', desc: 'We map your current tools, workflows, and information structure. We design the OS architecture before building anything.' },
        { title: 'Build', desc: 'We build database by database — clients, projects, finance, content, HR — all interconnected with relations and rollups.' },
        { title: 'Train + Hand Over', desc: 'Full video tutorial for each section. Live training session. You own the system 100% — no monthly fees to us.' },
      ]}
      faqs={[
        { q: 'Do I need a paid Notion plan?', a: 'For personal use, Notion free is sufficient. For teams and advanced automations, Notion Plus ($10/month) is recommended. We don\'t charge for Notion.' },
        { q: 'Will I own the workspace after delivery?', a: 'Yes. 100% yours. We build it in your Notion account. No ongoing fees to SYSmoAI.' },
        { q: 'What makes a "Notion OS" different from a regular Notion setup?', a: 'A Notion OS is a fully interconnected system where databases talk to each other. Tasks link to clients, clients link to invoices, invoices link to finance dashboards. It\'s an operating system, not a collection of pages.' },
        { q: 'What\'s the price range based on?', a: 'Complexity. A solo freelancer OS starts at ৳15,000. A full agency OS with team dashboards, client portals, and automations starts at ৳35,000. We quote after discovery.' },
        { q: 'Can you migrate my existing data?', a: 'Yes. We import from spreadsheets, Trello, Asana, Airtable, and most major tools. Included in the project scope.' },
      ]}
      relatedServices={[
        { href: '/services/ai-sprint', label: 'F-Commerce AI Sprint', price: '৳50,000' },
        { href: '/services/n8n-automation', label: 'n8n Automation', price: '৳2,000–10,000/workflow' },
        { href: '/services/ai-quick-win', label: 'AI Quick Win', price: '৳3,750–7,500' },
      ]}
    />
  );
}
