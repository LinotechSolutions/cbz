import { useEffect, useState } from 'react';
import { consentDecided, setConsent } from '../lib/analytics';

interface Props {
  privacyHref: string;
}

/** Small cookie banner. Non-essential cookies are off until the visitor says yes. */
export function ConsentBanner({ privacyHref }: Props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(!consentDecided());
  }, []);
  if (!show) return null;
  const decide = (granted: boolean) => {
    setConsent(granted);
    setShow(false);
  };
  return (
    <div className="consent" role="region" aria-label="Cookies">
      <style>{css}</style>
      <p className="consent__text">
        We use essential cookies to run this site. With your permission we also use analytics cookies to see how it is
        used. <a href={privacyHref}>Privacy policy</a>
      </p>
      <div className="consent__actions">
        <button type="button" className="btn btn--secondary" onClick={() => decide(false)}>
          Essential only
        </button>
        <button type="button" className="btn btn--primary" onClick={() => decide(true)}>
          Allow analytics
        </button>
      </div>
    </div>
  );
}

const css = `
.consent{position:fixed;left:var(--s-4);right:var(--s-4);bottom:calc(var(--s-4) + env(safe-area-inset-bottom));z-index:60;background:var(--white);border:1px solid var(--line);border-radius:var(--r-lg);box-shadow:var(--shadow-float);padding:var(--s-4);display:grid;gap:var(--s-3)}
@media (min-width:900px){.consent{left:auto;max-width:440px;right:var(--s-6);bottom:var(--s-6)}}
.consent__text{font-size:var(--t-sm);max-width:none}
.consent__actions{display:flex;gap:var(--s-2);flex-wrap:wrap;justify-content:flex-end}
`;
