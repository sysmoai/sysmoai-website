import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { getRuntimeSeo, OG_IMAGE, SITE_NAME, TWITTER_HANDLE } from '@/data/seoRuntime';

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

export function useSeo(): void {
  const [location] = useLocation();

  useEffect(() => {
    const seo = getRuntimeSeo(location);

    document.title = seo.title;

    setMeta('meta[name="description"]', seo.description);
    setCanonical(seo.canonical);

    setMeta('meta[property="og:title"]', seo.ogTitle ?? seo.title);
    setMeta('meta[property="og:description"]', seo.ogDescription ?? seo.description);
    setMeta('meta[property="og:url"]', seo.canonical);
    setMeta('meta[property="og:image"]', OG_IMAGE);
    setMeta('meta[property="og:type"]', seo.ogType ?? 'website');
    setMeta('meta[property="og:site_name"]', SITE_NAME);
    setMeta('meta[property="og:locale"]', 'en_US');

    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', seo.ogTitle ?? seo.title);
    setMeta('meta[name="twitter:description"]', seo.ogDescription ?? seo.description);
    setMeta('meta[name="twitter:image"]', OG_IMAGE);
    setMeta('meta[name="twitter:site"]', TWITTER_HANDLE);

    // Note: JSON-LD schemas are NOT injected at runtime — they are already
    // baked into the static HTML by generate-static.ts and served by server.mjs.
    // Re-injecting them on SPA navigation is unnecessary for SEO (crawlers fetch
    // the static HTML, not the SPA navigation state).
  }, [location]);
}
