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

const servicesCanonical = `${SITE_URL}/services`;

export const runtimeSeoConfig: Record<string, RuntimeSeo> = {
  '/': {
    title: 'SYSmoAI | Practical AI Systems & Automation in Bangladesh',
    description: 'SYSmoAI is a Bangladesh-based AI systems and automation practice focused on practical workflows, scoped implementation, documentation, and responsible handoff.',
    canonical: `${SITE_URL}/`,
    ogType: 'website',
  },
  '/services': {
    title: 'AI Systems & Automation Capabilities | SYSmoAI',
    description: 'Explore SYSmoAI capability areas including workflow diagnosis, automation implementation, AI-assisted workflows, and internal operating systems. Scope, timeline, and pricing are confirmed per engagement.',
    canonical: servicesCanonical,
  },
  '/about': {
    title: 'About SYSmoAI & Emon Hossain | AI Systems and Automation',
    description: 'SYSmoAI is a Bangladesh-based AI systems and automation practice founded by Emon Hossain, AI Systems Strategist & Automation Builder.',
    canonical: `${SITE_URL}/about`,
  },
  '/contact': {
    title: 'Contact SYSmoAI | Discuss an AI Systems or Automation Project',
    description: 'Contact SYSmoAI to discuss a current workflow, the tools involved, and the outcome you want. Engagement scope and commercial terms are confirmed only after review.',
    canonical: `${SITE_URL}/contact`,
  },
  '/blog': {
    title: 'SYSmoAI Insights | Editorial Review',
    description: 'The SYSmoAI article library is under evidence review. Historical posts are temporarily unavailable while claims, examples, sources, dates, and commercial references are checked.',
    canonical: `${SITE_URL}/blog`,
    ogType: 'website',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | SYSmoAI',
    description: 'How SYSmoAI handles information submitted through its website and project inquiry channels.',
    canonical: `${SITE_URL}/privacy-policy`,
  },
  '/terms-of-service': {
    title: 'Terms of Service | SYSmoAI',
    description: 'Website terms for SYSmoAI. Project-specific scope, payment, delivery, support, and acceptance terms are defined in the written engagement agreement.',
    canonical: `${SITE_URL}/terms-of-service`,
  },
  '/refund-policy': {
    title: 'Commercial Terms Notice | SYSmoAI',
    description: 'Refund, cancellation, and payment terms are defined in the written agreement for each SYSmoAI engagement rather than through a universal package promise.',
    canonical: `${SITE_URL}/refund-policy`,
  },
};

const historicalRoutes = [
  '/pricing', '/proof', '/results', '/faq', '/free-ai-audit', '/for/f-commerce',
  '/services/ai-quick-win', '/services/ai-sprint', '/services/ai-retainer',
  '/services/other-engagements', '/services/international', '/answers',
];

for (const route of historicalRoutes) {
  runtimeSeoConfig[route] = {
    title: 'SYSmoAI Capabilities | Scope by Engagement',
    description: 'This historical offer or proof route is no longer the commercial source of truth. Current capabilities and engagement rules are maintained on the SYSmoAI services page.',
    canonical: route === '/free-ai-audit' ? `${SITE_URL}/contact` : servicesCanonical,
  };
}

const DEFAULT_RUNTIME_SEO: RuntimeSeo = {
  title: 'SYSmoAI | Practical AI Systems & Automation in Bangladesh',
  description: 'SYSmoAI is a Bangladesh-based AI systems and automation practice focused on practical workflows and scoped implementation.',
  canonical: `${SITE_URL}/`,
  ogType: 'website',
};

export function getRuntimeSeo(location: string): RuntimeSeo {
  if (location.startsWith('/blog/') || location.startsWith('/answers/')) {
    return {
      title: 'SYSmoAI Insights | Editorial Review',
      description: 'Historical SYSmoAI content is temporarily unavailable while it is reviewed against the current evidence and claim standard.',
      canonical: `${SITE_URL}/blog`,
      ogType: 'website',
    };
  }
  return runtimeSeoConfig[location] ?? DEFAULT_RUNTIME_SEO;
}
