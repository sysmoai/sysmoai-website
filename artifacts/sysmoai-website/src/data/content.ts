/**
 * Central content data for SYSmoAI.
 * Single source of truth for brand, services, pricing, and company information.
 * Import from components instead of scattering inline data.
 */

// ─── Brand ───────────────────────────────────────────────────────
export const BRAND = {
  name: 'SYSmoAI',
  tagline: 'Systems in Motion.',
  description: 'Practical AI systems for growing businesses in Bangladesh and beyond.',
  founded: 2022,
  country: 'Bangladesh',
  city: 'Dhaka',
  serviceHours: '10 AM – Midnight (BST)',
  replyTime: 'Reply within 2 hours on working days.',
} as const;

// ─── Contact ──────────────────────────────────────────────────────
export const CONTACT = {
  email: 'hello@sysmoai.com',
  whatsapp: {
    number: '+8801711638693',
    display: '+880 1711-638693',
  },
  founder: 'Emon Hossain',
} as const;

// ─── Services ─────────────────────────────────────────────────────
export interface ServiceInfo {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bdPrice: string;
  usdPrice: string;
  href: string;
  features: string[];
  tag?: string;
}

export const SERVICES: ServiceInfo[] = [
  {
    id: 'lead-rescue',
    title: 'Lead Rescue',
    tagline: 'Stop losing leads after they contact you.',
    description: 'A structured lead-capture and follow-up system designed for Bangladesh businesses. Centralize inquiries from WhatsApp, Facebook, and calls into one trackable pipeline with reminders and follow-up workflows.',
    bdPrice: '৳15,000',
    usdPrice: 'Contact for international pricing',
    href: '/lead-rescue',
    features: ['Centralized lead capture from multiple channels', 'Pipeline tracking with stages and ownership', 'Follow-up reminders and templates', 'WhatsApp-assisted workflow integration', '5-lead acceptance test included', 'Written SOP and handover documentation'],
    tag: 'Popular',
  },
  {
    id: 'ai-quick-win',
    title: 'AI Quick Win',
    tagline: 'Automate your most painful workflow in 3 days.',
    description: 'Entry-level automation of a single repetitive workflow. Low risk, fast delivery, full handover.',
    bdPrice: '৳3,750–7,500',
    usdPrice: 'Contact for international pricing',
    href: '/services/ai-quick-win',
    features: ['1 workflow automated', 'Video walkthrough', '1 free revision', '3-day delivery'],
    tag: 'Start here',
  },
  {
    id: 'ai-sprint',
    title: 'AI Sprint',
    tagline: 'Full AI system deployment in 14 days.',
    description: 'Complete automation of 3–5 workflows with team training, documentation, and post-launch support.',
    bdPrice: '৳25,000–50,000',
    usdPrice: 'Contact for international pricing',
    href: '/services/ai-sprint',
    features: ['3–5 workflows automated', 'Team training included', '3-month support', 'Video documentation'],
    tag: 'Most popular',
  },
  {
    id: 'ai-retainer',
    title: 'AI Operations Retainer',
    tagline: 'Monthly AI management and improvement.',
    description: 'Ongoing optimization, new automations, and priority support. Month-to-month with no lock-in.',
    bdPrice: '৳20,000/month',
    usdPrice: 'Contact for international pricing',
    href: '/services/ai-retainer',
    features: ['4–8 hrs/month hands-on work', 'Monthly improvements', 'Priority WhatsApp support', 'Cancel anytime'],
    tag: 'Cancel anytime',
  },
  {
    id: 'ai-coaching',
    title: '1:1 AI Coaching',
    tagline: 'Personalized 60-minute coaching sessions.',
    description: 'Live coaching focused on your specific AI challenges, tools, and goals.',
    bdPrice: '৳2,500/session',
    usdPrice: 'Contact for international pricing',
    href: '/services/ai-coaching',
    features: ['60-min live session', 'Session recording', '3-day follow-up Q&A', 'Personal action plan'],
    tag: 'Individual',
  },
  {
    id: 'group-workshop',
    title: 'Group AI Workshop',
    tagline: 'Half-day team upskilling workshops.',
    description: 'Customized hands-on AI training for teams of 10 or more. Industry-specific curriculum.',
    bdPrice: '৳500/person (min 10)',
    usdPrice: 'Contact for international pricing',
    href: '/services/group-workshop',
    features: ['Custom curriculum', 'Hands-on exercises', 'Post-workshop resource pack', 'Team certificates'],
    tag: 'Teams',
  },
  {
    id: 'notion-os',
    title: 'Notion OS Build',
    tagline: 'Custom interconnected workspace for your business.',
    description: 'Fully designed Notion operating system with databases, automations, and dashboards.',
    bdPrice: '৳15,000–50,000',
    usdPrice: 'Contact for international pricing',
    href: '/services/notion-os',
    features: ['Custom workspace architecture', 'All databases + automations', 'Dashboard views', 'Video tutorial'],
    tag: 'One-time',
  },
  {
    id: 'ai-agent-dev',
    title: 'AI Agent Development',
    tagline: 'Custom-trained AI agents for business tasks.',
    description: 'Trained AI assistants for customer support, lead qualification, and high-volume interactions.',
    bdPrice: '৳50,000–2,00,000',
    usdPrice: 'Contact for international pricing',
    href: '/services/ai-agent-dev',
    features: ['Custom-trained AI agent', 'WhatsApp/web integration', 'Full deployment + testing', '30-day support'],
    tag: 'Enterprise',
  },
  {
    id: 'n8n-automation',
    title: 'n8n Automation',
    tagline: 'Per-workflow app integration automation.',
    description: 'Custom n8n workflows connecting your apps, automating data flows, and eliminating manual tasks.',
    bdPrice: '৳2,000–10,000/workflow',
    usdPrice: 'Contact for international pricing',
    href: '/services/n8n-automation',
    features: ['Per-workflow automation', 'Any app integration', 'Error handling built in', 'Video documentation'],
    tag: 'Per workflow',
  },
  {
    id: 'corporate-training',
    title: 'Corporate AI Training',
    tagline: 'Enterprise-wide AI transformation program.',
    description: 'Comprehensive program: audit, custom curriculum, hands-on training, and implementation roadmap.',
    bdPrice: '৳50,000–2,00,000',
    usdPrice: 'Contact for international pricing',
    href: '/services/corporate-training',
    features: ['Enterprise AI audit', 'Custom curriculum', 'Top 3 automations implemented', '90-day AI roadmap'],
    tag: 'Enterprise',
  },
];

