import { useEffect, useId, useRef, useState } from 'react';
import { Icon } from './Icon';
import { track } from '../lib/analytics';

interface Props {
  whatsapp: string;
  phone: { display: string; href: string };
  email: string;
}

/**
 * "Chat with us" pill, fixed bottom right, sitting above the sticky mobile
 * CTA bar. Offers WhatsApp and the contact centre until the chatbot is
 * connected; the chatbot module would load only when the panel opens.
 */
export function ChatLauncher({ whatsapp, phone, email }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    track('chat_opened');
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node) && !btnRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <div className="chat">
      <style>{css}</style>
      {open && (
        <div className="chat__panel" id={id} ref={panelRef} role="dialog" aria-label="Chat with us">
          <p className="chat__title">How would you like to talk to us?</p>
          <a href={whatsapp} className="chat__opt" target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={22} className="chat__wa" />
            <span>
              <span className="chat__opt-label">WhatsApp</span>
              <span className="chat__opt-line">Replies around the clock</span>
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a href={phone.href} className="chat__opt">
            <Icon name="phone" size={22} />
            <span>
              <span className="chat__opt-label">Call {phone.display}</span>
              <span className="chat__opt-line">Contact centre, 24 hours</span>
            </span>
          </a>
          <a href={`mailto:${email}`} className="chat__opt">
            <Icon name="mail" size={22} />
            <span>
              <span className="chat__opt-label">Email us</span>
              <span className="chat__opt-line">{email}</span>
            </span>
          </a>
          <p className="chat__note">Live chat is on its way. Until then, WhatsApp is the quickest route.</p>
        </div>
      )}
      <button
        type="button"
        ref={btnRef}
        className="chat__pill"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name={open ? 'close' : 'chat'} size={20} />
        <span>{open ? 'Close' : 'Chat with us'}</span>
      </button>
    </div>
  );
}

const css = `
.chat{position:fixed;right:var(--s-4);bottom:calc(var(--s-4) + env(safe-area-inset-bottom));z-index:45;display:grid;justify-items:end;gap:var(--s-3)}
body.has-sticky-cta .chat{bottom:calc(var(--sticky-cta-h) + var(--s-3) + env(safe-area-inset-bottom))}
@media (min-width:900px){body.has-sticky-cta .chat{bottom:var(--s-6)}.chat{right:var(--s-6);bottom:var(--s-6)}}
.chat__pill{display:inline-flex;align-items:center;gap:var(--s-2);min-height:48px;padding:0 var(--s-5,20px) 0 var(--s-4);border-radius:999px;background:var(--blue);color:var(--white);font-weight:700;box-shadow:var(--shadow-float);transition:background-color var(--dur) var(--ease)}
.chat__pill:hover{background:var(--blue-700)}
.chat__panel{width:min(320px,calc(100vw - var(--s-8)));background:var(--white);border:1px solid var(--line);border-radius:var(--r-lg);box-shadow:var(--shadow-float);padding:var(--s-4);display:grid;gap:var(--s-2)}
.chat__title{font-weight:700;color:var(--blue);padding:var(--s-2) var(--s-2) var(--s-1)}
.chat__opt{display:flex;align-items:center;gap:var(--s-3);padding:var(--s-3) var(--s-2);border-radius:var(--r-sm);color:var(--ink);text-decoration:none;min-height:var(--tap)}
.chat__opt:hover{background:var(--blue-50);color:var(--ink)}
.chat__opt>span{display:grid}
.chat__opt-label{font-weight:700;color:var(--blue)}
.chat__opt-line{font-size:var(--t-xs);color:var(--grey)}
.chat__wa{color:var(--whatsapp)}
.chat__note{font-size:var(--t-xs);color:var(--grey);padding:var(--s-2)}
`;
