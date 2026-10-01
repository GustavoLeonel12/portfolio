import type { ElementType, ReactNode } from 'react';
import { useRef, type PointerEvent } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  [key: string]: unknown;
}

export function SpotlightCard({
  children,
  className = '',
  as: Tag = 'div',
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      className={`spot ${className}`}
      onPointerMove={onMove}
      {...rest}
    >
      {children}
    </Tag>
  );
}
