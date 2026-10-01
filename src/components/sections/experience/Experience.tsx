import { useLayoutEffect, useRef } from 'react';
import { experience } from '../../../data/experience';
import { gsap, prefersReducedMotion, useReveal } from '../../../hooks/useReveal';
import { SectionHeading } from '../../ui/SectionHeading';
import { SpotlightCard } from '../../ui/SpotlightCard';
import styles from './Experience.module.css';

export function Experience() {
  const ref = useReveal<HTMLDivElement>({ variant: 'left', stagger: 0.12 });
  const lineRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const line = lineRef.current;
    const wrap = wrapRef.current;
    if (!line || !wrap || prefersReducedMotion()) {
      if (line) line.style.transform = 'scaleY(1)';
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: wrap,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experiencia" className="section" aria-labelledby="experiencia-titulo">
      <div className="container">
        <div ref={ref}>
          <SectionHeading
            index="04"
            eyebrow="Experiência"
            title={
              <span id="experiencia-titulo">
                Evolução <em>Técnica</em>
              </span>
            }
            description="Uma progressão que ganhou escopo: mais ambientes, mais responsabilidade, mais camadas de infraestrutura sob controle."
            aside={
              <span className="mono-tag">
                {experience[0]?.year} — {experience[experience.length - 1]?.year}
              </span>
            }
          />

          <div className={styles.wrap} ref={wrapRef}>
            <span className={styles.lineTrack} aria-hidden="true">
              <span className={styles.lineFill} ref={lineRef} />
            </span>

            <ol className={styles.list}>
              {experience.map((entry) => (
                <li key={entry.id} className={styles.item} data-reveal>
                  <div className={styles.marker} aria-hidden="true">
                    <span className={styles.markerDot} />
                  </div>

                  <SpotlightCard className={styles.card}>
                    <div className={styles.cardHead}>
                      <span className={styles.year}>{entry.year}</span>
                      {entry.current ? (
                        <span className={styles.badge}>ATUAL</span>
                      ) : null}
                    </div>
                    <h3 className={`h3 ${styles.role}`}>{entry.role}</h3>
                    <span className={styles.area}>{entry.area}</span>
                    <p className={styles.summary}>{entry.summary}</p>
                    <ul className={styles.highlights}>
                      {entry.highlights.map((h) => (
                        <li key={h} className={styles.highlight}>
                          <span className={styles.bullet} aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
