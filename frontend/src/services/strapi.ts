/**
 * CBZ Holdings — Strapi Headless CMS Client
 * Handles fetching marketing announcements, corporate facts, and editorial media.
 * Supports both Strapi v4 and v5 REST response schemas seamlessly.
 */

import { Announcement, ContactChannel } from '../data/announcementsData';

/**
 * Accepts "https://cms.example.com/api" and also the common mistakes
 * "cms.example.com" (no scheme) or "https://cms.example.com" (no /api).
 */
function normalizeStrapiUrl(raw: string): string {
  let url = raw.trim().replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  if (!/\/api$/.test(url)) url = `${url}/api`;
  return url;
}

const STRAPI_BASE_URL = normalizeStrapiUrl(
  (import.meta as any).env?.VITE_STRAPI_URL || 'http://localhost:1337/api'
);

/** Origin serving uploaded media, e.g. https://cms.example.com (the API URL minus /api). */
const STRAPI_MEDIA_ORIGIN = STRAPI_BASE_URL.replace(/\/api\/?$/, '');

export interface SiteImage {
  src: string;
  alt?: string;
}

/**
 * Normalizes a Strapi entity record regardless of v4/v5 nesting.
 */
function normalizeRecord<T>(record: any): T {
  if (!record) return record;
  const id = record.documentId || record.id;
  const attributes = record.attributes || record;
  return {
    ...attributes,
    id: String(id),
  };
}

function shouldSkipLocalhostRequest(targetUrl: string): boolean {
  if (typeof window === 'undefined') return false;
  const currentHost = window.location.hostname;
  const isCurrentLocal = currentHost === 'localhost' || currentHost === '127.0.0.1';
  const isTargetLocal = /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?/i.test(targetUrl);
  // If we are in production or remote (e.g. Vercel, mobile testing), avoid hanging on localhost
  return !isCurrentLocal && isTargetLocal;
}

/**
 * Core Strapi fetch helper
 */
async function strapiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (shouldSkipLocalhostRequest(STRAPI_BASE_URL)) {
    throw new Error('Strapi localhost endpoint skipped in remote environment');
  }

  const url = `${STRAPI_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch(url, {
      ...options,
      signal: options.signal || controller.signal,
      headers: {
        Accept: 'application/json',
        ...(options.headers as Record<string, string>),
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } finally {
    clearTimeout(timeoutId);
  }
}

export const strapiApi = {
  /**
   * Fetches published announcements from Strapi CMS.
   */
  async getAnnouncements(category?: string): Promise<Announcement[]> {
    let query = '/announcements?populate=*&sort=publishDate:desc';
    if (category && category !== 'all') {
      query += `&filters[category][$eq]=${encodeURIComponent(category)}`;
    }

    const res = await strapiFetch<{ data: any[] }>(query);
    if (!res || !Array.isArray(res.data)) return [];

    return res.data.map((item) => {
      const doc = normalizeRecord<any>(item);
      return {
        id: String(doc.id),
        title: doc.title,
        summary: doc.summary,
        category: (doc.category || 'customer') as 'customer' | 'shareholder' | 'regulatory',
        date: doc.publishDate || doc.createdAt || new Date().toISOString().split('T')[0],
        isUrgent: Boolean(doc.isUrgent),
        circularRef: doc.officialRef || doc.circularRef || undefined,
        tag: doc.tag || (doc.category ? doc.category.toUpperCase() : 'NOTICE'),
        fileSize: doc.fileSize || undefined,
      };
    });
  },

  /**
   * Fetches urgent notices for the top announcement ticker bar.
   */
  async getUrgentAnnouncements(): Promise<Announcement[]> {
    const query = '/announcements?filters[isUrgent][$eq]=true&populate=*&sort=publishDate:desc';
    const res = await strapiFetch<{ data: any[] }>(query);
    if (!res || !Array.isArray(res.data)) return [];

    return res.data.map((item) => {
      const doc = normalizeRecord<any>(item);
      return {
        id: String(doc.id),
        title: doc.title,
        summary: doc.summary,
        category: (doc.category || 'customer') as 'customer' | 'shareholder' | 'regulatory',
        date: doc.publishDate || doc.createdAt || new Date().toISOString().split('T')[0],
        isUrgent: true,
        circularRef: doc.officialRef || doc.circularRef || undefined,
        tag: doc.tag || 'URGENT',
        fileSize: doc.fileSize || undefined,
      };
    });
  },

  /**
   * Fetches key corporate statistics and facts from Strapi CMS.
   */
  async getCorporateFacts(): Promise<Record<string, string>> {
    const query = '/corporate-facts?populate=*';
    const res = await strapiFetch<{ data: any[] }>(query);
    if (!res || !Array.isArray(res.data)) return {};

    const facts: Record<string, string> = {};
    for (const item of res.data) {
      const doc = normalizeRecord<any>(item);
      if (doc.key && doc.value) {
        facts[doc.key] = doc.value;
      }
    }
    return facts;
  },

  /**
   * Fetches editor-uploaded site images, keyed by slot (e.g. "home.hero").
   * Slots without an uploaded image are omitted so callers keep their default.
   */
  async getSiteImages(): Promise<Record<string, SiteImage>> {
    const query = '/site-images?populate=image&pagination[pageSize]=100';
    const res = await strapiFetch<{ data: any[] }>(query);
    if (!res || !Array.isArray(res.data)) return {};

    const images: Record<string, SiteImage> = {};
    for (const item of res.data) {
      const doc = normalizeRecord<any>(item);
      const media = doc.image?.data ? normalizeRecord<any>(doc.image.data) : doc.image;
      if (!doc.key || !media?.url) continue;
      // Local uploads come back as "/uploads/..."; cloud providers return absolute URLs.
      const src = media.url.startsWith('http') ? media.url : `${STRAPI_MEDIA_ORIGIN}${media.url}`;
      images[doc.key] = { src, alt: doc.alt || media.alternativeText || undefined };
    }
    return images;
  },
};
