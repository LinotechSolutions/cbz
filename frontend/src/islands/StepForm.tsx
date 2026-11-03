import { useEffect, useId, useRef, useState } from 'react';
import type { FormDef, FieldDef } from '../lib/forms';
import { stepSchema } from '../lib/forms';
import { draftStore, stripSensitive } from '../lib/draftStore';
import { submitForm } from '../lib/submitForm';
import { track } from '../lib/analytics';
import { Icon } from './Icon';

interface Props {
  def: FormDef;
  /** Pre-fill from the page, e.g. the property being viewed. */
  initial?: Record<string, string>;
  /** Field names that may be pre-filled from the URL query, e.g. ?property=… */
  queryFields?: string[];
}

type Values = Record<string, string | boolean>;
type Errors = Record<string, string>;

function emptyValues(def: FormDef, initial: Record<string, string> = {}): Values {
  const v: Values = {};
  for (const s of def.steps) for (const f of s.fields) v[f.name] = f.type === 'checkbox' ? false : (initial[f.name] ?? '');
  return v;
}

/**
 * Multi-step form. Progress indicator, focus to the step heading on change,
 * inline errors plus a summary linked to each field, save-and-continue via
 * draftStore, honeypot, and success / error states from submitForm.
 */
export function StepForm({ def, initial, queryFields = [] }: Props) {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(() => emptyValues(def, initial));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle');
  const [reference, setReference] = useState('');
  const [failure, setFailure] = useState('');
  const [restored, setRestored] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const current = def.steps[step];
  const total = def.steps.length;

  // Restore a draft once, then let the URL query pre-fill the fields it may.
  useEffect(() => {
    draftStore.loadDraft(def.formId).then((d) => {
      if (d && Object.keys(d).length) {
        setValues((v) => ({ ...v, ...(d as Values) }));
        setRestored(true);
      }
      if (queryFields.length) {
        const q = new URLSearchParams(window.location.search);
        const fromQuery: Values = {};
        for (const f of queryFields) {
          const v = q.get(f);
          if (v) fromQuery[f] = v.slice(0, 200);
        }
        if (Object.keys(fromQuery).length) setValues((v) => ({ ...v, ...fromQuery }));
      }
    });
    // queryFields is static per page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [def.formId]);

  // Move focus to the heading when the step changes.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    track('form_step', { form: def.formId, step: step + 1 });
  }, [step, def.formId]);

  const update = (name: string, value: string | boolean) => {
    setValues((v) => {
      const next = { ...v, [name]: value };
      draftStore.saveDraft(def.formId, stripSensitive(next));
      return next;
    });
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
  };

  const validate = (): boolean => {
    const subset: Values = {};
    for (const f of current.fields) subset[f.name] = values[f.name];
    const res = stepSchema(current).safeParse(subset);
    if (res.success) {
      setErrors({});
      return true;
    }
    const e: Errors = {};
    for (const issue of res.error.issues) {
      const key = String(issue.path[0]);
      if (!e[key]) e[key] = issue.message;
    }
    setErrors(e);
    requestAnimationFrame(() => summaryRef.current?.focus());
    return false;
  };

  const next = () => {
    if (!validate()) return;
    setStep((s) => Math.min(total - 1, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    const fd = new FormData(e.currentTarget);
    if (fd.get('website')) return; // honeypot
    setStatus('sending');
    try {
      const res = await submitForm(def.unit, def.formId, { ...values, unit: def.unit });
      setReference(res.reference);
      setStatus('done');
      await draftStore.clearDraft(def.formId);
      track('form_submitted', { form: def.formId, unit: def.unit });
      requestAnimationFrame(() => headingRef.current?.focus());
    } catch (err) {
      setFailure(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('failed');
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  };

  const errorList = current.fields.filter((f) => errors[f.name]);

  if (status === 'done') {
    return (
      <div className="sf sf--done" data-hides-sticky>
        <style>{css}</style>
        <Icon name="check" size={32} className="sf__done-icon" />
        <h2 ref={headingRef} tabIndex={-1}>
          {def.successTitle}
        </h2>
        <p>{def.successBody}</p>
        <p className="small muted">
          Your reference is <strong>{reference}</strong>. Keep it in case you need to follow up.
        </p>
        <a href="/" className="btn btn--secondary">
          Back to the home page
        </a>
      </div>
    );
  }

  return (
    <form className="sf" onSubmit={submit} noValidate data-hides-sticky aria-labelledby={`${uid}-h`}>
      <style>{css}</style>
      <ol className="sf__progress" aria-label="Progress">
        {def.steps.map((s, i) => (
          <li
            key={s.title}
            className={`sf__dot${i === step ? ' sf__dot--current' : ''}${i < step ? ' sf__dot--done' : ''}`}
            aria-current={i === step ? 'step' : undefined}
          >
            <span className="sr-only">
              Step {i + 1} of {total}: {s.title}
              {i < step ? ', completed' : ''}
            </span>
          </li>
        ))}
      </ol>
      <p className="sf__count small muted">
        Step {step + 1} of {total}
      </p>
      <h2 id={`${uid}-h`} ref={headingRef} tabIndex={-1} className="sf__heading">
        {current.title}
      </h2>
      {current.intro && <p className="muted">{current.intro}</p>}
      {restored && step === 0 && (
        <p className="sf__restored small">We have restored what you entered earlier.</p>
      )}

      <div
        ref={summaryRef}
        tabIndex={-1}
        className="sf__summary"
        role="alert"
        hidden={errorList.length === 0 && status !== 'failed'}
      >
        {status === 'failed' && <p className="sf__summary-title">{failure}</p>}
        {errorList.length > 0 && (
          <>
            <p className="sf__summary-title">Check the following:</p>
            <ul>
              {errorList.map((f) => (
                <li key={f.name}>
                  <a href={`#${uid}-${f.name}`}>{errors[f.name]}</a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="sf__fields">
        {current.fields.map((f) => (
          <Field key={f.name} def={f} id={`${uid}-${f.name}`} value={values[f.name]} error={errors[f.name]} onChange={(v) => update(f.name, v)} />
        ))}
      </div>

      {/* Honeypot: real visitors never see or fill this. */}
      <div className="sf__hp" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sf__actions">
        {step > 0 && (
          <button type="button" className="btn btn--secondary" onClick={back}>
            <Icon name="chevronLeft" size={16} /> Back
          </button>
        )}
        {step < total - 1 ? (
          <button type="button" className="btn btn--primary" onClick={next}>
            Continue
          </button>
        ) : (
          <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : def.submitLabel}
          </button>
        )}
      </div>
      <p className="small muted sf__privacy">
        Your details are only used to handle this request. See our <a href="/privacy-policy">privacy policy</a>.
      </p>
    </form>
  );
}

function Field({
  def,
  id,
  value,
  error,
  onChange,
}: {
  def: FieldDef;
  id: string;
  value: string | boolean;
  error?: string;
  onChange: (v: string | boolean) => void;
}) {
  const describedBy = [def.hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(' ') || undefined;
  const common = {
    id,
    name: def.name,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : undefined,
    'aria-required': def.required || undefined,
    autoComplete: def.autocomplete,
  };

  if (def.type === 'checkbox') {
    return (
      <div className={`field field--check${error ? ' field--invalid' : ''}`}>
        <label className="field__check">
          <input {...common} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          <span>{def.label}</span>
        </label>
        {error && (
          <span className="field__error" id={`${id}-err`}>
            {error}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {def.label}
        {!def.required && <span className="muted"> (optional)</span>}
      </label>
      {def.hint && (
        <span className="field__hint" id={`${id}-hint`}>
          {def.hint}
        </span>
      )}
      {def.type === 'select' ? (
        <select {...common} className="input" value={String(value)} onChange={(e) => onChange(e.target.value)}>
          <option value="">Choose…</option>
          {def.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : def.type === 'textarea' ? (
        <textarea {...common} className="input" rows={4} value={String(value)} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input
          {...common}
          className="input"
          type={def.type === 'number' ? 'text' : def.type}
          inputMode={def.type === 'number' ? 'decimal' : def.type === 'tel' ? 'tel' : def.type === 'email' ? 'email' : undefined}
          value={String(value)}
          placeholder={def.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && (
        <span className="field__error" id={`${id}-err`}>
          {error}
        </span>
      )}
    </div>
  );
}

const css = `
.sf{display:grid;gap:var(--s-4);max-width:640px}
.sf__progress{display:flex;gap:var(--s-2);list-style:none;padding:0;margin:0}
.sf__dot{width:40px;height:4px;border-radius:2px;background:var(--line)}
.sf__dot--done{background:var(--blue-700)}
.sf__dot--current{background:var(--blue)}
.sf__count{margin-top:calc(-1 * var(--s-2))}
.sf__heading{outline:none}
.sf__restored{color:var(--success)}
.sf__summary{border:1.5px solid var(--red-hover);border-radius:var(--r-md);padding:var(--s-4);background:var(--red-50)}
.sf__summary[hidden]{display:none}
.sf__summary-title{font-weight:700;color:var(--red-hover)}
.sf__summary ul{padding-left:1.2em;margin-top:var(--s-2);display:grid;gap:var(--s-1);font-size:var(--t-sm)}
.sf__summary a{color:var(--red-hover)}
.sf__fields{display:grid;gap:var(--s-5,20px)}
.field--check .field__check{display:flex;gap:var(--s-3);align-items:flex-start;font-size:var(--t-sm);min-height:var(--tap)}
.field--check input{width:22px;height:22px;margin-top:2px;flex-shrink:0;accent-color:var(--blue)}
.sf__hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.sf__actions{display:flex;gap:var(--s-3);flex-wrap:wrap;margin-top:var(--s-2)}
.sf__privacy{max-width:none}
.sf--done{text-align:left;border:1px solid var(--line);border-radius:var(--r-lg);padding:var(--s-8);gap:var(--s-3);justify-items:start}
.sf__done-icon{color:var(--success)}
`;
