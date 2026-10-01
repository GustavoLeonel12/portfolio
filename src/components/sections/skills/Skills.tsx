import { ArrowUpRight, Sparkles } from 'lucide-react';
import { skills } from '../../../data/skills';
import { useReveal } from '../../../hooks/useReveal';
import { SectionHeading } from '../../ui/SectionHeading';
import { SpotlightCard } from '../../ui/SpotlightCard';
import styles from './Skills.module.css';

export function Skills() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.07 });

  return (
    <section id="especialidades" className="section" aria-labelledby="especialidades-titulo">
      <div className="container">
        <div ref={ref}>
          <SectionHeading
            index="02"
            eyebrow="Especialidades"
            title={
              <span id="especialidades-titulo">
                O que eu <em>faço</em> todos os dias
              </span>
            }
            description="Cinco frentes de trabalho que se conectam: a mesma pessoa que projeta a rede também usa IA para escrever o script que a monitora."
            aside={
              <span className="mono-tag">
                {String(skills.length).padStart(2, '0')} DOMÍNIOS · IA NO TOPO
              </span>
            }
          />

          <div className={styles.grid}>
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <SpotlightCard
                  key={skill.id}
                  className={styles.card}
                  data-span={skill.span}
                  data-featured={skill.featured || undefined}
                  data-reveal
                  data-cursor="link"
                >
                  <div className={styles.cardTop}>
                    <span className={styles.iconWrap} aria-hidden="true">
                      <Icon size={22} strokeWidth={1.5} />
                    </span>
                    {skill.featured ? (
                      <span className={styles.featuredTag}>
                        <Sparkles size={11} strokeWidth={2} aria-hidden="true" />
                        PAINEL PESSOAL
                      </span>
                    ) : null}
                    <span className={styles.code}>{skill.code}</span>
                  </div>

                  <h3 className={`h3 ${styles.title}`}>{skill.title}</h3>
                  <p className={styles.desc}>{skill.description}</p>

                  <ul className={styles.keywords}>
                    {skill.keywords.map((k) => (
                      <li key={k} className={styles.keyword}>
                        {k}
                      </li>
                    ))}
                  </ul>

                  <span className={styles.arrow} aria-hidden="true">
                    <ArrowUpRight size={16} strokeWidth={1.6} />
                  </span>
                  <span className={styles.sweep} aria-hidden="true" />
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
