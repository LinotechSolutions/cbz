import { EXTERNAL_LINKS, GROUP_FACTS, tbc } from '../facts';
import { SbuPageConfig, campaignsPending, leadershipPending } from '../sbuPages';
import { AGRO_CATEGORIES, AGRO_PRODUCTS } from './agro';
import { LIFE_CATEGORIES, LIFE_PRODUCTS } from './life';
import { RED_SPHERE_CATEGORIES, RED_SPHERE_PRODUCTS } from './redSphere';

/**
 * Per-business-unit configuration for the standardised landing page.
 *
 * Product content comes from the catalogues transcribed from the official
 * product documentation. Facts come from data/facts.ts. Anything still awaiting
 * business sign-off is wrapped in tbc() so it shows up in review.
 */

export const RED_SPHERE_PAGE: SbuPageConfig = {
  brand: 'red-sphere',
  imageKeyPrefix: 'red-sphere-product',
  hero: {
    eyebrow: 'Red Sphere Finance',
    headline: 'Credit that fits how you earn',
    valueProposition:
      'Salary-based lending for government and private payrolls, working capital for enterprises and tuck-shops, and partnership programmes for agents and retailers.',
    imageKey: 'banner.red-sphere',
    image: '/images/cbz-payments.webp',
    primaryCta: { label: 'Apply online', href: EXTERNAL_LINKS.redSphereApply },
    secondaryCta: { label: 'Get the mobile app', href: EXTERNAL_LINKS.redSphereApp },
  },
  about:
    'Red Sphere Finance is the CBZ Group’s microfinance business. It lends against a salary, a payroll agreement or a trading record, so customers who fall outside traditional bank lending can still access credit, and partners and agents can extend it through their own networks.',
  keyFacts: [
    { value: '13', label: 'Lending and partnership products' },
    { value: 'From 5%', label: 'Interest on business and partner facilities' },
    { value: '1–24 months', label: 'Tenors, by product' },
    { value: 'US$2,400', label: 'SSB loan limit' },
    { value: '8%', label: 'Partner commission' },
    { value: 'Part of CBZ', label: GROUP_FACTS.zseListed.value },
  ],
  products: {
    heading: 'Products and solutions',
    intro:
      'Lending by how the customer earns, plus the agency and partnership routes that put Red Sphere credit in front of more people.',
    categories: RED_SPHERE_CATEGORIES,
    items: RED_SPHERE_PRODUCTS,
    termsNote:
      'Tenors, interest rates and administration fees are those set out in the Red Sphere Finance product documentation and are subject to credit assessment and approval. Security requirements vary by product; the documents listed against each product show what is required. Interest rates may change, so confirm the current terms before you apply.',
  },
  campaigns: campaignsPending('Red Sphere'),
  leadership: leadershipPending('Red Sphere'),
  contact: {
    heading: 'Talk to Red Sphere Finance',
    body: 'Apply online, through the mobile app, or speak to the team about agency and partnership opportunities.',
    primaryCta: { label: 'Request a callback', screen: 'open-account' },
  },
};

export const AGRO_PAGE: SbuPageConfig = {
  brand: 'agro-yield',
  imageKeyPrefix: 'agro-product',
  hero: {
    eyebrow: 'CBZ Agro-Yield',
    headline: 'Backing the season, from inputs to offtake',
    valueProposition:
      'Joint venture schemes, seasonal contract farming, commodity trading and a supply chain division covering mechanisation, equipment and water.',
    imageKey: 'banner.agro',
    image: '/images/cbz-agriculture.webp',
    primaryCta: { label: 'Apply for farming finance', screen: 'journey-agro' },
    secondaryCta: { label: 'Speak to the team', screen: 'open-account' },
  },
  about:
    'CBZ Agro-Yield is the CBZ Group’s agribusiness. It works with farming enterprises through joint ventures, funds seasonal contract farming, opens market and offtake routes for commodities, and supplies the mechanisation, equipment and water infrastructure that production depends on.',
  keyFacts: [
    { value: 'Four', label: 'Operating divisions' },
    { value: 'Seasonal', label: 'Contract farming cycles' },
    { value: 'Offtake', label: 'Market routes for commodities' },
    { value: 'Part of CBZ', label: GROUP_FACTS.zseListed.value },
  ],
  products: {
    heading: 'Products and solutions',
    intro: 'The four Agro-Yield divisions and what each one covers.',
    categories: AGRO_CATEGORIES,
    items: AGRO_PRODUCTS,
    termsNote:
      'Scheme terms, pricing and qualifying criteria depend on the crop, the season and the agreement in place. Speak to CBZ Agro-Yield for the current terms.',
  },
  campaigns: campaignsPending('Agro-Yield'),
  leadership: leadershipPending('Agro-Yield'),
  contact: {
    heading: 'Talk to CBZ Agro-Yield',
    body: 'Apply for seasonal finance, discuss a joint venture, or enquire about mechanisation, equipment and borehole drilling.',
    primaryCta: { label: 'Apply for farming finance', screen: 'journey-agro' },
  },
};

export const LIFE_PAGE: SbuPageConfig = {
  brand: 'life',
  imageKeyPrefix: 'life-product',
  hero: {
    eyebrow: 'CBZ Life',
    headline: 'Cover for your family, and for the people you employ',
    valueProposition:
      'Funeral and education plans for individuals, and group life, retirement savings, annuities and credit life for employers.',
    imageKey: 'banner.life',
    image: '/images/insurance-family.webp',
    primaryCta: { label: 'Request a quotation', screen: 'journey' },
    secondaryCta: { label: 'Speak to a consultant', screen: 'open-account' },
  },
  about:
    'CBZ Life provides long-term assurance for individuals and for employers. Individual plans cover funeral costs and build savings towards a child’s education, with life cover attached. Employee benefits cover group life, retirement savings, annuities in retirement, and credit life that settles an outstanding loan balance.',
  keyFacts: [
    { value: 'Six', label: 'Individual and employee benefit products' },
    { value: 'Immediate', label: 'Comfortsure funeral benefit payment' },
    { value: 'Primary & secondary', label: 'Education covered by Sarapavana' },
    { value: 'Regulated', label: tbc('IPEC registration details') },
  ],
  products: {
    heading: 'Products and solutions',
    intro: 'Individual life plans, and the employee benefit products offered to employers.',
    categories: LIFE_CATEGORIES,
    items: LIFE_PRODUCTS,
    termsNote:
      'Benefits, premiums and terms depend on the cover selected and on underwriting. Speak to a CBZ Life consultant for a quotation and the full policy terms.',
  },
  campaigns: campaignsPending('CBZ Life'),
  leadership: leadershipPending('CBZ Life'),
  contact: {
    heading: 'Talk to CBZ Life',
    body: 'Request a quotation for an individual plan, or speak to us about cover for your employees.',
    primaryCta: { label: 'Request a quotation', screen: 'journey' },
  },
};
