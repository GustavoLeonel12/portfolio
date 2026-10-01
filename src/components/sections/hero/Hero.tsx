import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, MoveDown, Sparkles } from 'lucide-react';
import { getSocial, profile } from '../../../data/profile';
import { scrollToSection } from '../../../hooks/useActiveSection';
import { gsap, prefersReducedMotion, ScrollTrigger } from '../../../hooks/useReveal';
import { LinkedinIcon, MailIcon, WhatsappIcon } from '../../ui/BrandIcons';
import { NetworkOrb } from './NetworkOrb';
import styles from './Hero.module.css';

const SOCIAL_ICONS = {
  linkedin: LinkedinIcon,
  whatsapp: WhatsappIcon,
  email: MailIcon,
} as const;

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });

      tl.from('[data-hero-eyebrow]', { opacity: 0, y: 16, duration: 0.6 })
        .from('[data-hero-name] .reveal-line > span', {
          yPercent: 118,
          rotate: 4,
          duration: 1.05,
          stagger: 0.09,
          ease: 'expo.out',
        })
        .from('[data-hero-tagline] > span', {
          opacity: 0,
          y: 18,
          duration: 0.6,
          stagger: 0.07,
        })
        .from('[data-hero-ai]', { opacity: 0, y: 14, duration: 0.6 }, '-=0.4')
        .from('[data-hero-phrase]', { opacity: 0, y: 20, duration: 0.8 }, '-=0.35')
        .from(
          '[data-hero-actions] > *',
          { opacity: 0, y: 22, duration: 0.65, stagger: 0.09 },
          '-=0.5',
        )
        .from(
          '[data-hero-socials] > *',
          { opacity: 0, y: 14, duration: 0.5, stagger: 0.06 },
          '-=0.4',
        )
        .from('[data-hero-visual]', { opacity: 0, scale: 0.9, duration: 1.2, ease: 'expo.out' }, 0.1)
        .from('[data-hero-status]', { opacity: 0, x: -12, duration: 0.6 }, '-=0.6')
        .from('[data-hero-scroll]', { opacity: 0, y: 12, duration: 0.6 }, '-=0.5');

      // Parallax em fromTo com valores de origem fixos.
      // Com gsap.to() o valor inicial seria lido do elemento no momento da criação —
      // que ainda está em opacity 0, por causa do delay da timeline acima — e o
      // scrub devolveria o visual para invisível ao voltar ao topo da página.
      gsap.fromTo(
        '[data-hero-visual]',
        { yPercent: 0, scale: 1, opacity: 1 },
        {
          yPercent: 12,
          scale: 0.96,
          opacity: 0.35,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        '[data-hero-content]',
        { yPercent: 0, opacity: 1 },
        {
          yPercent: -14,
          opacity: 0.15,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '70% top',
            scrub: 0.6,
          },
        },
      );
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={rootRef} className={styles.hero} aria-label="Início">
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.content} data-hero-content>
          <div className={styles.eyebrowWrap} data-hero-eyebrow>
            <span className={styles.statusDot} aria-hidden="true" />
            <span className="eyebrow">{profile.availability}</span>
          </div>

          <h1 className={styles.name} data-hero-name aria-label={profile.name}>
            <span className="reveal-line">
              <span>{profile.nameFirst}</span>
            </span>
            <span className={`reveal-line ${styles.nameRest}`}>
              <span>{profile.nameLast}</span>
            </span>
          </h1>

          <p className={styles.tagline} data-hero-tagline>
            {profile.tagline.split(' • ').map((word) => (
              <span key={word} className={styles.tagWord}>
                {word}
              </span>
            ))}
          </p>

          <span className={styles.aiBadge} data-hero-ai>
            <Sparkles size={13} strokeWidth={1.8} aria-hidden="true" />
            {profile.aiBadge}
          </span>

          <p className={styles.phrase} data-hero-phrase>
            {profile.shortPhrase}
          </p>

          <div className={styles.actions} data-hero-actions>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => scrollToSection('projetos')}
              data-cursor="link"
            >
              Ver projetos
              <ArrowUpRight size={15} strokeWidth={2} />
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => scrollToSection('contato')}
              data-cursor="link"
            >
              Entre em contato
            </button>
          </div>

          <ul className={styles.socials} data-hero-socials aria-label="Redes sociais">
            {(['linkedin', 'whatsapp', 'email'] as const).map((key) => {
              const social = getSocial(key);
              const Icon = SOCIAL_ICONS[key];
              return (
                <li key={key}>
                  <a
                    className={styles.social}
                    href={social.href}
                    target={key === 'email' ? undefined : '_blank'}
                    rel="noreferrer"
                    aria-label={social.label}
                    data-cursor="link"
                  >
                    <Icon size={15} strokeWidth={1.7} />
                    <span className={styles.socialLabel}>{social.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.visual} data-hero-visual>
          <div className={styles.visualFrame} aria-hidden="true">
            <span className={styles.cornerTL} />
            <span className={styles.cornerTR} />
            <span className={styles.cornerBL} />
            <span className={styles.cornerBR} />
          </div>
          <NetworkOrb />
          <div className={styles.status} data-hero-status>
            <span className={styles.statusLabel}>SISTEMA</span>
            <span className={styles.statusValue}>OPERACIONAL</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={styles.scrollHint}
        data-hero-scroll
        onClick={() => scrollToSection('sobre')}
        aria-label="Rolar para a próxima seção"
      >
        <span className="mono-tag">scroll</span>
        <MoveDown size={16} className={styles.scrollIcon} />
      </button>
    </section>
  );
}
