import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { CalculatorConfig, CalculatorKey } from '../data/calculators';
import { amortise, clamp, quote } from '../lib/calc';
import { formatMoney, formatPercent } from '../lib/format';
import { track } from '../lib/analytics';

interface Props {
  variant: CalculatorKey;
  config: CalculatorConfig;
  /** Compact layout when embedded beside copy on a unit page. */
  embedded?: boolean;
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
  suffix,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  const n = Number(value);
  const out = value !== '' && (Number.isNaN(n) || n < min || n > max);
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {hint && (
        <span className="field__hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      <div className="input--prefix">
        {prefix && <span aria-hidden="true">{prefix}</span>}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          aria-describedby={[hint && `${id}-hint`, out && `${id}-err`].filter(Boolean).join(' ') || undefined}
          aria-invalid={out || undefined}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ''))}
        />
        {suffix && <span aria-hidden="true">{suffix}</span>}
      </div>
      {out && (
        <span className="field__error" id={`${id}-err`}>
          Enter a value between {min.toLocaleString()} and {max.toLocaleString()}.
        </span>
      )}
    </div>
  );
}

export function Calculator({ variant, config, embedded = false }: Props) {
  const uid = useId();
  const tracked = useRef(false);
  const [values, setValues] = useState<Values>(() => {
    const init: Values = {};
    if (config.kind === 'loan') {
      init.price = config.price.default?.toString() ?? '';
      init.deposit = config.deposit.default?.toString() ?? '';
      init.termYears = config.termYears.default?.toString() ?? '';
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
      const deposit = Number(values.deposit || 0);
      const termYears = Number(values.termYears);
      const ratePct = Number(values.ratePct);
      if (!values.price || !values.termYears || !values.ratePct) return null;
      if ([price, deposit, termYears, ratePct].some((n) => Number.isNaN(n))) return null;
      if (price < config.price.min || price > config.price.max) return null;
      if (termYears < config.termYears.min || termYears > config.termYears.max) return null;
      if (ratePct < config.ratePct.min || ratePct > config.ratePct.max) return null;
      if (deposit >= price) return { kind: 'loan' as const, depositTooHigh: true, data: null };
      return {
        kind: 'loan' as const,
        depositTooHigh: false,
        data: amortise({ price, deposit: clamp(deposit, 0, price), termYears, annualRatePct: ratePct }),
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

  return (
    <div className={`calc${embedded ? ' calc--embedded' : ''}`}>
      <style>{css}</style>
      <form className="calc__form" onSubmit={(e) => e.preventDefault()} aria-labelledby={`${uid}-title`}>
        {!embedded && (
          <div className="calc__head">
            <h2 id={`${uid}-title`}>{config.title}</h2>
            <p className="muted">{config.intro}</p>
          </div>
        )}
        {embedded && (
          <h3 id={`${uid}-title`} className="calc__h3">
            {config.title}
          </h3>
        )}

        {config.kind === 'loan' ? (
          <div className="calc__fields">
            <NumberField
              id={`${uid}-price`}
              label={config.price.label}
              value={values.price}
              onChange={set('price')}
              min={config.price.min}
              max={config.price.max}
              step={config.price.step}
              prefix="US$"
            />
            <NumberField
              id={`${uid}-deposit`}
              label={config.deposit.label}
              value={values.deposit}
              onChange={set('deposit')}
              min={config.deposit.min}
              max={config.deposit.max}
              step={config.deposit.step}
              prefix="US$"
            />
            <NumberField
              id={`${uid}-term`}
              label={config.termYears.label}
              hint={`Between ${config.termYears.min} and ${config.termYears.max} years`}
              value={values.termYears}
              onChange={set('termYears')}
              min={config.termYears.min}
              max={config.termYears.max}
              step={config.termYears.step}
              suffix="years"
            />
            <NumberField
              id={`${uid}-rate`}
              label={config.ratePct.label}
              hint={config.ratePct.hint}
              value={values.ratePct}
              onChange={set('ratePct')}
              min={config.ratePct.min}
              max={config.ratePct.max}
              step={config.ratePct.step}
              suffix="%"
            />
          </div>
        ) : (
          <div className="calc__fields">
            <NumberField
              id={`${uid}-value`}
              label={config.value.label}
              hint={config.value.hint}
              value={values.value}
              onChange={set('value')}
              min={config.value.min}
              max={config.value.max}
              step={config.value.step}
              prefix="US$"
            />
          </div>
        )}
      </form>

      <div className="calc__result" aria-live="polite" aria-atomic="true">
        <span className="sr-only">{announce}</span>
        {result?.kind === 'quote' && result.pending && (
          <div className="calc__pending">
            <p className="calc__pending-title">Indicative rates coming soon</p>
            <p className="small muted">We are finalising the rate table for this calculator. Ask us for a quote instead.</p>
          </div>
        )}
        {result?.kind === 'loan' && result.depositTooHigh && (
          <p className="calc__msg">Your deposit covers the full price, so there is nothing to finance.</p>
        )}
        {result?.kind === 'loan' && result.data && (
          <dl className="calc__out">
            <div className="calc__main">
              <dt>Monthly repayment</dt>
              <dd className="figure">{formatMoney(result.data.monthlyRepayment, config.currency, 2)}</dd>
            </div>
            <div>
              <dt>Amount financed</dt>
              <dd>{formatMoney(result.data.principal, config.currency)}</dd>
            </div>
            <div>
              <dt>Total repayment</dt>
              <dd>{formatMoney(result.data.totalRepayment, config.currency)}</dd>
            </div>
            <div>
              <dt>Total interest</dt>
              <dd>{formatMoney(result.data.totalInterest, config.currency)}</dd>
            </div>
            <div>
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
              <dt>Indicative annual premium</dt>
              <dd className="figure">{formatMoney(result.data.annual, config.currency, 2)}</dd>
            </div>
            <div>
              <dt>Per month</dt>
              <dd>{formatMoney(result.data.monthly, config.currency, 2)}</dd>
            </div>
          </dl>
        )}
        {result === null && (
          <p className="calc__msg muted">Fill in the fields above to see your estimate.</p>
        )}
        <p className="calc__disclaimer small muted">{config.disclaimer}</p>
        <a href={config.cta.href} className="btn btn--primary" data-track="apply_click">
          {config.cta.label}
        </a>
      </div>
    </div>
  );
}

const css = `
.calc{display:grid;gap:var(--s-6);border:1px solid var(--line);border-radius:var(--r-lg);background:var(--white);padding:var(--s-6)}
@media (min-width:900px){.calc{grid-template-columns:1fr 1fr;padding:var(--s-8)}.calc--embedded{grid-template-columns:1fr}}
.calc__head{display:grid;gap:var(--s-2);margin-bottom:var(--s-4)}
.calc__h3{margin-bottom:var(--s-4)}
.calc__fields{display:grid;gap:var(--s-4)}
.calc__result{display:grid;gap:var(--s-4);align-content:start;background:var(--blue-50);border-radius:var(--r-md);padding:var(--s-6)}
.calc__out{margin:0;display:grid;gap:var(--s-3)}
.calc__out div{display:flex;justify-content:space-between;gap:var(--s-4);font-size:var(--t-sm);border-bottom:1px solid var(--blue-100);padding-bottom:var(--s-2)}
.calc__out dt{color:var(--grey)}
.calc__out dd{margin:0;font-weight:700;color:var(--blue);text-align:right;font-variant-numeric:tabular-nums}
.calc__main{display:grid !important;gap:var(--s-1);border-bottom:0 !important}
.calc__main dd{text-align:left !important}
.calc__pending{display:grid;gap:var(--s-1)}
.calc__pending-title{font-weight:700;color:var(--blue)}
.calc__msg{font-size:var(--t-sm)}
.calc__disclaimer{max-width:none}
`;
