/**
 * Analytics. `track()` does nothing until the visitor has consented (Cyber and
 * Data Protection Act). No personal data is ever passed in `props`.
 */
export type AnalyticsEvent =
  | 'open_account_choice'
  | 'apply_click'
  | 'quote_click'
  | 'calculator_used'
  | 'form_step'
  | 'form_submitted'
  | 'store_badge_click'
  | 'chat_opened'
  | 'login_choice';

export type Props = Record<string, string | number | boolean>;

const CONSENT_KEY = 'cbz:consent';
const queue: { event: AnalyticsEvent; props: Props }[] = [];

export function hasConsent(): boolean {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem(CONSENT_KEY) === 'granted';
  } catch {
    return false;
  }
}

export function setConsent(granted: boolean): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
  } catch {
    /* ignore */
  }
  if (granted) flush();
  window.dispatchEvent(new CustomEvent('cbz:consent', { detail: { granted } }));
}

export function consentDecided(): boolean {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem(CONSENT_KEY) !== null;
  } catch {
    return true; // storage blocked: do not nag
  }
}

/** Provider hook. Replace with the real tag once a vendor is chosen. */
let sink: (event: AnalyticsEvent, props: Props) => void = (event, props) => {
  if (import.meta.env.DEV) console.debug('[analytics]', event, props);
};

export function setSink(fn: typeof sink): void {
  sink = fn;
}

function flush() {
  while (queue.length) {
    const e = queue.shift()!;
    sink(e.event, e.props);
  }
}

export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === 'undefined') return;
  if (hasConsent()) {
    sink(event, props);
  } else if (!consentDecided()) {
    queue.push({ event, props });
  }
}

/** Progressive enhancement: any element with data-track="event" data-track-props='{"k":"v"}' */
export function bindDataTrack(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-track]').forEach((el) => {
    if (el.dataset.trackBound) return;
    el.dataset.trackBound = '1';
    el.addEventListener('click', () => {
      let props: Props = {};
      try {
        props = el.dataset.trackProps ? (JSON.parse(el.dataset.trackProps) as Props) : {};
      } catch {
        props = {};
      }
      track(el.dataset.track as AnalyticsEvent, props);
    });
  });
}