// ─── Audience Segments ────────────────────────────────────────────
export interface AudienceInfo {
  id: string;
  title: string;
  description: string;
  href: string;
}

export const AUDIENCES: AudienceInfo[] = [
  { id: 'agencies', title: 'Digital Agencies', description: 'Scale delivery without scaling headcount.', href: '/for/agencies' },
  { id: 'sme-founders', title: 'SME Founders', description: 'Automate operations and reclaim your time.', href: '/for/sme-founders' },
  { id: 'f-commerce', title: 'F-Commerce Sellers', description: 'From chaos to structured order management.', href: '/for/f-commerce' },
  { id: 'freelancers', title: 'Freelancers', description: 'Increase output and win premium clients.', href: '/for/freelancers' },
  { id: 'consultants', title: 'Consultants', description: 'Cut non-billable work and deliver faster.', href: '/for/consultants' },
  { id: 'corporates', title: 'Corporate Teams', description: 'Structured AI adoption across departments.', href: '/for/corporates' },
  { id: 'students', title: 'Students', description: 'Build AI skills that get you hired.', href: '/for/students' },
  { id: 'job-seekers', title: 'Job Seekers', description: 'Stand out with AI-optimized applications.', href: '/for/job-seekers' },
  { id: 'researchers', title: 'Researchers', description: 'Cut literature review from weeks to hours.', href: '/for/researchers' },
  { id: 'creators', title: 'Content Creators', description: 'Post consistently without burning out.', href: '/for/creators' },
];

// ─── Payment Methods ──────────────────────────────────────────────
export const PAYMENT_METHODS = {
  bangladesh: ['bKash', 'Nagad', 'Bank transfer'],
  international: ['Wise', 'Payoneer', 'Credit card (via Stripe)'],
};

// ─── Payment Terms ────────────────────────────────────────────────
export const PAYMENT_TERMS: Record<string, string> = {
  'AI Quick Win': '100% advance',
  'AI Sprint': '50% upfront, 50% on delivery',
  'AI Operations Retainer': 'Monthly billing',
  default: '50% upfront, 50% on delivery',
};

// ─── Common Questions ─────────────────────────────────────────────
export const GENERAL_FAQ = [
  {
    q: 'Does SYSmoAI have an office in Dhaka?',
    a: 'We operate remotely from Dhaka, Bangladesh. Client meetings are conducted via Google Meet or WhatsApp. On-site visits are available for enterprise clients by arrangement.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Bangladeshi clients: bKash, Nagad, bank transfer. International clients: Wise, Payoneer, or credit card (via Stripe).',
  },
  {
    q: 'Do you offer ongoing support after delivery?',
    a: 'Yes. Each service includes a post-delivery support period. The AI Retainer provides ongoing monthly support. Individual services include 7–30 day support depending on the package.',
  },
  {
    q: 'What if the system doesn\'t work as expected?',
    a: 'We work with you until the agreed deliverables are complete and functional. If something doesn\'t work as scoped, we fix it at no extra cost. Specific business outcome guarantees depend on your team\'s implementation and context.',
  },
  {
    q: 'Can I cancel the retainer anytime?',
    a: 'Yes. The AI Operations Retainer is month-to-month with no long-term commitment.',
  },
];

// ─── CTAs ─────────────────────────────────────────────────────────
export const PRIMARY_CTA = {
  label: 'Book a Free Fit Check',
  href: '/fit-check',
  description: '15-minute qualification conversation',
};

export const SECONDARY_CTA = {
  label: 'WhatsApp Us',
  href: 'https://wa.me/8801711638693?text=Hi%20SYSmoAI%2C%20I%20want%20to%20know%20more',
  description: 'Reply within 2 hours',
};
