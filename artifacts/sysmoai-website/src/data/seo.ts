import { blogPosts } from './blogPosts';

export const SITE_URL = 'https://sysmoai.com';
export const OG_IMAGE = `${SITE_URL}/opengraph.jpg`;
export const SITE_NAME = 'SYSmoAI';
export const TWITTER_HANDLE = '@sysmoai';

export interface SeoSchema {
  '@context': string;
  '@type': string | string[];
  [key: string]: unknown;
}

export interface RouteSeo {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  schemas?: SeoSchema[];
}

export const ORG_SCHEMA: SeoSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'SYSmoAI',
  alternateName: 'SYSmoAI Private Limited',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Bangladesh's AI consulting company. We build custom AI operating systems, workflow automation, and AI agents for businesses in Bangladesh and worldwide.",
  email: 'hello@sysmoai.com',
  telephone: '+8801711638693',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pallabi',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  },
  founder: {
    '@type': 'Person',
    name: 'Emon Hossain',
    jobTitle: 'Founder & CEO',
    description: 'AI Systems Architect, Top 5% Prompt Engineer globally, 500+ projects delivered',
  },
  serviceArea: [
    { '@type': 'Country', name: 'Bangladesh' },
    { '@type': 'AdministrativeArea', name: 'Worldwide' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Consulting Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Quick Win', description: 'One workflow automated in 3 days. ৳3,750–৳7,500.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Implementation Sprint', description: 'Full AI stack deployed in 14 days. ৳25,000–৳50,000.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Operations Retainer', description: 'Ongoing monthly AI management. ৳20,000/month.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '1:1 AI Coaching', description: 'Personalized 60-min AI session. ৳2,500/session.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Notion OS Build', description: 'Custom Notion business operating system. ৳15,000–৳50,000.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Agent Development', description: 'Custom AI agents for business automation. ৳50,000–৳2,00,000.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'n8n Automation', description: 'Workflow automation per-workflow. ৳2,000–৳10,000.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate AI Training', description: 'Full-day enterprise AI workshop. ৳50,000–৳2,00,000.' } },
    ],
  },
  sameAs: [
    'https://www.facebook.com/sysmoai',
    'https://www.linkedin.com/company/sysmoai',
    'https://www.youtube.com/@sysmoai',
  ],
};

function serviceSchema(
  name: string,
  description: string,
  url: string,
  priceRange?: string,
): SeoSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'Organization', name: 'SYSmoAI', url: SITE_URL },
    url,
    areaServed: [
      { '@type': 'Country', name: 'Bangladesh' },
      { '@type': 'AdministrativeArea', name: 'Worldwide' },
    ],
    ...(priceRange ? { offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', price: priceRange, priceCurrency: 'BDT' } } } : {}),
  };
}

function breadcrumbSchema(items: Array<{ name: string; url: string }>): SeoSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

const home = { name: 'Home', url: SITE_URL };
const services = { name: 'Services', url: `${SITE_URL}/services` };
const blog = { name: 'Blog', url: `${SITE_URL}/blog` };

