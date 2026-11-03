import { useEffect, useId, useState } from 'react';

interface Props {
  locations: string[];
  /** Number of listings on the page, for the "showing x of y" line. */
  total: number;
}

type Filters = { type: string; location: string; status: string };

const read = (): Filters => {
  const q = new URLSearchParams(window.location.search);
  return { type: q.get('type') ?? '', location: q.get('location') ?? '', status: q.get('status') ?? '' };
};

/**
 * Filters the statically rendered listings grid. State lives in the URL query
 * so a filtered view can be shared; nothing is fetched.
 */
export function PropertyFilters({ locations, total }: Props) {
  const uid = useId();
  const [f, setF] = useState<Filters>({ type: '', location: '', status: '' });
  const [shown, setShown] = useState(total);

  useEffect(() => {
    setF(read());
    const onPop = () => setF(read());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-property]');
    let n = 0;
    cards.forEach((c) => {
      const ok =
        (!f.type || c.dataset.type === f.type) &&
        (!f.location || c.dataset.location === f.location) &&
        (!f.status || c.dataset.status === f.status);
      c.hidden = !ok;
      if (ok) n++;
    });
    setShown(n);
    const q = new URLSearchParams();
    if (f.type) q.set('type', f.type);
    if (f.location) q.set('location', f.location);
    if (f.status) q.set('status', f.status);
    const url = `${window.location.pathname}${q.toString() ? `?${q}` : ''}`;
    if (url !== window.location.pathname + window.location.search) window.history.replaceState(null, '', url);
  }, [f]);

  const set = (k: keyof Filters) => (e: React.ChangeEvent<HTMLSelectElement>) => setF((s) => ({ ...s, [k]: e.target.value }));
  const clear = () => setF({ type: '', location: '', status: '' });
  const active = Boolean(f.type || f.location || f.status);

  return (
    <div className="pf">
      <style>{css}</style>
      <div className="pf__row">
        <div className="field">
          <label className="field__label" htmlFor={`${uid}-type`}>
            Type
          </label>
          <select id={`${uid}-type`} className="input" value={f.type} onChange={set('type')}>
            <option value="">All</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="field">
          <label className="field__label" htmlFor={`${uid}-loc`}>
            Location
          </label>
          <select id={`${uid}-loc`} className="input" value={f.location} onChange={set('location')}>
            <option value="">All</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label className="field__label" htmlFor={`${uid}-status`}>
            Status
          </label>
          <select id={`${uid}-status`} className="input" value={f.status} onChange={set('status')}>
            <option value="">All</option>
            <option value="for-sale">For sale</option>
            <option value="to-let">To let</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        {active && (
          <button type="button" className="btn btn--quiet pf__clear" onClick={clear}>
            Clear filters
          </button>
        )}
      </div>
      <p className="small muted" aria-live="polite">
        Showing {shown} of {total}
      </p>
    </div>
  );
}

const css = `
.pf{display:grid;gap:var(--s-3)}
.pf__row{display:grid;gap:var(--s-3);align-items:end}
@media (min-width:640px){.pf__row{grid-template-columns:repeat(3,minmax(0,1fr)) auto}}
.pf__clear{justify-self:start}
`;
