import { useEffect } from 'react';
import { useIsDesktopPointer, usePrefersReducedMotion } from './useMediaQuery';

interface PointerState {
  x: number;
  y: number;
  lx: number;
  ly: number;
}

export const pointer: PointerState = { x: 0, y: 0, lx: 0, ly: 0 };

const ease = 0.12;

/**
 * Escreve --mouse-x / --mouse-y no :root para a luz de fundo seguir o cursor.
 * Só é habilitado em dispositivos com ponteiro fino (desktop).
 */
export function useMouseLight() {
  const enabled = useIsDesktopPointer();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!enabled || reduced) return;

    const root = document.documentElement;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let frame = 0;
    let running = false;

    const tick = () => {
      pointer.x += (target.x - pointer.x) * ease;
      pointer.y += (target.y - pointer.y) * ease;
      pointer.lx = pointer.x;
      pointer.ly = pointer.y;
      root.style.setProperty('--mouse-x', `${pointer.x.toFixed(1)}px`);
      root.style.setProperty('--mouse-y', `${pointer.y.toFixed(1)}px`);

      if (Math.abs(target.x - pointer.x) > 0.2 || Math.abs(target.y - pointer.y) > 0.2) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      start();
    };

    const onLeave = () => {
      root.style.setProperty('--pointer-soft', '0');
    };
    const onEnter = () => {
      root.style.setProperty('--pointer-soft', '1');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerenter', onEnter);
    document.addEventListener('pointerleave', onLeave);
    root.style.setProperty('--pointer-soft', '1');

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerenter', onEnter);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, reduced]);
}
