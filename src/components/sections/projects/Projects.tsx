import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '../../../data/projects';
import { gsap, prefersReducedMotion, useReveal } from '../../../hooks/useReveal';
import { SectionHeading } from '../../ui/SectionHeading';
import styles from './Projects.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

export function Projects() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const stageRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const indexRef = useRef(0);
  const len = projects.length;
  const headingRef = useReveal<HTMLDivElement>();

  const go = useCallback(
    (target: number) => {
      const current = indexRef.current;
      const nextIndex = (target + len) % len;
      setDirection(nextIndex > current || (current === len - 1 && nextIndex === 0) ? 1 : -1);
      // atualizar o ref junto com o state: sem isso, cliques seguidos no mesmo
      // tick leem o index antigo e todos caem no mesmo destino
      indexRef.current = nextIndex;
      setIndex(nextIndex);
    },
    [len],
  );

  const next = useCallback(() => go(indexRef.current + 1), [go]);
  const prev = useCallback(() => go(indexRef.current - 1), [go]);

  // contexto criado uma unica vez: reverter a cada troca de index fazia a camada
  // que estava saindo voltar a opacity 1 e as imagens acumularem scale 1.14
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const layers = layerRefs.current.filter((l): l is HTMLDivElement => Boolean(l));
    const text = textRef.current;
    const animated = text ? text.querySelectorAll('[data-p-anim]') : [];

    if (prefersReducedMotion()) {
      const apply = () => {
        const current = indexRef.current;
        layers.forEach((layer, i) => {
          gsap.set(layer, {
            opacity: i === current ? 1 : 0,
            scale: 1,
            zIndex: i === current ? 2 : 'auto',
          });
        });
        if (animated.length) gsap.set(animated, { opacity: 1, y: 0 });
        gsap.set(counterRef.current, { opacity: 1, yPercent: 0 });
      };
      apply();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(layers, { opacity: 0, zIndex: 'auto' });
      gsap.set(layers[0], { opacity: 1, zIndex: 2 });
      if (animated.length) gsap.set(animated, { opacity: 1, y: 0 });

      gsap.fromTo(
        layers[0],
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'expo.out' },
      );
      if (animated.length) {
        gsap.fromTo(
          animated,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, delay: 0.25, ease: 'power3.out' },
        );
      }
    }, stage);
    ctxRef.current = ctx;

    return () => {
      ctx.revert();
      ctxRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx || prefersReducedMotion()) return;

    const layer = layerRefs.current[index];
    const text = textRef.current;
    const counter = counterRef.current;
    if (!layer || !text) return;

    ctx.add(() => {
      const layers = layerRefs.current.filter((l): l is HTMLDivElement => Boolean(l));
      const animated = text.querySelectorAll('[data-p-anim]');

      // matar as transicoes em andamento evita tweens orfaos: sem isso a camada
      // que saia voltava a aparecer no meio de um clique seguinte
      gsap.killTweensOf(layers);
      if (animated.length) gsap.killTweensOf(animated);
      gsap.killTweensOf(counter);

      layers.forEach((other, i) => {
        if (i === index) return;
        gsap.set(other, { zIndex: 'auto' });
        gsap.to(other, { opacity: 0, scale: 1.04, duration: 0.45, ease: 'power2.inOut' });
      });

      gsap.set(layer, { zIndex: 2 });
      gsap.fromTo(
        layer,
        { opacity: 0, scale: 1.08, xPercent: direction * 3 },
        { opacity: 1, scale: 1, xPercent: 0, duration: 0.95, ease: 'expo.out' },
      );

      if (animated.length) {
        gsap.fromTo(
          animated,
          { opacity: 0, y: 26 * direction },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.055, ease: 'power3.out' },
        );
      }

      const image = layer.querySelector('[data-p-img]');
      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.14 },
          { scale: 1.02, duration: 1.4, ease: 'expo.out' },
        );
      }

      if (counter) {
        gsap.fromTo(
          counter,
          { yPercent: direction * 60, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
        );
      }
    });
  }, [direction, index]);

  // parallax da imagem + barra de progresso
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || prefersReducedMotion()) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const xTo = gsap.quickTo('[data-p-img]', 'xPercent', { duration: 0.8, ease: 'power3' });
    const yTo = gsap.quickTo('[data-p-img]', 'yPercent', { duration: 0.8, ease: 'power3' });

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      xTo(px * 2.4);
      yTo(py * 2.4);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    return () => {
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (!el || !stageRef.current?.contains(el)) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const current = projects[index];

  return (
    <section id="projetos" className="section" aria-labelledby="projetos-titulo">
      <div className="container">
        <div ref={headingRef}>
          <SectionHeading
            index="05"
            eyebrow="Projetos"
            title={
              <span id="projetos-titulo">
                Sistemas que <em>operam</em> de verdade
              </span>
            }
            description="Cada projeto nasceu de um problema concreto: chamado que se perde, acesso sem controle, processo que depende de pessoa."
            aside={<span className="mono-tag">USE AS SETAS ← →</span>}
          />
        </div>

        <div className={styles.showcase}>
          <div
            className={styles.stage}
            ref={stageRef}
            tabIndex={0}
            role="group"
            aria-roledescription="carrossel"
            aria-label={`Projeto ${index + 1} de ${len}: ${current.name}`}
            data-cursor="view"
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                ref={(el) => {
                  layerRefs.current[i] = el;
                }}
                className={styles.layer}
                data-active={i === index || undefined}
                aria-hidden={i !== index}
              >
                <img
                  src={project.image}
                  alt={i === index ? project.imageAlt : ''}
                  width={1600}
                  height={1000}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  data-p-img
                  draggable={false}
                />
              </div>
            ))}

            <div className={styles.overlay} aria-hidden="true" />
            <span className={styles.frame} aria-hidden="true" />

            <div className={styles.stageMeta}>
              <span className={styles.metaTag}>{current.tagline}</span>
              <span className={styles.metaYear}>{current.year}</span>
            </div>

            <span className={styles.viewTag} aria-hidden="true">
              VIEW
            </span>
          </div>

          <div className={styles.info}>
            <div className={styles.counter} aria-hidden="true">
              <span ref={counterRef} className={styles.counterCurrent}>
                {pad(index + 1)}
              </span>
              <span className={styles.counterSep}>/</span>
              <span className={styles.counterTotal}>{pad(len)}</span>
              <span className={styles.counterBar}>
                <span
                  className={styles.counterBarFill}
                  style={{ transform: `scaleX(${(index + 1) / len})` }}
                />
              </span>
            </div>

            <div className={styles.text} ref={textRef}>
              <h3 className={styles.name} data-p-anim>
                {current.name}
              </h3>
              <p className={styles.desc} data-p-anim>
                {current.description}
              </p>

              <ul className={styles.tech} data-p-anim>
                {current.tech.map((t) => (
                  <li key={t} className={styles.techItem}>
                    {t}
                  </li>
                ))}
              </ul>

              <dl className={styles.details} data-p-anim>
                <div>
                  <dt className="mono-tag">PAPEL</dt>
                  <dd>{current.role}</dd>
                </div>
                <div>
                  <dt className="mono-tag">PERÍODO</dt>
                  <dd>{current.year}</dd>
                </div>
              </dl>
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.ctrl}
                onClick={prev}
                aria-label="Projeto anterior"
                data-cursor="link"
              >
                <ArrowLeft size={17} strokeWidth={1.7} />
              </button>
              <button
                type="button"
                className={styles.ctrl}
                onClick={next}
                aria-label="Próximo projeto"
                data-cursor="link"
              >
                <ArrowRight size={17} strokeWidth={1.7} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.rail}>
          {projects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              className={styles.railItem}
              data-active={i === index || undefined}
              onClick={() => go(i)}
              aria-label={`Ver ${project.name}`}
              aria-current={i === index}
              data-cursor="link"
            >
              <span className={styles.railIndex}>{project.index}</span>
              <span className={styles.railThumb}>
                <img
                  src={project.image}
                  alt=""
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className={styles.railName}>{project.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
