/**
 * Life-stage journeys on the home page: a question the visitor recognises,
 * the promise we make, and the journey it opens. Each maps onto one of the
 * eight guided flows on the site map.
 */
export interface LifeStage {
  question: string;
  promise: string;
  href: string;
  unit: string;
  image: { src: string; alt: string };
}

export const LIFE_STAGES: LifeStage[] = [
  {
    question: 'Just got into varsity?',
    promise: "Let's help you grow.",
    href: '/bank/open-account',
    unit: 'bank',
    image: { src: '/images/loan-education.webp', alt: 'A student on campus' },
  },
  {
    question: 'Starting a family?',
    promise: "Let's build together.",
    href: '/cbz-life/quote',
    unit: 'cbz-life',
    image: { src: '/images/insurance-family.webp', alt: 'A young family at home' },
  },
  {
    question: 'Buying your first home?',
    promise: "Let's open the door.",
    href: '/properties/request-a-viewing',
    unit: 'properties',
    image: { src: '/images/loan-home.webp', alt: 'A newly built home' },
  },
  {
    question: 'Bought a car?',
    promise: "Let's keep it covered.",
    href: '/insurance/quote',
    unit: 'insurance',
    image: { src: '/images/insurance-car.webp', alt: 'A car parked outside a home' },
  },
  {
    question: 'Growing a business?',
    promise: "Let's fund the next step.",
    href: '/bank/apply',
    unit: 'bank',
    image: { src: '/images/accounts/partnership.webp', alt: 'Two business partners shaking hands' },
  },
  {
    question: 'Farming this season?',
    promise: "Let's back the harvest.",
    href: '/agro-yield/apply',
    unit: 'agro-yield',
    image: { src: '/images/cbz-agriculture.webp', alt: 'A farmer in a maize field' },
  },
  {
    question: 'Thinking about tomorrow?',
    promise: "Let's make your money work.",
    href: '/datvest/start-investing',
    unit: 'datvest',
    image: { src: '/images/cbz-wealth.webp', alt: 'An adviser reviewing a portfolio with a client' },
  },
  {
    question: 'Living abroad?',
    promise: "Let's keep you close to home.",
    href: '/diaspora',
    unit: 'bank',
    image: { src: '/images/accounts/diaspora.webp', alt: 'A customer banking from overseas' },
  },
];
