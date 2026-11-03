/**
 * Generates the thin page files for the site map's form actions. Each page is
 * a <FormPage> with a form key, the unit's logo and its breadcrumb. Re-run
 * after adding a form to lib/forms.ts; existing files are overwritten.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const pages = [
  ['bank/call-me-back', 'bank-call-me-back', 'bank', 'CBZ Bank', '/bank', 'Call me back'],
  ['insurance/insure-now', 'insurance-insure-now', 'insurance', 'CBZ Insurance', '/insurance', 'Insure now'],
  ['insurance/claim', 'insurance-claim', 'insurance', 'CBZ Insurance', '/insurance', 'Submit a claim'],
  ['insurance/policy-changes', 'insurance-policy-changes', 'insurance', 'CBZ Insurance', '/insurance', 'Policy changes'],
  ['insurance/call-me-back', 'insurance-call-me-back', 'insurance', 'CBZ Insurance', '/insurance', 'Call me back'],
  ['cbz-life/take-cover', 'life-take-cover', 'life', 'CBZ Life', '/cbz-life', 'Take cover'],
  ['cbz-life/claim', 'life-claim', 'life', 'CBZ Life', '/cbz-life', 'Submit a claim'],
  ['cbz-life/talk-to-an-agent', 'life-talk-to-an-agent', 'life', 'CBZ Life', '/cbz-life', 'Talk to an agent'],
  ['datvest/call-me-back', 'datvest-call-me-back', 'datvest', 'Datvest', '/datvest', 'Call me back'],
  ['properties/call-back', 'properties-call-back', 'properties', 'CBZ Properties', '/properties', 'Request a call back'],
  ['agro-yield/enquire', 'agro-enquire', 'agro-yield', 'CBZ Agro-Yield', '/agro-yield', 'Enquire now'],
  ['red-sphere/enquire', 'red-sphere-enquire', 'red-sphere', 'Red Sphere Finance', '/red-sphere', 'Enquire about financing'],
  ['capital/call-me-back', 'capital-call-me-back', 'capital', 'CBZ Capital', '/capital', 'Call me back'],
  ['risk-advisory/insurance-audit', 'risk-audit', 'risk-advisory', 'CBZ Risk Advisory', '/risk-advisory', 'Request an insurance audit'],
  ['risk-advisory/quote', 'risk-quote', 'risk-advisory', 'CBZ Risk Advisory', '/risk-advisory', 'Get a quote'],
];

for (const [route, formKey, logo, unitName, unitHref, crumb] of pages) {
  const depth = route.split('/').length;
  const up = '../'.repeat(depth);
  const src = `---
import FormPage from '${up}layouts/FormPage.astro';
---

<FormPage
  formKey="${formKey}"
  unitLogo="${logo}"
  crumbs={[{ label: 'Home', href: '/' }, { label: '${unitName}', href: '${unitHref}' }, { label: '${crumb}' }]}
/>
`;
  const file = join('src', 'pages', `${route}.astro`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, src, 'utf8');
  console.log('wrote', file);
}
