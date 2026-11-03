import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

interface Img {
  src: string;
  alt: string;
}
interface Props {
  images: Img[];
  title: string;
}

/**
 * Property gallery: main image with thumbnails, and a full-screen lightbox in
 * a native <dialog> (modal focus trap and Escape come for free). Swipe on
 * touch, arrow keys on a keyboard.
 */
export function PropertyGallery({ images, title }: Props) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const n = images.length;

  const go = useCallback((d: number) => setIndex((i) => (i + d + n) % n), [n]);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => {
    dialogRef.current?.close();
  };

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => openerRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (!d.open) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    d.addEventListener('close', onClose);
    document.addEventListener('keydown', onKey);
    return () => {
      d.removeEventListener('close', onClose);
      document.removeEventListener('keydown', onKey);
    };
  }, [go]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const cur = images[index];

  return (
    <div className="gal">
      <style>{css}</style>
      <div className="gal__main" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <button type="button" className="gal__open" ref={openerRef} onClick={() => open(index)} aria-label={`Open photo ${index + 1} of ${n} full screen`}>
          <img src={cur.src} alt={cur.alt || `${title}, photo ${index + 1}`} width={1200} height={800} loading="eager" decoding="async" />
        </button>
        {n > 1 && (
          <>
            <button type="button" className="gal__arrow gal__arrow--l" onClick={() => go(-1)} aria-label="Previous photo">
              <Icon name="chevronLeft" size={22} />
            </button>
            <button type="button" className="gal__arrow gal__arrow--r" onClick={() => go(1)} aria-label="Next photo">
              <Icon name="chevronRight" size={22} />
            </button>
          </>
        )}
        <span className="gal__count" aria-live="polite">
          {index + 1} / {n}
        </span>
      </div>
      {n > 1 && (
        <ul className="gal__thumbs" role="list">
          {images.map((img, i) => (
            <li key={img.src + i}>
              <button
                type="button"
                className={`gal__thumb${i === index ? ' gal__thumb--on' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              >
                <img src={img.src} alt="" width={160} height={107} loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog ref={dialogRef} className="gal__dialog" aria-label={`${title} photos`}>
        <div className="gal__dialog-bar">
          <span>
            {index + 1} of {n}
          </span>
          <button type="button" className="gal__close" onClick={close}>
            <Icon name="close" size={24} label="Close photos" />
          </button>
        </div>
        <div className="gal__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <img src={cur.src} alt={cur.alt || `${title}, photo ${index + 1}`} />
          {n > 1 && (
            <>
              <button type="button" className="gal__arrow gal__arrow--l" onClick={() => go(-1)} aria-label="Previous photo">
                <Icon name="chevronLeft" size={24} />
              </button>
              <button type="button" className="gal__arrow gal__arrow--r" onClick={() => go(1)} aria-label="Next photo">
                <Icon name="chevronRight" size={24} />
              </button>
            </>
          )}
        </div>
        {n > 1 && (
          <ul className="gal__thumbs gal__thumbs--dark" role="list">
            {images.map((img, i) => (
              <li key={'d' + img.src + i}>
                <button type="button" className={`gal__thumb${i === index ? ' gal__thumb--on' : ''}`} onClick={() => setIndex(i)} aria-label={`Show photo ${i + 1}`}>
                  <img src={img.src} alt="" width={120} height={80} loading="lazy" decoding="async" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </dialog>
    </div>
  );
}

const css = `
.gal{display:grid;gap:var(--s-3)}
.gal__main{position:relative;aspect-ratio:3/2;border-radius:var(--r-md);overflow:hidden;background:var(--blue-100)}
.gal__open{display:block;width:100%;height:100%;cursor:zoom-in}
.gal__open img,.gal__stage img{width:100%;height:100%;object-fit:cover}
.gal__arrow{position:absolute;top:50%;transform:translateY(-50%);width:var(--tap);height:var(--tap);border-radius:50%;background:rgba(255,255,255,.92);color:var(--blue);display:inline-flex;align-items:center;justify-content:center;box-shadow:var(--shadow-float)}
.gal__arrow--l{left:var(--s-3)}.gal__arrow--r{right:var(--s-3)}
.gal__count{position:absolute;bottom:var(--s-3);right:var(--s-3);background:rgba(0,23,54,.75);color:#fff;font-size:var(--t-xs);padding:2px var(--s-2);border-radius:999px;font-variant-numeric:tabular-nums}
.gal__thumbs{display:flex;gap:var(--s-2);overflow-x:auto;padding-bottom:var(--s-1);scrollbar-width:thin}
.gal__thumb{display:block;width:96px;aspect-ratio:3/2;border-radius:var(--r-sm);overflow:hidden;border:2px solid transparent;opacity:.75;transition:opacity var(--dur) var(--ease)}
.gal__thumb img{width:100%;height:100%;object-fit:cover}
.gal__thumb--on,.gal__thumb:hover{opacity:1;border-color:var(--blue)}
.gal__dialog{border:0;padding:0;width:100vw;height:100dvh;max-width:none;max-height:none;background:var(--blue-900);color:#fff;display:none;grid-template-rows:auto 1fr auto;gap:var(--s-3)}
.gal__dialog[open]{display:grid}
.gal__dialog::backdrop{background:rgba(0,23,54,.9)}
.gal__dialog-bar{display:flex;justify-content:space-between;align-items:center;padding:var(--s-3) var(--s-4)}
.gal__close{display:inline-flex;align-items:center;justify-content:center;width:var(--tap);height:var(--tap);color:#fff;border-radius:50%}
.gal__close:focus-visible{outline-color:#fff}
.gal__stage{position:relative;min-height:0;padding:0 var(--s-4)}
.gal__stage img{object-fit:contain;border-radius:var(--r-md)}
.gal__thumbs--dark{padding:0 var(--s-4) var(--s-4)}
.gal__thumbs--dark .gal__thumb--on{border-color:#fff}
`;
