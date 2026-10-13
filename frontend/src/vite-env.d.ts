/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "true" enables simulated demo flows. Never set in production. */
  readonly VITE_ENABLE_DEMO?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_STRAPI_URL?: string;
  /** Production origin used for canonical URLs, sitemap and structured data (default https://cbz.co.zw) */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
