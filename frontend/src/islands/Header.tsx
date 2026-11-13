import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Icon } from './Icon';
import { track } from '../lib/analytics';
import type { MegaMenu, NavLink } from '../data/nav';

interface LogoProp {
  src: string;
  aspect: number;
  name: string;
}
export interface AudienceTab {
  id: string;
  label: string;
  href: string;
}
interface Props {
  mega: MegaMenu[];
  loginItems: NavLink[];
  openAccountItems: NavLink[];
  utilityLinks: NavLink[];
  /** Full-colour CBZ Holdings lockup for the white strip. */
  holdingsLight: LogoProp;
  /** On a business page the unit's own full-colour logo replaces the Holdings mark. */
  unitLogo: (LogoProp & { key: string; href: string }) | null;
  audiences: AudienceTab[];
  /** The audience whose home this page is, else ''. */
  audienceOwn: string;
  currentPath: string;
}

interface SearchHit {
  label: string;
  line: string;
  href: string;
  group: string;
}

const AUDIENCE_KEY = 'cbz-audience';
const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * Site header, in two rows that stick together: a white strip with the logo
 * and the audience tabs (Personal, Business, School, Diaspora), then the navy
 * bar with six purpose-led mega menus (Bank, Borrow, Insure, Invest, Grow,
 * Group), Search, Branches & ATMs, Help, the Log in menu and the red Sign up
 * menu. On phones the navy bar folds into a menu sheet. Before hydration the
 * triggers are plain links, so the header works with JavaScript off. Menus
 * follow the WAI-ARIA disclosure pattern.
 *
 * The chosen audience is remembered in localStorage and mirrored on
 * <html data-audience>; product carousels and listings read it. An inline
 * script in BaseLayout sets it before paint so nothing flashes.
 */
