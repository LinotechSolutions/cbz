import type { IconName } from '../components/icons';
import { CONTACT } from './facts';

/**
 * Affluent Banking: CBZ Bank's three relationship tiers, Private Banking,
 * Prime Banking and Wealth Management, and the solutions every tier shares
 * (accounts, cards, loans, vehicle finance, safe deposit boxes, insurance,
 * property, investments and farm finance). The copy and figures come from
 * the three CBZ Bank affluent brochures (Private Banking, Prime Banking and
 * Wealth Management folders, v2). The tiers are for individuals, so the
 * header shows the Affluent Banking menu to the Personal audience only.
 *
 * Pages: /affluent (overview), /affluent/<tier>, /affluent/<solution>.
 */

export type TierId = 'private-banking' | 'prime-banking' | 'wealth-management';

export interface Pillar {
  icon: IconName;
  title: string;
  body: string;
}

export interface KnowTab {
  id: string;
  label: string;
  items: string[];
  /** A footnote under the list, e.g. "Subject to credit approval." */
  note?: string;
}

export interface Tier {
  id: TierId;
  name: string;
  /** The brochure's cover line, used as the page title. */
  title: string;
  /** One line under the title. */
  lede: string;
  /** Who it is for, in a few words (the overview cards). */
  who: string;
  email: string;
  image: { src: string; alt: string };
  pillars: Pillar[];
  know: KnowTab[];
  /** "Why clients choose CBZ", from the brochure. */
  why: { title: string; body: string }[];
  /** The welcome letter, from the brochure. */
  letter: { paragraphs: string[]; signoff: string };
  /** Which card the tier carries. */
  card: 'Visa Infinite' | 'Visa Debit and Gold';
}

export interface Tab {
  id: string;
  label: string;
  intro: string;
  /** Accordion rows under the tab. */
  items: { title: string; body: string }[];
}

export interface Solution {
  id: string;
  name: string;
  /** The page title, e.g. "Affluent Banking loans". */
  title: string;
  lede: string;
  icon: IconName;
  image: { src: string; alt: string };
  /** The business unit(s) behind it. */
  offeredBy: { name: string; href: string }[];
  pillars: Pillar[];
  /** "What are you looking for?" tabs. */
  tabs: Tab[];
  /** Compare the three tiers: one row per fact. */
  compare: { label: string; values: Record<TierId, string> }[];
  cta: { label: string; href: string };
  /** Shown as a card on the tier pages ("What you can also get"). */
  cardLine: string;
}

const CALL = '/bank/call-me-back';
const PRIVATE_EMAIL = 'privatebanking@cbz.co.zw';
const PRIME_EMAIL = 'primebanking@cbz.co.zw';
const WEALTH_EMAIL = 'wealthmanagement@cbz.co.zw';

const BANK = { name: 'CBZ Bank', href: '/bank' };
const INSURANCE = { name: 'CBZ Insurance', href: '/insurance' };
const LIFE = { name: 'CBZ Life', href: '/cbz-life' };
const PROPERTIES = { name: 'CBZ Properties', href: '/properties' };
const DATVEST = { name: 'Datvest', href: '/datvest' };
const AGRO = { name: 'CBZ Agro-Yield', href: '/agro-yield' };

const VISA_INFINITE_BENEFITS = [
  'Digital lounge access',
  'Alternate airport services: fast track and spas',
  'YQ Meet and Assist',
  'Global customer assistance',
  'Travel insurance and Travel Assist',
  'Rental car collision damage waiver insurance',
  'Buyers protection and extended warranty insurance',
  'Cyber risk online tool, social engineering cover and online shopping fraud cover',
  'Concierge and chatbot benefits servicing',
  'Visa merchant offers and exclusive deals with Booking.com, BookingBash, IHG Hotels and Resorts, the Visa Luxury Hotel Collection, Avis, SIXT and Rentalcars',
];

const VISA_GOLD_BENEFITS = [
  'Global customer assistance',
  'Travel Assist insurance',
  'Buyers protection insurance',
  'Chatbot benefits servicing',
  'Visa merchant offers and time-limited partner rewards with Booking.com, IHG Hotels and Resorts, the Visa Luxury Hotel Collection, SIXT and Rentalcars',
];

const ONE_RELATIONSHIP = 'One relationship for banking, investments, insurance and farm finance across the CBZ Group.';

