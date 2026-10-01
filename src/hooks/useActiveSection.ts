import { useEffect, useState } from 'react';

/** Rola suavemente até a seção, compensando a navbar fixa. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
  );
  const offset = Number.isFinite(nav) ? nav : 76;
  const top = el.getBoundingClientRect().top + window.scrollY - offset + 1;
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
}

/** Destaca o item de nav correspondente à seção visível. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: '-45% 0px -50% 0px',
        threshold: [0, 0.15, 0.4, 0.75, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
