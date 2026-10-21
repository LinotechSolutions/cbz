import { useEffect } from 'react';
import { ScreenType } from '../types';
import { SCREEN_PATHS } from './routes';
import { DEFAULT_SITE_URL, OG_IMAGE_PATH, PAGE_META, canonicalUrl, structuredData } from './seo';
import { analytics } from './analytics';

const SITE_URL: string = import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL;

function upsert(selector: string, create: () => HTMLElement, set: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  set(el);
}

const metaTag = (attr: 'name' | 'property', key: string, content: string) =>
  upsert(
    `meta[${attr}="${key}"]`,
    () => document.createElement('meta'),
    (el) => {
      el.setAttribute(attr, key);
      el.setAttribute('content', content);
    }
  );

/**
 * Keeps <head> in step with the current screen during client-side navigation.
 * The build writes the same tags into each route's static HTML (scripts/seo-plugin.ts).
 */
export function usePageMeta(screen: ScreenType) {
  useEffect(() => {
    const meta = PAGE_META[screen];
    const url = canonicalUrl(SITE_URL, SCREEN_PATHS[screen]);

    document.title = meta.title;
    metaTag('name', 'description', meta.description);
    metaTag('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow');
    metaTag('property', 'og:title', meta.title);
    metaTag('property', 'og:description', meta.description);
    metaTag('property', 'og:url', url);
    metaTag('property', 'og:image', `${SITE_URL.replace(/\/+$/, '')}${OG_IMAGE_PATH}`);
    upsert(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      (el) => el.setAttribute('href', url)
    );
    upsert(
      'script[type="application/ld+json"]#structured-data',
      () => Object.assign(document.createElement('script'), { type: 'application/ld+json', id: 'structured-data' }),
      (el) => {
        el.textContent = JSON.stringify(structuredData(screen, SITE_URL));
      }
    );
    analytics.trackPageView(meta.title, SCREEN_PATHS[screen]);
  }, [screen]);
}
