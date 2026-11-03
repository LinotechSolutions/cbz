import { useEffect, useId, useRef, useState } from 'react';
import type { NavLink } from '../data/nav';
import { track } from '../lib/analytics';
import { Icon } from './Icon';

interface Props {
  items: NavLink[];
  label?: string;
  size?: 'md' | 'lg';
}

/** The red Open an account menu for use outside the header (home hero). */
export function OpenAccountMenu({ items, label = 'Open an account', size = 'lg' }: Props) {
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const cls = `btn btn--primary${size === 'lg' ? ' btn--lg' : ''}`;
  if (!hydrated) {
    return (
      <a href="/contact#open-account" className={cls}>
        {label} <Icon name="chevronDown" size={16} />
      </a>
    );
  }
  return (
    <div className="oam" ref={root}>
      <style>{css}</style>
      <button ref={btn} type="button" className={cls} aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
        {label} <Icon name="chevronDown" size={16} />
      </button>
      <div id={id} className="oam__menu" hidden={!open}>
        <ul role="list">
          {items
            .filter((i) => i.href)
            .map((it) => {
              const ext = it.external || /^https?:/.test(it.href!);
              return (
                <li key={it.label}>
                  <a
                    href={it.href!}
                    className="oam__link"
                    target={ext ? '_blank' : undefined}
                    rel={ext ? 'noopener noreferrer' : undefined}
                    onClick={() => track('open_account_choice', { choice: it.label, from: 'hero' })}
                  >
                    <span className="oam__label">
                      {it.label}
                      {ext && <Icon name="external" size={14} className="ext" />}
                    </span>
                    {it.line && <span className="oam__line">{it.line}</span>}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

const css = `
.oam{position:relative;display:inline-block}
.oam__menu{position:absolute;top:calc(100% + var(--s-2));left:0;z-index:30;min-width:320px;max-width:calc(100vw - 2*var(--gutter));background:var(--white);border:1px solid var(--line);border-radius:var(--r-lg);box-shadow:var(--shadow-float);padding:var(--s-3);color:var(--ink)}
.oam__menu[hidden]{display:none}
.oam__link{display:grid;gap:2px;padding:var(--s-3) var(--s-4);border-radius:var(--r-sm);text-decoration:none;color:var(--ink);min-height:var(--tap)}
.oam__link:hover{background:var(--blue-50);color:var(--ink)}
.oam__label{font-weight:700;color:var(--blue);display:inline-flex;align-items:center;gap:var(--s-1)}
.oam__line{font-size:var(--t-xs);color:var(--grey)}
`;