const staticRoutes: Record<string, RouteSeo> = {
  '/': {
    title: 'SYSmoAI — Systems in Motion | AI Consulting Bangladesh',
    description:
      "SYSmoAI is Bangladesh's premier AI consulting company. We build AI-powered operating systems, automate workflows, and deploy custom AI agents for founders, freelancers, agencies, and corporates worldwide. Founded by Emon Hossain.",
    canonical: `${SITE_URL}/`,
    ogType: 'website',
    schemas: [ORG_SCHEMA],
  },

  '/services': {
    title: 'AI Consulting Services Bangladesh | SYSmoAI',
    description:
      "Explore SYSmoAI's full range of AI consulting services — quick workflow automation, full AI system builds, Notion OS, AI agent development, and corporate training. Starting at ৳3,750.",
    canonical: `${SITE_URL}/services`,
    schemas: [
      ORG_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'SYSmoAI AI Consulting Services',
        url: `${SITE_URL}/services`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'AI Quick Win', url: `${SITE_URL}/services/ai-quick-win` },
          { '@type': 'ListItem', position: 2, name: 'AI Implementation Sprint', url: `${SITE_URL}/services/ai-sprint` },
          { '@type': 'ListItem', position: 3, name: 'AI Operations Retainer', url: `${SITE_URL}/services/ai-retainer` },
          { '@type': 'ListItem', position: 4, name: '1:1 AI Coaching', url: `${SITE_URL}/services/ai-coaching` },
          { '@type': 'ListItem', position: 5, name: 'Group AI Workshop', url: `${SITE_URL}/services/group-workshop` },
          { '@type': 'ListItem', position: 6, name: 'Notion OS Build', url: `${SITE_URL}/services/notion-os` },
          { '@type': 'ListItem', position: 7, name: 'AI Agent Development', url: `${SITE_URL}/services/ai-agent-dev` },
          { '@type': 'ListItem', position: 8, name: 'n8n Workflow Automation', url: `${SITE_URL}/services/n8n-automation` },
          { '@type': 'ListItem', position: 9, name: 'Corporate AI Training', url: `${SITE_URL}/services/corporate-training` },
        ],
      },
      breadcrumbSchema([home, services]),
    ],
  },

  '/services/ai-quick-win': {
    title: 'AI Quick Win — 1 Workflow Automated in 3 Days | SYSmoAI',
    description:
      "Automate your single most painful workflow in 3 days for ৳3,750–7,500. SYSmoAI's AI Quick Win is Bangladesh's lowest-risk AI automation service — guaranteed or rebuilt free.",
    canonical: `${SITE_URL}/services/ai-quick-win`,
    schemas: [
      ORG_SCHEMA,
      serviceSchema('AI Quick Win', 'Automate your single most painful workflow in 3 days. Low-risk entry to AI automation guaranteed or rebuilt free.', `${SITE_URL}/services/ai-quick-win`, '3750–7500'),
      breadcrumbSchema([home, services, { name: 'AI Quick Win', url: `${SITE_URL}/services/ai-quick-win` }]),
    ],
  },

  '/services/ai-sprint': {
    title: 'AI Sprint — Full AI Stack Deployed in 14 Days | SYSmoAI',
    description:
      "Get a complete AI system built in 14 days. SYSmoAI's AI Implementation Sprint automates 3–5 workflows, includes team training, 3-month support, and delivers measurable ROI. ৳25,000–50,000.",
    canonical: `${SITE_URL}/services/ai-sprint`,
    schemas: [
      ORG_SCHEMA,
      serviceSchema('AI Implementation Sprint', 'Full AI system built in 14 days — 3-5 workflows automated, team training, 3-month post-launch support.', `${SITE_URL}/services/ai-sprint`, '25000–50000'),
      breadcrumbSchema([home, services, { name: 'AI Implementation Sprint', url: `${SITE_URL}/services/ai-sprint` }]),
    ],
  },

  '/services/ai-retainer': {
    title: 'AI Retainer — Monthly AI Operations Management | SYSmoAI',
    description:
      "Keep your AI systems optimized with SYSmoAI's monthly AI Operations Retainer. 4–8 hours of hands-on work, monthly improvements, and priority WhatsApp support. ৳20,000/month.",
    canonical: `${SITE_URL}/services/ai-retainer`,
    schemas: [
      ORG_SCHEMA,
      serviceSchema('AI Operations Retainer', 'Monthly AI management — 4-8 hours hands-on work, continuous improvements, priority support. Cancel anytime.', `${SITE_URL}/services/ai-retainer`, '20000'),
      breadcrumbSchema([home, services, { name: 'AI Operations Retainer', url: `${SITE_URL}/services/ai-retainer` }]),
    ],
  },

  '/services/ai-coaching': {
    title: '1:1 AI Coaching Sessions Bangladesh | SYSmoAI',
    description:
      "Get personalized AI coaching from Bangladesh's leading AI consultant. 60-minute live session, session recording, 3-day follow-up Q&A, and personal action plan. ৳2,500/session.",
    canonical: `${SITE_URL}/services/ai-coaching`,
    schemas: [
      ORG_SCHEMA,
      serviceSchema('1:1 AI Coaching', 'Personalized 60-minute AI coaching session — custom action plan, recording, 3-day follow-up Q&A.', `${SITE_URL}/services/ai-coaching`, '2500'),
      breadcrumbSchema([home, services, { name: '1:1 AI Coaching', url: `${SITE_URL}/services/ai-coaching` }]),
    ],
  },

  '/services/group-workshop': {
    title: 'Group AI Workshop Bangladesh | Team AI Training | SYSmoAI',
    description:
      "Upskill your entire team in half a day with SYSmoAI's Group AI Workshop. Custom industry curriculum, hands-on exercises, post-workshop resource pack. ৳500/person (min 10 participants).",
    canonical: `${SITE_URL}/services/group-workshop`,
    schemas: [
      ORG_SCHEMA,
      serviceSchema('Group AI Workshop', 'Half-day hands-on AI workshop for teams of 10+. Custom industry curriculum, real exercises, post-workshop resources.', `${SITE_URL}/services/group-workshop`, '500'),
      breadcrumbSchema([home, services, { name: 'Group AI Workshop', url: `${SITE_URL}/services/group-workshop` }]),
    ],
  },

  '/services/notion-os': {
    title: 'Notion OS Build Bangladesh | Custom Notion Workspace | SYSmoAI',
    description:
      "Get a custom Notion business operating system built for your company. Clients, projects, finance, HR — all interconnected. ৳15,000–50,000. Built by Bangladesh's top Notion specialist.",
    canonical: `${SITE_URL}/services/notion-os`,
    schemas: [
      ORG_SCHEMA,
      serviceSchema('Notion OS Build', 'Custom Notion business operating system — clients, projects, finance, HR all interconnected with video tutorial and training.', `${SITE_URL}/services/notion-os`, '15000–50000'),
      breadcrumbSchema([home, services, { name: 'Notion OS Build', url: `${SITE_URL}/services/notion-os` }]),
    ],
  },

  '/services/ai-agent-dev': {
    title: 'Custom AI Agent Development Bangladesh | NemoClaw | SYSmoAI',
    description:
      "Deploy a custom AI agent for your business — trained on your knowledge base, integrated with WhatsApp or your website. 24/7 operation. ৳50,000–2,00,000.",
    canonical: `${SITE_URL}/services/ai-agent-dev`,
    schemas: [
      ORG_SCHEMA,
      serviceSchema('AI Agent Development', 'Custom AI agents trained on your business knowledge — WhatsApp, web, or custom platform integration. 24/7 operation.', `${SITE_URL}/services/ai-agent-dev`, '50000–200000'),
      breadcrumbSchema([home, services, { name: 'AI Agent Development', url: `${SITE_URL}/services/ai-agent-dev` }]),
    ],
  },

  '/services/n8n-automation': {
    title: 'n8n Workflow Automation Bangladesh | SYSmoAI',
    description:
      "Automate any business workflow with n8n. SYSmoAI builds, tests, and deploys automation workflows for any app stack. ৳2,000–10,000 per workflow. Built in 1–3 days.",
    canonical: `${SITE_URL}/services/n8n-automation`,
    schemas: [
      ORG_SCHEMA,
      serviceSchema('n8n Workflow Automation', 'Per-workflow automation using n8n — any app integration, error handling built in, video documentation. 1-3 day delivery.', `${SITE_URL}/services/n8n-automation`, '2000–10000'),
      breadcrumbSchema([home, services, { name: 'n8n Workflow Automation', url: `${SITE_URL}/services/n8n-automation` }]),
    ],
  },

  '/services/corporate-training': {
    title: 'Corporate AI Training Bangladesh | Enterprise AI Implementation | SYSmoAI',
    description:
      "Transform your company with structured AI training. SYSmoAI's enterprise program covers audit, training, implementation, and a 90-day AI roadmap. ৳50,000–2,00,000.",
    canonical: `${SITE_URL}/services/corporate-training`,
    schemas: [
      ORG_SCHEMA,
      serviceSchema('Corporate AI Training', 'Enterprise AI transformation — audit, structured training, automation implementation, 90-day roadmap.', `${SITE_URL}/services/corporate-training`, '50000–200000'),
      breadcrumbSchema([home, services, { name: 'Corporate AI Training', url: `${SITE_URL}/services/corporate-training` }]),
    ],
  },

  '/services/international': {
    title: 'International AI Consulting Services | SYSmoAI Bangladesh',
    description:
      'World-class AI consulting from Bangladesh at 60–80% savings vs US/EU consultants. SYSmoAI serves clients in the US, UK, Canada, Australia, and worldwide via Wise and Payoneer.',
    canonical: `${SITE_URL}/services/international`,
    schemas: [
      ORG_SCHEMA,
      serviceSchema('International AI Consulting', '60-80% cost savings vs Western consultants — same quality, global delivery via Wise/Payoneer.', `${SITE_URL}/services/international`),
      breadcrumbSchema([home, services, { name: 'International Services', url: `${SITE_URL}/services/international` }]),
    ],
  },

  '/for/students': {
    title: 'AI Tools for Students Bangladesh | Study Smarter with SYSmoAI',
    description:
      "Students: learn AI skills that get you hired, build a freelance income in 30 days, and finish your thesis 3x faster. SYSmoAI's AI coaching for students in Bangladesh.",
    canonical: `${SITE_URL}/for/students`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'For Students', url: `${SITE_URL}/for/students` }]),
    ],
  },

  '/for/job-seekers': {
    title: 'AI Skills for Job Seekers Bangladesh | Get Hired Faster with SYSmoAI',
    description:
      'Stand out in the job market with AI skills. SYSmoAI helps job seekers in Bangladesh rewrite CVs to pass ATS, build AI portfolios, and attract recruiter attention.',
    canonical: `${SITE_URL}/for/job-seekers`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'For Job Seekers', url: `${SITE_URL}/for/job-seekers` }]),
    ],
  },

  '/for/freelancers': {
    title: 'AI for Freelancers Bangladesh | 3x Your Income with SYSmoAI',
    description:
      "Freelancers: use AI to 3x your output, raise your rates from ৳500 to ৳5,000+ per project, and win international clients. SYSmoAI helps Bangladeshi freelancers on Fiverr and Upwork.",
    canonical: `${SITE_URL}/for/freelancers`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'For Freelancers', url: `${SITE_URL}/for/freelancers` }]),
    ],
  },

  '/for/researchers': {
    title: 'AI for Researchers Bangladesh | Research OS for Faster Papers | SYSmoAI',
    description:
      "Researchers: AI-powered literature review in 3 days instead of 4 weeks, faster thesis writing, and research OS in Notion. SYSmoAI helps academics in Bangladesh publish more.",
    canonical: `${SITE_URL}/for/researchers`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'For Researchers', url: `${SITE_URL}/for/researchers` }]),
    ],
  },

  '/for/agencies': {
    title: 'AI for Digital Agencies Bangladesh | Scale Delivery with SYSmoAI',
    description:
      "Agencies: cut content production time by 60%, win more pitches with AI proposal builder, and scale output without scaling headcount. SYSmoAI for digital agencies in Bangladesh.",
    canonical: `${SITE_URL}/for/agencies`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'For Agencies', url: `${SITE_URL}/for/agencies` }]),
    ],
  },

  '/for/sme-founders': {
    title: 'AI for SME Founders Bangladesh | AI Business OS | SYSmoAI',
    description:
      "SME founders: automate WhatsApp, manage all clients in Notion, eliminate 3–5 daily manual workflows. SYSmoAI helps small and medium businesses in Bangladesh scale with AI.",
    canonical: `${SITE_URL}/for/sme-founders`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'For SME Founders', url: `${SITE_URL}/for/sme-founders` }]),
    ],
  },

  '/for/f-commerce': {
    title: 'AI for F-Commerce Sellers Bangladesh | Automate Orders & DMs | SYSmoAI',
    description:
      "F-commerce sellers: automate Facebook DM replies, track orders without notebooks, and scale from 50 to 200+ orders/month. SYSmoAI for Bangladesh f-commerce businesses.",
    canonical: `${SITE_URL}/for/f-commerce`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'For F-Commerce', url: `${SITE_URL}/for/f-commerce` }]),
    ],
  },

  '/for/consultants': {
    title: 'AI for Consultants & Coaches Bangladesh | Productize Your Expertise | SYSmoAI',
    description:
      "Consultants: use AI to automate research, proposals, and reporting. Deliver boutique-firm output as a solo consultant. SYSmoAI for management, strategy, and business consultants.",
    canonical: `${SITE_URL}/for/consultants`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'For Consultants', url: `${SITE_URL}/for/consultants` }]),
    ],
  },

  '/for/creators': {
    title: 'AI for Content Creators Bangladesh | AI Content Engine | SYSmoAI',
    description:
      "Content creators: turn 1 video into 25+ pieces across platforms with AI repurposing. Eliminate burnout, post consistently, and grow faster. SYSmoAI for creators in Bangladesh.",
    canonical: `${SITE_URL}/for/creators`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'For Creators', url: `${SITE_URL}/for/creators` }]),
    ],
  },

  '/for/corporates': {
    title: 'Corporate AI Training Bangladesh | Enterprise AI Implementation | SYSmoAI',
    description:
      "Corporates: structured AI training that achieves 87% team adoption, saves 15,000+ hours/year, and delivers 44x ROI. SYSmoAI enterprise AI transformation program.",
    canonical: `${SITE_URL}/for/corporates`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'For Corporates', url: `${SITE_URL}/for/corporates` }]),
    ],
  },

  '/about': {
    title: 'About SYSmoAI | Emon Hossain — AI Systems Architect Bangladesh',
    description:
      "Meet Emon Hossain, founder of SYSmoAI — Bangladesh's AI Systems Architect with 500+ projects delivered, top 5% globally in prompt engineering, serving clients worldwide.",
    canonical: `${SITE_URL}/about`,
    schemas: [
      ORG_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Emon Hossain',
        jobTitle: 'AI Systems Architect & Founder',
        description:
          "Top 5% Prompt Engineer globally. 500+ AI projects delivered. Founder of SYSmoAI — Bangladesh's leading AI consulting company.",
        url: `${SITE_URL}/about`,
        worksFor: { '@type': 'Organization', name: 'SYSmoAI', url: SITE_URL },
        address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
        sameAs: ['https://www.linkedin.com/company/sysmoai', 'https://www.facebook.com/sysmoai'],
      },
      breadcrumbSchema([home, { name: 'About', url: `${SITE_URL}/about` }]),
    ],
  },

  '/pricing': {
    title: 'AI Consulting Pricing Bangladesh | SYSmoAI Services & Costs',
    description:
      'Transparent AI consulting pricing from SYSmoAI. Quick Win from ৳3,750, Sprint ৳25,000–50,000, Retainer ৳20,000/month. All packages include video documentation and support.',
    canonical: `${SITE_URL}/pricing`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'Pricing', url: `${SITE_URL}/pricing` }]),
    ],
  },

  '/proof': {
    title: 'Client Results & Case Studies | SYSmoAI Bangladesh AI Consulting',
    description:
      "Real results from real clients: 15,000 hours saved, 3x revenue growth, 90-day AI transformations. Browse SYSmoAI's verified case studies and client success stories.",
    canonical: `${SITE_URL}/proof`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'Client Results', url: `${SITE_URL}/proof` }]),
    ],
  },

  '/faq': {
    title: 'Frequently Asked Questions | SYSmoAI Bangladesh AI Consulting',
    description:
      "Answers to the most common questions about SYSmoAI's AI consulting services, pricing, timeline, tools used, and how we work with clients in Bangladesh and worldwide.",
    canonical: `${SITE_URL}/faq`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'FAQ', url: `${SITE_URL}/faq` }]),
    ],
  },

  '/blog': {
    title: 'AI Insights Blog | SYSmoAI Bangladesh — Practical AI for Every Business',
    description:
      'Practical AI insights, case studies, and tutorials from SYSmoAI. Learn how freelancers, founders, agencies, and corporates in Bangladesh use AI to grow faster.',
    canonical: `${SITE_URL}/blog`,
    schemas: [
      ORG_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'SYSmoAI Blog',
        url: `${SITE_URL}/blog`,
        itemListElement: blogPosts.slice(0, 10).map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
        })),
      },
      breadcrumbSchema([home, blog]),
    ],
  },

  '/contact': {
    title: 'Contact SYSmoAI | AI Consulting Bangladesh — Book a Free Audit',
    description:
      'Get in touch with SYSmoAI. Book a free 30-minute AI audit, ask about our services, or start your AI journey today. WhatsApp, email, and contact form available.',
    canonical: `${SITE_URL}/contact`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'Contact', url: `${SITE_URL}/contact` }]),
    ],
  },

  '/free-ai-audit': {
    title: 'Free AI Audit — 30-Minute Session with Emon Hossain | SYSmoAI',
    description:
      "Book your free 30-minute AI audit with SYSmoAI's founder Emon Hossain. Walk away with a clear automation opportunity, action plan, and cost estimate — no commitment required.",
    canonical: `${SITE_URL}/free-ai-audit`,
    schemas: [
      ORG_SCHEMA,
      breadcrumbSchema([home, { name: 'Free AI Audit', url: `${SITE_URL}/free-ai-audit` }]),
    ],
  },

  '/privacy-policy': {
    title: 'Privacy Policy | SYSmoAI',
    description:
      "SYSmoAI's privacy policy — how we collect, use, and protect your data in compliance with Bangladesh data protection guidelines.",
    canonical: `${SITE_URL}/privacy-policy`,
    schemas: [ORG_SCHEMA],
  },

  '/terms-of-service': {
    title: 'Terms of Service | SYSmoAI',
    description: "SYSmoAI's terms of service — the rules and agreements governing our AI consulting services.",
    canonical: `${SITE_URL}/terms-of-service`,
    schemas: [ORG_SCHEMA],
  },

  '/refund-policy': {
    title: 'Refund Policy | SYSmoAI',
    description: "SYSmoAI's refund policy — our guarantee and refund terms for all AI consulting services.",
    canonical: `${SITE_URL}/refund-policy`,
    schemas: [ORG_SCHEMA],
  },
};

