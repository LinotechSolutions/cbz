/**
 * The one gate for optional content. Anything the business has not confirmed is
 * `null` in the data, and nothing that is null, empty or still a placeholder is
 * ever rendered. Every component that shows optional data calls this.
 */
export function visible<T>(value: T | null | undefined): value is T {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') {
    const s = value.trim();
    if (s === '') return false;
    if (/\bTBC\b/i.test(s) || s.includes('[TBC')) return false;
    return true;
  }
  if (Array.isArray(value)) return value.length > 0 && value.some((v) => visible(v));
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).some((v) => visible(v));
  }
  return true;
}

/** Keep only the visible members of a list. */
export function onlyVisible<T>(list: readonly (T | null | undefined)[] | null | undefined): T[] {
  if (!list) return [];
  return list.filter((v): v is T => visible(v));
}
