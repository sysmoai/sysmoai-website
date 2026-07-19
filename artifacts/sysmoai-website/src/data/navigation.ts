/**
 * Central navigation configuration.
 * Single source of truth for all menus — desktop, mobile, footer.
 * Import instead of duplicating data across components.
 */

export interface NavItem {
  href: string;
  label: string;
  desc?: string;
  icon?: string; // lucide icon name
  badge?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

// ─── Services ─────────────────────────────────────────────────────
export const SERVICES_GROUPS: NavGroup[] = [
  {
    title: 'Capture and Convert',
    items: [
      { href: '/lead-rescue', label: 'Lead Rescue', desc: 'Stop losing leads after they contact you', icon: 'Target', badge: 'Popular' },
      { href: '/services/ai-quick-win', label: 'AI Quick Win', desc: 'One workflow automated in 3 days', icon: 'Zap' },
    ],
  },
  {
    title: 'Automate Operations',
    items: [
      { href: '/services/n8n-automation', label: 'n8n Automation', desc: 'Connect apps and automate data flows', icon: 'Settings' },
      { href: '/services/ai-agent-dev', label: 'AI Agent Development', desc: 'Custom agents that work 24/7', icon: 'Bot' },
      { href: '/services/ai-sprint', label: 'AI Sprint', desc: 'Full AI system in 14 days', icon: 'Timer' },
      { href: '/services/ai-retainer', label: 'AI Retainer', desc: 'Ongoing AI management monthly', icon: 'RefreshCw' },
    ],
  },
  {
    title: 'Build Business Systems',
    items: [
      { href: '/services/notion-os', label: 'Notion OS Build', desc: 'Your entire business in one workspace', icon: 'Layout' },
    ],
  },
  {
    title: 'Enable People and Teams',
    items: [
      { href: '/services/corporate-training', label: 'Corporate AI Training', desc: 'Enterprise-wide AI adoption', icon: 'Building' },
      { href: '/services/ai-coaching', label: '1:1 AI Coaching', desc: 'Personalised 60-min sessions', icon: 'Users' },
      { href: '/services/group-workshop', label: 'Group Workshop', desc: 'Team upskilling, half-day', icon: 'BookOpen' },
      { href: '/services/international', label: 'International Clients', desc: 'USD pricing · global delivery', icon: 'Globe' },
    ],
  },
];

export const ALL_SERVICES_LINK: NavItem = { href: '/services', label: 'View All Services', desc: 'Compare all services and pricing' };

// ─── Who We Help ──────────────────────────────────────────────────
export const WHO_WE_HELP_GROUPS: NavGroup[] = [
  {
    title: 'Businesses',
    items: [
      { href: '/for/sme-founders', label: 'SME Founders', desc: 'Automate operations and reclaim your time', icon: 'Star' },
      { href: '/for/f-commerce', label: 'F-Commerce Sellers', desc: 'From chaos to structured order management', icon: 'ShoppingBag' },
      { href: '/for/agencies', label: 'Digital Agencies', desc: 'Scale delivery without scaling headcount', icon: 'Building2' },
      { href: '/for/corporates', label: 'Corporate Teams', desc: 'Structured AI adoption across departments', icon: 'Megaphone' },
    ],
  },
  {
    title: 'Professionals',
    items: [
      { href: '/for/consultants', label: 'Consultants', desc: 'Cut non-billable work and deliver faster', icon: 'Users2' },
      { href: '/for/freelancers', label: 'Freelancers', desc: 'Increase output and win premium clients', icon: 'Laptop' },
      { href: '/for/creators', label: 'Content Creators', desc: 'Post consistently without burning out', icon: 'Video' },
    ],
  },
  {
    title: 'Learning and Research',
    items: [
      { href: '/for/researchers', label: 'Researchers', desc: 'Cut literature review from weeks to hours', icon: 'FlaskConical' },
      { href: '/for/students', label: 'Students', desc: 'Build AI skills that get you hired', icon: 'GraduationCap' },
      { href: '/for/job-seekers', label: 'Job Seekers', desc: 'Stand out with AI-optimized applications', icon: 'Briefcase' },
    ],
  },
];

// ─── Bangladesh Menu ──────────────────────────────────────────────
export const BANGLADESH_GROUPS: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { href: '/bangladesh', label: 'Bangladesh Overview', desc: 'SYSmoAI for Bangladesh businesses', icon: 'Globe' },
    ],
  },
  {
    title: 'Business Solutions',
    items: [
      { href: '/lead-rescue', label: 'Lead Rescue', desc: 'Lead management system', icon: 'Target' },
      { href: '/for/f-commerce', label: 'F-Commerce Solutions', desc: 'Facebook and WhatsApp workflow automation', icon: 'ShoppingBag' },
      { href: '/for/sme-founders', label: 'SME Business Systems', desc: 'AI for small and medium businesses', icon: 'Building2' },
      { href: '/services/corporate-training', label: 'Corporate AI Training', desc: 'Enterprise AI training programs', icon: 'Building' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { href: '/faq', label: 'FAQ', desc: 'Pricing, payments, and services', icon: 'BookOpen' },
      { href: '/contact', label: 'Contact', desc: 'WhatsApp and email', icon: 'MessageCircle' },
    ],
  },
];

