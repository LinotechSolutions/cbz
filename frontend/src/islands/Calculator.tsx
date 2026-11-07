import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { CalculatorConfig, CalculatorKey } from '../data/calculators';
import type { IconName } from '../components/icons';
import { amortise, clamp, quote } from '../lib/calc';
import { formatMoney, formatPercent } from '../lib/format';
import { track } from '../lib/analytics';
import { Icon } from './Icon';

/**
 * A calculator: the red outline icon and title over a white form card and a
 * navy "Your estimated results" card. Figures update as you type; the Calculate button brings the
 * results into view on a phone.
 */
interface Props {
  variant: CalculatorKey;
  config: CalculatorConfig;
  /** Compact layout when embedded beside copy on a unit page. */
  embedded?: boolean;
  /** Loan calculators: products to choose from; a product with a known rate pre-fills the rate field. */
  products?: { id: string; label: string; ratePct: number | null; maxMonths: number | null }[];
}

type Values = Record<string, string>;

function NumberField({
  id,
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  placeholder,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  min: number;
  max: number;
  step: number;
  prefix: { text?: string; icon?: IconName };
  placeholder?: string;
}) {
  const n = Number(value);
  const out = value !== '' && (Number.isNaN(n) || n < min || n > max);
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <div className="calc__input">
        <span className="calc__affix" aria-hidden="true">
          {prefix.icon ? <Icon name={prefix.icon} size={18} /> : prefix.text}
        </span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          aria-describedby={[hint && `${id}-hint`, out && `${id}-err`].filter(Boolean).join(' ') || undefined}
          aria-invalid={out || undefined}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ''))}
        />
      </div>
      {hint && (
        <span className="field__hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      {out && (
        <span className="field__error" id={`${id}-err`}>
          Enter a value between {min.toLocaleString()} and {max.toLocaleString()}.
        </span>
      )}
    </div>
  );
}

