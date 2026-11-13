import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Icon } from './Icon';
import { track } from '../lib/analytics';
import type { Intent, MegaMenu, NavLink } from '../data/nav';

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
  intents: Intent[];
  loginItems: NavLink[];
  openAccountItems: NavLink[];
  utilityLinks: NavLink[];
  /** Full-colour CBZ Holdings lockup for the white row. */
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
 * Site header, two rows that stick together. The white row: the logo, a
 * segmented Personal / Business / School / Diaspora toggle, a rounded
 * "Find ways to bank better" field that opens the search dialog, Log in,
 * Get the app and the red Sign up menu. The grey band: six icon chips (Bank,
 * Borrow, Insure, Invest, Grow, Group), each opening a full-width mega menu
 * of purpose-led columns. On phones the toggle drops to a second row and the
 * band folds into the menu sheet. Before hydration every trigger is a plain
 * link, so the header works with JavaScript off. Menus follow the WAI-ARIA
 * disclosure pattern.
 *
 * The search dialog opens with the "I want to …" sentence builder (verb,
 * object, Search) above free-text search over a static index.
 *
 * The chosen audience is remembered in localStorage and mirrored on
 * <html data-audience>; product carousels and listings read it. An inline
 * script in BaseLayout sets it before paint so nothing flashes.
 */
