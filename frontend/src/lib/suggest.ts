/**
 * "Suggested for you" rules. Every rule here is stated in plain words in
 * `explanation`, and the panel on the page prints exactly those words. If a
 * rule cannot be put plainly, the suggestion is not shown.
 */
export interface SuggestionInput {
  unit: 'insurance' | 'cbz-life' | 'datvest';
  /** Whatever the visitor told us. All optional. */
  ownsCar?: boolean;
  ownsHome?: boolean;
  hasDependants?: boolean;
  employerCover?: boolean;
  horizonYears?: number;
  wantsIncome?: boolean;
}

export interface Suggestion {
  productId: string;
  reason: string;
}

export interface SuggestionResult {
  suggestions: Suggestion[];
  /** The inputs used, as label/value pairs, for the "How we suggest this" panel. */
  inputs: { label: string; value: string }[];
  /** The rules applied, in plain words. */
  rules: string[];
}

const yesNo = (v: boolean | undefined) => (v === undefined ? 'not given' : v ? 'yes' : 'no');

export function suggest(input: SuggestionInput): SuggestionResult {
  const suggestions: Suggestion[] = [];
  const rules: string[] = [];
  const inputs: { label: string; value: string }[] = [];

  if (input.unit === 'insurance') {
    inputs.push({ label: 'Own a car', value: yesNo(input.ownsCar) });
    inputs.push({ label: 'Own a home', value: yesNo(input.ownsHome) });
    rules.push('If you own a car, we suggest motor insurance.');
    rules.push('If you own a home, we suggest home and contents cover.');
    if (input.ownsCar) suggestions.push({ productId: 'motor', reason: 'You told us you own a car.' });
    if (input.ownsHome) suggestions.push({ productId: 'home', reason: 'You told us you own a home.' });
  }

  if (input.unit === 'cbz-life') {
    inputs.push({ label: 'Have dependants', value: yesNo(input.hasDependants) });
    inputs.push({ label: 'Covered by an employer scheme', value: yesNo(input.employerCover) });
    rules.push('If you have dependants, we suggest the Comfortsure funeral plan.');
    rules.push('If you have school-age dependants, we also suggest the Sarapavana education plan.');
    rules.push('If your employer does not cover you, we suggest asking about group life.');
    if (input.hasDependants) {
      suggestions.push({ productId: 'comfortsure', reason: 'You told us you have dependants.' });
      suggestions.push({ productId: 'sarapavana', reason: 'You told us you have dependants.' });
    }
    if (input.employerCover === false) {
      suggestions.push({ productId: 'group_life', reason: 'You told us your employer does not cover you.' });
    }
  }

  if (input.unit === 'datvest') {
    inputs.push({
      label: 'Investment horizon',
      value: input.horizonYears === undefined ? 'not given' : `${input.horizonYears} years`,
    });
    inputs.push({ label: 'Need regular income', value: yesNo(input.wantsIncome) });
    rules.push('If your horizon is under two years, we suggest the money market fund.');
    rules.push('If your horizon is two years or more, we suggest the balanced and growth fund.');
    rules.push('If you need regular income, we suggest the fixed income fund.');
    if (input.horizonYears !== undefined) {
      if (input.horizonYears < 2) {
        suggestions.push({ productId: 'datvest-money-market-fund', reason: 'Your horizon is under two years.' });
      } else {
        suggestions.push({ productId: 'datvest-balanced-and-growth-fund', reason: 'Your horizon is two years or more.' });
      }
    }
    if (input.wantsIncome) {
      suggestions.push({ productId: 'datvest-high-yield-fixed-income-fund', reason: 'You told us you need regular income.' });
    }
  }

  return { suggestions, inputs, rules };
}
