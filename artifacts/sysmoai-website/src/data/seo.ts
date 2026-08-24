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
  '@type': 'Organization',
  name: 'SYSmoAI',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description: 'Bangladesh-based AI systems and automation practice focused on practical workflows and scoped implementation.',
  email: 'hello@sysmoai.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  },
  founder: {
    '@type': 'Person',
    name: 'Emon Hossain',
    jobTitle: 'AI Systems Strategist & Automation Builder',
    url: 'https://emonhossain.pro',
  },
  knowsAbout: [
    'AI systems',
    'workflow automation',
    'business process automation',
    'AI-assisted workflows',
    'operating systems',
  ],
};

export const WEBSITE_SCHEMA: SeoSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SYSmoAI',
  url: SITE_URL,
  description: 'Practical AI systems and automation from Bangladesh.',
  publisher: { '@type': 'Organization', name: 'SYSmoAI', url: SITE_URL },
};

function breadcrumbSchema(items: Array<{ name: string; url: string }>): SeoSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function base(route: string): Omit<RouteSeo, 'schemas'> {
  const item = runtimeSeoConfig[route];
  if (!item) throw new Error(`Missing runtimeSeoConfig entry for route: ${route}`);
  return item;
}

const home = { name: 'Home', url: SITE_URL };

const staticRoutes: Record<string, RouteSeo> = {
  '/': { ...base('/'), schemas: [ORG_SCHEMA, WEBSITE_SCHEMA] },
  '/services': {
    ...base('/services'),
    schemas: [ORG_SCHEMA, breadcrumbSchema([home, { name: 'Services', url: `${SITE_URL}/services` }])],
  },
  '/about': {
    ...base('/about'),
    schemas: [
      ORG_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Emon Hossain',
        jobTitle: 'AI Systems Strategist & Automation Builder',
        url: 'https://emonhossain.pro',
        worksFor: { '@type': 'Organization', name: 'SYSmoAI', url: SITE_URL },
        address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
      },
      breadcrumbSchema([home, { name: 'About', url: `${SITE_URL}/about` }]),
    ],
  },
  '/contact': {
    ...base('/contact'),
    schemas: [ORG_SCHEMA, breadcrumbSchema([home, { name: 'Contact', url: `${SITE_URL}/contact` }])],
  },
  '/blog': {
    ...base('/blog'),
    schemas: [ORG_SCHEMA, breadcrumbSchema([home, { name: 'Blog', url: `${SITE_URL}/blog` }])],
  },
  '/privacy-policy': { ...base('/privacy-policy'), schemas: [ORG_SCHEMA] },
  '/terms-of-service': { ...base('/terms-of-service'), schemas: [ORG_SCHEMA] },
  '/refund-policy': { ...base('/refund-policy'), schemas: [ORG_SCHEMA] },
};

// Keep historical URLs available to the static generator only so they can carry
// safe canonical metadata while the SPA redirects visitors to the current pages.
for (const route of [
  '/pricing', '/proof', '/results', '/faq', '/free-ai-audit', '/for/f-commerce',
  '/services/ai-quick-win', '/services/ai-sprint', '/services/ai-retainer',
  '/services/other-engagements', '/services/international', '/answers',
]) {
  staticRoutes[route] = { ...base(route), schemas: [ORG_SCHEMA] };
}

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
          '@type': 'Article',
          headline: post.title,
          description: post.metaDescription,
          url: `${SITE_URL}/blog/${post.slug}`,
          author: { '@type': 'Person', name: 'Emon Hossain', url: 'https://emonhossain.pro' },
          publisher: { '@type': 'Organization', name: 'SYSmoAI', url: SITE_URL },
          ...(post.publishDate ? { datePublished: post.publishDate } : {}),
        },
        breadcrumbSchema([home, { name: 'Blog', url: `${SITE_URL}/blog` }, { name: post.title, url: `${SITE_URL}/blog/${post.slug}` }]),
      ],
    } satisfies RouteSeo,
  ]),
);

export const seoConfig: Record<string, RouteSeo> = {
  ...staticRoutes,
  ...blogRoutes,
};

const DEFAULT_SEO: RouteSeo = {
  title: 'SYSmoAI | Practical AI Systems & Automation in Bangladesh',
  description: 'SYSmoAI is a Bangladesh-based AI systems and automation practice focused on practical workflows and scoped implementation.',
  canonical: `${SITE_URL}/`,
  ogType: 'website',
  schemas: [ORG_SCHEMA, WEBSITE_SCHEMA],
};

export function getSeo(route: string): RouteSeo {
  return seoConfig[route] ?? DEFAULT_SEO;
}
