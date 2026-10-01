import { useEffect, useRef } from 'react';
import { gsap } from '../../hooks/useReveal';
import styles from './Background.module.css';

/** Quantas estrelas cadentes ficam em circulation pelo fundo. */
const SHOOTING = 4;

/**
 * Background tecnológico minimalista:
 * grade sutil, vinheta, ruído, campo de estrelas, estrelas cadentes
 * e a luz azul que segue o mouse (--mouse-x/--mouse-y).
 */
export function Background() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shootRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const nodes = Array.from(wrap.querySelectorAll<HTMLElement>('[data-drift]'));
    const ctx = gsap.context(() => {
      nodes.forEach((node, i) => {
        gsap.to(node, {
          y: i % 2 === 0 ? -22 : 26,
          x: i % 2 === 0 ? 12 : -14,
          duration: 7 + i * 1.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      /* Cada cadente recebe ângulo, distância e ritmo próprios: assim elas
         não caem em sincronia e o céu parece vivo em vez de roteirizado.
         O ponto de partida fica logo acima da borda — nascendo muito alto,
         a estrela aparecia já apagada fora da tela. */
      const W = window.innerWidth;
      const DEG = 180 / Math.PI;

      shootRefs.current.forEach((el, i) => {
        if (!el) return;
        const angle = (28 + Math.random() * 18) * (Math.PI / 180);
        const dist = 520 + Math.random() * 520;
        const dur = 1.4 + Math.random() * 0.9;
        const fromX = Math.random() * W * 0.8 - W * 0.06;
        const fromY = -26 - Math.random() * 70;

        gsap
          .timeline({
            repeat: -1,
            repeatDelay: 5 + Math.random() * 10,
            delay: i * 1.9 + Math.random() * 3,
          })
          .set(el, {
            x: fromX,
            y: fromY,
            rotation: angle * DEG,
            opacity: 0,
          })
          .to(el, { opacity: 1, duration: 0.16, ease: 'power2.in' })
          .to(
            el,
            {
              x: fromX + Math.cos(angle) * dist,
              y: fromY + Math.sin(angle) * dist,
              duration: dur,
              ease: 'power1.in',
            },
            '<0.05',
          )
          .to(el, { opacity: 0, duration: 0.45, ease: 'power2.out' }, `-=${dur * 0.5}`);
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.bg} ref={wrapRef} aria-hidden="true">
      <div className={styles.base} />
      <div className={styles.stars} />
      <div className={styles.stars2} />
      {Array.from({ length: SHOOTING }, (_, i) => (
        <span
          key={i}
          className={styles.shooting}
          ref={(el) => {
            shootRefs.current[i] = el;
          }}
        />
      ))}
      <div className={styles.mouseLight} />
      <div className={styles.mouseGlow} />
      <div className={styles.grid} />
      <div className={`${styles.shape} ${styles.shapeA}`} data-drift />
      <div className={`${styles.shape} ${styles.shapeB}`} data-drift />
      <div className={styles.topGlow} />
      <div className={styles.vignette} />
      <div className={styles.noise} />
    </div>
  );
}
