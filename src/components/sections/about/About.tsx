import { Check } from 'lucide-react';
import portrait from '../../../assets/images/gustavo-leonel.jpg';
import { profile } from '../../../data/profile';
import { stats } from '../../../data/stats';
import { useReveal } from '../../../hooks/useReveal';
import { Counter } from '../../ui/Counter';
import { SectionHeading } from '../../ui/SectionHeading';
import { SignatureLogo } from '../../ui/SignatureLogo';
import { SpotlightCard } from '../../ui/SpotlightCard';
import styles from './About.module.css';

export function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="sobre" className="section" aria-labelledby="sobre-titulo">
      <div className="container">
        <div ref={ref}>
          <SectionHeading
            index="01"
            eyebrow="Sobre mim"
            title={
              <span id="sobre-titulo">
                Infraestrutura é <em>fundação</em>.
                <br />
                Sem ela, nada escala.
              </span>
            }
            description={profile.about.lead}
          />

          <div className={styles.layout}>
            <div className={styles.left}>
              <div className={styles.prose}>
                {profile.about.body.map((text) => (
                  <p key={text.slice(0, 24)} data-reveal>
                    {text}
                  </p>
                ))}
              </div>

              <ul className={styles.highlights}>
                {profile.about.highlights.map((item) => (
                  <li key={item} data-reveal>
                    <span className={styles.chip}>
                      <Check size={13} strokeWidth={2.4} aria-hidden="true" />
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.right}>
              <SpotlightCard className={styles.portraitCard} as="figure" data-reveal>
                <div className={styles.portraitFrame}>
                  <img
                    src={portrait}
                    alt="Retrato de Gustavo Leonel"
                    width={1254}
                    height={1254}
                    loading="lazy"
                    decoding="async"
                    data-cursor="text"
                  />
                  <span className={styles.portraitScan} aria-hidden="true" />
                </div>
                <figcaption className={styles.portraitCaption}>
                  <span className="mono-tag">PERFIL · 01</span>
                  <SignatureLogo className={styles.portraitSignature} />
                </figcaption>
              </SpotlightCard>
            </div>
          </div>

          <div className={styles.stats}>
            {stats.map((stat) => (
              <SpotlightCard
                key={stat.id}
                className={styles.stat}
                data-reveal
              >
                <span className={styles.statIndex} aria-hidden="true">
                  {String(stats.indexOf(stat) + 1).padStart(2, '0')}
                </span>
                <span className={styles.statValue}>
                  {typeof stat.value === 'number' ? (
                    <Counter value={stat.value} suffix={stat.suffix} />
                  ) : (
                    stat.value
                  )}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statCaption}>{stat.caption}</span>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