export function Header({ mega, loginItems, openAccountItems, utilityLinks, holdingsLight, unitLogo, audiences, audienceOwn, currentPath }: Props) {
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [audience, setAudience] = useState(audienceOwn || 'personal');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchHit[] | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const searchRef = useRef<HTMLDialogElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const uid = useId();

  useEffect(() => setHydrated(true), []);

  /* ---------- Audience: remembered choice, mirrored on <html> ---------- */
  const remember = (id: string) => {
    try {
      localStorage.setItem(AUDIENCE_KEY, id);
    } catch {
      /* storage blocked */
    }
  };
  const applyAudience = useCallback((id: string) => {
    document.documentElement.dataset.audience = id;
    setAudience(id);
    document.dispatchEvent(new CustomEvent('cbz:audience', { detail: id }));
  }, []);
  useEffect(() => {
    const ids = audiences.map((a) => a.id);
    // BaseLayout's inline script has already chosen; take its answer.
    const chosen = document.documentElement.dataset.audience;
    if (chosen && ids.includes(chosen)) setAudience(chosen);
    // Product groups offer the audiences they do serve when the chosen one is empty.
    const onSet = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (!ids.includes(id)) return;
      remember(id);
      applyAudience(id);
      const u = new URL(location.href);
      u.searchParams.set('for', id);
      history.replaceState(null, '', u);
    };
    document.addEventListener('cbz:audience-set', onSet);
    return () => document.removeEventListener('cbz:audience-set', onSet);
  }, [audiences, applyAudience]);

  /* ---------- Menus ---------- */
  const close = useCallback((restoreFocus = false) => {
    setOpen(null);
    if (restoreFocus) lastTrigger.current?.focus();
  }, []);

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
      Array.from(sheet.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'));
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

  // Arrow keys move between links inside an open menu.
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
  /** The menu whose business this page belongs to. */
  const currentMega = mega.find((m) => currentPath.startsWith(m.href) || m.columns.some((c) => c.offeredBy.some((o) => o.href !== '/' && currentPath.startsWith(o.href))))?.id;

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
      <button type="button" className={className} aria-expanded={open === id} aria-controls={`${uid}-${id}`} onClick={(e) => toggle(id, e)} onKeyDown={onTriggerKey(id)}>
        {label}
        {chevron && <Icon name="chevronDown" size={16} className="hdr__chev" />}
      </button>
    ) : (
      <a href={fallbackHref} className={className}>
        {label}
        {chevron && <Icon name="chevronDown" size={16} className="hdr__chev" />}
      </a>
    );

  /* ---------- Search ---------- */
  const openSearch = async (e: React.MouseEvent<HTMLElement>) => {
    lastTrigger.current = e.currentTarget;
    close();
    setMobileOpen(false);
    setSearchOpen(true);
    track('search_open', {});
    if (!index) {
      try {
        const res = await fetch('/search-index.json');
        setIndex((await res.json()) as SearchHit[]);
      } catch {
        setIndex([]);
      }
    }
  };
  useEffect(() => {
    const d = searchRef.current;
    if (!d) return;
    if (searchOpen && !d.open) {
      d.showModal();
      requestAnimationFrame(() => searchInput.current?.focus());
    } else if (!searchOpen && d.open) {
      d.close();
    }
  }, [searchOpen]);
  const hits = (() => {
    const q = query.trim().toLowerCase();
    if (!index || q.length < 2) return [];
    const words = q.split(/\s+/);
    return index
      .map((h) => {
        const text = `${h.label} ${h.line} ${h.group}`.toLowerCase();
        const score = words.reduce((s, w) => (h.label.toLowerCase().includes(w) ? s + 2 : text.includes(w) ? s + 1 : s - 10), 0);
        return { h, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((x) => x.h);
  })();

  /* Wide lockups (Red Sphere, Risk Advisory) sit a little shorter so they fit on a phone. */
  const logo = unitLogo ?? { ...holdingsLight, href: '/', key: 'holdings' };
  const logoHeight = unitLogo ? Math.min(36, Math.round(170 / unitLogo.aspect)) : 36;
  const logoLabel = unitLogo ? `${unitLogo.name} home` : 'CBZ Holdings home';

  return (
    <header className="hdr" ref={rootRef}>
      <style>{css}</style>

      {/* Row 1: white strip with the logo and the audience tabs */}
      <div className="strip">
        <div className="container strip__inner">
          <a href={logo.href} className="strip__home" aria-label={logoLabel}>
            <img src={logo.src} alt={logo.name} width={Math.round(logoHeight * logo.aspect)} height={logoHeight} decoding="async" />
          </a>
          <span className="strip__divider" aria-hidden="true" />
          <nav className="aud" aria-label="Who we serve">
            <ul role="list" className="aud__list">
              {audiences.map((a) => {
                const on = a.id === audience;
                return (
                  <li key={a.id}>
                    <a href={a.href} className={`aud__tab${on ? ' is-active' : ''}`} aria-current={on ? 'true' : undefined} onClick={() => remember(a.id)}>
                      {a.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          {hydrated ? (
            <button
              type="button"
              className="strip__burger"
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
            <a href="/sitemap" className="strip__burger">
              <Icon name="menu" size={24} label="Menu" />
            </a>
          )}
        </div>
      </div>

      {/* Row 2: navy bar with the six mega menus and the actions */}
      <div className="bar">
        <div className="container bar__inner">
          <nav className="bar__nav" aria-label="Main">
            <ul role="list" className="bar__list">
              {mega.map((m) => (
                <li key={m.id} className="bar__item">
                  {hydrated ? (
                    <button
                      type="button"
                      className="bar__top"
                      aria-expanded={open === m.id}
                      aria-controls={`${uid}-${m.id}`}
                      aria-current={currentMega === m.id ? 'true' : undefined}
                      onClick={(e) => toggle(m.id, e)}
                      onKeyDown={onTriggerKey(m.id)}
                    >
                      {m.label}
                    </button>
                  ) : (
                    <a href={m.href} className="bar__top" aria-current={currentMega === m.id ? 'page' : undefined}>
                      {m.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="bar__actions">
            {hydrated ? (
              <button type="button" className="bar__util bar__util--search" onClick={openSearch}>
                <Icon name="search" size={18} />
                Search
              </button>
            ) : (
              <a href="/sitemap" className="bar__util bar__util--search">
                <Icon name="search" size={18} />
                Search
              </a>
            )}
            {utilityLinks.filter((u) => u.href).map((u) => (
              <a key={u.label} href={u.href!} className="bar__util">
                {u.label}
              </a>
            ))}
            <div className="hdr__item hdr__item--login">
              {menuButton('login', 'Log in', '/contact#log-in', 'bar__login')}
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
              {menuButton('open', 'Sign up', '/contact#open-account', 'btn btn--primary bar__open')}
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div id={`${uid}-open`} className="hdr__menu hdr__menu--right" hidden={open !== 'open'} onKeyDown={onMenuKey}>
                <ul role="list" className="hdr__menu-list">
                  {openAccountItems.filter((i) => i.href).map((it) => (
                    <li key={it.label}>{renderLink(it, 'open_account_choice')}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* The mega panels, full width under the bar */}
        {mega.map((m) => (
          // Keyboard handler delegates arrow-key movement between the links inside (disclosure pattern).
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div key={m.id} id={`${uid}-${m.id}`} className="mega" hidden={open !== m.id} onKeyDown={onMenuKey}>
            <div className="container mega__inner">
              <div className="mega__cols">
                {m.columns.map((c) => (
                  <section key={c.title} className="mega__col" aria-label={c.title}>
                    <h3 className="mega__title">{c.title}</h3>
                    <ul role="list" className="mega__links">
                      {c.items.map((it) => {
                        const ext = it.external || isExternal(it.href);
                        return (
                          <li key={it.label}>
                            <a href={it.href} className="mega__link" target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined} onClick={() => close()}>
                              {it.label}
                              {ext && <Icon name="external" size={13} className="ext" />}
                              {ext && <span className="sr-only"> (opens in a new tab)</span>}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="mega__by">
                      <span className="mega__by-label">Offered by</span>
                      <span className="mega__by-names">
                        {c.offeredBy.map((o, i) => (
                          <span key={o.name}>
                            {i > 0 && <span aria-hidden="true"> / </span>}
                            <a href={o.href} onClick={() => close()}>
                              {o.name}
                            </a>
                          </span>
                        ))}
                      </span>
                    </p>
                  </section>
                ))}
              </div>
            </div>
            <div className="mega__foot">
              <div className="container mega__foot-in">
                <p className="mega__note">{m.note}</p>
                <div className="mega__actions">
                  {m.actions.map((a, i) => {
                    const ext = a.external || isExternal(a.href);
                    return (
                      <a
                        key={a.label}
                        href={a.href}
                        className={`btn ${i === 0 ? 'btn--primary' : 'btn--secondary'} mega__btn`}
                        target={ext ? '_blank' : undefined}
                        rel={ext ? 'noopener noreferrer' : undefined}
                        onClick={() => close()}
                      >
                        {a.label}
                        {ext && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    );
                  })}
                  <a href={m.href} className="mega__all" onClick={() => close()}>
                    View all <Icon name="arrowRight" size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phone menu sheet */}
      {mobileOpen && (
        <div className="sheet" id={`${uid}-sheet`} role="dialog" aria-modal="true" aria-label="Menu" ref={sheetRef}>
          <div className="sheet__bar">
            <img src={logo.src} alt={logo.name} width={Math.round(30 * logo.aspect)} height={30} />
            <button type="button" className="sheet__close" onClick={() => setMobileOpen(false)}>
              <Icon name="close" size={24} label="Close menu" />
            </button>
          </div>
          <div className="sheet__body">
            <div className="sheet__primary">
              <details className="sheet__group sheet__group--open">
                <summary className="btn btn--primary btn--block sheet__summary">
                  Sign up <Icon name="chevronDown" size={16} />
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
              {mega.map((m) => (
                <details key={m.id} className="sheet__group">
                  <summary className="sheet__cluster">
                    {m.label} <Icon name="chevronDown" size={18} />
                  </summary>
                  <div className="sheet__cols">
                    {m.columns.map((c) => (
                      <div key={c.title} className="sheet__col">
                        <p className="sheet__col-title">{c.title}</p>
                        <ul role="list" className="sheet__links">
                          {c.items.map((it) => (
                            <li key={it.label}>{renderLink({ label: it.label, href: it.href, external: it.external })}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <a href={m.href} className="hdr__link" onClick={() => setMobileOpen(false)}>
                      <span className="hdr__link-label">View all {m.label.toLowerCase()}</span>
                    </a>
                  </div>
                </details>
              ))}
            </nav>
            <div className="sheet__utils">
              <button type="button" className="sheet__util" onClick={openSearch}>
                <Icon name="search" size={18} /> Search
              </button>
              {utilityLinks.filter((u) => u.href).map((u) => (
                <a key={u.label} href={u.href!} className="sheet__util" onClick={() => setMobileOpen(false)}>
                  <Icon name={u.label.startsWith('Branches') ? 'pin' : 'headset'} size={18} /> {u.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search dialog */}
      {hydrated && (
        // A click on the backdrop closes the dialog; Escape is handled natively by <dialog>.
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <dialog
          ref={searchRef}
          className="search"
          aria-labelledby={`${uid}-search-title`}
          onClose={() => {
            setSearchOpen(false);
            lastTrigger.current?.focus();
          }}
          onClick={(e) => {
            if (e.target === searchRef.current) setSearchOpen(false);
          }}
        >
          <div className="search__in">
            <div className="search__head">
              <h2 id={`${uid}-search-title`} className="search__title">
                Search CBZ
              </h2>
              <button type="button" className="search__close" onClick={() => setSearchOpen(false)}>
                <Icon name="close" size={22} label="Close search" />
              </button>
            </div>
            <label className="sr-only" htmlFor={`${uid}-q`}>
              Search products and pages
            </label>
            <div className="search__field">
              <Icon name="search" size={20} className="search__ic" />
              <input
                ref={searchInput}
                id={`${uid}-q`}
                className="search__input"
                type="search"
                placeholder="Try SmartCash, mortgage, funeral cover, unit trusts…"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && hits[0]) {
                    track('search_go', { query, href: hits[0].href });
                    location.href = hits[0].href;
                  }
                }}
              />
            </div>
            <div className="search__results" aria-live="polite">
              {!index && searchOpen && <p className="search__hint">Loading…</p>}
              {index && query.trim().length < 2 && <p className="search__hint">Type at least two letters.</p>}
              {index && query.trim().length >= 2 && hits.length === 0 && (
                <p className="search__hint">
                  Nothing matched. Try another word, or <a href="/sitemap">browse the sitemap</a>.
                </p>
              )}
              {hits.length > 0 && (
                <ul role="list" className="search__list">
                  {hits.map((h) => (
                    <li key={h.href + h.label}>
                      <a href={h.href} className="search__hit" onClick={() => track('search_go', { query, href: h.href })}>
                        <span className="search__hit-label">{h.label}</span>
                        <span className="search__hit-line">{h.line}</span>
                        <span className="search__hit-group">{h.group}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </dialog>
      )}
    </header>
  );
}

const css = `
.hdr{position:sticky;top:0;z-index:50;color:var(--white)}
/* The header sticks, so in-page anchors stop below it. */
main section[id],main .content[id]{scroll-margin-top:calc(var(--strip-h) + var(--header-h) + var(--s-4))}
/* Row 1: white strip */
.strip{background:var(--white);border-bottom:1px solid var(--line);color:var(--ink)}
.strip__inner{display:flex;align-items:center;flex-wrap:wrap;column-gap:var(--s-5,20px);min-height:56px}
.strip__home{display:inline-flex;align-items:center;height:56px;flex-shrink:0}
.strip__home img{display:block;height:30px;width:auto}
.strip__divider{display:none;width:1px;height:32px;background:var(--line);flex-shrink:0}
.aud{order:3;flex-basis:100%;overflow-x:auto;scrollbar-width:none;margin-inline:calc(-1*var(--gutter));padding-inline:var(--gutter)}
.aud::-webkit-scrollbar{display:none}
.aud__list{display:flex;gap:var(--s-6);height:40px;align-items:stretch}
.aud__tab{display:inline-flex;align-items:center;height:100%;font-size:var(--t-sm);font-weight:400;color:var(--blue);text-decoration:none;white-space:nowrap;border-bottom:3px solid transparent;transition:color var(--dur) var(--ease)}
.aud__tab:hover{color:var(--red-700)}
.aud__tab.is-active{color:var(--red);font-weight:700}
.strip__burger{margin-left:auto;display:inline-flex;align-items:center;justify-content:center;width:var(--tap);height:var(--tap);color:var(--blue);border-radius:var(--r-sm)}
/* Row 2: navy bar */
.bar{display:none;position:relative;background:var(--blue-900)}
.bar__inner{display:flex;align-items:center;gap:var(--s-4);height:56px}
.bar__list{display:flex;gap:var(--s-1)}
.bar__item{position:relative}
.bar__top{display:inline-flex;align-items:center;height:56px;padding:0 var(--s-4);font-weight:700;font-size:var(--t-md);color:var(--white);text-decoration:none;white-space:nowrap;border-bottom:3px solid transparent;border-top:3px solid transparent;transition:background-color var(--dur) var(--ease)}
.bar__top:hover{background:rgba(255,255,255,.08);color:var(--white)}
.bar__top[aria-expanded="true"]{background:rgba(255,255,255,.1);border-bottom-color:var(--red);color:var(--white)}
.bar__top[aria-current]{border-bottom-color:rgba(228,0,43,.6)}
.bar__actions{margin-left:auto;display:flex;align-items:center;gap:var(--s-4)}
.bar__util{display:inline-flex;align-items:center;gap:var(--s-2);height:var(--tap);color:rgba(255,255,255,.9);font-size:var(--t-sm);text-decoration:none;white-space:nowrap;border-radius:var(--r-sm);background:none;padding:0 var(--s-1)}
.bar__util:hover{color:var(--white);text-decoration:underline;text-underline-offset:4px}
.bar__login{display:inline-flex;align-items:center;gap:var(--s-1);height:40px;padding:0 var(--s-5,20px);border-radius:var(--r-pill);font-weight:700;color:var(--white);text-decoration:none;white-space:nowrap;background:none;border:1.5px solid rgba(255,255,255,.75)}
.bar__login:hover,.bar__login[aria-expanded="true"]{background:rgba(255,255,255,.12)}
.bar__open{gap:var(--s-1);min-height:40px}
.hdr :focus-visible{outline-color:var(--white)}
.strip :focus-visible{outline-color:var(--blue-700)}
.hdr__chev{transition:transform var(--dur) var(--ease)}
[aria-expanded="true"] .hdr__chev{transform:rotate(180deg)}
/* Dropdowns (Log in, Sign up) */
.hdr__item{position:relative}
.hdr__menu{position:absolute;top:calc(100% + var(--s-2));left:0;min-width:300px;background:var(--white);border:1px solid var(--line);border-radius:var(--r-lg);box-shadow:var(--shadow-float);padding:var(--s-3);z-index:60;color:var(--ink)}
.hdr__menu[hidden]{display:none}
.hdr__menu--right{left:auto;right:0}
.hdr__menu-list{display:grid}
.hdr__link{display:grid;gap:2px;padding:var(--s-3) var(--s-4);border-radius:var(--r-sm);color:var(--ink);text-decoration:none;min-height:var(--tap);transition:background-color var(--dur) var(--ease)}
.hdr__link:hover{background:var(--blue-50);color:var(--ink)}
.hdr__link--static{color:var(--grey)}
.hdr__link-label{font-weight:700;color:var(--blue);display:inline-flex;align-items:center;gap:var(--s-1)}
.hdr__link--static .hdr__link-label{color:var(--grey)}
.hdr__link-line{font-size:var(--t-xs);color:var(--grey)}
/* Mega panels */
.mega{position:absolute;left:0;right:0;top:100%;background:var(--white);color:var(--ink);border-top:1px solid var(--line);box-shadow:var(--shadow-float);z-index:60;max-height:calc(100vh - 120px);overflow-y:auto}
.mega[hidden]{display:none}
.mega__inner{padding-block:var(--s-6) var(--s-6)}
.mega__cols{display:grid;grid-template-columns:repeat(5,minmax(0,1fr))}
.mega__col{display:grid;grid-template-rows:auto 1fr auto;gap:var(--s-3);padding:var(--s-2) var(--s-5,20px);border-left:1px solid var(--line)}
.mega__col:first-child{border-left:0;padding-left:0}
.mega__title{font-size:var(--t-md);font-weight:700;color:var(--blue);margin:0}
.mega__links{display:grid;gap:2px;align-content:start}
.mega__link{display:inline-flex;align-items:center;gap:var(--s-1);min-height:32px;color:var(--ink);text-decoration:none;font-size:var(--t-sm)}
.mega__link:hover{color:var(--red);text-decoration:underline;text-underline-offset:3px}
.mega__by{display:grid;gap:2px;margin:var(--s-2) 0 0}
.mega__by-label{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--grey)}
.mega__by-names{font-weight:700;font-size:var(--t-sm)}
.mega__by-names a{color:var(--red-700);text-decoration:none}
.mega__by-names a:hover{text-decoration:underline}
.mega__foot{background:var(--surface);border-top:1px solid var(--line)}
.mega__foot-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--s-3) var(--s-6);padding-block:var(--s-3)}
.mega__note{color:var(--grey);font-size:var(--t-sm);margin:0;max-width:60ch}
.mega__actions{display:flex;flex-wrap:wrap;align-items:center;gap:var(--s-2)}
.mega__btn{min-height:40px;padding-inline:var(--s-5,20px)}
.mega__actions .btn--secondary{border-color:var(--blue);color:var(--blue)}
.mega__all{display:inline-flex;align-items:center;gap:var(--s-1);margin-left:var(--s-2);font-weight:700;color:var(--blue-700);text-decoration:none;min-height:40px}
.mega__all:hover{text-decoration:underline}
@media (min-width:900px){
  .strip__inner{flex-wrap:nowrap;height:60px}
  .strip__home{height:60px}
  .strip__home img{height:36px}
  .strip__divider{display:block}
  .aud{order:0;flex-basis:auto;margin-inline:0;padding-inline:0}
  .aud__list{height:60px;gap:var(--s-8)}
  .aud__tab{font-size:var(--t-lg)}
  .strip__burger{display:none}
  .bar{display:block}
}
@media (min-width:900px) and (max-width:1199px){
  .bar__util:not(.bar__util--search){display:none}
  .bar__top{padding:0 var(--s-3);font-size:var(--t-sm)}
}
/* Phone sheet */
.sheet{position:fixed;inset:0;z-index:70;background:var(--white);color:var(--ink);display:flex;flex-direction:column;overflow-y:auto}
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
.sheet__cols{display:grid;gap:var(--s-3);padding-bottom:var(--s-3)}
.sheet__col-title{font-weight:700;color:var(--blue);margin:var(--s-2) 0 0;padding:0 var(--s-4)}
.sheet__col .hdr__link{min-height:40px;padding-block:var(--s-2)}
.sheet__col .hdr__link-label{font-weight:400;color:var(--ink)}
.sheet__links{display:grid;padding-bottom:var(--s-3)}
.sheet__utils{display:grid;gap:var(--s-1)}
.sheet__util{display:inline-flex;align-items:center;gap:var(--s-2);min-height:var(--tap);font-weight:700;color:var(--blue);text-decoration:none;background:none;padding:0;text-align:left}
.sheet__util:hover{text-decoration:underline}
/* Search dialog */
.search{width:min(92vw,680px);margin:8vh auto auto;padding:0;border:0;border-radius:var(--r-lg);background:var(--white);color:var(--ink);box-shadow:var(--shadow-float)}
.search::backdrop{background:rgba(0,23,54,.6);backdrop-filter:blur(2px)}
.search__in{display:grid;gap:var(--s-4);padding:var(--s-5,20px)}
.search__head{display:flex;align-items:center;justify-content:space-between;gap:var(--s-4)}
.search__title{font-size:var(--t-lg);color:var(--blue);margin:0}
.search__close{display:inline-flex;align-items:center;justify-content:center;width:var(--tap);height:var(--tap);border-radius:50%;color:var(--blue)}
.search__close:hover{background:var(--blue-50)}
.search__field{position:relative}
.search__ic{position:absolute;left:var(--s-4);top:50%;transform:translateY(-50%);color:var(--grey)}
.search__input{width:100%;min-height:52px;padding:0 var(--s-4) 0 48px;border:1.5px solid var(--line);border-radius:var(--r-pill);font:inherit;font-size:var(--t-md);color:var(--ink);background:var(--white)}
.search__input:focus{border-color:var(--blue-700);outline:none;box-shadow:0 0 0 3px var(--blue-100)}
.search__results{min-height:60px;max-height:50vh;overflow-y:auto}
.search__hint{color:var(--grey);font-size:var(--t-sm);margin:0;padding:var(--s-2) var(--s-1)}
.search__list{display:grid;gap:2px}
.search__hit{display:grid;grid-template-columns:1fr auto;gap:0 var(--s-3);padding:var(--s-3) var(--s-4);border-radius:var(--r-sm);text-decoration:none;color:var(--ink)}
.search__hit:hover,.search__hit:focus-visible{background:var(--blue-50)}
.search__hit-label{font-weight:700;color:var(--blue)}
.search__hit-line{grid-column:1;font-size:var(--t-xs);color:var(--grey);display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
.search__hit-group{grid-row:1/3;align-self:center;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--red-700);white-space:nowrap}
`;
