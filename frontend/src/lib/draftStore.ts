/**
 * Save-and-continue for multi-step forms.
 *
 * Interface the backend will implement with Redis. This mock keeps drafts in
 * sessionStorage so a visitor who reloads mid-form does not lose their place.
 * ID numbers and account numbers are never stored: callers must strip them.
 */
export interface DraftStore {
  saveDraft(formId: string, data: Record<string, unknown>): Promise<void>;
  loadDraft(formId: string): Promise<Record<string, unknown> | null>;
  clearDraft(formId: string): Promise<void>;
}

/** Field names that must never be persisted. */
export const NEVER_STORE = ['nationalId', 'idNumber', 'accountNumber', 'cardNumber', 'passportNumber'];

export function stripSensitive(data: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (!NEVER_STORE.includes(k)) out[k] = v;
  }
  return out;
}

const key = (formId: string) => `cbz:draft:${formId}`;

function storage(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.sessionStorage : null;
  } catch {
    return null;
  }
}

export const draftStore: DraftStore = {
  async saveDraft(formId, data) {
    const s = storage();
    if (!s) return;
    try {
      s.setItem(key(formId), JSON.stringify(stripSensitive(data)));
    } catch {
      /* quota or private mode: drafts are a convenience only */
    }
  },
  async loadDraft(formId) {
    const s = storage();
    if (!s) return null;
    try {
      const raw = s.getItem(key(formId));
      return raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
    } catch {
      return null;
    }
  },
  async clearDraft(formId) {
    const s = storage();
    if (!s) return;
    try {
      s.removeItem(key(formId));
    } catch {
      /* ignore */
    }
  },
};