const blogRoutes: Record<string, RouteSeo> = Object.fromEntries(
  blogPosts.map((post) => [
    `/blog/${post.slug}`,
    {
      title: `${post.title} | SYSmoAI`,
      description: post.metaDescription,
      canonical: `${SITE_URL}/blog/${post.slug}`,
      ogType: 'article',
      schemas: [
        ORG_SCHEMA,
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.metaDescription,
          keywords: post.metaKeywords.join(', '),
          author: {
            '@type': 'Person',
            name: post.author,
            url: `${SITE_URL}/about`,
          },
          publisher: {
            '@type': 'Organization',
            name: 'SYSmoAI',
            url: SITE_URL,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
          },
          datePublished: post.publishDate,
          dateModified: post.publishDate,
          url: `${SITE_URL}/blog/${post.slug}`,
          image: OG_IMAGE,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
        },
        breadcrumbSchema([
          home,
          blog,
          { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
        ]),
      ],
    } satisfies RouteSeo,
  ]),
);

export const seoConfig: Record<string, RouteSeo> = {
  ...staticRoutes,
  ...blogRoutes,
};

const DEFAULT_SEO: RouteSeo = {
  title: 'SYSmoAI — Systems in Motion | AI Consulting Bangladesh',
  description:
    "SYSmoAI is Bangladesh's premier AI consulting company. AI systems, workflow automation, and custom AI agents for founders, freelancers, agencies, and corporates.",
  canonical: SITE_URL,
  schemas: [ORG_SCHEMA],
};

export function getRouteSeo(pathname: string): RouteSeo {
  return seoConfig[pathname] ?? DEFAULT_SEO;
}
