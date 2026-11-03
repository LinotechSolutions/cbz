// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { REDIRECTS } from './src/data/redirects.mjs';

const site = process.env.SITE_URL ?? 'https://www.cbz.co.zw';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  integrations: [react(), sitemap({ filter: (page) => !page.endsWith('/404') })],
  redirects: REDIRECTS,
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: false,
});
