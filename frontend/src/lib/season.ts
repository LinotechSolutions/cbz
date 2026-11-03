/**
 * Seasonal banner logic for Agro-Yield contract farming. Which season shows is
 * decided from the date alone, so the copy switches itself over.
 */
export interface SeasonWindow {
  /** 'summer' or 'winter' cropping season. */
  season: 'summer' | 'winter';
  /** Day and month the window opens, 1-based. */
  opens: { day: number; month: number };
  /** Day and month the window closes, 1-based. Can wrap past year end. */
  closes: { day: number; month: number };
  title: string;
  body: string;
  cta: { label: string; href: string };
}

function dayOfYear(day: number, month: number, year: number): number {
  return Math.floor((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 1)) / 86_400_000);
}

export function isOpen(window: SeasonWindow, now: Date): boolean {
  const y = now.getUTCFullYear();
  const today = dayOfYear(now.getUTCDate(), now.getUTCMonth() + 1, y);
  const start = dayOfYear(window.opens.day, window.opens.month, y);
  const end = dayOfYear(window.closes.day, window.closes.month, y);
  if (start <= end) return today >= start && today <= end;
  // Wraps year end (e.g. opens in October, closes in February).
  return today >= start || today <= end;
}

export function currentSeason(windows: readonly SeasonWindow[], now = new Date()): SeasonWindow | null {
  return windows.find((w) => isOpen(w, now)) ?? null;
}
