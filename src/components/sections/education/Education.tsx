import { ArrowUpRight, Award, BookOpen, GraduationCap } from 'lucide-react';
import { education } from '../../../data/education';
import { useReveal } from '../../../hooks/useReveal';
import { SectionHeading } from '../../ui/SectionHeading';
import { SpotlightCard } from '../../ui/SpotlightCard';
import styles from './Education.module.css';

const KIND_ICON = {
  Formação: GraduationCap,
  Certificação: Award,
  Curso: BookOpen,
} as const;

const STATUS_LABEL = {
  concluído: 'Concluído',
  'em andamento': 'Em andamento',
  previsto: 'Previsto',
} as const;

export function Education() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.06 });

  return (
    <section id="formacao" className="section" aria-labelledby="formacao-titulo">
      <div className="container">
        <div ref={ref}>
          <SectionHeading
            index="06"
            eyebrow="Formação & Certificações"
            title={
              <span id="formacao-titulo">
                Base técnica <em>sólida</em>
              </span>
            }
            description="Formação e certificações que sustentam cada decisão técnica — de redes a segurança."
            aside={
              <span className="mono-tag">
                {String(education.length).padStart(2, '0')} REGISTROS
              </span>
            }
          />

          <ul className={styles.grid}>
            {education.map((item) => {
              const Icon = KIND_ICON[item.kind];
              return (
                <SpotlightCard
                  key={item.id}
                  as="li"
                  className={styles.card}
                  data-reveal
                  data-cursor="link"
                >
                  <div className={styles.head}>
                    <span className={styles.icon} aria-hidden="true">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <span className={styles.kind}>{item.kind}</span>
                    <span className={styles.year}>{item.year}</span>
                  </div>

                  <h3 className={`h3 ${styles.course}`}>{item.course}</h3>
                  <p className={styles.area}>{item.area}</p>

                  <div className={styles.foot}>
                    <span className={styles.status} data-status={item.status}>
                      <span className={styles.statusDot} aria-hidden="true" />
                      {STATUS_LABEL[item.status]}
                    </span>
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.6}
                      className={styles.arrow}
                      aria-hidden="true"
                    />
                  </div>
                </SpotlightCard>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
