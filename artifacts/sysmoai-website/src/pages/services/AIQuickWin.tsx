import { Zap } from 'lucide-react';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export default function AIQuickWin() {
  return (
    <ServicePageTemplate
      metaTitle="AI Quick Win — 1 Workflow Automated in 3 Days | SYSmoAI"
      icon={Zap}
      title="AI Quick Win"
      headline="Your Most Painful Workflow. Automated. In 3 Days."
      bdPrice="৳3,750–7,500"
      usdPrice="$50–$100"
      guarantee="Acceptance-test driven delivery"
      directAnswer="The AI Quick Win is SYSmoAI's entry-level service that automates your single most painful workflow in 3 days for ৳3,750–৳7,500 ($50–$100). Perfect for first-time AI clients — acceptance-test driven delivery with a free revision if the goal isn't met. Covers lead capture, DM auto-reply, invoice generation, order tracking, report automation, or any repeatable manual process."
      whatItIs="The AI Quick Win is our entry-level, low-risk service designed to automate your single most painful manual workflow in 3 days or less. It's the fastest way to see real ROI from AI — without any upfront commitment to a larger project. Perfect for first-time AI clients who want proof before investing more."
      deliverables={[
        '1 workflow fully designed and automated',
        'Video walkthrough so you understand exactly what was built',
        '1 free revision if the goal isn\'t fully met',
        '3-day delivery (usually faster)',
        'Optional: WhatsApp support for 7 days post-delivery',
      ]}
      bestFor={[
        'First-time AI clients',
        'Businesses testing before committing',
        'Anyone with 1 clear, painful workflow',
        'Freelancers automating client delivery',
        'Founders with a specific bottleneck',
      ]}
      beforeAfter={[
        { before: 'Spending 3 hours/day on a task that repeats every single day', after: 'The task runs automatically — you just review the output' },
        { before: 'Manual follow-up, manual data entry, manual reporting', after: 'One click (or zero clicks) to trigger the entire workflow' },
        { before: 'Unsure if AI will actually work for your business', after: 'Live proof — a real system you can see and use immediately' },
      ]}
      steps={[
        { title: 'Diagnose', desc: 'Free 30-min WhatsApp call. We identify your single most painful workflow and confirm it\'s a good fit for automation.' },
        { title: 'Build', desc: 'We design and deploy the automation — Zapier, n8n, Notion, or custom — in 3 days. You review and approve.' },
        { title: 'Deliver', desc: 'We hand it over with a full video walkthrough. If the goal isn\'t met, we rebuild it at no charge.' },
      ]}
      faqs={[
        { q: 'What kind of workflows can you automate?', a: 'Lead capture, WhatsApp auto-replies, invoice generation, report automation, data entry, email sequences, content repurposing, order tracking, and more. If it\'s manual and repeatable, we can automate it.' },
        { q: 'What if the automation doesn\'t work as expected?', a: 'We offer 1 free revision. If the stated goal isn\'t fully met after the revision, we rebuild it at no extra charge. Simple.' },
        { q: 'Do I need to provide anything?', a: 'Just your time for a 30-minute discovery call and access to the tools we\'ll automate (e.g., Gmail, Notion, WhatsApp). We handle everything else.' },
        { q: 'How do I pay?', a: 'AI Quick Win is 100% advance payment. The exact payment method is confirmed at the proposal stage.' },
        { q: 'What if I want more workflows after this?', a: 'Many Quick Win clients upgrade to our AI Sprint — a full AI system build. The Quick Win is often the first step in a longer journey.' },
      ]}
      relatedServices={[
        { href: '/services/ai-sprint', label: 'F-Commerce AI Sprint (14 days)', price: '৳50,000' },
        { href: '/services/ai-retainer', label: 'AI Retainer (monthly)', price: '৳20,000/mo' },
        { href: '/services/other-engagements', label: 'Other Engagements', price: 'By inquiry' },
      ]}
    />
  );
}
