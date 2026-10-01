import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, ScrollTrigger } from '../../hooks/useReveal';

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function Counter({ value, prefix = '', suffix = '', duration = 1.8 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    const counter = { n: 0 };
    el.textContent = `${prefix}0${suffix}`;

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration,
        ease: 'power2.out',
        snap: { n: 1 },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(counter.n)}${suffix}`;
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [duration, prefix, suffix, value]);

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
}
