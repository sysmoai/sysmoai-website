import { blogPosts } from './blogPosts';
import { answersPosts } from './answersPosts';
import { runtimeSeoConfig, SITE_URL, OG_IMAGE } from './seoRuntime';

export { SITE_URL, OG_IMAGE };
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
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    "Bangladesh's AI consulting company. We build custom AI operating systems, workflow automation, and AI agents for F-commerce sellers, agencies, SMEs, and corporates in Bangladesh and worldwide.",
  email: 'hello@sysmoai.com',
  telephone: '+8801711638693',
  priceRange: '৳3,750–৳2,00,000 (BDT) / $50–$2,400 (USD)',
  currenciesAccepted: 'BDT, USD',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pallabi',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '23.8293',
    longitude: '90.3524',
  },
  founder: {
    '@type': 'Person',
    name: 'Emon Hossain',
    jobTitle: 'Founder & CEO',
    description: 'AI Systems Architect with 3+ years building production AI systems and automation workflows',
    url: `${SITE_URL}/about`,
  },
  knowsAbout: [
    'AI consulting Bangladesh',
    'F-commerce automation',
    'n8n workflow automation',
    'ChatGPT business automation',
    'Notion OS',
    'bKash payment automation',
    'WhatsApp Business API automation',
    'AI agent development',
  ],
  serviceArea: [
    { '@type': 'Country', name: 'Bangladesh' },
    { '@type': 'AdministrativeArea', name: 'Worldwide' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Consulting Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Quick Win', description: 'One workflow automated in 3 days. ৳3,750–৳7,500 / $50–$100.', url: `${SITE_URL}/services/ai-quick-win` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'F-Commerce AI Sprint', description: 'Full F-Commerce AI stack deployed in 14 days. ৳50,000 / $600.', url: `${SITE_URL}/services/ai-sprint` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Operations Retainer', description: 'Ongoing monthly AI management. ৳20,000/month / $250/month.', url: `${SITE_URL}/services/ai-retainer` } },
    ],
  },
  sameAs: [
    'https://www.facebook.com/sysmoai',
    'https://www.linkedin.com/company/sysmoai',
    'https://www.youtube.com/@sysmoai',
    'https://twitter.com/sysmoai',
  ],
};

export const WEBSITE_SCHEMA: SeoSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SYSmoAI',
  url: SITE_URL,
  description: "Bangladesh's AI consulting company — custom AI systems, F-commerce automation, and workflow automation for businesses in Bangladesh and worldwide.",
  publisher: { '@type': 'Organization', name: 'SYSmoAI', url: SITE_URL },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
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

// Shorthand references for breadcrumb construction
const home = { name: 'Home', url: SITE_URL };
const services = { name: 'Services', url: `${SITE_URL}/services` };
const blog = { name: 'Blog', url: `${SITE_URL}/blog` };

// base() pulls title/description/canonical/ogType from runtimeSeoConfig so both
// the static HTML generator and the runtime hook always use the same base metadata.
function base(route: string): Omit<RouteSeo, 'schemas'> {
  const r = runtimeSeoConfig[route];
  if (!r) throw new Error(`Missing runtimeSeoConfig entry for route: ${route}`);
  return r;
}