export const TIERS: Tier[] = [
  {
    id: 'private-banking',
    name: 'Private Banking',
    title: 'Exclusive banking for those shaping tomorrow',
    lede: 'A dedicated Private Banker, tailored wealth solutions, premium Visa Infinite benefits and an integrated ecosystem of banking, investments, insurance, lending and lifestyle solutions.',
    who: 'For established professionals, business owners and families who want one trusted relationship across everything they do with CBZ.',
    email: PRIVATE_EMAIL,
    image: { src: '/images/cbz-wealth.webp', alt: 'A man in a navy suit at an office window looking out over the city at dusk' },
    card: 'Visa Infinite',
    pillars: [
      { icon: 'handshake', title: 'Relationship-driven', body: 'A dedicated Private Banker who understands your objectives and handles your banking.' },
      { icon: 'clock', title: 'Priority services', body: 'Private banking lounges, priority service and an exclusive banking environment.' },
      { icon: 'user', title: 'Advisory services', body: 'Advice on solutions to grow, protect and preserve your wealth.' },
      { icon: 'bolt', title: 'Tailored solutions', body: 'Banking, investment, insurance and financing solutions under one trusted institution.' },
    ],
    know: [
      {
        id: 'day-to-day',
        label: 'Day-to-day banking',
        items: [
          'Dedicated Relationship Manager and an exclusive banking environment.',
          'Once-off weekly withdrawal of $6,000.',
          'Overdraft facility of up to $5,000 and a credit card facility.*',
          'Visa Infinite card with global acceptance and premium travel, shopping and protection benefits.',
          'Foreign exchange solutions and structured banking services.',
          'Safe deposit boxes for documents, jewellery and valuables.',
        ],
        note: '*Subject to credit approval.',
      },
      {
        id: 'joining',
        label: 'How to join',
        items: [
          'Private Banking is by invitation and application through the Private Banking team.',
          `Email ${PRIVATE_EMAIL}, call ${CONTACT.contactCentre.display} or toll free 460 / 461, or ask your branch to refer you.`,
          'A Private Banker will confirm eligibility and set up your relationship across banking, investments, insurance and farm finance.',
        ],
      },
      {
        id: 'rewards',
        label: 'Rewards & lifestyle',
        items: [
          'Discounted access to airport lounges, gyms and restaurants.',
          'Invitations to exclusive events.',
          'Visa Infinite privileges: digital lounge access, airport fast track and spas, YQ Meet and Assist, concierge and Visa merchant offers.',
          'Exclusive deals with Booking.com, BookingBash, IHG Hotels and Resorts, the Visa Luxury Hotel Collection, Avis, SIXT and Rentalcars.',
        ],
      },
      {
        id: 'loans',
        label: 'Loans',
        items: [
          'Income-based loans of up to $40,000 over 50 months, on eligible income from rentals, dividends, investments, directors’ fees and pensions.*',
          'Property-backed equity facility of up to 60% of the property value.*',
          'Vehicle and asset finance with repayment terms of up to 60 months, comprehensive motor insurance and life assurance.*',
          'Overdraft facility of up to $5,000 and a credit card facility.*',
        ],
        note: '*Subject to credit approval.',
      },
    ],
    why: [
      { title: 'A dedicated Private Banker', body: 'Receive highly personalised financial guidance from an experienced relationship manager who understands your unique objectives.' },
      { title: 'Tailored wealth solutions', body: 'Every solution is customised around your lifestyle, business interests, family priorities and long-term aspirations.' },
      { title: 'Exclusive access', body: 'Enjoy private banking lounges, priority service and exclusive financial opportunities reserved for Private Banking clients.' },
      { title: 'Comprehensive financial expertise', body: 'Benefit from integrated banking, investment, insurance and financing solutions under one trusted institution.' },
      { title: 'Confidentiality and trust', body: 'Your financial affairs are handled with the highest standards of discretion, professionalism and integrity.' },
      { title: 'A partnership for generations', body: 'We focus not only on growing your wealth today, but preserving and transferring it for future generations.' },
    ],
    letter: {
      paragraphs: [
        'As your financial world grows, so does the need for expert guidance, tailored solutions and a trusted relationship that understands both your personal and business aspirations. That is exactly what you will find here.',
        'As a valued Private Banking client, you will have a dedicated Relationship Manager focused on understanding your goals and connecting you to an integrated ecosystem of banking, investments, insurance, lending and lifestyle solutions, all carefully designed around your unique needs.',
        'Our commitment is simple: to provide the exceptional service, discretion and expertise that allow you to focus on what matters most, growing your success.',
      ],
      signoff: 'The CBZ Private Banking Team',
    },
  },
  {
    id: 'prime-banking',
    name: 'Prime Banking',
    title: 'Premium banking that moves with your ambition',
    lede: 'Priority service, personalised support and a broad range of banking, lending, investment and insurance solutions for ambitious professionals, entrepreneurs and achievers.',
    who: 'For professionals and entrepreneurs growing their income and building their future, who want faster service and premium cards.',
    email: PRIME_EMAIL,
    image: { src: '/images/accounts/current.webp', alt: 'A woman in a navy suit smiling in a glass-walled office with the city behind her' },
    card: 'Visa Debit and Gold',
    pillars: [
      { icon: 'clock', title: 'Priority service', body: 'Faster banking with dedicated relationship support and preferential service at selected branches.' },
      { icon: 'phoneMobile', title: 'Convenient everyday banking', body: 'A full suite of digital and transactional banking solutions that simplify your financial life.' },
      { icon: 'wallet', title: 'Exclusive financial solutions', body: 'Tailored lending, savings and investment options aligned to your personal ambitions.' },
      { icon: 'card', title: 'Premium lifestyle benefits', body: 'Premium cards and value-added banking privileges that complement your lifestyle.' },
    ],
    know: [
      {
        id: 'day-to-day',
        label: 'Day-to-day banking',
        items: [
          'Priority service in branch with enhanced digital banking.',
          'Premium transactional accounts and digital banking solutions.',
          'Once-off weekly withdrawal of $6,000.',
          'Visa Debit and Visa Gold cards.',
          'Overdraft facility of up to $2,000 and a credit card facility.*',
          'Economic updates and analysis.',
        ],
        note: '*Subject to credit approval.',
      },
      {
        id: 'joining',
        label: 'How to join',
        items: [
          'Prime Banking is offered to professionals, entrepreneurs and achievers building their future with CBZ.',
          `Email ${PRIME_EMAIL}, call ${CONTACT.contactCentre.display} or toll free 460 / 461, or ask at your branch.`,
          'The Prime Banking team will confirm eligibility and move your accounts across.',
        ],
      },
      {
        id: 'rewards',
        label: 'Rewards & lifestyle',
        items: [
          'Invitations to networking activities.',
          'Visa Gold benefits: global customer assistance, Travel Assist insurance, buyers protection insurance and Visa merchant offers.',
          'Time-limited partnerships offering unique cardholder rewards with Booking.com, IHG Hotels and Resorts, the Visa Luxury Hotel Collection, SIXT and Rentalcars.',
        ],
      },
      {
        id: 'loans',
        label: 'Loans',
        items: [
          'Income-based loans of up to $30,000 over 48 months, on eligible income from rentals, dividends, investments, directors’ fees and pensions.*',
          'Property-backed equity facility of up to 60% of the property value.*',
          'Vehicle asset finance with repayment terms of up to 60 months, comprehensive motor insurance and life assurance.*',
          'Overdraft facility of up to $2,000 and a credit card facility.*',
        ],
        note: '*Subject to credit approval.',
      },
    ],
    why: [
      { title: 'Priority service', body: 'Enjoy faster banking with dedicated relationship support and preferential service at selected branches.' },
      { title: 'Convenient everyday banking', body: 'Access a full suite of digital and transactional banking solutions designed to simplify your financial life.' },
      { title: 'Exclusive financial solutions', body: 'Benefit from tailored lending, savings and investment options aligned to your personal ambitions.' },
      { title: 'Premium lifestyle benefits', body: 'Access products and services that complement your lifestyle, from premium cards to value-added banking privileges.' },
      { title: 'Trusted financial partner', body: 'Bank with Zimbabwe’s leading financial institution, backed by stability, expertise and a strong national footprint.' },
      { title: 'One integrated financial ecosystem', body: 'Access banking, insurance, investments and property solutions conveniently within the CBZ Group.' },
    ],
    letter: {
      paragraphs: [
        'We are delighted to invite you to a community of ambitious professionals, entrepreneurs and achievers who are building their future with confidence.',
        'Your success is a reflection of your hard work, determination and vision. That is why you have earned access to a banking experience designed to match your pace and support your ambitions.',
        'As a Prime Banking client, you will enjoy priority service, personalised support and access to a broad range of banking, lending, investment and insurance solutions, all designed to make managing your finances simpler, smarter and more rewarding.',
      ],
      signoff: 'The CBZ Prime Banking Team',
    },
  },
  {
    id: 'wealth-management',
    name: 'Wealth Management',
    title: 'Expert guidance to grow, protect and pass on your wealth',
    lede: 'Experienced specialists who develop personalised strategies around investments, wealth preservation, retirement, succession and legacy planning.',
    who: 'For individuals and families whose wealth needs professional investment management, preservation and a plan for the next generation.',
    email: WEALTH_EMAIL,
    image: { src: '/images/cbz-protection.webp', alt: 'Three generations of a family outside a brick home in the countryside at golden hour' },
    card: 'Visa Infinite',
    pillars: [
      { icon: 'chart', title: 'Professional investment management', body: 'Experienced investment professionals committed to growing and preserving your wealth.' },
      { icon: 'handshake', title: 'Personalised wealth strategies', body: 'Investment solutions aligned with your goals, risk appetite and investment horizon.' },
      { icon: 'shield', title: 'Long-term wealth preservation', body: 'Capital protected and positioned for sustainable growth across changing market conditions.' },
      { icon: 'users', title: 'Integrated financial planning', body: 'Investments, retirement planning, insurance and estate considerations in one plan.' },
    ],
    know: [
      {
        id: 'day-to-day',
        label: 'Day-to-day banking',
        items: [
          'Personalised investment advisory and a relationship manager.',
          'Overdraft facility of up to $5,000 and a credit card facility.*',
          'Visa Infinite card with global acceptance and premium travel, shopping and protection benefits, plus optional Benefits Plus: SmartDelay, eSim and WithU.',
          'Safe deposit boxes for documents, jewellery and valuables.',
          'Portfolio construction and wealth preservation.',
          'Retirement, succession and legacy planning, and family wealth solutions.',
        ],
        note: '*Subject to credit approval.',
      },
      {
        id: 'joining',
        label: 'How to join',
        items: [
          'Wealth Management is for clients whose wealth calls for professional investment management and a plan for the generations that follow.',
          `Email ${WEALTH_EMAIL}, call ${CONTACT.contactCentre.display} or toll free 460 / 461, or ask your Relationship Manager.`,
          'A wealth specialist will take the time to understand your aspirations before proposing a strategy.',
        ],
      },
      {
        id: 'rewards',
        label: 'Rewards & lifestyle',
        items: [
          'Invitations to exclusive events.',
          'Discounted access to airport lounges, gyms and restaurants.',
          'Visa Infinite privileges: digital lounge access, airport fast track and spas, YQ Meet and Assist, concierge and Visa merchant offers.',
          'Benefits Plus, optional value-added benefits: SmartDelay, eSim and WithU.',
        ],
      },
      {
        id: 'loans',
        label: 'Loans',
        items: [
          'Bespoke lending: an income-based loan of up to $50,000, on eligible income from rentals, dividends, investments, directors’ fees and pensions.*',
          'Property-backed equity facility of up to 60% of the property value.*',
          'Asset and vehicle finance with repayment terms of up to 60 months, comprehensive motor insurance and life assurance.*',
          'Overdraft facility of up to $5,000 and a credit card facility.*',
        ],
        note: '*Subject to credit approval.',
      },
    ],
    why: [
      { title: 'Professional investment management', body: 'Access experienced investment professionals committed to helping you grow and preserve your wealth.' },
      { title: 'Personalised wealth strategies', body: 'Receive customised investment solutions aligned with your financial goals, risk appetite and investment horizon.' },
      { title: 'Diversified investment opportunities', body: 'Build resilient portfolios through access to a broad range of investment opportunities across multiple asset classes.' },
      { title: 'Long-term wealth preservation', body: 'Protect your capital while positioning your wealth for sustainable growth across changing market conditions.' },
      { title: 'Integrated financial planning', body: 'Benefit from holistic wealth solutions that incorporate investments, retirement planning, insurance and estate considerations.' },
      { title: 'Confidence through trusted expertise', body: 'Partner with one of Zimbabwe’s most respected financial institutions, supported by proven experience and sound investment governance.' },
    ],
    letter: {
      paragraphs: [
        'The wealth you have built represents years of commitment, vision and achievement. Protecting it, growing it and preparing it for future generations requires thoughtful planning and trusted expertise.',
        'As a CBZ Wealth Management client, you will work with experienced specialists who take the time to understand your aspirations and develop personalised strategies around investments, wealth preservation, retirement, succession and legacy planning.',
        'This is a relationship built on trust, discretion and a shared commitment to securing your financial future.',
      ],
      signoff: 'The CBZ Wealth Management Team',
    },
  },
];

