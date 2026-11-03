import { describe, expect, it } from 'vitest';
import { amortise, clamp, monthlyRepayment } from '../../src/lib/calc/amortise';
import { findBand, quote, type RateTable } from '../../src/lib/calc/quote';

describe('monthlyRepayment', () => {
  it('matches the standard amortisation formula', () => {
    // 100,000 at 12% over 120 months → 1,434.71
    expect(monthlyRepayment(100_000, 12, 120)).toBeCloseTo(1434.71, 2);
  });
  it('divides evenly at zero rate', () => {
    expect(monthlyRepayment(12_000, 0, 12)).toBe(1000);
  });
  it('returns zero for nothing to finance or no term', () => {
    expect(monthlyRepayment(0, 10, 12)).toBe(0);
    expect(monthlyRepayment(1000, 10, 0)).toBe(0);
  });
});

describe('amortise', () => {
  it('nets the deposit off the price', () => {
    const r = amortise({ price: 50_000, deposit: 10_000, termYears: 5, annualRatePct: 10 });
    expect(r.principal).toBe(40_000);
    expect(r.months).toBe(60);
    expect(r.totalRepayment).toBeCloseTo(r.monthlyRepayment * 60, 6);
    expect(r.totalInterest).toBeCloseTo(r.totalRepayment - 40_000, 6);
  });
  it('treats a deposit above the price as nothing to finance', () => {
    const r = amortise({ price: 10_000, deposit: 12_000, termYears: 2, annualRatePct: 8 });
    expect(r.principal).toBe(0);
    expect(r.monthlyRepayment).toBe(0);
    expect(r.totalInterest).toBe(0);
  });
  it('handles the maximum mortgage term', () => {
    const r = amortise({ price: 200_000, deposit: 0, termYears: 10, annualRatePct: 15 });
    expect(r.months).toBe(120);
    expect(r.monthlyRepayment).toBeGreaterThan(0);
  });
});

describe('clamp', () => {
  it('clamps and treats NaN as the minimum', () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-1, 0, 3)).toBe(0);
    expect(clamp(Number.NaN, 2, 3)).toBe(2);
  });
});

describe('quote', () => {
  const table: RateTable = {
    basis: 'Vehicle value',
    bands: [
      { from: 0, to: 10_000, ratePct: 5 },
      { from: 10_000, ratePct: 4, flat: 50 },
    ],
    minimumAnnual: 300,
  };
  it('finds the band by value with an exclusive upper bound', () => {
    expect(findBand(table, 9_999)?.ratePct).toBe(5);
    expect(findBand(table, 10_000)?.ratePct).toBe(4);
  });
  it('applies rate, flat and minimum', () => {
    expect(quote(table, 2_000)?.annual).toBe(300); // 100 < minimum
    expect(quote(table, 20_000)?.annual).toBe(850); // 800 + 50
    expect(quote(table, 20_000)?.monthly).toBeCloseTo(850 / 12, 6);
  });
  it('returns null outside any band', () => {
    expect(quote(table, -1)).toBeNull();
  });
});