const staticRoutes: Record<string, RouteSeo> = {
  '/': {
    ...base('/'),
    schemas: [ORG_SCHEMA, WEBSITE_SCHEMA],
  },

  '/services': {
    ...base('/services'),
    schemas: [
      ORG_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'SYSmoAI AI Consulting Services',
        url: `${SITE_URL}/services`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'F-Commerce AI Quick Win', url: `${SITE_URL}/services/ai-quick-win` },
          { '@type': 'ListItem', position: 2, name: 'F-Commerce AI Sprint', url: `${SITE_URL}/services/ai-sprint` },
          { '@type': 'ListItem', position: 3, name: 'F-Commerce AI Retainer', url: `${SITE_URL}/services/ai-retainer` },
          { '@type': 'ListItem', position: 4, name: 'Other Engagements (by inquiry)', url: `${SITE_URL}/services/other-engagements` },
        ],
      },
      breadcrumbSchema([home, services]),
    ],
  },

  '/services/ai-quick-win': {
    ...base('/services/ai-quick-win'),
    schemas: [
      ORG_SCHEMA,
      serviceSchema('AI Quick Win', 'Automate your single most painful workflow in 3 days. Low-risk entry to AI automation with acceptance-test delivery.', `${SITE_URL}/services/ai-quick-win`, '3750–7500'),
      breadcrumbSchema([home, services, { name: 'AI Quick Win', url: `${SITE_URL}/services/ai-quick-win` }]),
    ],
  },

  '/services/ai-sprint': {
    ...base('/services/ai-sprint'),
    schemas: [
      ORG_SCHEMA,
      serviceSchema('F-Commerce AI Sprint', 'Full F-Commerce AI system deployed in 14 days — DM auto-reply agent, order tracker, bKash workflows, team training.', `${SITE_URL}/services/ai-sprint`, '50000'),
      breadcrumbSchema([home, services, { name: 'F-Commerce AI Sprint', url: `${SITE_URL}/services/ai-sprint` }]),
    ],
  },

  '/services/ai-retainer': {
    ...base('/services/ai-retainer'),
    schemas: [
      ORG_SCHEMA,
      serviceSchema('AI Operations Retainer', 'Monthly AI management — 4-8 hours hands-on work, continuous improvements, priority support. Cancel anytime.', `${SITE_URL}/services/ai-retainer`, '20000'),
      breadcrumbSchema([home, services, { name: 'AI Operations Retainer', url: `${SITE_URL}/services/ai-retainer` }]),
    ],
  },

  '/services/other-engagements': {
    ...base('/services/other-engagements'),
    schemas: [
      ORG_SCHEMA,
      serviceSchema('Other Engagements', 'AI coaching, workshops, Notion OS, AI agent development, n8n automation, and corporate training — all by inquiry for founders who need something beyond the Sprint.', `${SITE_URL}/services/other-engagements`),
      breadcrumbSchema([home, services, { name: 'Other Engagements', url: `${SITE_URL}/services/other-engagements` }]),
    ],
  },

  '/services/international': {
    ...base('/services/international'),
    schemas: [
      ORG_SCHEMA,
      serviceSchema('International AI Consulting', '60-80% cost savings vs Western consultants — same quality, global delivery. Payment details confirmed at proposal stage.', `${SITE_URL}/services/international`),
      breadcrumbSchema([home, services, { name: 'International Services', url: `${SITE_URL}/services/international` }]),
    ],
  },

  '/for/f-commerce': {
    ...base('/for/f-commerce'),
    schemas: [ORG_SCHEMA, breadcrumbSchema([home, { name: 'For F-Commerce', url: `${SITE_URL}/for/f-commerce` }])],
  },

  '/about': {
    ...base('/about'),
    schemas: [
      ORG_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Emon Hossain',
        jobTitle: 'AI Systems Architect & Founder',
        description:
          "AI Systems Architect with 3+ years building production AI systems. Founder of SYSmoAI — an AI systems studio in Dhaka, Bangladesh.",
        url: `${SITE_URL}/about`,
        worksFor: { '@type': 'Organization', name: 'SYSmoAI', url: SITE_URL },
        address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
        sameAs: ['https://www.linkedin.com/company/sysmoai', 'https://www.facebook.com/sysmoai'],
      },
      breadcrumbSchema([home, { name: 'About', url: `${SITE_URL}/about` }]),
    ],
  },

  '/pricing': {
    ...base('/pricing'),
    schemas: [ORG_SCHEMA, breadcrumbSchema([home, { name: 'Pricing', url: `${SITE_URL}/pricing` }])],
  },

  '/proof': {
    ...base('/proof'),
    schemas: [ORG_SCHEMA, breadcrumbSchema([home, { name: 'Client Results', url: `${SITE_URL}/proof` }])],
  },

  '/results': {
    ...base('/results'),
    schemas: [ORG_SCHEMA, breadcrumbSchema([home, { name: 'Client Results', url: `${SITE_URL}/proof` }])],
  },

  '/faq': {
    ...base('/faq'),
    schemas: [
      ORG_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { q: 'What is SYSmoAI and how does it help businesses in Bangladesh?', a: "SYSmoAI is an AI systems studio in Dhaka, Bangladesh, founded by Emon Hossain in 2026. We build custom AI operating systems — automating DM replies, order management, payment workflows, and reporting — for F-commerce sellers, SME founders, agencies, and corporates. We draw on 3+ years of hands-on AI systems building across 8+ client categories. Unlike freelancers who do one-off tasks, we build complete, documented systems that run independently. Pricing starts at ৳3,750 for a single workflow (AI Quick Win, 3 days)." },
          { q: 'How much does AI consulting cost in Bangladesh?', a: 'SYSmoAI pricing: AI Quick Win ৳3,750–৳7,500 (1 workflow in 3 days); F-Commerce AI Sprint ৳50,000 (full system in 14 days); AI Retainer ৳20,000/month (ongoing management). International rates: $50–$600 USD — 60–80% below US/EU agency rates. The exact payment method is confirmed at the proposal stage. Quick Win is 100% advance; Sprint is 50% upfront, 50% on delivery; Retainer is monthly billing.' },
          { q: 'How long does AI implementation take for a business in Bangladesh?', a: 'Timeline depends on scope: AI Quick Win (1 workflow) = 3 days; F-Commerce AI Sprint (full DM agent + order tracker + payment workflow + dashboard) = 14 days; AI Retainer = ongoing monthly. A free 30-minute discovery call takes 30 minutes and results in a clear action plan with tools, costs, and timeline. Most clients start seeing measurable results within 72 hours of Quick Win delivery, or within the first 2 weeks of Sprint delivery.' },
          { q: 'What AI tools does SYSmoAI use to automate business workflows?', a: 'SYSmoAI uses ChatGPT (OpenAI GPT-4o), Claude (Anthropic), Notion, n8n, Zapier, Make, WhatsApp Business API, ManyChat, bKash/Nagad integrations, Google Workspace, Airtable, and LangChain — selected based on your specific business model. We work with what you already use and add only what you need. Every system is built within your own accounts so you own it completely.' },
          { q: 'How does F-commerce automation work in Bangladesh?', a: "F-commerce automation connects your Facebook Business Page Messenger to an AI agent that auto-replies DMs in Bangla and English, captures orders, confirms bKash/Nagad payments, and sends follow-up messages — all without manual intervention. SYSmoAI's F-Commerce AI Sprint deploys this full stack in 14 days for ৳50,000 — replacing 14-hour manual workdays for sellers managing 100–500+ DMs/day. Bangladesh has 700,000+ active F-commerce sellers; manual management at scale is no longer viable." },
          { q: 'What is an AI Operating System (AI OS) for business?', a: "An AI Operating System (AI OS) is a connected suite of AI tools, automations, and dashboards that runs your business operations — handling DMs, orders, payments, reports, and follow-ups — with minimal human input. Unlike using individual tools like ChatGPT or Notion alone, an AI OS integrates everything so actions in one system trigger actions in others. SYSmoAI specializes in building AI OS for Bangladesh businesses, with the F-Commerce AI Sprint as the standard deployment for F-commerce sellers." },
          { q: 'Is there a guarantee on AI consulting results?', a: "Every engagement is scoped with a written acceptance test agreed before work starts. You run the system yourself against that test — if the agreed deliverables are not met, the engagement ends with no additional charge beyond the deposit terms in your written scope. We sign a confidentiality agreement before every project, and every system is built within your own accounts — your data stays under your control at all times." },
          { q: 'What makes SYSmoAI different from freelancers or other AI consultants in Bangladesh?', a: 'Key differences: (1) SYSmoAI builds complete, documented systems — not one-off tasks. (2) Every project includes team training + video documentation so you run it independently. (3) 3-month post-launch support is standard. (4) Founder Emon Hossain has spent 3+ years building production AI systems and prompt-engineering workflows. (5) We specialize in Bangladesh market realities: bKash/Nagad automation, Bangla-language AI, F-commerce workflow patterns. (6) Every project is scoped with a written acceptance test — if the agreed deliverables aren\'t met, the engagement ends at no extra charge.' },
          { q: 'Do I need technical knowledge to use AI systems built by SYSmoAI?', a: 'Not after setup. SYSmoAI handles all technical implementation. You attend a 30-minute onboarding call, review and approve the system, and receive complete video documentation so you (and your team) can manage it using simple dashboards — no coding, no technical background required. If something breaks after delivery, we fix it within the support period. For Retainer clients, we handle ongoing maintenance entirely.' },
          { q: 'How do I start working with SYSmoAI?', a: 'Three ways to start: (1) Book a free 30-minute AI audit at sysmoai.com/free-ai-audit — Emon Hossain reviews your workflow and gives you a specific action plan (no commitment required). (2) Message on WhatsApp — we respond within 2 hours on working days. (3) Start directly with an AI Quick Win (৳3,750) — tell us your #1 workflow problem and we automate it in 3 days. Most clients book the free audit first, then choose a package.' },
        ].map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      } as SeoSchema,
      breadcrumbSchema([home, { name: 'FAQ', url: `${SITE_URL}/faq` }]),
    ],
  },

  '/blog': {
    ...base('/blog'),
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
    ...base('/contact'),
    schemas: [ORG_SCHEMA, breadcrumbSchema([home, { name: 'Contact', url: `${SITE_URL}/contact` }])],
  },

  '/free-ai-audit': {
    ...base('/free-ai-audit'),
    schemas: [ORG_SCHEMA, breadcrumbSchema([home, { name: 'Free AI Audit', url: `${SITE_URL}/free-ai-audit` }])],
  },

  '/privacy-policy': {
    ...base('/privacy-policy'),
    schemas: [ORG_SCHEMA],
  },

  '/terms-of-service': {
    ...base('/terms-of-service'),
    schemas: [ORG_SCHEMA],
  },

  '/refund-policy': {
    ...base('/refund-policy'),
    schemas: [ORG_SCHEMA],
  },
};