const T = (privateBanking: string, primeBanking: string, wealthManagement: string): Record<TierId, string> => ({
  'private-banking': privateBanking,
  'prime-banking': primeBanking,
  'wealth-management': wealthManagement,
});

export const SOLUTIONS: Solution[] = [
  {
    id: 'accounts',
    name: 'Transact',
    title: 'Affluent Banking transactional accounts',
    lede: 'Everyday banking, exceptionally done. From everyday payments to life’s bigger opportunities, an account designed for convenience, flexibility and the way you live today.',
    icon: 'wallet',
    image: { src: '/images/accounts/individual.webp', alt: 'A man at a wooden table banking on his laptop over coffee' },
    offeredBy: [BANK],
    cardLine: 'Premium transactional accounts, priority service and enhanced digital banking.',
    pillars: [
      { icon: 'clock', title: 'Priority service', body: 'Faster service in branch, an exclusive banking environment for Private and Wealth clients, and a relationship manager who knows you.' },
      { icon: 'phoneMobile', title: 'Digital banking', body: 'Internet banking, CBZ Touch and USSD, with enhanced digital banking for every tier.' },
      { icon: 'coins', title: 'Cash when you need it', body: 'A once-off weekly withdrawal of $6,000 on Private and Prime Banking.' },
    ],
    tabs: [
      {
        id: 'everyday',
        label: 'Everyday banking',
        intro: 'A premium transactional account linked to your relationship, with the cards and channels to use it anywhere.',
        items: [
          { title: 'Premium transactional account', body: 'A current account with priority service in branch, enhanced digital banking and a once-off weekly withdrawal of $6,000 (Private and Prime Banking). Speak to your Relationship Manager to move your accounts across.' },
          { title: 'Foreign exchange and structured banking', body: 'Private Banking clients have access to foreign exchange solutions and structured banking services arranged by their Private Banker.' },
          { title: 'Economic updates and analysis', body: 'Prime Banking clients receive regular economic updates and analysis from CBZ.' },
        ],
      },
      {
        id: 'digital',
        label: 'Digital channels',
        intro: 'Bank wherever you are, whenever you need to.',
        items: [
          { title: 'Internet banking', body: 'Payments, transfers and statements on the personal internet banking platform.' },
          { title: 'CBZ Touch', body: 'The CBZ Bank app for bills, school fees, transfers and cardless withdrawals.' },
          { title: 'USSD', body: `Dial ${CONTACT.ussd.display} on any phone for balances, airtime and transfers.` },
        ],
      },
    ],
    compare: [
      { label: 'Service', values: T('Dedicated Relationship Manager and an exclusive banking environment', 'Priority service in branch with enhanced digital banking', 'Personalised investment advisory and a relationship manager') },
      { label: 'Weekly cash withdrawal', values: T('Once-off weekly withdrawal of $6,000', 'Once-off weekly withdrawal of $6,000', 'By arrangement with your relationship manager') },
      { label: 'Overdraft', values: T('Up to $5,000', 'Up to $2,000', 'Up to $5,000') },
      { label: 'Foreign exchange', values: T('Foreign exchange solutions and structured banking services', 'Through the branch and digital channels', 'Through your relationship manager') },
      { label: 'Contact', values: T(PRIVATE_EMAIL, PRIME_EMAIL, WEALTH_EMAIL) },
    ],
    cta: { label: 'Speak to a Relationship Manager', href: CALL },
  },
  {
    id: 'cards',
    name: 'Cards',
    title: 'Affluent Banking cards',
    lede: 'Made for a life without boundaries. Whether you are travelling for business or pleasure, enjoy global acceptance, premium benefits and the confidence to pay wherever opportunity takes you.',
    icon: 'card',
    image: { src: '/images/cbz-payments.webp', alt: 'A card payment on a handheld terminal at a café counter' },
    offeredBy: [BANK],
    cardLine: 'Visa Infinite for Private and Wealth clients; Visa Debit and Gold for Prime.',
    pillars: [
      { icon: 'globe', title: 'Global acceptance', body: 'Pay and withdraw wherever Visa is accepted, at home and abroad.' },
      { icon: 'shield', title: 'Protection built in', body: 'Travel, purchase, warranty and online-fraud cover come with the card.' },
      { icon: 'star', title: 'Privileges that travel with you', body: 'Lounges, fast track, concierge and partner deals for Visa Infinite cardholders.' },
    ],
    tabs: [
      {
        id: 'infinite',
        label: 'Visa Infinite',
        intro: 'Unlock a world of premium privileges with CBZ Visa Infinite, for Private Banking and Wealth Management clients.',
        items: [
          { title: 'Benefits', body: VISA_INFINITE_BENEFITS.join('. ') + '.' },
          { title: 'Benefits Plus (Wealth Management)', body: 'Optional value-added benefits for Wealth Management cardholders: SmartDelay, eSim and WithU.' },
          { title: 'Exclusive deals', body: 'Booking.com, BookingBash, IHG Hotels and Resorts, the Visa Luxury Hotel Collection, Avis Car Rental, SIXT Car Rental and Ride, and Rentalcars.' },
        ],
      },
      {
        id: 'gold',
        label: 'Visa Debit and Gold',
        intro: 'Travel, shop and spend with confidence on Visa Gold, for Prime Banking clients.',
        items: [
          { title: 'Visa Gold benefits', body: VISA_GOLD_BENEFITS.join('. ') + '.' },
          { title: 'Visa Debit', body: 'A Visa debit card on your premium transactional account for everyday spending at home and abroad.' },
        ],
      },
      {
        id: 'credit',
        label: 'Credit card',
        intro: 'A credit card facility is available on every tier, subject to credit approval.',
        items: [
          { title: 'Credit card facility', body: 'Private Banking and Wealth Management: a credit card facility alongside an overdraft of up to $5,000. Prime Banking: a credit card facility alongside an overdraft of up to $2,000. Subject to credit approval.' },
        ],
      },
    ],
    compare: [
      { label: 'Card', values: T('Visa Infinite', 'Visa Debit and Visa Gold', 'Visa Infinite, with optional Benefits Plus') },
      { label: 'Travel', values: T('Digital lounge access, airport fast track and spas, YQ Meet and Assist, travel insurance', 'Travel Assist insurance', 'Digital lounge access, airport fast track and spas, YQ Meet and Assist, travel insurance, SmartDelay and eSim') },
      { label: 'Purchase protection', values: T('Buyers protection, extended warranty, online shopping fraud cover', 'Buyers protection insurance', 'Buyers protection, extended warranty, online shopping fraud cover') },
      { label: 'Credit card facility', values: T('Yes, subject to credit approval', 'Yes, subject to credit approval', 'Yes, subject to credit approval') },
    ],
    cta: { label: 'Ask about a card', href: CALL },
  },
  {
    id: 'loans',
    name: 'Loans',
    title: 'Affluent Banking loans',
    lede: 'Unlock more possibilities. Income-based loans, property-backed equity facilities, overdrafts and vehicle finance, arranged through your relationship manager.',
    icon: 'bank',
    image: { src: '/images/accounts/partnership.webp', alt: 'Two people shaking hands over plans in a high-rise office' },
    offeredBy: [BANK],
    cardLine: 'Income-based loans, property-backed equity and overdrafts at the limits of your tier.',
    pillars: [
      { icon: 'coins', title: 'Income-based lending', body: 'Financing based on eligible income from rentals, dividends, investments, directors’ fees and pensions.' },
      { icon: 'home', title: 'Property-backed equity', body: 'An equity facility of up to 60% of your property’s value.' },
      { icon: 'wallet', title: 'Overdraft and credit card', body: 'An overdraft facility and a credit card facility on your transactional account.' },
    ],
    tabs: [
      {
        id: 'income',
        label: 'Income-based loan',
        intro: 'Access financing based on eligible income from rentals, dividends, investments, directors’ fees and pensions.',
        items: [
          { title: 'Private Banking', body: 'Income-based loans of up to $40,000 over 50 months. Subject to credit approval.' },
          { title: 'Prime Banking', body: 'Income-based loans of up to $30,000 over 48 months. Subject to credit approval.' },
          { title: 'Wealth Management', body: 'Bespoke lending: an income-based loan of up to $50,000. Subject to credit approval.' },
          { title: 'Eligible income', body: 'Rentals, dividends, investments, directors’ fees and pensions.' },
        ],
      },
      {
        id: 'equity',
        label: 'Property-backed equity',
        intro: 'Release value from property you own.',
        items: [
          { title: 'Property-backed equity facility', body: 'Up to 60% of the property value on every tier, secured on the property and subject to a valuation by CBZ Properties and credit approval.' },
          { title: 'Mortgage finance', body: 'Buying or building? CBZ Bank mortgages run alongside your relationship; estimate a repayment on the mortgage calculator.' },
        ],
      },
      {
        id: 'overdraft',
        label: 'Overdraft and credit card',
        intro: 'Short-term flexibility on your transactional account.',
        items: [
          { title: 'Overdraft', body: 'Up to $5,000 on Private Banking and Wealth Management; up to $2,000 on Prime Banking. Subject to credit approval.' },
          { title: 'Credit card facility', body: 'Available on every tier alongside the overdraft. Subject to credit approval.' },
        ],
      },
    ],
    compare: [
      { label: 'Income-based loan', values: T('Up to $40,000 over 50 months', 'Up to $30,000 over 48 months', 'Up to $50,000 (bespoke lending)') },
      { label: 'Property-backed equity facility', values: T('Up to 60% of property value', 'Up to 60% of property value', 'Up to 60% of property value') },
      { label: 'Overdraft', values: T('Up to $5,000', 'Up to $2,000', 'Up to $5,000') },
      { label: 'Credit card facility', values: T('Yes', 'Yes', 'Yes') },
      { label: 'Vehicle and asset finance', values: T('Up to 60 months', 'Up to 60 months', 'Up to 60 months') },
    ],
    cta: { label: 'Apply through your banker', href: '/bank/apply' },
  },
  {
    id: 'vehicle-finance',
    name: 'Vehicle finance',
    title: 'Affluent Banking vehicle finance',
    lede: 'Your next chapter starts behind the wheel. Pick your ride and finance it with the CBZ Vehicle Asset Finance Scheme.',
    icon: 'car',
    image: { src: '/images/insurance-car.webp', alt: 'A woman beside a blue SUV in the driveway of a modern house' },
    offeredBy: [BANK, INSURANCE, LIFE],
    cardLine: 'The CBZ Vehicle Asset Finance Scheme with terms of up to 60 months and partner discounts.',
    pillars: [
      { icon: 'calendar', title: 'Up to 60 months', body: 'Flexible repayment terms of up to 60 months.' },
      { icon: 'percent', title: 'Partner discounts', body: 'Exclusive discounts from Croco Motors, ZIMOCO, Hyundai Zimbabwe, Byword Motors and BYD Motors.' },
      { icon: 'shield', title: 'Covered from day one', body: 'Comprehensive motor insurance from CBZ Insurance and life assurance from CBZ Life.' },
    ],
    tabs: [
      {
        id: 'scheme',
        label: 'The scheme',
        intro: 'Pick your ride and finance it with the CBZ Vehicle Asset Finance Scheme.',
        items: [
          { title: 'What is included', body: 'Flexible repayment terms of up to 60 months, exclusive discounts from our partners, comprehensive motor insurance, life assurance and the vehicle itself.' },
          { title: 'Where to buy', body: 'Buy from any dealer, or from our partners Croco Motors, ZIMOCO, Hyundai Zimbabwe, Byword Motors and BYD Motors.' },
          { title: 'Estimate a repayment', body: 'Use the car finance calculator for an indicative monthly repayment, then ask your relationship manager to arrange the facility.' },
        ],
      },
    ],
    compare: [
      { label: 'Vehicle asset finance', values: T('Vehicle and asset finance, up to 60 months', 'Vehicle asset finance, up to 60 months', 'Asset and vehicle finance, up to 60 months') },
      { label: 'Partner discounts', values: T('Croco Motors, ZIMOCO, Hyundai Zimbabwe, Byword Motors, BYD Motors', 'Croco Motors, ZIMOCO, Hyundai Zimbabwe, Byword Motors, BYD Motors', 'Croco Motors, ZIMOCO, Hyundai Zimbabwe, Byword Motors, BYD Motors') },
      { label: 'Insurance', values: T('Comprehensive motor insurance and life assurance', 'Comprehensive motor insurance and life assurance', 'Comprehensive motor insurance and life assurance') },
    ],
    cta: { label: 'Car finance calculator', href: '/calculators#car-finance' },
  },
  {
    id: 'safe-deposit',
    name: 'Safe deposit boxes',
    title: 'Affluent Banking safe deposit boxes',
    lede: 'Some things are simply irreplaceable. Store important documents, jewellery and treasured valuables in a secure CBZ Safe Deposit Box.',
    icon: 'key',
    image: { src: '/images/cbz-banking.webp', alt: 'A relationship manager with a client in a bright branch lobby' },
    offeredBy: [BANK],
    cardLine: 'Secure storage for documents, jewellery and valuables, for Private and Wealth clients.',
    pillars: [
      { icon: 'shield', title: 'Secure', body: 'Your valuables are held in the bank’s vault, not a drawer or a home safe.' },
      { icon: 'document', title: 'For what matters', body: 'Title deeds, wills, certificates, jewellery and treasured items.' },
      { icon: 'handshake', title: 'Arranged by your banker', body: 'Your Private Banker or relationship manager arranges the box and your access to it.' },
    ],
    tabs: [
      {
        id: 'boxes',
        label: 'Safe deposit boxes',
        intro: 'Give your valuables the protection they deserve.',
        items: [
          { title: 'Who can have one', body: 'Safe deposit boxes are part of the Private Banking and Wealth Management offer. Ask your relationship manager about availability at your branch.' },
          { title: 'What to store', body: 'Important documents, jewellery and treasured valuables, with the confidence that they are protected.' },
        ],
      },
    ],
    compare: [
      { label: 'Safe deposit boxes', values: T('Included in the offer', 'Ask your branch', 'Included in the offer') },
    ],
    cta: { label: 'Ask about a safe deposit box', href: CALL },
  },
  {
    id: 'insurance',
    name: 'Insurance',
    title: 'Affluent Banking insurance and life assurance',
    lede: 'Security for today, assurance for tomorrow. Short-term cover from CBZ Insurance and life assurance from CBZ Life, in one relationship.',
    icon: 'shield',
    image: { src: '/images/insurance-family.webp', alt: 'A family of four laughing on a sofa in a bright living room' },
    offeredBy: [INSURANCE, LIFE],
    cardLine: 'Motor, property, travel, business and asset cover, life cover, education plans, retirement solutions and funeral cover.',
    pillars: [
      { icon: 'car', title: 'What you own', body: 'Motor, property, travel and asset protection from CBZ Insurance.' },
      { icon: 'users', title: 'Who depends on you', body: 'Life cover, education plans and funeral cover from CBZ Life.' },
      { icon: 'chart', title: 'Your later years', body: 'Retirement solutions that sit alongside your investments.' },
    ],
    tabs: [
      {
        id: 'short-term',
        label: 'Insurance',
        intro: 'Short-term cover from CBZ Insurance.',
        items: [
          { title: 'Motor insurance', body: 'Comprehensive cover for your vehicles, included with the Vehicle Asset Finance Scheme.' },
          { title: 'Property insurance', body: 'Home and contents cover for your residence.' },
          { title: 'Travel insurance', body: 'Cover when you travel, alongside the travel benefits of your Visa card.' },
          { title: 'Business insurance and asset protection', body: 'Cover for your business interests, plant and assets.' },
        ],
      },
      {
        id: 'life',
        label: 'Life assurance',
        intro: 'Life assurance from CBZ Life.',
        items: [
          { title: 'Life cover', body: 'Protection for the people who depend on you.' },
          { title: 'Education plans', body: 'The Sarapavana Education Plan saves towards your children’s schooling.' },
          { title: 'Retirement solutions', body: 'Retirement savings and annuities for the years after work.' },
          { title: 'Funeral cover', body: 'The Comfortsure Funeral Cashplan for your family.' },
        ],
      },
    ],
    compare: [
      { label: 'Insurance and life assurance', values: T('Motor, property, travel, business, asset protection, life cover, education plans, retirement solutions, funeral cover', 'Motor, property, travel, business, asset protection, life cover, education plans, retirement solutions, funeral cover', 'Motor, property, travel, business, asset protection, life cover, education plans, retirement solutions, funeral cover') },
      { label: 'Arranged through', values: T('Your Private Banker', 'The Prime Banking team', 'Your relationship manager') },
    ],
    cta: { label: 'Get a quote', href: '/insurance/quote' },
  },
  {
    id: 'properties',
    name: 'Property',
    title: 'Affluent Banking property solutions',
    lede: 'Open the door to new possibilities. Property sales, valuations, development and facilities management from CBZ Properties.',
    icon: 'home',
    image: { src: '/images/loan-home.webp', alt: 'A couple holding up a house key in front of their new brick home at sunset' },
    offeredBy: [PROPERTIES, BANK],
    cardLine: 'Property sales, valuations, development and facilities management from CBZ Properties.',
    pillars: [
      { icon: 'home', title: 'Property sales', body: 'Homes, stands, commercial and high-value properties across Zimbabwe.' },
      { icon: 'chart', title: 'Property valuations', body: 'Certified valuations, including for a property-backed equity facility.' },
      { icon: 'building', title: 'Development and facilities management', body: 'Development projects and professional management of the property you hold.' },
    ],
    tabs: [
      {
        id: 'buy',
        label: 'Buy',
        intro: 'Current listings from CBZ Properties, with finance from CBZ Bank.',
        items: [
          { title: 'Property listings', body: 'Residential stands, homes, commercial stands and high-value properties in Harare, Mutare, Masvingo, Kariba and across the country. Browse the listings, then request a viewing.' },
          { title: 'Finance', body: 'A CBZ Bank mortgage or a property-backed equity facility of up to 60% of the value of property you already own, arranged by your relationship manager.' },
        ],
      },
      {
        id: 'manage',
        label: 'Value and manage',
        intro: 'Services for property you already own.',
        items: [
          { title: 'Property valuations', body: 'Certified sworn valuations for sale, security or estate purposes.' },
          { title: 'Property development', body: 'Feasibility, project and construction management for a development of your own.' },
          { title: 'Facilities management', body: 'Tenant and facilities management for residential and commercial property.' },
        ],
      },
    ],
    compare: [
      { label: 'Property solutions', values: T('Sales, valuations, development, facilities management', 'Sales, valuations, development, facilities management', 'Sales, valuations, development, facilities management') },
      { label: 'Finance', values: T('Mortgage; equity facility up to 60%', 'Mortgage; equity facility up to 60%', 'Mortgage; equity facility up to 60%') },
    ],
    cta: { label: 'Browse the listings', href: '/properties#property-listing' },
  },
  {
    id: 'investments',
    name: 'Save & Invest',
    title: 'Affluent Banking investment solutions',
    lede: 'Strategic investing, lasting value. REVITUS REIT and the Africa Equity Fund, alongside Datvest unit trusts and managed portfolios.',
    icon: 'chart',
    image: { src: '/images/cbz-wealth.webp', alt: 'A man in a navy suit at an office window looking over the city skyline' },
    offeredBy: [DATVEST, BANK],
    cardLine: 'REVITUS REIT, the Africa Equity Fund and Datvest portfolios for tomorrow’s wealth.',
    pillars: [
      { icon: 'building', title: 'REVITUS REIT', body: 'The first Real Estate Investment Trust licensed by the Securities and Exchange Commission of Zimbabwe.' },
      { icon: 'globe', title: 'Africa Equity Fund', body: 'From Datvest Asset Management in partnership with BK Capital, from a minimum of $100,000.' },
      { icon: 'chart', title: 'Portfolio construction', body: 'Wealth preservation, retirement, succession and legacy planning for Wealth Management clients.' },
    ],
    tabs: [
      {
        id: 'solutions',
        label: 'Investment solutions',
        intro: 'Two flagship opportunities for affluent clients.',
        items: [
          { title: 'REVITUS REIT', body: 'Expand your property portfolio with the REVITUS Real Estate Investment Trust, the first Real Estate Investment Trust to be licensed by the Securities and Exchange Commission of Zimbabwe.' },
          { title: 'Africa Equity Fund', body: 'Strengthen your financial future by investing with the Africa Equity Fund from Datvest Asset Management in partnership with BK Capital. Start with a minimum investment of $100,000.' },
        ],
      },
      {
        id: 'datvest',
        label: 'Datvest portfolios',
        intro: 'Unit trusts and managed portfolios from Datvest.',
        items: [
          { title: 'Unit trusts', body: 'Money market, fixed income, equity and USD inflation-shield funds.' },
          { title: 'Private wealth', body: 'High-net-worth wealth architecture, segregated mandates, offshore USD notes, VFEX USD equities and trust and estate planning.' },
        ],
      },
    ],
    compare: [
      { label: 'Investment solutions', values: T('REVITUS REIT, Africa Equity Fund', 'REVITUS REIT, Africa Equity Fund', 'REVITUS REIT, Africa Equity Fund') },
      { label: 'Advisory', values: T('Through your Private Banker', 'Tailored savings and investment options', 'Personalised investment advisory, portfolio construction, wealth preservation, retirement, succession and legacy planning') },
    ],
    cta: { label: 'Start investing', href: '/datvest/start-investing' },
  },
  {
    id: 'farm',
    name: 'Farm finance',
    title: 'Affluent Banking farm finance',
    lede: 'Growing wealth with purpose. Seasonal, equipment, irrigation, commodity, working capital and value chain financing from CBZ Agro-Yield.',
    icon: 'leaf',
    image: { src: '/images/cbz-agriculture.webp', alt: 'A farmer in a maize field at sunrise holding a handful of soil' },
    offeredBy: [AGRO, BANK],
    cardLine: 'Seasonal, equipment, irrigation, commodity, working capital and value chain finance from CBZ Agro-Yield.',
    pillars: [
      { icon: 'leaf', title: 'Seasonal and inputs', body: 'Seasonal finance and value chain financing for the crop.' },
      { icon: 'bolt', title: 'Equipment and irrigation', body: 'Equipment and irrigation finance for the farm.' },
      { icon: 'coins', title: 'Commodity and working capital', body: 'Commodity finance and working capital between seasons.' },
    ],
    tabs: [
      {
        id: 'solutions',
        label: 'Farm solutions',
        intro: 'Farm finance from CBZ Agro-Yield, in the same relationship as your banking.',
        items: [
          { title: 'Seasonal finance', body: 'Inputs and working capital for the season, repaid from the harvest.' },
          { title: 'Equipment finance', body: 'Tractors, implements and machinery.' },
          { title: 'Irrigation finance', body: 'Pivots, pumps and irrigation infrastructure.' },
          { title: 'Commodity finance', body: 'Finance against commodities held or contracted.' },
          { title: 'Working capital', body: 'Cash flow between planting and sale.' },
          { title: 'Value chain financing', body: 'Finance along the chain from inputs to offtake.' },
        ],
      },
    ],
    compare: [
      { label: 'Farm finance', values: T(ONE_RELATIONSHIP, ONE_RELATIONSHIP, ONE_RELATIONSHIP) },
    ],
    cta: { label: 'Talk to Agro-Yield', href: '/agro-yield/enquire' },
  },
];

/** The tier pages' "What you can also get" cards, in this order. */
export const ALSO_GET: Solution['id'][] = ['accounts', 'investments', 'loans', 'insurance', 'properties', 'cards', 'vehicle-finance', 'safe-deposit', 'farm'];

export const AFFLUENT_HOME = {
  path: '/affluent',
  title: 'Affluent Banking',
  lede: 'Private Banking, Prime Banking and Wealth Management: three relationship tiers from CBZ Bank, each with a relationship manager and one relationship for banking, investments, insurance and farm finance.',
};

export const tierHref = (id: TierId) => `/affluent/${id}`;
export const solutionHref = (id: string) => `/affluent/${id}`;
