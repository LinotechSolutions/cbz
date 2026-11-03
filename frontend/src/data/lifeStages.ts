/**
 * Life-stage journeys on the home page: a question the visitor recognises,
 * the promise we make, two or three things we offer for it, and the journey
 * it opens. Each maps onto one of the eight guided flows on the site map.
 */
export interface LifeStage {
  /** Short tag on the card, e.g. "Students". */
  tag: string;
  question: string;
  promise: string;
  /** Two or three products or services behind the promise. */
  offers: string[];
  href: string;
  unit: string;
  image: { src: string; alt: string };
}

export const LIFE_STAGES: LifeStage[] = [
  {
    tag: 'Students',
    question: 'Just got into varsity?',
    promise: "Let's help you grow.",
    offers: ['SmartCash Student account', 'Zero-rated CBZ Touch'],
    href: '/bank/open-account',
    unit: 'bank',
    image: { src: '/images/loan-education.webp', alt: 'A student on campus' },
  },
  {
    tag: 'Families',
    question: 'Starting a family?',
    promise: "Let's build together.",
    offers: ['Funeral cover', 'Education plan'],
    href: '/cbz-life/quote',
    unit: 'cbz-life',
    image: { src: '/images/insurance-family.webp', alt: 'A young family at home' },
  },
  {
    tag: 'First home',
    question: 'Buying your first home?',
    promise: "Let's open the door.",
    offers: ['CBZ Bank mortgage', 'Stands and homes'],
    href: '/properties/request-a-viewing',
    unit: 'properties',
    image: { src: '/images/loan-home.webp', alt: 'A newly built home' },
  },
  {
    tag: 'Motorists',
    question: 'Bought a car?',
    promise: "Let's keep it covered.",
    offers: ['Comprehensive cover', 'Quick claims'],
    href: '/insurance/quote',
    unit: 'insurance',
    image: { src: '/images/insurance-car.webp', alt: 'A car parked outside a home' },
  },
  {
    tag: 'Business',
    question: 'Growing a business?',
    promise: "Let's fund the next step.",
    offers: ['Working capital', 'Invoice discounting'],
    href: '/bank/apply',
    unit: 'bank',
    image: { src: '/images/accounts/partnership.webp', alt: 'Two business partners shaking hands' },
  },
  {
    tag: 'Farmers',
    question: 'Farming this season?',
    promise: "Let's back the harvest.",
    offers: ['Contract farming', 'Equipment and inputs'],
    href: '/agro-yield/apply',
    unit: 'agro-yield',
    image: { src: '/images/cbz-agriculture.webp', alt: 'A farmer in a maize field' },
  },
  {
    tag: 'Investors',
    question: 'Thinking about tomorrow?',
    promise: "Let's make your money work.",
    offers: ['Unit trusts', 'Managed portfolios'],
    href: '/datvest/start-investing',
    unit: 'datvest',
    image: { src: '/images/cbz-wealth.webp', alt: 'An adviser reviewing a portfolio with a client' },
  },
  {
    tag: 'Diaspora',
    question: 'Living abroad?',
    promise: "Let's keep you close to home.",
    offers: ['Diaspora account', 'Send money home'],
    href: '/diaspora',
    unit: 'bank',
    image: { src: '/images/accounts/diaspora.webp', alt: 'A customer banking from overseas' },
  },
];
