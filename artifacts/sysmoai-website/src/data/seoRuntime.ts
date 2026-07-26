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
    title: 'SYSmoAI — Stop Losing Orders in Your DMs | F-Commerce AI Bangladesh',
    description:
      "Bangladesh's F-Commerce Operating System. We build Bangla DM auto-reply agents, order trackers, and bKash workflows for Facebook sellers in Dhaka — fully deployed in 14 days for ৳50,000. Book a free F-Commerce audit.",
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
      "Automate your single most painful workflow in 3 days for ৳3,750–7,500. SYSmoAI's AI Quick Win is Bangladesh's lowest-risk AI automation service — acceptance-test driven delivery.",
    canonical: `${SITE_URL}/services/ai-quick-win`,
  },

  '/services/ai-sprint': {
    title: 'F-Commerce AI Sprint — Full System Deployed in 14 Days | SYSmoAI',
    description:
      "Get a complete F-Commerce AI system built in 14 days. DM auto-reply agent, order tracker, bKash workflows — fully deployed for ৳50,000. SYSmoAI's anchor offer for Facebook sellers in Dhaka.",
    canonical: `${SITE_URL}/services/ai-sprint`,
  },

  '/services/ai-retainer': {
    title: 'F-Commerce AI Retainer — Monthly AI Management | SYSmoAI',
    description:
      "Keep your F-Commerce AI systems optimized with SYSmoAI's monthly Retainer. Ongoing improvements, priority WhatsApp support, and monthly performance report. ৳20,000/month.",
    canonical: `${SITE_URL}/services/ai-retainer`,
  },

  '/services/other-engagements': {
    title: 'Other AI Engagements — By Inquiry | SYSmoAI',
    description:
      "AI coaching, group workshops, Notion OS, AI agent development, n8n automation, and corporate training — all available by inquiry for founders who need something beyond the F-Commerce Sprint.",
    canonical: `${SITE_URL}/services/other-engagements`,
  },

  '/services/international': {
    title: 'International AI Consulting Services | SYSmoAI Bangladesh',
    description:
      'World-class AI consulting from Bangladesh at 60–80% savings vs US/EU consultants. SYSmoAI serves clients in the US, UK, Canada, Australia, and worldwide via Wise and Payoneer.',
    canonical: `${SITE_URL}/services/international`,
  },

  '/for/f-commerce': {
    title: 'AI for F-Commerce Sellers Bangladesh | Automate Orders & DMs | SYSmoAI',
    description:
      "F-commerce sellers: automate Facebook DM replies, track orders without notebooks, and scale from 50 to 200+ orders/month. SYSmoAI for Bangladesh f-commerce businesses.",
    canonical: `${SITE_URL}/for/f-commerce`,
  },

  '/about': {
    title: 'About SYSmoAI | Emon Hossain — AI Systems Architect Bangladesh',
    description:
      "Meet Emon Hossain, founder of SYSmoAI — an AI Systems Architect in Dhaka with 3+ years building production AI systems, serving clients worldwide.",
    canonical: `${SITE_URL}/about`,
  },

  '/pricing': {
    title: 'AI Consulting Pricing Bangladesh | SYSmoAI Services & Costs',
    description:
      'Transparent F-Commerce AI pricing from SYSmoAI. Quick Win from ৳3,750, F-Commerce AI Sprint ৳50,000, Retainer ৳20,000/month. All packages include video documentation and support.',
    canonical: `${SITE_URL}/pricing`,
  },

  '/proof': {
    title: 'Client Results & Case Studies | SYSmoAI Bangladesh AI Consulting',
    description:
      "Real results from real clients: 15,000 hours saved, 3x revenue growth, 90-day AI transformations. Browse SYSmoAI's verified case studies and client success stories.",
    canonical: `${SITE_URL}/proof`,
  },

  '/results': {
    title: 'Client Results & Case Studies | SYSmoAI Bangladesh AI Consulting',
    description:
      "Real results from real clients: 15,000 hours saved, 3x revenue growth, 90-day AI transformations. Browse SYSmoAI's verified case studies and client success stories.",
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
    title: 'Free AI Audit — 30-Minute Session with Emon Hossain | SYSmoAI',
    description:
      "Book your free 30-minute AI audit with SYSmoAI's founder Emon Hossain. Walk away with a clear automation opportunity, action plan, and cost estimate — no commitment required.",
    canonical: `${SITE_URL}/free-ai-audit`,
  },

  '/contact': {
    title: 'Contact SYSmoAI | AI Consulting Bangladesh — Book a Free Audit',
    description:
      'Get in touch with SYSmoAI. Book a free 30-minute AI audit, ask about our services, or start your AI journey today. WhatsApp, email, and contact form available.',
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

import { answersPosts } from './answersPosts';

const answersRuntimeConfig: Record<string, RuntimeSeo> = {
  '/answers': {
    title: 'AI Answers — Bangladesh Business & F-Commerce | SYSmoAI',
    description:
      'Direct answers to the most-asked questions about AI consulting, F-commerce automation, and AI implementation in Bangladesh. Written by Emon Hossain, SYSmoAI founder.',
    canonical: `${SITE_URL}/answers`,
  },
  ...Object.fromEntries(
    answersPosts.map((post) => [
      `/answers/${post.slug}`,
      {
        title: `${post.title} | SYSmoAI`,
        description: post.metaDescription,
        canonical: `${SITE_URL}/answers/${post.slug}`,
        ogType: 'article',
      } satisfies RuntimeSeo,
    ]),
  ),
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
  title: 'SYSmoAI — Stop Losing Orders in Your DMs | F-Commerce AI Bangladesh',
  description:
    "Bangladesh's F-Commerce Operating System. Bangla DM auto-reply agents, order trackers, and bKash workflows for Facebook sellers in Dhaka — fully deployed in 14 days for ৳50,000.",
  canonical: `${SITE_URL}/`,
  ogType: 'website',
};

export function getRuntimeSeo(location: string): RuntimeSeo {
  return runtimeSeoConfig[location] ?? blogRuntimeConfig[location] ?? answersRuntimeConfig[location] ?? DEFAULT_RUNTIME_SEO;
}
