# CBZ Holdings website, frontend

Static marketing and acquisition site for CBZ Holdings. Astro with TypeScript, React islands for the interactive parts, plain CSS with design tokens, and content collections validated by Zod.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # ports content, builds to dist/, writes HANDOFF.md
npm run preview
```

## Check it

```bash
npm run check      # TypeScript and Astro diagnostics
npm run lint
npm test           # Vitest: calculator maths, visible(), suggestions, forms
npm run e2e        # Playwright with axe, mobile and desktop (builds first)
npm run lhci       # Lighthouse CI against dist/
```

CI (`.github/workflows/ci.yml` at the repo root) runs all of these on every pull request.

## Where things are

```
src/
  styles/        tokens.css, typography.css, global.css
  layouts/       BaseLayout, UnitLayout, FormPage, InfoPage
  components/    Astro components, no JavaScript shipped
  islands/       React: Header, menus, Calculator, StepForm, PropertyGallery, PropertyFilters, ChatLauncher, ConsentBanner, Suggest
  content/       units, products, properties, deals, campaigns, notices (+ _import, the old site's data)
  data/          facts, links, logos, nav, calculators, group, redirects
  lib/           visible, format, calc/, season, suggest, forms, draftStore, submitForm, analytics
  pages/         one file per route
scripts/         port-content.ts, handoff-report.ts
tests/           unit/, e2e/
```

Content editing is described in `CONTENT.md`. What the backend and the business still need to supply is in `HANDOFF.md`.

## Deploy

- **Vercel:** `vercel.json` here and at the repo root. Framework Astro, output `dist`.
- **Docker:** `Dockerfile` builds with Node and serves `dist/` with nginx (`nginx.conf`), with a real 404.

## Conventions

- Components never hardcode a contact, link, figure or legal string. Everything comes from `src/data` or `src/content`.
- Anything unconfirmed is `null`. `visible()` in `src/lib/visible.ts` decides what renders.
- Logos only through `<Logo>`. Images only through `<ResponsiveImage>`, with a fixed ratio.
- Islands hydrate `client:visible` or `client:idle`; only the header is `client:load`.
- Motion only in response to the user, 150 to 250ms, none under `prefers-reduced-motion`.
