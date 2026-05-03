import { blogPosts } from './blogPosts';
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
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'F-Commerce AI Quick Win', description: 'One F-Commerce workflow automated in 3 days. ৳3,750–৳7,500.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'F-Commerce AI Sprint', description: 'Full F-Commerce AI stack deployed in 14 days. ৳25,000–৳50,000.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'F-Commerce AI Retainer', description: 'Ongoing monthly F-Commerce AI management. ৳20,000/month.' } },
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
    schemas: [ORG_SCHEMA],
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
      serviceSchema('AI Quick Win', 'Automate your single most painful workflow in 3 days. Low-risk entry to AI automation guaranteed or rebuilt free.', `${SITE_URL}/services/ai-quick-win`, '3750–7500'),
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
      serviceSchema('International AI Consulting', '60-80% cost savings vs Western consultants — same quality, global delivery via Wise/Payoneer.', `${SITE_URL}/services/international`),
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
          { q: 'Do I need to know anything about AI to work with you?', a: 'Not at all. We handle everything technical. You just show up for the onboarding call and tell us about your business. We do the rest.' },
          { q: 'How fast do I see results?', a: 'Most Quick Win clients see measurable results within 72 hours of delivery. Sprint clients typically see major impact in the first 2 weeks.' },
          { q: 'Do you only work with businesses in Bangladesh?', a: 'No. We work with clients worldwide. International payments are handled via Wise or Payoneer.' },
          { q: "What if I don't like the output?", a: 'We offer one free revision on all projects. For Quick Win packages: if the stated goal isn\'t met, we rebuild it at no extra charge.' },
          { q: 'Is this consulting or do you actually build?', a: 'We build. You get a working, deployed system — not a slide deck. We don\'t get paid until it works.' },
          { q: 'How do you handle payment?', a: 'Quick Win: 100% advance. Sprint: 50% upfront, 50% on delivery. Retainer: monthly billing. We accept bKash, Nagad, bank transfer, Wise, and Payoneer.' },
          { q: 'What tools will you use?', a: 'Notion, ChatGPT, Claude, n8n, Zapier, WhatsApp automation, and custom AI agents — all chosen based on your specific needs. We work with what you have.' },
          { q: 'Can you train my team as well?', a: 'Yes. Every Sprint includes team training. We also offer standalone Group Workshops for teams of 10+.' },
          { q: 'How do I start?', a: 'Book a free 30-minute discovery call via WhatsApp. No commitment required. We respond within 2 hours on working days.' },
          { q: "I'm a student / freelancer / individual — is SYSmoAI for me?", a: 'Absolutely. We have solutions for every stage — from students learning AI for the first time to enterprises deploying full AI stacks. See our "For You" pages to find your exact situation.' },
          { q: 'Do you offer international client services?', a: 'Yes. We serve clients in the US, UK, Canada, Australia, and across Southeast Asia. International payments via Wise and Payoneer.' },
          { q: 'What makes SYSmoAI different from hiring a freelancer on Fiverr?', a: 'Freelancers do tasks. SYSmoAI builds repeatable systems. We document everything, train your team, and ensure the system runs without us — with 3 months of support included.' },
          { q: 'What happens during the free 30-minute AI audit?', a: 'We spend the first 10 minutes understanding your business and current workflow. The next 15 minutes we identify your biggest automation opportunity and map the exact solution. The final 5 minutes we give you a clear action plan with tools, costs, and timeline. You leave knowing exactly what to build — whether you hire us or not.' },
          { q: 'Is my business data safe with SYSmoAI?', a: 'Absolutely. We sign a confidentiality agreement before every project begins. We never store your business data beyond the project duration. All AI systems are built within your own accounts — your data stays under your control at all times. We follow Bangladesh Personal Data Protection guidelines.' },
          { q: "What if I already tried AI tools and they didn't work?", a: "This is the most common situation we encounter. Tools alone rarely work — the implementation is everything. Most people try ChatGPT or Notion on their own, use it for basic tasks, and give up. We build the complete system FOR you, on YOUR specific data and workflows. It's a completely different experience from DIY." },
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
