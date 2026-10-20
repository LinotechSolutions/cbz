import React, { ElementType } from 'react';
import { RevealOptions, useReveal } from '../lib/useReveal';

interface RevealProps extends RevealOptions {
  children: React.ReactNode;
  /** Element to render. Use 'section'/'li' etc. so the markup stays meaningful. */
  as?: ElementType;
  className?: string;
  id?: string;
}

/**
 * Wraps content in a scroll-revealed element. Where adding a wrapper would
 * disturb a grid or flex layout, use the useReveal hook on the existing element
 * instead, which adds no DOM of its own.
 */
/** Convenience wrapper for revealing a whole page section. */
export const RevealSection: React.FC<Omit<RevealProps, 'as'>> = (props) => (
  <Reveal {...props} as="section" />
);

export const Reveal: React.FC<RevealProps> = ({
  children,
  as: Tag = 'div',
  className = '',
  id,
  ...options
}) => {
  const { ref, style, className: revealClass } = useReveal<HTMLElement>(options);
  return (
    <Tag ref={ref} id={id} style={style} className={`${revealClass} ${className}`.trim()}>
      {children}
    </Tag>
  );
};
