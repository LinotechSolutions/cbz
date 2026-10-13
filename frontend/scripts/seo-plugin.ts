import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import { OG_IMAGE_PATH, PAGE_META, SEO_ROUTES, canonicalUrl, structuredData } from '../src/lib/seo';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;

/**
 * After the build, writes:
 * - dist/<route>/index.html for every route, each with its own title, description,
 *   canonical, social preview and structured data (the app itself is unchanged);
 * - dist/404.html, a static "page not found" served for unknown URLs;
 * - dist/robots.txt and dist/sitemap.xml pointing at the production domain.
 * Also checks every route has a rewrite in vercel.json, so a new route can't 404 on Vercel.
 */
export function seoPlugin(siteUrl: string): Plugin {
  const site = siteUrl.replace(/\/+$/, '');
  let root = process.cwd();
  let outDir = 'dist';

  return {
    name: 'cbz-seo',
    apply: 'build',
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const indexFile = path.join(outDir, 'index.html');
      const template = fs.readFileSync(indexFile, 'utf8');
      if (!SEO_BLOCK.test(template)) throw new Error('seo-plugin: <!-- seo:start --> block missing from index.html');

      for (const { screen, path: route } of SEO_ROUTES) {
        const meta = PAGE_META[screen];
        const url = canonicalUrl(site, route);
        const jsonLd = JSON.stringify(structuredData(screen, site)).replace(/</g, '\\u003c');
        const head = [
          `<title>${escapeHtml(meta.title)}</title>`,
          `<meta name="description" content="${escapeHtml(meta.description)}" />`,
          `<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow'}" />`,
          `<link rel="canonical" href="${url}" />`,
          `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
          `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
          `<meta property="og:url" content="${url}" />`,
          `<meta property="og:image" content="${site}${OG_IMAGE_PATH}" />`,
          `<script type="application/ld+json" id="structured-data">${jsonLd}</script>`,
        ].join('\n    ');

        const file = route === '/' ? indexFile : path.join(outDir, route.slice(1), 'index.html');
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, template.replace(SEO_BLOCK, head));
      }

      // Static 404: no app script, so unknown URLs don't render the home page with a 200
      const notFound = template
        .replace(SEO_BLOCK, '<title>Page not found | CBZ Holdings</title>\n    <meta name="robots" content="noindex" />')
        .replace(/\s*<script type="module"[^>]*><\/script>/, '')
        .replace(
          '<div id="root"></div>',
          `<main style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;text-align:center;font-family:system-ui,sans-serif;color:#002554">
      <h1 style="font-size:28px;font-weight:800;margin:0">We can’t find that page</h1>
      <p style="margin:0;color:#475569">The link may be out of date, or the page may have moved.</p>
      <a href="/" style="margin-top:8px;padding:12px 20px;border-radius:12px;background:#E4002B;color:#fff;font-weight:700;text-decoration:none">Go to the CBZ home page</a>
    </main>`
        );
      fs.writeFileSync(path.join(outDir, '404.html'), notFound);

      const indexable = SEO_ROUTES.filter(({ screen }) => !PAGE_META[screen].noindex);
      const today = new Date().toISOString().slice(0, 10);
      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          indexable
            .map(
              ({ path: route }) =>
                `  <url><loc>${canonicalUrl(site, route)}</loc><lastmod>${today}</lastmod><priority>${route === '/' ? '1.0' : '0.8'}</priority></url>`
            )
            .join('\n') +
          `\n</urlset>\n`
      );

      const disallowed = SEO_ROUTES.filter(({ screen }) => PAGE_META[screen].noindex).map(({ path: p }) => `Disallow: ${p}`);
      fs.writeFileSync(
        path.join(outDir, 'robots.txt'),
        ['User-agent: *', 'Allow: /', ...disallowed, '', `Sitemap: ${site}/sitemap.xml`, ''].join('\n')
      );

      // Every route needs an explicit rewrite on Vercel (there is no catch-all, so unknown URLs 404)
      for (const configFile of [path.join(root, 'vercel.json'), path.join(root, '..', 'vercel.json')]) {
        if (!fs.existsSync(configFile)) continue;
        const rewrites: { source: string; destination: string }[] = JSON.parse(fs.readFileSync(configFile, 'utf8')).rewrites ?? [];
        const missing = SEO_ROUTES.filter(
          ({ path: route }) => route !== '/' && !rewrites.some((r) => r.source === route && r.destination === `${route}/index.html`)
        ).map(({ path: route }) => route);
        if (missing.length) throw new Error(`seo-plugin: ${configFile} has no rewrite for: ${missing.join(', ')}`);
      }
    },
  };
}
