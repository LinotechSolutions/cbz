import { describe, expect, it } from 'vitest';
import { visible, onlyVisible } from '../../src/lib/visible';
import { currentSeason, isOpen, type SeasonWindow } from '../../src/lib/season';
import { suggest } from '../../src/lib/suggest';
import { normalisePhone, formatMoney } from '../../src/lib/format';
import { stripSensitive } from '../../src/lib/draftStore';
import { formSchema, FORMS } from '../../src/lib/forms';

describe('visible', () => {
  it('hides null, empty and placeholder values', () => {
    expect(visible(null)).toBe(false);
    expect(visible(undefined)).toBe(false);
    expect(visible('')).toBe(false);
    expect(visible('   ')).toBe(false);
    expect(visible('[TBC: licence number]')).toBe(false);
    expect(visible('Details TBC')).toBe(false);
    expect(visible([])).toBe(false);
    expect(visible([null, ''])).toBe(false);
    expect(visible({ a: null })).toBe(false);
  });
  it('shows real values', () => {
    expect(visible('ZSE: CBZ')).toBe(true);
    expect(visible(0)).toBe(true);
    expect(visible(['x'])).toBe(true);
    expect(visible({ a: 'x' })).toBe(true);
  });
  it('filters lists', () => {
    expect(onlyVisible(['a', null, '', 'b'])).toEqual(['a', 'b']);
  });
});

describe('season', () => {
  const windows: SeasonWindow[] = [
    { season: 'summer', opens: { day: 1, month: 8 }, closes: { day: 31, month: 1 }, title: 's', body: '', cta: { label: '', href: '' } },
    { season: 'winter', opens: { day: 1, month: 2 }, closes: { day: 31, month: 7 }, title: 'w', body: '', cta: { label: '', href: '' } },
  ];
  it('picks summer across the year end', () => {
    expect(currentSeason(windows, new Date(Date.UTC(2026, 10, 3)))?.season).toBe('summer');
    expect(currentSeason(windows, new Date(Date.UTC(2027, 0, 15)))?.season).toBe('summer');
  });
  it('picks winter in the middle of the year', () => {
    expect(currentSeason(windows, new Date(Date.UTC(2026, 4, 1)))?.season).toBe('winter');
  });
  it('handles boundaries inclusively', () => {
    expect(isOpen(windows[1], new Date(Date.UTC(2026, 1, 1)))).toBe(true);
    expect(isOpen(windows[1], new Date(Date.UTC(2026, 6, 31)))).toBe(true);
    expect(isOpen(windows[1], new Date(Date.UTC(2026, 7, 1)))).toBe(false);
  });
});

describe('suggest', () => {
  it('states its inputs and rules in plain words', () => {
    const r = suggest({ unit: 'insurance', ownsCar: true });
    expect(r.suggestions.map((s) => s.productId)).toEqual(['motor']);
    expect(r.inputs).toEqual([
      { label: 'Own a car', value: 'yes' },
      { label: 'Own a home', value: 'not given' },
    ]);
    expect(r.rules.length).toBeGreaterThan(0);
  });
  it('suggests nothing without inputs', () => {
    expect(suggest({ unit: 'datvest' }).suggestions).toEqual([]);
  });
  it('uses the horizon for Datvest', () => {
    expect(suggest({ unit: 'datvest', horizonYears: 1 }).suggestions[0].productId).toBe('datvest-money-market-fund');
    expect(suggest({ unit: 'datvest', horizonYears: 5 }).suggestions[0].productId).toBe('datvest-balanced-and-growth-fund');
  });
});

describe('format', () => {
  it('normalises Zimbabwean phone numbers', () => {
    expect(normalisePhone('077 123 4567')).toBe('+263771234567');
    expect(normalisePhone('+263 77 123 4567')).toBe('+263771234567');
    expect(normalisePhone('263771234567')).toBe('+263771234567');
    expect(normalisePhone('+44 7700 900123')).toBe('+447700900123');
    expect(normalisePhone('12')).toBeNull();
  });
  it('formats money', () => {
    expect(formatMoney(1234.5, 'USD', 2)).toMatch(/1,234\.50/);
  });
});

describe('draft store', () => {
  it('never keeps identifiers', () => {
    expect(stripSensitive({ firstName: 'A', nationalId: '63-123456A12', accountNumber: '1' })).toEqual({ firstName: 'A' });
  });
});

describe('forms', () => {
  it('validates a complete bank account application', () => {
    const schema = formSchema(FORMS['bank-open-account']);
    const ok = schema.safeParse({
      accountType: 'current',
      customerType: 'individual',
      country: 'Zimbabwe',
      firstName: 'Tendai',
      surname: 'Moyo',
      phone: '0771234567',
      email: 't@example.com',
      branch: '',
      notes: '',
      consent: true,
    });
    expect(ok.success).toBe(true);
  });
  it('rejects a bad phone number and missing consent', () => {
    const schema = formSchema(FORMS['bank-open-account']);
    const bad = schema.safeParse({
      accountType: 'current',
      customerType: 'individual',
      country: 'Zimbabwe',
      firstName: 'Tendai',
      surname: 'Moyo',
      phone: '12',
      email: 't@example.com',
      consent: false,
    });
    expect(bad.success).toBe(false);
    const paths = bad.success ? [] : bad.error.issues.map((i) => i.path[0]);
    expect(paths).toContain('phone');
    expect(paths).toContain('consent');
  });
});