// ─── Simple Links ─────────────────────────────────────────────────
export const HEADER_LINKS: NavItem[] = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Insights' },
];

// ─── Company Dropdown ─────────────────────────────────────────────
export const COMPANY_GROUPS: NavGroup[] = [
  {
    title: 'Company',
    items: [
      { href: '/about', label: 'About SYSmoAI', desc: 'Company and founder story', icon: 'Building' },
      { href: '/how-we-work', label: 'Our Approach', desc: 'How we deliver systems', icon: 'Settings' },
      { href: '/contact', label: 'Contact', desc: 'Get in touch', icon: 'MessageCircle' },
    ],
  },
];

// ─── Primary CTA ──────────────────────────────────────────────────
export const HEADER_CTA = {
  href: '/fit-check',
  label: 'Book a Fit Check',
  icon: 'MessageCircle',
};

// ─── Mobile: order and grouping ───────────────────────────────────
export const MOBILE_SECTIONS: { key: string; label: string; type: 'accordion' | 'link' }[] = [
  { key: 'services', label: 'Services', type: 'accordion' },
  { key: 'who-we-help', label: 'Who We Help', type: 'accordion' },
  { key: 'bangladesh', label: 'Bangladesh', type: 'accordion' },
  { key: 'company', label: 'Company', type: 'accordion' },
  { key: 'links', label: '', type: 'link' },
];

export const MOBILE_LINKS: NavItem[] = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '/how-we-work', label: 'Our Approach' },
  { href: '/contact', label: 'Contact' },
];

// ─── Footer Links ─────────────────────────────────────────────────
export const FOOTER_SERVICES: NavItem[] = [
  { href: '/lead-rescue', label: 'Lead Rescue' },
  { href: '/services/ai-quick-win', label: 'AI Quick Win' },
  { href: '/services/ai-sprint', label: 'AI Sprint' },
  { href: '/services/ai-retainer', label: 'AI Retainer' },
  { href: '/services/notion-os', label: 'Notion OS Build' },
  { href: '/services/ai-agent-dev', label: 'AI Agent Dev' },
  { href: '/services/n8n-automation', label: 'n8n Automation' },
  { href: '/services/ai-coaching', label: '1:1 AI Coaching' },
  { href: '/services/corporate-training', label: 'Corporate Training' },
  { href: '/services/international', label: 'International Clients' },
];

export const FOOTER_WHO_WE_HELP: NavItem[] = [
  { href: '/for/agencies', label: 'Agencies' },
  { href: '/for/sme-founders', label: 'SME Founders' },
  { href: '/for/f-commerce', label: 'F-Commerce' },
  { href: '/for/consultants', label: 'Consultants' },
  { href: '/for/freelancers', label: 'Freelancers' },
  { href: '/for/creators', label: 'Creators' },
  { href: '/for/corporates', label: 'Corporate Teams' },
  { href: '/for/researchers', label: 'Researchers' },
  { href: '/for/students', label: 'Students' },
  { href: '/for/job-seekers', label: 'Job Seekers' },
];

export const FOOTER_RESOURCES: NavItem[] = [
  { href: '/bangladesh', label: 'Bangladesh' },
  { href: '/lead-rescue', label: 'Lead Rescue' },
  { href: '/fit-check', label: 'Fit Check' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/pricing', label: 'Pricing' },
];

export const FOOTER_LEGAL: NavItem[] = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/refund-policy', label: 'Refund Policy' },
];
