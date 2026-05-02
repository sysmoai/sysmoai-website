import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { getRouteSeo, OG_IMAGE, SITE_NAME, TWITTER_HANDLE } from '@/data/seo';

function setMeta(selector: string, content: string): void {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    const nameMatch = selector.match(/\[name="([^"]+)"\]/);
    const propMatch = selector.match(/\[property="([^"]+)"\]/);
    if (nameMatch) el.name = nameMatch[1];
    if (propMatch) el.setAttribute('property', propMatch[1]);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string): void {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

function syncSchemas(schemas: unknown[]): void {
  document.querySelectorAll('script[data-page-schema]').forEach((el) => el.remove());
  schemas.forEach((schema, i) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page-schema', String(i));
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export function useSeo(): void {
  const [location] = useLocation();

  useEffect(() => {
    const seo = getRouteSeo(location);

    document.title = seo.title;

    setMeta('meta[name="description"]', seo.description);
    setCanonical(seo.canonical);

    setMeta('meta[property="og:title"]', seo.ogTitle ?? seo.title);
    setMeta('meta[property="og:description"]', seo.ogDescription ?? seo.description);
    setMeta('meta[property="og:url"]', seo.canonical);
    setMeta('meta[property="og:image"]', seo.ogImage ?? OG_IMAGE);
    setMeta('meta[property="og:type"]', seo.ogType ?? 'website');
    setMeta('meta[property="og:site_name"]', SITE_NAME);
    setMeta('meta[property="og:locale"]', 'en_US');

    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', seo.ogTitle ?? seo.title);
    setMeta('meta[name="twitter:description"]', seo.ogDescription ?? seo.description);
    setMeta('meta[name="twitter:image"]', seo.ogImage ?? OG_IMAGE);
    setMeta('meta[name="twitter:site"]', TWITTER_HANDLE);

    if (seo.schemas) {
      syncSchemas(seo.schemas);
    }
  }, [location]);
}