const HOW_TO_TYPES = new Set(['free-value', 'system-reveal']);

const blogRoutes: Record<string, RouteSeo> = Object.fromEntries(
  blogPosts.map((post) => {
    const articleSchema: SeoSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.metaDescription,
      keywords: post.metaKeywords.join(', '),
      author: { '@type': 'Person', name: post.author, url: `${SITE_URL}/about` },
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
    };

    const schemas: SeoSchema[] = [ORG_SCHEMA, articleSchema];

    if (HOW_TO_TYPES.has(post.articleType) && post.faq && post.faq.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: post.title,
        description: post.metaDescription,
        step: post.faq.slice(0, 6).map((f, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: f.question,
          text: f.answer,
        })),
      });
    }

    schemas.push(breadcrumbSchema([home, blog, { name: post.title, url: `${SITE_URL}/blog/${post.slug}` }]));

    return [
      `/blog/${post.slug}`,
      {
        title: `${post.title} | SYSmoAI`,
        description: post.metaDescription,
        canonical: `${SITE_URL}/blog/${post.slug}`,
        ogType: 'article',
        schemas,
      } satisfies RouteSeo,
    ];
  }),
);

const answersRoutes: Record<string, RouteSeo> = Object.fromEntries(
  answersPosts.map((post) => [
    `/answers/${post.slug}`,
    {
      title: `${post.title} | SYSmoAI`,
      description: post.metaDescription,
      canonical: `${SITE_URL}/answers/${post.slug}`,
      ogType: 'article',
      schemas: [
        ORG_SCHEMA,
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.metaDescription,
          author: { '@type': 'Person', name: post.author, url: `${SITE_URL}/about` },
          publisher: {
            '@type': 'Organization',
            name: 'SYSmoAI',
            url: SITE_URL,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
          },
          datePublished: post.publishDate,
          dateModified: post.publishDate,
          url: `${SITE_URL}/answers/${post.slug}`,
          image: OG_IMAGE,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/answers/${post.slug}` },
          keywords: post.targetKeyword,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        },
        breadcrumbSchema([home, { name: 'Answers', url: `${SITE_URL}/answers` }, { name: post.title, url: `${SITE_URL}/answers/${post.slug}` }]),
      ],
    } satisfies RouteSeo,
  ]),
);

const answersListRoute: Record<string, RouteSeo> = {
  '/answers': {
    title: 'AI Answers — Bangladesh Business & F-Commerce | SYSmoAI',
    description: 'Direct answers to the most-asked questions about AI consulting, F-commerce automation, and AI implementation in Bangladesh. Written by Emon Hossain, SYSmoAI founder.',
    canonical: `${SITE_URL}/answers`,
    schemas: [ORG_SCHEMA, breadcrumbSchema([home, { name: 'Answers', url: `${SITE_URL}/answers` }])],
  },
};

export const seoConfig: Record<string, RouteSeo> = {
  ...staticRoutes,
  ...blogRoutes,
  ...answersRoutes,
  ...answersListRoute,
};

const DEFAULT_SEO: RouteSeo = {
  title: 'SYSmoAI — Stop Losing Orders in Your DMs | F-Commerce AI Bangladesh',
  description:
    "Bangladesh's F-Commerce Operating System. Bangla DM auto-reply agents, order trackers, and bKash workflows for Facebook sellers in Dhaka — fully deployed in 14 days for ৳50,000.",
  canonical: SITE_URL,
  schemas: [ORG_SCHEMA],
};

export function getRouteSeo(pathname: string): RouteSeo {
  return seoConfig[pathname] ?? DEFAULT_SEO;
}
