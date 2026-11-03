/**
 * Rate-table driven indicative quotes (car insurance, life policy).
 * The tables come from data/calculators.ts and are null until the business
 * supplies them, in which case the UI shows "Indicative rates coming soon".
 */
export interface RateBand {
  /** Inclusive lower bound of the band, in the input's unit. */
  from: number;
  /** Exclusive upper bound; omit on the last band. */
  to?: number;
  /** Annual rate as a percentage of the insured value, or a flat amount. */
  ratePct?: number;
  flat?: number;
}

export interface RateTable {
  /** What the bands key off, for the "How we suggest this" panel. */
  basis: string;
  bands: RateBand[];
  /** Minimum annual premium, if any. */
  minimumAnnual?: number;
}

export interface QuoteResult {
  annual: number;
  monthly: number;
  band: RateBand;
}

export function findBand(table: RateTable, value: number): RateBand | null {
  for (const band of table.bands) {
    const upper = band.to ?? Number.POSITIVE_INFINITY;
    if (value >= band.from && value < upper) return band;
  }
  return null;
}

export function quote(table: RateTable, value: number): QuoteResult | null {
  const band = findBand(table, value);
  if (!band) return null;
  let annual = 0;
  if (band.ratePct !== undefined) annual = (value * band.ratePct) / 100;
  if (band.flat !== undefined) annual += band.flat;
  if (table.minimumAnnual !== undefined) annual = Math.max(annual, table.minimumAnnual);
  return { annual, monthly: annual / 12, band };
}
