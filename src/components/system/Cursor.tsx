import { useEffect, useRef, useState } from 'react';
import { useIsDesktopPointer, usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import styles from './Cursor.module.css';

type CursorMode = 'default' | 'link' | 'view' | 'text';

interface ModeConfig {
  size: number;
  label: string;
  ringOpacity: number;
  dotOpacity: number;
}

const MODES: Record<CursorMode, ModeConfig> = {
  default: { size: 34, label: '', ringOpacity: 0.55, dotOpacity: 1 },
  link: { size: 56, label: '', ringOpacity: 0.9, dotOpacity: 0.35 },
  view: { size: 92, label: 'VIEW', ringOpacity: 0.95, dotOpacity: 0 },
  text: { size: 18, label: '', ringOpacity: 0.4, dotOpacity: 0 },
};

export function Cursor() {
  const isFine = useIsDesktopPointer();
  const reduced = usePrefersReducedMotion();
  const active = isFine && !reduced;

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<CursorMode>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    document.body.classList.add('has-custom-cursor');

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...target };
    const dotPos = { ...target };
    let frame = 0;
    let shown = false;

    const loop = () => {
      ringPos.x += (target.x - ringPos.x) * 0.16;
      ringPos.y += (target.y - ringPos.y) * 0.16;
      dotPos.x += (target.x - dotPos.x) * 0.55;
      dotPos.y += (target.y - dotPos.y) * 0.55;

      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;

      frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!shown) {
        shown = true;
        setVisible(true);
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      const hit = el?.closest<HTMLElement>('[data-cursor]');
      const next = (hit?.dataset.cursor as CursorMode | undefined) ?? 'default';
      setMode(next);
    };

    const onDown = () => ring.setAttribute('data-down', 'true');
    const onUp = () => ring.removeAttribute('data-down');
    const onLeaveWin = () => setVisible(false);
    const onEnterWin = () => setVisible(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeaveWin);
    document.addEventListener('pointerenter', onEnterWin);

    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeaveWin);
      document.removeEventListener('pointerenter', onEnterWin);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [active]);

  if (!active) return null;

  const cfg = MODES[mode];

  return (
    <div
      className={styles.wrap}
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, pointerEvents: 'none' }}
    >
      <div
        ref={ringRef}
        className={styles.ring}
        data-mode={mode}
        style={{
          width: cfg.size,
          height: cfg.size,
          borderColor: mode === 'view' ? 'rgba(124,196,255,0.75)' : undefined,
          backgroundColor:
            mode === 'view' ? 'rgba(47,107,255,0.16)' : undefined,
          borderWidth: mode === 'view' ? '1px' : undefined,
        }}
      >
        <span ref={labelRef} className={styles.label}>
          {cfg.label}
        </span>
      </div>
      <div
        ref={dotRef}
        className={styles.dot}
        style={{ opacity: cfg.dotOpacity }}
      />
    </div>
  );
}
