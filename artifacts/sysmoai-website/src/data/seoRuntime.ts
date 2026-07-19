import { blogPostsMeta } from './blogMeta';

export const SITE_URL = 'https://sysmoai.com';
export const OG_IMAGE = `${SITE_URL}/opengraph.jpg`;
export const SITE_NAME = 'SYSmoAI';
export const TWITTER_HANDLE = '@sysmoai';

export interface RuntimeSeo {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
}

export const runtimeSeoConfig: Record<string, RuntimeSeo> = {
  '/': {
    title: 'SYSmoAI — Lead Rescue System for Bangladesh Agencies | AI Systems',
    description:
      "SYSmoAI is a founder-built AI systems initiative in Bangladesh. Currently offering the Lead Rescue System validation pilot — a 14-day client-owned lead workflow for micro digital agencies. ৳15,000.",
    canonical: `${SITE_URL}/`,
    ogType: 'website',
  },

  '/services': {
    title: 'AI Consulting Services Bangladesh | SYSmoAI',
    description:
      "Explore SYSmoAI's full range of AI consulting services — quick workflow automation, full AI system builds, Notion OS, AI agent development, and corporate training. Starting at ৳3,750.",
    canonical: `${SITE_URL}/services`,
  },

  '/services/ai-quick-win': {
    title: 'AI Quick Win — 1 Workflow Automated in 3 Days | SYSmoAI',
    description:
      "Automate your single most painful workflow in 3 days for ৳3,750–7,500. SYSmoAI's AI Quick Win is Bangladesh's lowest-risk AI automation service — guaranteed or rebuilt free.",
    canonical: `${SITE_URL}/services/ai-quick-win`,
  },

  '/services/ai-sprint': {
    title: 'AI Sprint — Full AI Stack Deployed in 14 Days | SYSmoAI',
    description:
      "Get a complete AI system built in 14 days. SYSmoAI's AI Implementation Sprint automates 3–5 workflows, includes team training, 3-month support, and delivers measurable ROI. ৳25,000–50,000.",
    canonical: `${SITE_URL}/services/ai-sprint`,
  },

  '/services/ai-retainer': {
    title: 'AI Retainer — Monthly AI Operations Management | SYSmoAI',
    description:
      "Keep your AI systems optimized with SYSmoAI's monthly AI Operations Retainer. 4–8 hours of hands-on work, monthly improvements, and priority WhatsApp support. ৳20,000/month.",
    canonical: `${SITE_URL}/services/ai-retainer`,
  },

  '/services/ai-coaching': {
    title: '1:1 AI Coaching Sessions Bangladesh | SYSmoAI',
    description:
      "Get personalized AI coaching from Bangladesh's leading AI consultant. 60-minute live session, session recording, 3-day follow-up Q&A, and personal action plan. ৳2,500/session.",
    canonical: `${SITE_URL}/services/ai-coaching`,
  },

  '/services/group-workshop': {
    title: 'Group AI Workshop Bangladesh | Team AI Training | SYSmoAI',
    description:
      "Upskill your entire team in half a day with SYSmoAI's Group AI Workshop. Custom industry curriculum, hands-on exercises, post-workshop resource pack. ৳500/person (min 10 participants).",
    canonical: `${SITE_URL}/services/group-workshop`,
  },

  '/services/notion-os': {
    title: 'Notion OS Build Bangladesh | Custom Notion Workspace | SYSmoAI',
    description:
      "Get a custom Notion business operating system built for your company. Clients, projects, finance, HR — all interconnected. ৳15,000–50,000. Built by Bangladesh's top Notion specialist.",
    canonical: `${SITE_URL}/services/notion-os`,
  },

  '/services/ai-agent-dev': {
    title: 'Custom AI Agent Development Bangladesh | NemoClaw | SYSmoAI',
    description:
      "Deploy a custom AI agent for your business — trained on your knowledge base, integrated with WhatsApp or your website. 24/7 operation. ৳50,000–2,00,000.",
    canonical: `${SITE_URL}/services/ai-agent-dev`,
  },

  '/services/n8n-automation': {
    title: 'n8n Workflow Automation Bangladesh | SYSmoAI',
    description:
      "Automate any business workflow with n8n. SYSmoAI builds, tests, and deploys automation workflows for any app stack. ৳2,000–10,000 per workflow. Built in 1–3 days.",
    canonical: `${SITE_URL}/services/n8n-automation`,
  },

  '/services/corporate-training': {
    title: 'Corporate AI Training Bangladesh | Enterprise AI Implementation | SYSmoAI',
    description:
      "Transform your company with structured AI training. SYSmoAI's enterprise program covers audit, training, implementation, and a 90-day AI roadmap. ৳50,000–2,00,000.",
    canonical: `${SITE_URL}/services/corporate-training`,
  },

  '/services/international': {
    title: 'International AI Consulting Services | SYSmoAI Bangladesh',
    description:
      'World-class AI consulting from Bangladesh at 60–80% savings vs US/EU consultants. SYSmoAI serves clients in the US, UK, Canada, Australia, and worldwide via Wise and Payoneer.',
    canonical: `${SITE_URL}/services/international`,
  },

  '/for/students': {
    title: 'AI Tools for Students Bangladesh | Study Smarter with SYSmoAI',
    description:
      "Students: learn AI skills that get you hired, build a freelance income in 30 days, and finish your thesis 3x faster. SYSmoAI's AI coaching for students in Bangladesh.",
    canonical: `${SITE_URL}/for/students`,
  },

  '/for/job-seekers': {
    title: 'AI Skills for Job Seekers Bangladesh | Get Hired Faster with SYSmoAI',
    description:
      'Stand out in the job market with AI skills. SYSmoAI helps job seekers in Bangladesh rewrite CVs to pass ATS, build AI portfolios, and attract recruiter attention.',
    canonical: `${SITE_URL}/for/job-seekers`,
  },

  '/for/freelancers': {
    title: 'AI for Freelancers Bangladesh | 3x Your Income with SYSmoAI',
    description:
      "Freelancers: use AI to 3x your output, raise your rates from ৳500 to ৳5,000+ per project, and win international clients. SYSmoAI helps Bangladeshi freelancers on Fiverr and Upwork.",
    canonical: `${SITE_URL}/for/freelancers`,
  },

  '/for/researchers': {
    title: 'AI for Researchers Bangladesh | Research OS for Faster Papers | SYSmoAI',
    description:
      "Researchers: AI-powered literature review in 3 days instead of 4 weeks, faster thesis writing, and research OS in Notion. SYSmoAI helps academics in Bangladesh publish more.",
    canonical: `${SITE_URL}/for/researchers`,
  },

  '/for/agencies': {
    title: 'AI for Digital Agencies Bangladesh | Scale Delivery with SYSmoAI',
    description:
      "Agencies: cut content production time by 60%, win more pitches with AI proposal builder, and scale output without scaling headcount. SYSmoAI for digital agencies in Bangladesh.",
    canonical: `${SITE_URL}/for/agencies`,
  },

  '/for/sme-founders': {
    title: 'AI for SME Founders Bangladesh | AI Business OS | SYSmoAI',
    description:
      "SME founders: automate WhatsApp, manage all clients in Notion, eliminate 3–5 daily manual workflows. SYSmoAI helps small and medium businesses in Bangladesh scale with AI.",
    canonical: `${SITE_URL}/for/sme-founders`,
  },

  '/for/f-commerce': {
    title: 'AI for F-Commerce Sellers Bangladesh | Automate Orders & DMs | SYSmoAI',
    description:
      "F-commerce sellers: automate Facebook DM replies, track orders without notebooks, and scale from 50 to 200+ orders/month. SYSmoAI for Bangladesh f-commerce businesses.",
    canonical: `${SITE_URL}/for/f-commerce`,
  },

  '/for/consultants': {
    title: 'AI for Consultants & Coaches Bangladesh | Productize Your Expertise | SYSmoAI',
    description:
      "Consultants: use AI to automate research, proposals, and reporting. Deliver boutique-firm output as a solo consultant. SYSmoAI for management, strategy, and business consultants.",
    canonical: `${SITE_URL}/for/consultants`,
  },

  '/for/creators': {
    title: 'AI for Content Creators Bangladesh | AI Content Engine | SYSmoAI',
    description:
      "Content creators: turn 1 video into 25+ pieces across platforms with AI repurposing. Eliminate burnout, post consistently, and grow faster. SYSmoAI for creators in Bangladesh.",
    canonical: `${SITE_URL}/for/creators`,
  },

  '/for/corporates': {
    title: 'Corporate AI Training Bangladesh | Enterprise AI Implementation | SYSmoAI',
    description:
      "Corporates: structured AI training that achieves 87% team adoption, saves 15,000+ hours/year, and delivers 44x ROI. SYSmoAI enterprise AI transformation program.",
    canonical: `${SITE_URL}/for/corporates`,
  },

  '/about': {
    title: 'About SYSmoAI | Emon Hossain — Founder, AI Systems Builder Bangladesh',
    description:
      'Meet Emon Hossain, founder of SYSmoAI — a founder-led AI systems initiative building real workflows for Bangladesh micro agencies. Currently in validation stage with the Lead Rescue System pilot.',
    canonical: `${SITE_URL}/about`,
  },

  '/pricing': {
    title: 'AI Consulting Pricing Bangladesh | SYSmoAI Services & Costs',
    description:
      'Transparent AI consulting pricing from SYSmoAI. Quick Win from ৳3,750, Sprint ৳25,000–50,000, Retainer ৳20,000/month. All packages include video documentation and support.',
    canonical: `${SITE_URL}/pricing`,
  },

  '/proof': {
    title: 'How We Work — Trust & Evidence Policy | SYSmoAI',
    description:
      "SYSmoAI's delivery approach, acceptance test model, client ownership, and evidence policy. Honest about being in validation stage — case studies published only after real delivery and client permission.",
    canonical: `${SITE_URL}/proof`,
  },

  '/results': {
    title: 'How We Work — Trust & Evidence Policy | SYSmoAI',
    description:
      "SYSmoAI's delivery approach, acceptance test model, client ownership, and evidence policy. Honest about being in validation stage — case studies published only after real delivery and client permission.",
    canonical: `${SITE_URL}/proof`,
  },

  '/faq': {
    title: 'Frequently Asked Questions | SYSmoAI Bangladesh AI Consulting',
    description:
      "Answers to the most common questions about SYSmoAI's AI consulting services, pricing, timeline, tools used, and how we work with clients in Bangladesh and worldwide.",
    canonical: `${SITE_URL}/faq`,
  },

  '/blog': {
    title: 'AI Insights Blog | SYSmoAI Bangladesh — Practical AI for Every Business',
    description:
      'Practical AI insights, case studies, and tutorials from SYSmoAI. Learn how freelancers, founders, agencies, and corporates in Bangladesh use AI to grow faster.',
    canonical: `${SITE_URL}/blog`,
    ogType: 'website',
  },

  '/free-ai-audit': {
    title: 'Lead Leakage Fit Check | SYSmoAI',
    description:
      '15-minute qualification conversation for the Lead Rescue System pilot. This page redirects to the Fit Check page.',
    canonical: `${SITE_URL}/fit-check`,
  },

  '/lead-rescue': {
    title: 'Lead Rescue System — Agency Edition | SYSmoAI Validation Pilot',
    description:
      'Lead Rescue System — Agency Edition: ১৪-দিনের validation pilot। Client-owned lead-to-client workflow for Bangladesh micro digital agencies. ৳15,000. Acceptance test included.',
    canonical: `${SITE_URL}/lead-rescue`,
  },

  '/fit-check': {
    title: 'Lead Leakage Fit Check — 15 Minutes | SYSmoAI',
    description:
      '15-minute qualification conversation for the Lead Rescue System pilot. Check if your agency meets the criteria. Not a consultation — qualification only. Free.',
    canonical: `${SITE_URL}/fit-check`,
  },

  '/how-we-work': {
    title: 'How We Work — Trust & Evidence Policy | SYSmoAI',
    description:
      "SYSmoAI's delivery approach: acceptance test model, client ownership guarantee, and honest evidence policy for our validation stage pilot.",
    canonical: `${SITE_URL}/how-we-work`,
  },

  '/contact': {
    title: 'Contact SYSmoAI | Get in Touch',
    description:
      'Get in touch with SYSmoAI. Ask about the Lead Rescue System pilot or apply for a Fit Check. WhatsApp, email, and contact form available. Reply within 2 hours.',
    canonical: `${SITE_URL}/contact`,
  },

  '/privacy-policy': {
    title: 'Privacy Policy | SYSmoAI',
    description:
      "SYSmoAI's privacy policy — how we collect, use, and protect your data in compliance with Bangladesh data protection guidelines.",
    canonical: `${SITE_URL}/privacy-policy`,
  },

  '/terms-of-service': {
    title: 'Terms of Service | SYSmoAI',
    description: "SYSmoAI's terms of service — the rules and agreements governing our AI consulting services.",
    canonical: `${SITE_URL}/terms-of-service`,
  },

  '/refund-policy': {
    title: 'Refund Policy | SYSmoAI',
    description: "SYSmoAI's refund policy — our guarantee and refund terms for all AI consulting services.",
    canonical: `${SITE_URL}/refund-policy`,
  },
};

const blogRuntimeConfig: Record<string, RuntimeSeo> = Object.fromEntries(
  blogPostsMeta.map((post) => [
    `/blog/${post.slug}`,
    {
      title: `${post.title} | SYSmoAI`,
      description: post.metaDescription,
      canonical: `${SITE_URL}/blog/${post.slug}`,
      ogType: 'article',
    } satisfies RuntimeSeo,
  ]),
);

const DEFAULT_RUNTIME_SEO: RuntimeSeo = {
  title: 'SYSmoAI — Systems in Motion | AI Systems Bangladesh',
  description:
    'SYSmoAI is a founder-built AI systems initiative in Bangladesh. Lead Rescue System validation pilot for micro digital agencies.',
  canonical: `${SITE_URL}/`,
  ogType: 'website',
};

export function getRuntimeSeo(location: string): RuntimeSeo {
  return runtimeSeoConfig[location] ?? blogRuntimeConfig[location] ?? DEFAULT_RUNTIME_SEO;
}
