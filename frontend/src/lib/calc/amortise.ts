/**
 * Standard amortised loan maths. Pure functions, no rounding until display.
 */
export interface LoanInput {
  /** Purchase price or amount financed before deposit. */
  price: number;
  deposit: number;
  /** Term in years; use `months` instead for short tenors. */
  termYears?: number;
  months?: number;
  /** Annual nominal interest rate in percent, e.g. 12 for 12%. */
  annualRatePct: number;
}

export interface LoanResult {
  principal: number;
  months: number;
  monthlyRepayment: number;
  totalRepayment: number;
  totalInterest: number;
}

export function monthlyRepayment(principal: number, annualRatePct: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}

export function amortise(input: LoanInput): LoanResult {
  const principal = Math.max(0, input.price - input.deposit);
  const months = Math.max(0, Math.round(input.months ?? (input.termYears ?? 0) * 12));
  const monthly = monthlyRepayment(principal, input.annualRatePct, months);
  const totalRepayment = monthly * months;
  return {
    principal,
    months,
    monthlyRepayment: monthly,
    totalRepayment,
    totalInterest: Math.max(0, totalRepayment - principal),
  };
}

/** Clamp a value into [min, max]; NaN becomes min. */
export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}
