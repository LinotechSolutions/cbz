/**
 * Form submission. The backend will route each submission by `unit` to that
 * unit's mailbox. Until then this mock resolves after a short delay and can be
 * switched to fail (append `?mockfail=1` to the URL) so both states can be tested.
 */
export type Unit =
  | 'bank'
  | 'red-sphere'
  | 'properties'
  | 'capital'
  | 'datvest'
  | 'cbz-life'
  | 'insurance'
  | 'risk-advisory'
  | 'agro-yield'
  | 'cbz-foundation'
  | 'group';

export interface SubmitResult {
  ok: true;
  reference: string;
}

export class SubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SubmitError';
  }
}

export interface FormSubmitter {
  (unit: Unit, formId: string, data: Record<string, unknown>): Promise<SubmitResult>;
}

function shouldFail(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('mockfail') === '1';
}

function reference(unit: Unit): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  return `${unit.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4)}-${stamp}`;
}

export const submitForm: FormSubmitter = async (unit, _formId, _data) => {
  await new Promise((r) => setTimeout(r, 700));
  if (shouldFail()) {
    throw new SubmitError('We could not send your details. Check your connection and try again.');
  }
  return { ok: true, reference: reference(unit) };
};
