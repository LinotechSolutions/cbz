import type { RateTable } from '../lib/calc/quote';
import type { SeasonWindow } from '../lib/season';

export type CalculatorKey = 'mortgage' | 'carFinance' | 'carInsurance' | 'policyQuote' | 'loan';

export interface Range {
  min: number;
  max: number;
  step: number;
  /** Starting value; null leaves the field empty so nothing is assumed. */
  default: number | null;
}

export interface LoanCalculatorConfig {
  kind: 'loan';
  title: string;
  intro: string;
  currency: 'USD';
  price: Range & { label: string };
  deposit: (Range & { label: string }) | null;
  term: Range & { label: string; unit: 'years' | 'months' };
  ratePct: Range & { label: string; hint: string };
  disclaimer: string;
  cta: { label: string; href: string };
}

export interface QuoteCalculatorConfig {
  kind: 'quote';
  title: string;
  intro: string;
  currency: 'USD';
  value: Range & { label: string; hint: string };
  /** null until the business supplies a rate table. */
  rates: RateTable | null;
  disclaimer: string;
  cta: { label: string; href: string };
}

export type CalculatorConfig = LoanCalculatorConfig | QuoteCalculatorConfig;

const DISCLAIMER =
  'Indicative only. Your actual repayment depends on credit assessment and the rate offered at the time of your application.';

const RATE_HINT = 'Enter the rate quoted to you. Rates are confirmed on application.';

export const CALCULATORS: Record<CalculatorKey, CalculatorConfig> = {
  mortgage: {
    kind: 'loan',
    title: 'Mortgage calculator',
    intro: 'Estimate the monthly repayment on a home or stand.',
    currency: 'USD',
    price: { label: 'Property price', min: 5_000, max: 2_000_000, step: 500, default: null },
    deposit: { label: 'Deposit', min: 0, max: 2_000_000, step: 500, default: null },
    term: { label: 'Term in years', unit: 'years', min: 2, max: 10, step: 1, default: 10 },
    ratePct: { label: 'Interest rate per year', hint: RATE_HINT, min: 1, max: 40, step: 0.25, default: null },
    disclaimer: DISCLAIMER,
    cta: { label: 'Apply for a mortgage', href: '/bank/apply' },
  },
  carFinance: {
    kind: 'loan',
    title: 'Car finance calculator',
    intro: 'Estimate the monthly repayment on a vehicle.',
    currency: 'USD',
    price: { label: 'Vehicle price', min: 1_000, max: 500_000, step: 100, default: null },
    deposit: { label: 'Deposit', min: 0, max: 500_000, step: 100, default: null },
    term: { label: 'Term in years', unit: 'years', min: 1, max: 5, step: 1, default: 3 },
    ratePct: { label: 'Interest rate per year', hint: RATE_HINT, min: 1, max: 40, step: 0.25, default: null },
    disclaimer: DISCLAIMER,
    cta: { label: 'Apply for car finance', href: '/bank/apply' },
  },
  loan: {
    kind: 'loan',
    title: 'Loan calculator',
    intro: 'Estimate the monthly repayment on a Red Sphere loan.',
    currency: 'USD',
    price: { label: 'Loan amount', min: 50, max: 50_000, step: 10, default: null },
    deposit: null,
    term: { label: 'Term in months', unit: 'months', min: 1, max: 24, step: 1, default: 12 },
    ratePct: {
      label: 'Interest rate per year',
      hint: 'Enter the rate for the product you are applying for. Rates start from 5% on business and partner facilities.',
      min: 1,
      max: 120,
      step: 0.25,
      default: null,
    },
    disclaimer:
      'Indicative only. Administration fees are not included. Your repayment depends on the product, the tenor and credit assessment.',
    cta: { label: 'Apply online', href: 'https://rs.cbz.co.zw/' },
  },
  carInsurance: {
    kind: 'quote',
    title: 'Car insurance quote',
    intro: 'Get an indicative annual premium for comprehensive cover.',
    currency: 'USD',
    value: {
      label: 'Vehicle value',
      hint: 'The current market value of the vehicle.',
      min: 500,
      max: 500_000,
      step: 100,
      default: null,
    },
    rates: null,
    disclaimer:
      'Indicative only. Your premium depends on the vehicle, its use, where it is kept overnight and your claims history.',
    cta: { label: 'Get a car insurance quote', href: '/insurance/quote' },
  },
  policyQuote: {
    kind: 'quote',
    title: 'Life policy quote',
    intro: 'Get an indicative monthly premium for a funeral or education plan.',
    currency: 'USD',
    value: {
      label: 'Cover amount',
      hint: 'The benefit you want paid out.',
      min: 500,
      max: 100_000,
      step: 100,
      default: null,
    },
    rates: null,
    disclaimer: 'Indicative only. Your premium depends on the cover selected and on underwriting.',
    cta: { label: 'Request a quotation', href: '/cbz-life/quote' },
  },
};

/** Agro-Yield contract farming windows. Dates are placeholders until Agro-Yield confirms. */
export const AGRO_SEASONS: readonly SeasonWindow[] = [
  {
    season: 'summer',
    opens: { day: 1, month: 8 },
    closes: { day: 31, month: 1 },
    title: 'Summer cropping season: applications open',
    body: 'Finance for maize, soya, sorghum and other summer crops, with inputs and offtake arranged.',
    cta: { label: 'Apply for summer contract farming', href: '/agro-yield/apply' },
  },
  {
    season: 'winter',
    opens: { day: 1, month: 2 },
    closes: { day: 31, month: 7 },
    title: 'Winter cropping season: applications open',
    body: 'Finance for wheat, barley and other winter crops, with inputs and offtake arranged.',
    cta: { label: 'Apply for winter contract farming', href: '/agro-yield/apply' },
  },
];
