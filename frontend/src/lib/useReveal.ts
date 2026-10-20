import { CSSProperties, useEffect, useRef, useState } from 'react';

/**
 * Scroll reveal: elements fade and rise into place as they enter the viewport,
 * whether the visitor is scrolling down the page or back up it.
 *
 * Built on IntersectionObserver rather than an animation library, because the
 * whole behaviour is a class toggle and a CSS transition. Pulling in a runtime
 * for it would cost more than every lazy-loaded page chunk put together.
 *
 * Fails open in every case that matters: visitors who ask for reduced motion,
 * and browsers without IntersectionObserver, get the content immediately with
 * no animation. Content is never left hidden because an observer did not fire.
 */

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface RevealOptions {
  /** Where the element travels from. 'none' fades without moving. */
  direction?: RevealDirection;
  /** Milliseconds to wait before this element starts, for staggering a row. */
  delay?: number;
  /** Fraction of the element that must be visible before it reveals. */
  threshold?: number;
  /** Re-hide and replay when the element leaves the viewport again. */
  repeat?: boolean;
  /** Travel distance in pixels. */
  distance?: number;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const offsetFor = (direction: RevealDirection, distance: number) => {
  switch (direction) {
    case 'up':
      return { x: 0, y: distance };
    case 'down':
      return { x: 0, y: -distance };
    case 'left':
      return { x: distance, y: 0 };
    case 'right':
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

/** Must match the transition-duration of .cbz-reveal in index.css. */
const TRANSITION_MS = 700;

export function useReveal<T extends HTMLElement = HTMLDivElement>({
  direction = 'up',
  delay = 0,
  threshold = 0.12,
  repeat = false,
  distance = 18,
}: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  // Start visible, so a visitor who never triggers the observer still sees the
  // content. The hidden state is only entered once we know we can leave it.
  const [visible, setVisible] = useState(true);
  // Once the reveal has played out we drop the inline transform entirely. A
  // transform creates a containing block, which would otherwise silently break
  // any position: fixed or sticky element placed inside a revealed section.
  const [settled, setSettled] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;

    // Hide only now that an observer is guaranteed to run and reveal it again.
    setVisible(false);
    setSettled(false);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (!repeat) observer.unobserve(entry.target);
          } else if (repeat) {
            setVisible(false);
          }
        }
      },
      // The bottom inset holds the reveal until the element is properly in view
      // rather than peeking over the fold.
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [direction, delay, threshold, repeat, distance]);

  useEffect(() => {
    if (!visible || settled || repeat) return;
    const timer = window.setTimeout(() => setSettled(true), TRANSITION_MS + delay + 50);
    return () => window.clearTimeout(timer);
  }, [visible, settled, repeat, delay]);

  const { x, y } = offsetFor(direction, distance);
  const style: CSSProperties = settled
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0)' : `translate3d(${x}px, ${y}px, 0)`,
        transitionDelay: visible && delay ? `${delay}ms` : '0ms',
      };

  return { ref, visible, style, className: settled ? '' : 'cbz-reveal' };
}
