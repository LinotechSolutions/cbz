import type { RateTable } from '../lib/calc/quote';
import type { SeasonWindow } from '../lib/season';

export type CalculatorKey = 'mortgage' | 'carFinance' | 'carInsurance' | 'policyQuote';

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
  deposit: Range & { label: string };
  termYears: Range & { label: string };
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

export const CALCULATORS: Record<CalculatorKey, CalculatorConfig> = {
  mortgage: {
    kind: 'loan',
    title: 'Mortgage calculator',
    intro: 'Estimate the monthly repayment on a home or stand.',
    currency: 'USD',
    price: { label: 'Property price', min: 5_000, max: 2_000_000, step: 500, default: null },
    deposit: { label: 'Deposit', min: 0, max: 2_000_000, step: 500, default: null },
    termYears: { label: 'Term in years', min: 2, max: 10, step: 1, default: 10 },
    ratePct: {
      label: 'Interest rate per year',
      hint: 'Enter the rate quoted to you. Rates are confirmed on application.',
      min: 1,
      max: 40,
      step: 0.25,
      default: null,
    },
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
    termYears: { label: 'Term in years', min: 1, max: 5, step: 1, default: 3 },
    ratePct: {
      label: 'Interest rate per year',
      hint: 'Enter the rate quoted to you. Rates are confirmed on application.',
      min: 1,
      max: 40,
      step: 0.25,
      default: null,
    },
    disclaimer: DISCLAIMER,
    cta: { label: 'Apply for car finance', href: '/bank/apply' },
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
