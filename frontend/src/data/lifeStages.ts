/**
 * Life-stage journeys on the home page: a question the visitor recognises,
 * the promise we make, two or three things we offer for it, and the journey
 * it opens. Each maps onto one of the ten guided flows on the site map.
 */
import type { IconName } from '../components/icons';

export interface LifeStage {
  /** Short tag on the card, e.g. "Students". */
  tag: string;
  /** The icon in the red disc on the card. */
  icon: IconName;
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
    icon: 'graduation',
    question: 'Just got into varsity?',
    promise: "Let's help you grow.",
    offers: ['SmartCash Student account', 'Zero-rated CBZ Touch'],
    href: '/bank/open-account',
    unit: 'bank',
    image: { src: '/images/loan-education.webp', alt: 'A student on campus' },
  },
  {
    tag: 'Traders',
    icon: 'store',
    question: 'Running a small business?',
    promise: "Let's keep the shelves full.",
    offers: ['Working capital', 'Order finance and invoice discounting'],
    href: '/red-sphere#explore-loan-products',
    unit: 'red-sphere',
    image: { src: '/images/cbz-payments.webp', alt: 'A shop owner taking a card payment at her counter' },
  },
  {
    tag: 'Families',
    icon: 'users',
    question: 'Starting a family?',
    promise: "Let's build together.",
    offers: ['Funeral cover', 'Education plan'],
    href: '/cbz-life/quote',
    unit: 'cbz-life',
    image: { src: '/images/insurance-family.webp', alt: 'A young family at home' },
  },
  {
    tag: 'First home',
    icon: 'home',
    question: 'Buying your first home?',
    promise: "Let's open the door.",
    offers: ['CBZ Bank mortgage', 'Stands and homes'],
    href: '/properties/request-a-viewing',
    unit: 'properties',
    image: { src: '/images/loan-home.webp', alt: 'A newly built home' },
  },
  {
    tag: 'Motorists',
    icon: 'car',
    question: 'Bought a car?',
    promise: "Let's keep it covered.",
    offers: ['Comprehensive cover', 'Quick claims'],
    href: '/insurance/quote',
    unit: 'insurance',
    image: { src: '/images/insurance-car.webp', alt: 'A car parked outside a home' },
  },
  {
    tag: 'Business',
    icon: 'building',
    question: 'Growing a business?',
    promise: "Let's fund the next step.",
    offers: ['Working capital', 'Invoice discounting'],
    href: '/bank/apply',
    unit: 'bank',
    image: { src: '/images/accounts/partnership.webp', alt: 'Two business partners shaking hands' },
  },
  {
    tag: 'Farmers',
    icon: 'leaf',
    question: 'Farming this season?',
    promise: "Let's back the harvest.",
    offers: ['Contract farming', 'Equipment and inputs'],
    href: 'https://agrideck.cbz.co.zw/',
    unit: 'agro-yield',
    image: { src: '/images/cbz-agriculture.webp', alt: 'A farmer in a maize field' },
  },
  {
    tag: 'Investors',
    icon: 'chart',
    question: 'Thinking about tomorrow?',
    promise: "Let's make your money work.",
    offers: ['Unit trusts', 'Managed portfolios'],
    href: '/datvest/start-investing',
    unit: 'datvest',
    image: { src: '/images/cbz-wealth.webp', alt: 'An adviser reviewing a portfolio with a client' },
  },
  {
    tag: 'Diaspora',
    icon: 'globe',
    question: 'Living abroad?',
    promise: "Let's keep you close to home.",
    offers: ['Diaspora account', 'Send money home'],
    href: '/diaspora',
    unit: 'bank',
    image: { src: '/images/accounts/diaspora.webp', alt: 'A customer banking from overseas' },
  },
];
