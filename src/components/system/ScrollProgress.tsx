import { useEffect, useRef } from 'react';
import { gsap } from '../../hooks/useReveal';
import styles from './ScrollProgress.module.css';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      gsap.set(bar, { scaleX: Math.min(Math.max(pct, 0), 1) });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  );
}