export function Header({ mega, intents, loginItems, openAccountItems, utilityLinks, holdingsLight, unitLogo, audiences, audienceOwn, currentPath }: Props) {
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [audience, setAudience] = useState(audienceOwn || 'personal');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchHit[] | null>(null);
  const [verb, setVerb] = useState(intents[0]?.verb ?? '');
  const [object, setObject] = useState(intents[0]?.objects[0]?.href ?? '');
  const rootRef = useRef<HTMLElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const searchRef = useRef<HTMLDialogElement>(null);
  const verbRef = useRef<HTMLSelectElement>(null);
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

  /* ---------- Search and the sentence builder ---------- */
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
      requestAnimationFrame(() => verbRef.current?.focus());
    } else if (!searchOpen && d.open) {
      d.close();
    }
  }, [searchOpen]);
  const intent = intents.find((i) => i.verb === verb) ?? intents[0];
  const chooseVerb = (v: string) => {
    setVerb(v);
    const first = intents.find((i) => i.verb === v)?.objects[0];
    setObject(first?.href ?? '');
  };
  const goIntent = () => {
    const o = intent?.objects.find((x) => x.href === object) ?? intent?.objects[0];
    if (!o) return;
    track('search_go', { query: `I want to ${intent.verb} ${o.label}`, href: o.href });
    if (o.external || isExternal(o.href)) window.open(o.href, '_blank', 'noopener');
    else location.href = o.href;
  };
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
  const findLabel = 'Find ways to bank better';

  return (
    <header className="hdr" ref={rootRef}>
      <style>{css}</style>

      {/* Row 1: logo, audience toggle, search field, actions */}
      <div className="hdr-top">
        <div className="container hdr-top__inner">
          <a href={logo.href} className="hdr-top__home" aria-label={logoLabel}>
            <img src={logo.src} alt={logo.name} width={Math.round(logoHeight * logo.aspect)} height={logoHeight} decoding="async" />
          </a>

          <nav className="hdr-seg" aria-label="Who we serve">
            <ul role="list" className="hdr-seg__list">
              {audiences.map((a) => {
                const on = a.id === audience;
                return (
                  <li key={a.id}>
                    <a href={a.href} className={`hdr-seg__tab${on ? ' is-active' : ''}`} aria-current={on ? 'true' : undefined} onClick={() => remember(a.id)}>
                      {a.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {hydrated ? (
            <button type="button" className="hdr-find" onClick={openSearch}>
              <Icon name="search" size={20} className="hdr-find__ic" />
              <span className="hdr-find__text">{findLabel}</span>
            </button>
          ) : (
            <a href="/sitemap" className="hdr-find">
              <Icon name="search" size={20} className="hdr-find__ic" />
              <span className="hdr-find__text">{findLabel}</span>
            </a>
          )}

          <div className="hdr-top__actions">
            <div className="hdr__item">
              {hydrated ? (
                <button type="button" className="hdr-top__login" aria-expanded={open === 'login'} aria-controls={`${uid}-login`} onClick={(e) => toggle('login', e)} onKeyDown={onTriggerKey('login')}>
                  <Icon name="shield" size={20} />
                  Log in
                </button>
              ) : (
                <a href="/login" className="hdr-top__login">
                  <Icon name="shield" size={20} />
                  Log in
                </a>
              )}
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div id={`${uid}-login`} className="hdr__menu hdr__menu--right" hidden={open !== 'login'} onKeyDown={onMenuKey}>
                <ul role="list" className="hdr__menu-list">
                  {loginItems.filter((i) => i.href).map((it) => (
                    <li key={it.label}>{renderLink(it, 'login_choice')}</li>
                  ))}
                </ul>
              </div>
            </div>
            <a href="/login#apps" className="btn btn--secondary hdr-top__app">
              Get the app
            </a>
            <div className="hdr__item">
              {hydrated ? (
                <button type="button" className="btn btn--primary hdr-top__open" aria-expanded={open === 'open'} aria-controls={`${uid}-open`} onClick={(e) => toggle('open', e)} onKeyDown={onTriggerKey('open')}>
                  Sign up <Icon name="chevronDown" size={16} className="hdr__chev" />
                </button>
              ) : (
                <a href="/contact#open-account" className="btn btn--primary hdr-top__open">
                  Sign up <Icon name="chevronDown" size={16} className="hdr__chev" />
                </a>
              )}
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

          {hydrated ? (
            <button
              type="button"
              className="hdr-top__burger"
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
            <a href="/sitemap" className="hdr-top__burger">
              <Icon name="menu" size={24} label="Menu" />
            </a>
          )}
        </div>
      </div>

      {/* Row 2: the chip band with the six mega menus */}
      <div className="hdr-band">
        <div className="container hdr-band__inner">
          <nav className="hdr-band__nav" aria-label="Main">
            <ul role="list" className="hdr-band__list">
              {mega.map((m) => (
                <li key={m.id}>
                  {hydrated ? (
                    <button
                      type="button"
                      className="hdr-chip"
                      aria-expanded={open === m.id}
                      aria-controls={`${uid}-${m.id}`}
                      aria-current={currentMega === m.id ? 'true' : undefined}
                      onClick={(e) => toggle(m.id, e)}
                      onKeyDown={onTriggerKey(m.id)}
                    >
                      <Icon name={m.icon} size={20} className="hdr-chip__ic" />
                      {m.label}
                    </button>
                  ) : (
                    <a href={m.href} className="hdr-chip" aria-current={currentMega === m.id ? 'page' : undefined}>
                      <Icon name={m.icon} size={20} className="hdr-chip__ic" />
                      {m.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="hdr-band__utils">
            {utilityLinks.filter((u) => u.href).map((u) => (
              <a key={u.label} href={u.href!} className="hdr-band__util">
                <Icon name={u.label.startsWith('Branches') ? 'pin' : 'headset'} size={16} />
                {u.label}
              </a>
            ))}
          </div>
        </div>

        {/* The mega panels, full width under the band */}
        {mega.map((m) => (
          // Keyboard handler delegates arrow-key movement between the links inside (disclosure pattern).
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div key={m.id} id={`${uid}-${m.id}`} className="hdr-mega" hidden={open !== m.id} onKeyDown={onMenuKey}>
            <div className="container hdr-mega__inner">
              <div className="hdr-mega__cols">
                {m.columns.map((c) => (
                  <section key={c.title} className="hdr-mega__col" aria-label={c.title}>
                    <h3 className="hdr-mega__title">{c.title}</h3>
                    <ul role="list" className="hdr-mega__links">
                      {c.items.map((it) => {
                        const ext = it.external || isExternal(it.href);
                        return (
                          <li key={it.label}>
                            <a href={it.href} className="hdr-mega__link" target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined} onClick={() => close()}>
                              {it.label}
                              {ext && <Icon name="external" size={13} className="ext" />}
                              {ext && <span className="sr-only"> (opens in a new tab)</span>}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="hdr-mega__by">
                      <span className="hdr-mega__by-label">Offered by</span>
                      <span className="hdr-mega__by-names">
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
            <div className="hdr-mega__foot">
              <div className="container hdr-mega__foot-in">
                <p className="hdr-mega__note">{m.note}</p>
                <div className="hdr-mega__actions">
                  {m.actions.map((a, i) => {
                    const ext = a.external || isExternal(a.href);
                    return (
                      <a
                        key={a.label}
                        href={a.href}
                        className={`btn ${i === 0 ? 'btn--primary' : 'btn--secondary'} hdr-mega__btn`}
                        target={ext ? '_blank' : undefined}
                        rel={ext ? 'noopener noreferrer' : undefined}
                        onClick={() => close()}
                      >
                        {a.label}
                        {ext && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    );
                  })}
                  <a href={m.href} className="hdr-mega__all" onClick={() => close()}>
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
            <button type="button" className="hdr-find hdr-find--sheet" onClick={openSearch}>
              <Icon name="search" size={20} className="hdr-find__ic" />
              <span className="hdr-find__text">{findLabel}</span>
            </button>
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
              <a href="/login#apps" className="btn btn--secondary btn--block" onClick={() => setMobileOpen(false)}>
                Get the app
              </a>
            </div>
            <nav aria-label="Main">
              {mega.map((m) => (
                <details key={m.id} className="sheet__group">
                  <summary className="sheet__cluster">
                    <span className="sheet__cluster-label">
                      <Icon name={m.icon} size={20} /> {m.label}
                    </span>
                    <Icon name="chevronDown" size={18} />
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
              {utilityLinks.filter((u) => u.href).map((u) => (
                <a key={u.label} href={u.href!} className="sheet__util" onClick={() => setMobileOpen(false)}>
                  <Icon name={u.label.startsWith('Branches') ? 'pin' : 'headset'} size={18} /> {u.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search dialog: the sentence builder, then free-text search */}
      {hydrated && (
        // A click on the backdrop closes the dialog; Escape is handled natively by <dialog>.
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <dialog
          ref={searchRef}
          className="hdr-search"
          aria-labelledby={`${uid}-search-title`}
          onClose={() => {
            setSearchOpen(false);
            lastTrigger.current?.focus();
          }}
          onClick={(e) => {
            if (e.target === searchRef.current) setSearchOpen(false);
          }}
        >
          <div className="hdr-search__in">
            <div className="hdr-search__head">
              <h2 id={`${uid}-search-title`} className="hdr-search__title">
                {findLabel}
              </h2>
              <button type="button" className="hdr-search__close" onClick={() => setSearchOpen(false)}>
                <Icon name="close" size={22} label="Close search" />
              </button>
            </div>

            <form
              className="hdr-want"
              onSubmit={(e) => {
                e.preventDefault();
                goIntent();
              }}
            >
              <span className="hdr-want__lead">I want to:</span>
              <label className="sr-only" htmlFor={`${uid}-verb`}>
                What do you want to do
              </label>
              <select id={`${uid}-verb`} ref={verbRef} className="hdr-want__select" value={verb} onChange={(e) => chooseVerb(e.target.value)}>
                {intents.map((i) => (
                  <option key={i.verb} value={i.verb}>
                    {i.verb}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor={`${uid}-object`}>
                What
              </label>
              <select id={`${uid}-object`} className="hdr-want__select hdr-want__select--wide" value={object} onChange={(e) => setObject(e.target.value)}>
                {intent?.objects.map((o) => (
                  <option key={o.href + o.label} value={o.href}>
                    {o.label}
                  </option>
                ))}
              </select>
              <button type="submit" className="hdr-want__go">
                <Icon name="arrowRight" size={22} />
                <span>Search</span>
              </button>
            </form>

            <p className="hdr-search__or">or search for a product or page</p>
            <label className="sr-only" htmlFor={`${uid}-q`}>
              Search products and pages
            </label>
            <div className="hdr-search__field">
              <Icon name="search" size={20} className="hdr-search__ic" />
              <input
                id={`${uid}-q`}
                className="hdr-search__input"
                type="search"
                placeholder="Try SmartCash, mortgage, funeral cover, unit trusts…"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && hits[0]) {
                    e.preventDefault();
                    track('search_go', { query, href: hits[0].href });
                    location.href = hits[0].href;
                  }
                }}
              />
            </div>
            <div className="hdr-search__results" aria-live="polite">
              {!index && searchOpen && <p className="hdr-search__hint">Loading…</p>}
              {index && query.trim().length >= 2 && hits.length === 0 && (
                <p className="hdr-search__hint">
                  Nothing matched. Try another word, or <a href="/sitemap">browse the sitemap</a>.
                </p>
              )}
              {hits.length > 0 && (
                <ul role="list" className="hdr-search__list">
                  {hits.map((h) => (
                    <li key={h.href + h.label}>
                      <a href={h.href} className="hdr-search__hit" onClick={() => track('search_go', { query, href: h.href })}>
                        <span className="hdr-search__hit-label">{h.label}</span>
                        <span className="hdr-search__hit-line">{h.line}</span>
                        <span className="hdr-search__hit-group">{h.group}</span>
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
.hdr{position:sticky;top:0;z-index:50;color:var(--ink)}
/* The header sticks, so in-page anchors stop below it. */
main section[id],main .content[id]{scroll-margin-top:calc(var(--strip-h) + var(--header-h) + var(--s-4))}
/* Row 1 */
.hdr-top{background:var(--white);border-bottom:1px solid var(--line)}
.hdr-top__inner{display:flex;align-items:center;flex-wrap:wrap;column-gap:var(--s-4);min-height:56px}
.hdr-top__home{display:inline-flex;align-items:center;height:56px;flex-shrink:0}
.hdr-top__home img{display:block;height:30px;width:auto}
/* Segmented audience toggle: a navy pill, the chosen segment white */
.hdr-seg{order:3;flex-basis:100%;overflow-x:auto;scrollbar-width:none;padding:var(--s-1) 0 var(--s-2)}
.hdr-seg::-webkit-scrollbar{display:none}
.hdr-seg__list{display:inline-flex;gap:2px;padding:3px;border-radius:var(--r-pill);background:var(--blue);border:1.5px solid var(--blue)}
.hdr-seg__tab{display:inline-flex;align-items:center;height:34px;padding:0 var(--s-4);border-radius:var(--r-pill);font-weight:700;font-size:var(--t-sm);color:var(--white);text-decoration:none;white-space:nowrap;transition:background-color var(--dur) var(--ease),color var(--dur) var(--ease)}
.hdr-seg__tab:hover{background:rgba(255,255,255,.14);color:var(--white)}
.hdr-seg__tab.is-active{background:var(--white);color:var(--blue)}
.hdr-seg__tab:focus-visible{outline-color:var(--white);outline-offset:-3px}
/* The rounded hdr-search field */
.hdr-find{display:none;align-items:center;gap:var(--s-3);height:44px;padding:0 var(--s-5,20px);border:1.5px solid var(--line);border-radius:var(--r-pill);background:var(--white);color:var(--grey);font:inherit;font-size:var(--t-sm);text-decoration:none;text-align:left;min-width:0;flex:1 1 220px;max-width:320px;transition:border-color var(--dur) var(--ease)}
.hdr-find:hover{border-color:var(--blue-700);color:var(--ink)}
.hdr-find__ic{flex-shrink:0;color:var(--blue)}
.hdr-find__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hdr-find--sheet{display:flex;flex:none;max-width:none;width:100%}
.hdr-top__actions{display:none;align-items:center;gap:var(--s-3);margin-left:auto}
.hdr-top__login{display:inline-flex;align-items:center;gap:var(--s-2);height:var(--tap);padding:0 var(--s-2);border-radius:var(--r-sm);font-weight:700;color:var(--blue);text-decoration:none;white-space:nowrap;background:none}
.hdr-top__login:hover,.hdr-top__login[aria-expanded="true"]{background:var(--blue-50)}
.hdr-top__app{min-height:40px;white-space:nowrap}
.hdr-top__open{min-height:40px;gap:var(--s-1);white-space:nowrap}
.hdr-top__burger{margin-left:auto;display:inline-flex;align-items:center;justify-content:center;width:var(--tap);height:var(--tap);color:var(--blue);border-radius:var(--r-sm)}
.hdr__chev{transition:transform var(--dur) var(--ease)}
[aria-expanded="true"] .hdr__chev{transform:rotate(180deg)}
/* Row 2: the hdr-chip hdr-band */
.hdr-band{display:none;position:relative;background:var(--surface);border-bottom:1px solid var(--line)}
.hdr-band__inner{display:flex;align-items:center;gap:var(--s-4);height:56px}
.hdr-band__list{display:flex;gap:var(--s-3)}
.hdr-chip{display:inline-flex;align-items:center;gap:var(--s-2);height:40px;padding:0 var(--s-4);border-radius:var(--r-sm);border:1px solid var(--line);background:var(--white);color:var(--ink);font-weight:700;font-size:var(--t-sm);text-decoration:none;white-space:nowrap;transition:background-color var(--dur) var(--ease),border-color var(--dur) var(--ease),color var(--dur) var(--ease)}
.hdr-chip__ic{color:var(--blue)}
.hdr-chip:hover{border-color:var(--blue-700);color:var(--blue)}
.hdr-chip[aria-current]{border-color:var(--blue);box-shadow:inset 0 -3px 0 var(--red)}
.hdr-chip[aria-expanded="true"]{background:var(--blue);border-color:var(--blue);color:var(--white)}
.hdr-chip[aria-expanded="true"] .hdr-chip__ic{color:var(--white)}
.hdr-band__utils{margin-left:auto;display:flex;align-items:center;gap:var(--s-4)}
.hdr-band__util{display:inline-flex;align-items:center;gap:var(--s-2);min-height:var(--tap);color:var(--blue);font-size:var(--t-sm);font-weight:700;text-decoration:none;white-space:nowrap}
.hdr-band__util:hover{text-decoration:underline;text-underline-offset:4px}
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
.hdr-mega{position:absolute;left:0;right:0;top:100%;background:var(--white);color:var(--ink);border-top:1px solid var(--line);box-shadow:var(--shadow-float);z-index:60;max-height:calc(100vh - 130px);overflow-y:auto}
.hdr-mega[hidden]{display:none}
.hdr-mega__inner{padding-block:var(--s-6)}
.hdr-mega__cols{display:grid;grid-template-columns:repeat(5,minmax(0,1fr))}
.hdr-mega__col{display:grid;grid-template-rows:auto 1fr auto;gap:var(--s-3);padding:var(--s-2) var(--s-5,20px);border-left:1px solid var(--line)}
.hdr-mega__col:first-child{border-left:0;padding-left:0}
.hdr-mega__title{font-size:var(--t-md);font-weight:700;color:var(--blue);margin:0}
.hdr-mega__links{display:grid;gap:2px;align-content:start}
.hdr-mega__link{display:inline-flex;align-items:center;gap:var(--s-1);min-height:32px;color:var(--ink);text-decoration:none;font-size:var(--t-sm)}
.hdr-mega__link:hover{color:var(--red);text-decoration:underline;text-underline-offset:3px}
.hdr-mega__by{display:grid;gap:2px;margin:var(--s-2) 0 0}
.hdr-mega__by-label{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--grey)}
.hdr-mega__by-names{font-weight:700;font-size:var(--t-sm)}
.hdr-mega__by-names a{color:var(--red-700);text-decoration:none}
.hdr-mega__by-names a:hover{text-decoration:underline}
.hdr-mega__foot{background:var(--surface);border-top:1px solid var(--line)}
.hdr-mega__foot-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--s-3) var(--s-6);padding-block:var(--s-3)}
.hdr-mega__note{color:var(--grey);font-size:var(--t-sm);margin:0;max-width:60ch}
.hdr-mega__actions{display:flex;flex-wrap:wrap;align-items:center;gap:var(--s-2)}
.hdr-mega__btn{min-height:40px;padding-inline:var(--s-5,20px)}
.hdr-mega__actions .btn--secondary{border-color:var(--blue);color:var(--blue)}
.hdr-mega__all{display:inline-flex;align-items:center;gap:var(--s-1);margin-left:var(--s-2);font-weight:700;color:var(--blue-700);text-decoration:none;min-height:40px}
.hdr-mega__all:hover{text-decoration:underline}
@media (min-width:900px){
  .hdr-top__inner{flex-wrap:nowrap;height:64px}
  .hdr-top__home{height:64px}
  .hdr-top__home img{height:36px}
  .hdr-seg{order:0;flex-basis:auto;padding:0;overflow:visible}
  .hdr-find{display:inline-flex}
  .hdr-top__actions{display:flex}
  .hdr-top__burger{display:none}
  .hdr-band{display:block}
}
@media (min-width:900px) and (max-width:1199px){
  .hdr-top__app{display:none}
  .hdr-find{flex-basis:44px;max-width:44px;padding:0;justify-content:center}
  .hdr-find__text{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
  .hdr-seg__tab{padding:0 var(--s-3)}
  .hdr-band__utils{display:none}
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
.sheet__cluster-label{display:inline-flex;align-items:center;gap:var(--s-3)}
.sheet__group[open] summary svg:last-child{transform:rotate(180deg)}
.sheet__cols{display:grid;gap:var(--s-3);padding-bottom:var(--s-3)}
.sheet__col-title{font-weight:700;color:var(--blue);margin:var(--s-2) 0 0;padding:0 var(--s-4)}
.sheet__col .hdr__link{min-height:40px;padding-block:var(--s-2)}
.sheet__col .hdr__link-label{font-weight:400;color:var(--ink)}
.sheet__links{display:grid;padding-bottom:var(--s-3)}
.sheet__utils{display:grid;gap:var(--s-1)}
.sheet__util{display:inline-flex;align-items:center;gap:var(--s-2);min-height:var(--tap);font-weight:700;color:var(--blue);text-decoration:none}
.sheet__util:hover{text-decoration:underline}
/* Search dialog */
.hdr-search{width:min(94vw,760px);margin:6vh auto auto;padding:0;border:0;border-radius:var(--r-lg);background:var(--white);color:var(--ink);box-shadow:var(--shadow-float)}
.hdr-search::backdrop{background:rgba(0,23,54,.6);backdrop-filter:blur(2px)}
.hdr-search__in{display:grid;gap:var(--s-4);padding:var(--s-5,20px)}
.hdr-search__head{display:flex;align-items:center;justify-content:space-between;gap:var(--s-4)}
.hdr-search__title{font-size:var(--t-lg);color:var(--blue);margin:0}
.hdr-search__close{display:inline-flex;align-items:center;justify-content:center;width:var(--tap);height:var(--tap);border-radius:50%;color:var(--blue)}
.hdr-search__close:hover{background:var(--blue-50)}
/* "I want to: [verb] [object] -> Search" */
.hdr-want{display:grid;grid-template-columns:1fr;gap:var(--s-3);padding:var(--s-4) var(--s-5,20px);border-radius:var(--r-md);background:linear-gradient(180deg,var(--blue-100),var(--blue-50) 70%,var(--white));border:1px solid var(--blue-100)}
.hdr-want__lead{font-size:var(--t-lg);color:var(--ink);align-self:center;white-space:nowrap}
.hdr-want__select{min-height:48px;padding:0 var(--s-8) 0 var(--s-2);border:0;border-bottom:2px solid var(--blue-100);border-radius:0;background:transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230a3e80' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right var(--s-2) center;font:inherit;font-size:var(--t-xl);font-weight:700;color:var(--blue-900);appearance:none;-webkit-appearance:none;min-width:0;text-overflow:ellipsis}
.hdr-want__select:focus{outline:none;border-bottom-color:var(--blue-700)}
.hdr-want__go{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-height:56px;padding:var(--s-2) var(--s-6);border-radius:var(--r-md);background:var(--blue-700);color:var(--white);font-weight:700;font-size:var(--t-sm);transition:background-color var(--dur) var(--ease)}
.hdr-want__go:hover{background:var(--blue)}
@media (min-width:640px){
  .hdr-want{grid-template-columns:auto minmax(0,1fr) minmax(0,1.4fr) auto;align-items:center}
}
.hdr-search__or{margin:0;font-size:var(--t-xs);color:var(--grey);text-transform:uppercase;letter-spacing:.08em}
.hdr-search__field{position:relative}
.hdr-search__ic{position:absolute;left:var(--s-4);top:50%;transform:translateY(-50%);color:var(--grey)}
.hdr-search__input{width:100%;min-height:48px;padding:0 var(--s-4) 0 48px;border:1.5px solid var(--line);border-radius:var(--r-pill);font:inherit;font-size:var(--t-md);color:var(--ink);background:var(--white)}
.hdr-search__input:focus{border-color:var(--blue-700);outline:none;box-shadow:0 0 0 3px var(--blue-100)}
.hdr-search__results{max-height:44vh;overflow-y:auto}
.hdr-search__hint{color:var(--grey);font-size:var(--t-sm);margin:0;padding:var(--s-2) var(--s-1)}
.hdr-search__list{display:grid;gap:2px}
.hdr-search__hit{display:grid;grid-template-columns:1fr auto;gap:0 var(--s-3);padding:var(--s-3) var(--s-4);border-radius:var(--r-sm);text-decoration:none;color:var(--ink)}
.hdr-search__hit:hover,.hdr-search__hit:focus-visible{background:var(--blue-50)}
.hdr-search__hit-label{font-weight:700;color:var(--blue)}
.hdr-search__hit-line{grid-column:1;font-size:var(--t-xs);color:var(--grey);display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
.hdr-search__hit-group{grid-row:1/3;align-self:center;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--red-700);white-space:nowrap}
`;
