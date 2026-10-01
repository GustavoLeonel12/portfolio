import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'power3.out', duration: 0.9 });

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export interface RevealOptions {
  /** duração da animação */
  duration?: number;
  /** distância inicial */
  y?: number;
  /** atraso entre itens do mesmo grupo */
  stagger?: number;
  /** gatilho */
  start?: string;
  variant?: 'up' | 'left' | 'scale' | 'fade' | 'clip';
  /** revela os filhos com [data-reveal] em vez do próprio elemento */
  children?: boolean;
  once?: boolean;
}

const fromVars = (variant: NonNullable<RevealOptions['variant']>, y: number) => {
  switch (variant) {
    case 'left':
      return { opacity: 0, x: -y, y: 0 };
    case 'scale':
      return { opacity: 0, scale: 0.94, y: 0 };
    case 'fade':
      return { opacity: 0, y: 0 };
    case 'clip':
      return { opacity: 0, y: 0, clipPath: 'inset(0 0 100% 0)' };
    default:
      return { opacity: 0, y, x: 0, clipPath: 'inset(0 0 0 0)' };
  }
};

const toVars = (variant: NonNullable<RevealOptions['variant']>) => {
  switch (variant) {
    case 'clip':
      return { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' };
    default:
      return { opacity: 1, x: 0, y: 0, scale: 1 };
  }
};

/**
 * Revela o elemento — ou cada filho com [data-reveal] — quando entra na viewport.
 * Elementos que entram juntos são agrupados em fila, criando a sensação de cascata.
 *
 * O ref precisa envolver TODOS os [data-reveal] da seção: elementos com o atributo
 * fora do escopo do ref ficariam com opacity 0 do CSS sem nenhum trigger.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {},
) {
  const {
    duration = 0.9,
    y = 34,
    stagger = 0.08,
    start = 'top 86%',
    variant = 'up',
    children = true,
    once = true,
  } = options;

  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = children
      ? Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
      : [el];

    if (import.meta.env.DEV && children) {
      const scope = el.closest('section') ?? el;
      const orphans = Array.from(
        scope.querySelectorAll<HTMLElement>('[data-reveal]'),
      ).filter((node) => !targets.includes(node));
      if (orphans.length > 0) {
        console.warn(
          `[useReveal] ${orphans.length} elemento(s) com [data-reveal] estão fora do escopo do ref e ficarão invisíveis:`,
          orphans,
        );
      }
    }

    if (targets.length === 0) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        clearProps: 'all',
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, fromVars(variant, y));

      // fila própria: garante que tudo o que entra na viewport seja revelado,
      // mesmo quando vários elementos entram no mesmo quadro
      let queue: HTMLElement[] = [];
      let busy = false;

      const play = (batch: HTMLElement[]) => {
        gsap.to(batch, {
          ...toVars(variant),
          duration,
          stagger,
          ease: 'power3.out',
          overwrite: true,
        });
      };

      const flush = () => {
        if (queue.length === 0) {
          busy = false;
          return;
        }
        const batch = queue;
        queue = [];
        play(batch);
        gsap.delayedCall(duration + stagger * batch.length, flush);
      };

      const enqueue = (batch: HTMLElement[]) => {
        queue.push(...batch);
        if (busy) return;
        busy = true;
        flush();
      };

      const inView = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      };

      targets.forEach((target) => {
        ScrollTrigger.create({
          trigger: target,
          start,
          once,
          onEnter: () => enqueue([target]),
          onRefresh: () => {
            if (inView(target)) enqueue([target]);
          },
        });
      });

      requestAnimationFrame(() => {
        for (const target of targets) {
          if (inView(target)) enqueue([target]);
        }
      });
    }, el);

    return () => ctx.revert();
  }, [children, duration, once, stagger, start, variant, y]);

  return ref;
}

export { gsap, ScrollTrigger };
