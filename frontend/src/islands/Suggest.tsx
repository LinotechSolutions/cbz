import { useId, useState } from 'react';
import { suggest, type SuggestionInput } from '../lib/suggest';
import { Icon } from './Icon';

interface Props {
  unit: 'insurance' | 'cbz-life' | 'datvest';
  products: { id: string; name: string }[];
}

type Answers = Omit<SuggestionInput, 'unit'>;

const QUESTIONS: Record<Props['unit'], { key: keyof Answers; label: string; kind: 'yesno' | 'years' }[]> = {
  insurance: [
    { key: 'ownsCar', label: 'Do you own a car?', kind: 'yesno' },
    { key: 'ownsHome', label: 'Do you own your home?', kind: 'yesno' },
  ],
  'cbz-life': [
    { key: 'hasDependants', label: 'Do you have dependants?', kind: 'yesno' },
    { key: 'employerCover', label: 'Does your employer already cover you?', kind: 'yesno' },
  ],
  datvest: [
    { key: 'horizonYears', label: 'How many years until you need the money?', kind: 'years' },
    { key: 'wantsIncome', label: 'Do you need regular income from it?', kind: 'yesno' },
  ],
};

/**
 * "Suggested for you": two questions, a list of products, and a panel that
 * states exactly which inputs and rules produced the suggestion.
 */
export function Suggest({ unit, products }: Props) {
  const uid = useId();
  const [answers, setAnswers] = useState<Answers>({});
  const result = suggest({ unit, ...answers });
  const answered = Object.values(answers).some((v) => v !== undefined);
  const nameOf = (id: string) => products.find((p) => p.id === id)?.name;
  const shown = result.suggestions.filter((s) => nameOf(s.productId));

  return (
    <div className="sg">
      <style>{css}</style>
      <fieldset className="sg__q">
        <legend className="sg__legend">Suggested for you</legend>
        {QUESTIONS[unit].map((q) => (
          <div key={q.key} className="field">
            {q.kind === 'yesno' ? (
              <div className="sg__yn" role="group" aria-labelledby={`${uid}-${q.key}`}>
                <span className="field__label" id={`${uid}-${q.key}`}>
                  {q.label}
                </span>
                <div className="sg__btns">
                  {[true, false].map((v) => (
                    <button
                      key={String(v)}
                      type="button"
                      className={`sg__btn${answers[q.key] === v ? ' sg__btn--on' : ''}`}
                      aria-pressed={answers[q.key] === v}
                      onClick={() => setAnswers((a) => ({ ...a, [q.key]: v }))}
                    >
                      {v ? 'Yes' : 'No'}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <label className="field__label" htmlFor={`${uid}-${q.key}`}>
                  {q.label}
                </label>
                <input
                  id={`${uid}-${q.key}`}
                  className="input sg__years"
                  type="text"
                  inputMode="numeric"
                  value={answers.horizonYears ?? ''}
                  onChange={(e) => {
                    const n = Number(e.target.value.replace(/[^\d]/g, ''));
                    setAnswers((a) => ({ ...a, horizonYears: e.target.value === '' ? undefined : n }));
                  }}
                />
              </>
            )}
          </div>
        ))}
      </fieldset>

      <div className="sg__out" aria-live="polite">
        {answered && shown.length === 0 && <p className="muted">Nothing to suggest yet. Browse the products above, or ask us.</p>}
        {shown.length > 0 && (
          <ul className="sg__list" role="list">
            {shown.map((s) => (
              <li key={s.productId}>
                <a href={`#product-${unit}-${s.productId}`} className="sg__item">
                  <span className="sg__name">{nameOf(s.productId)}</span>
                  <span className="sg__reason">{s.reason}</span>
                  <Icon name="chevronRight" size={16} />
                </a>
              </li>
            ))}
          </ul>
        )}
        <details className="sg__how">
          <summary>How we suggest this</summary>
          <div className="sg__how-body">
            <p className="small">Inputs used</p>
            <ul className="small">
              {result.inputs.map((i) => (
                <li key={i.label}>
                  {i.label}: {i.value}
                </li>
              ))}
            </ul>
            <p className="small">Rules applied</p>
            <ul className="small">
              {result.rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="small muted">A suggestion is a starting point, not advice. Terms are confirmed when you apply.</p>
          </div>
        </details>
      </div>
    </div>
  );
}

const css = `
.sg{display:grid;gap:var(--s-6);border:1px solid var(--line);border-radius:var(--r-lg);padding:var(--s-6);background:var(--white)}
@media (min-width:900px){.sg{grid-template-columns:1fr 1fr;padding:var(--s-8)}}
.sg__q{border:0;padding:0;margin:0;display:grid;gap:var(--s-4)}
.sg__legend{font-weight:700;font-size:var(--t-xl);color:var(--blue);margin-bottom:var(--s-2)}
.sg__yn{display:grid;gap:var(--s-2)}
.sg__btns{display:flex;gap:var(--s-2)}
.sg__btn{min-height:var(--tap);padding:0 var(--s-6);border:1.5px solid var(--line);border-radius:var(--r-sm);font-weight:700;color:var(--blue)}
.sg__btn:hover{background:var(--blue-50)}
.sg__btn--on{background:var(--blue);border-color:var(--blue);color:#fff}
.sg__years{max-width:120px}
.sg__out{display:grid;gap:var(--s-3);align-content:start}
.sg__list{display:grid;gap:var(--s-2)}
.sg__item{display:grid;grid-template-columns:1fr auto;gap:var(--s-1) var(--s-3);align-items:center;padding:var(--s-3) var(--s-4);border:1px solid var(--line);border-radius:var(--r-md);text-decoration:none;color:var(--ink)}
.sg__item:hover{background:var(--blue-50);color:var(--ink)}
.sg__item svg{grid-row:1/span 2;color:var(--blue-700)}
.sg__name{font-weight:700;color:var(--blue)}
.sg__reason{font-size:var(--t-xs);color:var(--grey)}
.sg__how summary{cursor:pointer;font-weight:700;color:var(--blue-700);min-height:var(--tap);display:flex;align-items:center}
.sg__how-body{display:grid;gap:var(--s-2);padding:var(--s-2) 0}
.sg__how-body ul{padding-left:1.2em}
.sg__how-body p{font-weight:700;color:var(--blue)}
.sg__how-body p.muted{font-weight:400;color:var(--grey)}
`;