export function Calculator({ variant, config, embedded = false, products }: Props) {
  const uid = useId();
  const tracked = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [productId, setProductId] = useState('');
  const product = products?.find((p) => p.id === productId);
  const [values, setValues] = useState<Values>(() => {
    const init: Values = {};
    if (config.kind === 'loan') {
      init.price = config.price.default?.toString() ?? '';
      init.deposit = config.deposit?.default?.toString() ?? '';
      init.term = config.term.default?.toString() ?? '';
      init.ratePct = config.ratePct.default?.toString() ?? '';
    } else {
      init.value = config.value.default?.toString() ?? '';
    }
    return init;
  });

  const set = (k: string) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (!tracked.current) {
      tracked.current = true;
      track('calculator_used', { variant });
    }
  };

  const result = useMemo(() => {
    if (config.kind === 'loan') {
      const price = Number(values.price);
      const deposit = config.deposit ? Number(values.deposit || 0) : 0;
      const term = Number(values.term);
      const ratePct = Number(values.ratePct);
      if (!values.price || !values.term || !values.ratePct) return null;
      if ([price, deposit, term, ratePct].some((n) => Number.isNaN(n))) return null;
      if (price < config.price.min || price > config.price.max) return null;
      if (term < config.term.min || term > config.term.max) return null;
      if (ratePct < config.ratePct.min || ratePct > config.ratePct.max) return null;
      if (deposit >= price) return { kind: 'loan' as const, depositTooHigh: true, data: null };
      const months = config.term.unit === 'months' ? term : term * 12;
      return {
        kind: 'loan' as const,
        depositTooHigh: false,
        data: amortise({ price, deposit: clamp(deposit, 0, price), months, annualRatePct: ratePct }),
      };
    }
    if (!config.rates) return { kind: 'quote' as const, pending: true, data: null };
    const v = Number(values.value);
    if (!values.value || Number.isNaN(v) || v < config.value.min || v > config.value.max) return null;
    return { kind: 'quote' as const, pending: false, data: quote(config.rates, v) };
  }, [config, values]);

  // Announce results politely; the region is always present so it is stable.
  const [announce, setAnnounce] = useState('');
  useEffect(() => {
    if (result?.kind === 'loan' && result.data) {
      setAnnounce(`Monthly repayment ${formatMoney(result.data.monthlyRepayment, config.currency, 2)}`);
    } else if (result?.kind === 'quote' && result.data) {
      setAnnounce(`Indicative annual premium ${formatMoney(result.data.annual, config.currency, 2)}`);
    } else {
      setAnnounce('');
    }
  }, [result, config.currency]);

  const termOptions = useMemo(() => {
    if (config.kind !== 'loan') return [];
    const out: number[] = [];
    for (let t = config.term.min; t <= config.term.max; t += config.term.step) out.push(t);
    return out;
  }, [config]);
  const unitLabel = (n: number, unit: 'years' | 'months') => `${n} ${n === 1 ? unit.slice(0, -1) : unit}`;
  const figureLabel = config.kind === 'loan' ? 'Monthly repayment' : 'Indicative annual premium';

  return (
    <div className={`calc${embedded ? ' calc--embedded' : ''}`}>
      <style>{css}</style>
      <div className="calc__head">
        <span className="calc__icon" aria-hidden="true">
          <Icon name={config.icon} size={40} />
        </span>
        <div className="calc__head-text">
          {embedded ? (
            <h3 id={`${uid}-title`} className="calc__title">
              {config.title}
            </h3>
          ) : (
            <h2 id={`${uid}-title`} className="calc__title">
              {config.title}
            </h2>
          )}
          <p className="calc__intro">{config.intro}</p>
        </div>
      </div>

      <div className="calc__grid">
        <form
          className="calc__form"
          aria-labelledby={`${uid}-title`}
          onSubmit={(e) => {
            e.preventDefault();
            resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }}
        >
          {config.kind === 'loan' ? (
            <div className="calc__fields">
              {products && products.length > 0 && (
                <div className="field calc__span">
                  <label className="field__label" htmlFor={`${uid}-product`}>
                    Select product
                  </label>
                  <select
                    id={`${uid}-product`}
                    className="input"
                    value={productId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setProductId(id);
                      const p = products.find((x) => x.id === id);
                      if (p?.ratePct !== null && p?.ratePct !== undefined) set('ratePct')(String(p.ratePct));
                    }}
                  >
                    <option value="">Choose a product…</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  {product && (
                    <span className="field__hint">
                      {product.ratePct !== null ? `Rate from the product documentation: ${product.ratePct}% per year.` : 'Rate confirmed on application; enter the rate quoted to you.'}
                      {product.maxMonths !== null ? ` Tenor up to ${product.maxMonths} months.` : ''}
                    </span>
                  )}
                </div>
              )}
              <div className="calc__span">
                <NumberField
                  id={`${uid}-price`}
                  label={config.price.label}
                  value={values.price}
                  onChange={set('price')}
                  min={config.price.min}
                  max={config.price.max}
                  step={config.price.step}
                  prefix={{ text: config.currency }}
                  placeholder={config.price.placeholder}
                />
              </div>
              {config.deposit && (
                <div className="calc__span">
                  <NumberField
                    id={`${uid}-deposit`}
                    label={config.deposit.label}
                    value={values.deposit}
                    onChange={set('deposit')}
                    min={config.deposit.min}
                    max={config.deposit.max}
                    step={config.deposit.step}
                    prefix={{ text: config.currency }}
                    placeholder={config.deposit.placeholder}
                  />
                </div>
              )}
              <div className="field">
                <label className="field__label" htmlFor={`${uid}-term`}>
                  {config.term.label}
                </label>
                <div className="calc__input">
                  <span className="calc__affix" aria-hidden="true">
                    <Icon name="calendar" size={18} />
                  </span>
                  <select id={`${uid}-term`} value={values.term} onChange={(e) => set('term')(e.target.value)}>
                    {termOptions.map((t) => (
                      <option key={t} value={t}>
                        {unitLabel(t, config.term.unit)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <NumberField
                id={`${uid}-rate`}
                label={config.ratePct.label}
                hint={config.ratePct.hint}
                value={values.ratePct}
                onChange={set('ratePct')}
                min={config.ratePct.min}
                max={config.ratePct.max}
                step={config.ratePct.step}
                prefix={{ icon: 'percent' }}
                placeholder={config.ratePct.placeholder}
              />
            </div>
          ) : (
            <div className="calc__fields">
              <div className="calc__span">
                <NumberField
                  id={`${uid}-value`}
                  label={config.value.label}
                  hint={config.value.hint}
                  value={values.value}
                  onChange={set('value')}
                  min={config.value.min}
                  max={config.value.max}
                  step={config.value.step}
                  prefix={{ text: config.currency }}
                  placeholder={config.value.placeholder}
                />
              </div>
            </div>
          )}
          <button type="submit" className="btn btn--primary calc__submit">
            <Icon name="calculator" size={18} /> {config.kind === 'loan' ? 'Calculate repayment' : 'Calculate premium'} <Icon name="arrowRight" size={18} />
          </button>
        </form>

        <div className="calc__result on-dark" aria-live="polite" aria-atomic="true" ref={resultRef}>
          <span className="sr-only">{announce}</span>
          <p className="calc__result-title">Your estimated results</p>

          {result?.kind === 'quote' && result.pending && (
            <div className="calc__pending">
              <p className="calc__pending-title">Indicative rates coming soon</p>
              <p className="calc__pending-line">We are finalising the rate table for this calculator. Ask us for a quote instead.</p>
            </div>
          )}
          {result?.kind === 'loan' && result.depositTooHigh && <p className="calc__msg">Your deposit covers the full price, so there is nothing to finance.</p>}

          {result?.kind === 'loan' && result.data && (
            <dl className="calc__out">
              <div className="calc__main">
                <dd className="figure">{formatMoney(result.data.monthlyRepayment, config.currency, 2)}</dd>
                <dt>{figureLabel}</dt>
              </div>
              <div className="calc__row">
                <Icon name={config.icon} size={18} />
                <dt>Total loan amount</dt>
                <dd>{formatMoney(result.data.principal, config.currency)}</dd>
              </div>
              <div className="calc__row">
                <Icon name="percent" size={18} />
                <dt>Total interest</dt>
                <dd>{formatMoney(result.data.totalInterest, config.currency)}</dd>
              </div>
              <div className="calc__row">
                <Icon name="coins" size={18} />
                <dt>Total repayment</dt>
                <dd>{formatMoney(result.data.totalRepayment, config.currency)}</dd>
              </div>
              <div className="calc__row">
                <Icon name="calendar" size={18} />
                <dt>Over</dt>
                <dd>
                  {result.data.months} months at {formatPercent(Number(values.ratePct), 2)}
                </dd>
              </div>
            </dl>
          )}
          {result?.kind === 'quote' && !result.pending && result.data && (
            <dl className="calc__out">
              <div className="calc__main">
                <dd className="figure">{formatMoney(result.data.annual, config.currency, 2)}</dd>
                <dt>{figureLabel}</dt>
              </div>
              <div className="calc__row">
                <Icon name="calendar" size={18} />
                <dt>Per month</dt>
                <dd>{formatMoney(result.data.monthly, config.currency, 2)}</dd>
              </div>
            </dl>
          )}
          {result === null && (
            <div className="calc__main calc__main--empty">
              <p className="figure">{config.currency} —</p>
              <p className="calc__msg">Fill in the fields to see your estimate.</p>
            </div>
          )}

          <p className="calc__note">
            <Icon name="info" size={18} /> <span>{config.disclaimer}</span>
          </p>
          <a href={config.cta.href} className="btn btn--secondary calc__cta" data-track="apply_click">
            {config.cta.label}
          </a>
        </div>

      </div>
    </div>
  );
}

const css = `
.calc{display:grid;gap:var(--s-6)}
.calc__head{display:flex;align-items:center;gap:var(--s-4)}
.calc__icon{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--red);padding-right:var(--s-4);border-right:3px solid var(--red);align-self:stretch}
.calc__head-text{display:grid;gap:var(--s-1)}
.calc__title{font-size:var(--t-xl);font-weight:700;color:var(--blue);line-height:1.15}
.calc__intro{color:var(--grey);font-size:var(--t-sm)}
.calc__grid{display:grid;gap:var(--gap)}
@media (min-width:900px){.calc__grid{grid-template-columns:minmax(0,1.3fr) minmax(0,1fr)}}
.calc__form{display:grid;gap:var(--s-5,20px);align-content:start;background:var(--white);border:1px solid var(--line);border-radius:var(--r-lg);padding:var(--s-6);box-shadow:var(--shadow-card)}
.calc__fields{display:grid;gap:var(--s-4)}
.calc__fields .field{align-content:start}
@media (min-width:640px){.calc__fields{grid-template-columns:1fr 1fr}.calc__span{grid-column:1/-1}}
.calc__input{display:grid;grid-template-columns:auto 1fr;align-items:stretch;border:1.5px solid var(--line);border-radius:var(--r-sm);background:var(--white);overflow:hidden}
.calc__input:hover{border-color:var(--grey)}
.calc__input:focus-within{border-color:var(--blue-700);box-shadow:0 0 0 3px var(--blue-100)}
.calc__affix{display:flex;align-items:center;justify-content:center;min-width:56px;padding-inline:var(--s-3);background:var(--surface);color:var(--blue);font-weight:700;font-size:var(--t-sm);border-right:1px solid var(--line)}
.calc__input>input,.calc__input>select{border:0;min-height:var(--tap);padding:var(--s-2) var(--s-3);background:transparent;width:100%;font-size:var(--t-sm);color:var(--ink);outline:none}
.calc__input>input::placeholder{color:var(--grey);opacity:.7}
.calc__input>input[aria-invalid='true']{color:var(--red-hover)}
.calc__submit{width:100%;gap:var(--s-2);margin-top:var(--s-2)}
.calc__result{display:grid;gap:var(--s-4);align-content:start;position:relative;overflow:hidden;background:var(--blue);color:var(--white);border-radius:var(--r-lg);padding:var(--s-6)}
.calc__result::before{content:'';position:absolute;top:-28px;left:-28px;width:72px;height:72px;border-radius:50%;background:var(--red)}
.calc__result-title{position:relative;font-weight:700;font-size:var(--t-md);color:var(--white)}
.calc__out{margin:0;display:grid;gap:var(--s-3)}
.calc__main{display:grid;gap:2px;padding-bottom:var(--s-4);border-bottom:1px solid rgba(255,255,255,.18)}
.calc__main .figure{margin:0;font-size:var(--t-3xl);font-weight:700;color:var(--white);line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.calc__main dt,.calc__main--empty .calc__msg{font-size:var(--t-sm);color:rgba(255,255,255,.82)}
.calc__row{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:var(--s-3);font-size:var(--t-sm)}
.calc__row svg{color:rgba(255,255,255,.85)}
.calc__row dt{color:rgba(255,255,255,.82)}
.calc__row dd{margin:0;font-weight:700;color:var(--white);text-align:right;font-variant-numeric:tabular-nums}
.calc__pending{display:grid;gap:var(--s-1)}
.calc__pending-title{font-weight:700;color:var(--white)}
.calc__pending-line,.calc__msg{font-size:var(--t-sm);color:rgba(255,255,255,.82)}
.calc__note{display:flex;gap:var(--s-3);align-items:flex-start;padding:var(--s-3) var(--s-4);border-radius:var(--r-md);background:rgba(255,255,255,.1);font-size:var(--t-xs);color:rgba(255,255,255,.88);max-width:none}
.calc__note svg{flex-shrink:0;margin-top:1px}
.calc__cta{justify-self:start;margin-top:var(--s-1)}
`;
