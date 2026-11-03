import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Icon } from './Icon';
import { track } from '../lib/analytics';
import type { NavGroup, NavLink } from '../data/nav';

interface LogoProp {
  src: string;
  aspect: number;
  name: string;
}
interface Props {
  clusters: NavGroup[];
  loginItems: NavLink[];
  openAccountItems: NavLink[];
  holdings: LogoProp;
  unitLogo: (LogoProp & { key: string }) | null;
  currentPath: string;
}

const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * Site header: cluster mega-menu, split Log in menu and the red Open an
 * account menu. Before hydration the triggers are plain links, so the header
 * works with JavaScript off. Menus follow the WAI-ARIA disclosure pattern.
 */
export function Header({ clusters, loginItems, openAccountItems, holdings, unitLogo, currentPath }: Props) {
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const uid = useId();

  useEffect(() => setHydrated(true), []);

  const close = useCallback((restoreFocus = false) => {
    setOpen(null);
    if (restoreFocus) lastTrigger.current?.focus();
  }, []);

  // Click outside and Escape close any open menu.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close(true);
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  // Mobile sheet: lock scroll, trap focus, Escape closes.
  const sheetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const sheet = sheetRef.current!;
    const focusables = () =>
      Array.from(
        sheet.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'),
      );
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      lastTrigger.current?.focus();
    };
  }, [mobileOpen]);

  const toggle = (id: string, e: React.MouseEvent<HTMLElement>) => {
    lastTrigger.current = e.currentTarget;
    setOpen((cur) => (cur === id ? null : id));
  };

  // Arrow keys move between items inside an open menu.
  const onMenuKey = (e: React.KeyboardEvent<HTMLElement>) => {
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('a[href]'));
    const i = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(i + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(i - 1 + items.length) % items.length]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  const onTriggerKey = (id: string) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      lastTrigger.current = e.currentTarget;
      setOpen(id);
      requestAnimationFrame(() => {
        rootRef.current?.querySelector<HTMLElement>(`#${CSS.escape(`${uid}-${id}`)} a[href]`)?.focus();
      });
    }
  };

  const isCurrent = (href: string | null) => href && href !== '/' && currentPath.startsWith(href);

  const renderLink = (item: NavLink, event?: 'open_account_choice' | 'login_choice') => {
    if (!item.href) {
      return (
        <span className="hdr__link hdr__link--static">
          <span className="hdr__link-label">{item.label}</span>
          {item.line && <span className="hdr__link-line">{item.line}</span>}
        </span>
      );
    }
    const ext = item.external || isExternal(item.href);
    return (
      <a
        href={item.href}
        className="hdr__link"
        target={ext ? '_blank' : undefined}
        rel={ext ? 'noopener noreferrer' : undefined}
        aria-current={isCurrent(item.href) ? 'page' : undefined}
        onClick={() => {
          if (event) track(event, { choice: item.label });
          close();
          setMobileOpen(false);
        }}
      >
        <span className="hdr__link-label">
          {item.label}
          {ext && <Icon name="external" size={14} className="ext" />}
          {ext && <span className="sr-only"> (opens in a new tab)</span>}
        </span>
        {item.line && <span className="hdr__link-line">{item.line}</span>}
      </a>
    );
  };

  const menuButton = (id: string, label: string, fallbackHref: string, className: string, chevron = true) =>
    hydrated ? (
      <button
        type="button"
        className={className}
        aria-expanded={open === id}
        aria-controls={`${uid}-${id}`}
        onClick={(e) => toggle(id, e)}
        onKeyDown={onTriggerKey(id)}
      >
        {label}
        {chevron && <Icon name="chevronDown" size={16} className="hdr__chev" />}
      </button>
    ) : (
      <a href={fallbackHref} className={className}>
        {label}
        {chevron && <Icon name="chevronDown" size={16} className="hdr__chev" />}
      </a>
    );

  return (
    <header className="hdr" ref={rootRef}>
      <style>{css}</style>
      <div className="container hdr__inner">
        <a href="/" className="hdr__home" aria-label="CBZ Holdings home">
          <img
            src={holdings.src}
            alt={holdings.name}
            width={Math.round(36 * holdings.aspect)}
            height={36}
            decoding="async"
          />
        </a>
        {unitLogo && (
          <span className="hdr__unit" aria-hidden="true">
            <span className="hdr__unit-rule" />
            <img
              src={unitLogo.src}
              alt=""
              width={Math.round(28 * unitLogo.aspect)}
              height={28}
              decoding="async"
            />
          </span>
        )}

        <nav className="hdr__nav" aria-label="Main">
          <ul role="list" className="hdr__list">
            {clusters.map((g) => {
              const id = `c-${g.label.toLowerCase()}`;
              return (
                <li key={g.label} className="hdr__item">
                  {hydrated ? (
                    <button
                      type="button"
                      className="hdr__top"
                      aria-expanded={open === id}
                      aria-controls={`${uid}-${id}`}
                      aria-current={isCurrent(g.href) ? 'true' : undefined}
                      onClick={(e) => toggle(id, e)}
                      onKeyDown={onTriggerKey(id)}
                    >
                      {g.label}
                      <Icon name="chevronDown" size={14} className="hdr__chev" />
                    </button>
                  ) : (
                    <a href={g.href} className="hdr__top" aria-current={isCurrent(g.href) ? 'page' : undefined}>
                      {g.label}
                    </a>
                  )}
                  {/* Keyboard handler delegates arrow-key movement between the links inside (disclosure pattern). */}
                  {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                  <div
                    id={`${uid}-${id}`}
                    className="hdr__menu"
                    hidden={open !== id}
                    onKeyDown={onMenuKey}
                  >
                    <ul role="list" className="hdr__menu-list">
                      {g.items.map((it) => (
                        <li key={it.label}>{renderLink(it)}</li>
                      ))}
                    </ul>
                    <a href={g.href} className="hdr__menu-all" onClick={() => close()}>
                      All of {g.label.toLowerCase()}
                      <Icon name="arrowRight" size={16} />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hdr__actions">
          <div className="hdr__item hdr__item--login">
            {menuButton('login', 'Log in', '/contact#log-in', 'hdr__login')}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div id={`${uid}-login`} className="hdr__menu hdr__menu--right" hidden={open !== 'login'} onKeyDown={onMenuKey}>
              <ul role="list" className="hdr__menu-list">
                {loginItems.filter((i) => i.href).map((it) => (
                  <li key={it.label}>{renderLink(it, 'login_choice')}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hdr__item hdr__item--open">
            {menuButton('open', 'Open an account', '/contact#open-account', 'btn btn--primary hdr__open')}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div id={`${uid}-open`} className="hdr__menu hdr__menu--right" hidden={open !== 'open'} onKeyDown={onMenuKey}>
              <ul role="list" className="hdr__menu-list">
                {openAccountItems.filter((i) => i.href).map((it) => (
                  <li key={it.label}>{renderLink(it, 'open_account_choice')}</li>
                ))}
              </ul>
            </div>
          </div>
          {hydrated ? (
            <button
              type="button"
              className="hdr__burger"
              aria-expanded={mobileOpen}
              aria-controls={`${uid}-sheet`}
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setMobileOpen(true);
              }}
            >
              <Icon name="menu" size={24} label="Open menu" />
            </button>
          ) : (
            <a href="/sitemap" className="hdr__burger">
              <Icon name="menu" size={24} label="Menu" />
            </a>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="sheet" id={`${uid}-sheet`} role="dialog" aria-modal="true" aria-label="Menu" ref={sheetRef}>
          <div className="sheet__bar">
            <img src={holdings.src} alt={holdings.name} width={Math.round(32 * holdings.aspect)} height={32} />
            <button type="button" className="sheet__close" onClick={() => setMobileOpen(false)}>
              <Icon name="close" size={24} label="Close menu" />
            </button>
          </div>
          <div className="sheet__body">
            <div className="sheet__primary">
              <details className="sheet__group sheet__group--open">
                <summary className="btn btn--primary btn--block sheet__summary">
                  Open an account <Icon name="chevronDown" size={16} />
                </summary>
                <ul role="list" className="sheet__links">
                  {openAccountItems.filter((i) => i.href).map((it) => (
                    <li key={it.label}>{renderLink(it, 'open_account_choice')}</li>
                  ))}
                </ul>
              </details>
              <details className="sheet__group">
                <summary className="btn btn--secondary btn--block sheet__summary">
                  Log in <Icon name="chevronDown" size={16} />
                </summary>
                <ul role="list" className="sheet__links">
                  {loginItems.filter((i) => i.href).map((it) => (
                    <li key={it.label}>{renderLink(it, 'login_choice')}</li>
                  ))}
                </ul>
              </details>
            </div>
            <nav aria-label="Main">
              {clusters.map((g) => (
                <details key={g.label} className="sheet__group">
                  <summary className="sheet__cluster">
                    {g.label} <Icon name="chevronDown" size={18} />
                  </summary>
                  <ul role="list" className="sheet__links">
                    {g.items.map((it) => (
                      <li key={it.label}>{renderLink(it)}</li>
                    ))}
                    <li>
                      <a href={g.href} className="hdr__link" onClick={() => setMobileOpen(false)}>
                        <span className="hdr__link-label">All of {g.label.toLowerCase()}</span>
                      </a>
                    </li>
                  </ul>
                </details>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

const css = `
.hdr{position:sticky;top:0;z-index:50;background:var(--white);border-bottom:1px solid var(--line)}
.hdr__inner{display:flex;align-items:center;gap:var(--s-4);height:var(--header-h)}
.hdr__home{display:inline-flex;align-items:center;height:100%}
.hdr__home img{display:block}
.hdr__unit{display:none;align-items:center;gap:var(--s-4)}
.hdr__unit-rule{width:1px;height:28px;background:var(--line)}
.hdr__nav{display:none;margin-left:var(--s-4)}
.hdr__list{display:flex;gap:var(--s-1)}
.hdr__item{position:relative}
.hdr__top{display:inline-flex;align-items:center;gap:var(--s-1);height:var(--tap);padding:0 var(--s-3);border-radius:var(--r-sm);font-weight:700;color:var(--blue);text-decoration:none;transition:background-color var(--dur) var(--ease)}
.hdr__top:hover,.hdr__top[aria-expanded="true"]{background:var(--blue-50);color:var(--blue)}
.hdr__top[aria-current]{box-shadow:inset 0 -2px 0 var(--blue)}
.hdr__chev{transition:transform var(--dur) var(--ease)}
[aria-expanded="true"] .hdr__chev{transform:rotate(180deg)}
.hdr__menu{position:absolute;top:calc(100% + var(--s-2));left:0;min-width:300px;background:var(--white);border:1px solid var(--line);border-radius:var(--r-lg);box-shadow:var(--shadow-float);padding:var(--s-3);z-index:60}
.hdr__menu[hidden]{display:none}
.hdr__menu--right{left:auto;right:0}
.hdr__menu-list{display:grid}
.hdr__link{display:grid;gap:2px;padding:var(--s-3) var(--s-4);border-radius:var(--r-sm);color:var(--ink);text-decoration:none;min-height:var(--tap);transition:background-color var(--dur) var(--ease)}
.hdr__link:hover{background:var(--blue-50);color:var(--ink)}
.hdr__link--static{color:var(--grey)}
.hdr__link-label{font-weight:700;color:var(--blue);display:inline-flex;align-items:center;gap:var(--s-1)}
.hdr__link--static .hdr__link-label{color:var(--grey)}
.hdr__link-line{font-size:var(--t-xs);color:var(--grey)}
.hdr__menu-all{display:inline-flex;align-items:center;gap:var(--s-2);margin:var(--s-2) var(--s-4) var(--s-2);font-weight:700;color:var(--blue-700);text-decoration:none;min-height:var(--tap)}
.hdr__menu-all:hover{text-decoration:underline}
.hdr__actions{margin-left:auto;display:flex;align-items:center;gap:var(--s-2)}
.hdr__login{display:none;align-items:center;gap:var(--s-1);height:var(--tap);padding:0 var(--s-3);border-radius:var(--r-sm);font-weight:700;color:var(--blue);text-decoration:none;background:none;border:0}
.hdr__login:hover,.hdr__login[aria-expanded="true"]{background:var(--blue-50)}
.hdr__item--open{display:none}
.hdr__open{gap:var(--s-1)}
.hdr__burger{display:inline-flex;align-items:center;justify-content:center;width:var(--tap);height:var(--tap);color:var(--blue);border-radius:var(--r-sm)}
@media (min-width:900px){
  .hdr__unit{display:inline-flex}
  .hdr__nav{display:block}
  .hdr__login{display:inline-flex}
  .hdr__item--open{display:block}
  .hdr__burger{display:none}
}
@media (min-width:900px) and (max-width:1099px){
  .hdr__unit{display:none}
}
.sheet{position:fixed;inset:0;z-index:70;background:var(--white);display:flex;flex-direction:column;overflow-y:auto}
.sheet__bar{display:flex;align-items:center;justify-content:space-between;padding:var(--s-3) var(--gutter);border-bottom:1px solid var(--line);position:sticky;top:0;background:var(--white)}
.sheet__close{display:inline-flex;align-items:center;justify-content:center;width:var(--tap);height:var(--tap);color:var(--blue);border-radius:var(--r-sm)}
.sheet__body{padding:var(--s-4) var(--gutter) var(--s-16);display:grid;gap:var(--s-4)}
.sheet__primary{display:grid;gap:var(--s-2)}
.sheet__group{border-bottom:1px solid var(--line)}
.sheet__group summary{list-style:none;cursor:pointer}
.sheet__group summary::-webkit-details-marker{display:none}
.sheet__summary{justify-content:space-between}
.sheet__cluster{display:flex;align-items:center;justify-content:space-between;min-height:52px;font-weight:700;font-size:var(--t-lg);color:var(--blue)}
.sheet__group[open] summary svg:last-child{transform:rotate(180deg)}
.sheet__links{display:grid;padding-bottom:var(--s-3)}
`;
