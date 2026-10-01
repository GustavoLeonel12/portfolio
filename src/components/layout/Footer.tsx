import { profile, socials } from '../../data/profile';
import { scrollToSection } from '../../hooks/useActiveSection';
import {
  LinkedinIcon,
  MailIcon,
  WhatsappIcon,
} from '../ui/BrandIcons';
import styles from './Footer.module.css';

const ICONS = {
  linkedin: LinkedinIcon,
  email: MailIcon,
  whatsapp: WhatsappIcon,
} as const;

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.line} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <button
            type="button"
            className={styles.name}
            onClick={() => scrollToSection('home')}
            aria-label="Voltar ao início"
          >
            {profile.name}
          </button>
          <span className={styles.tagline}>Infraestrutura • Redes • Inteligência Artificial</span>
        </div>

        <ul className={styles.socials}>
          {socials.map((social) => {
            const Icon = ICONS[social.key];
            return (
              <li key={social.key}>
                <a
                  className={styles.social}
                  href={social.href}
                  target={social.key === 'email' ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={social.label}
                  data-cursor="link"
                >
                  <Icon size={15} strokeWidth={1.7} />
                </a>
              </li>
            );
          })}
        </ul>

        <p className={styles.copy}>
          © {YEAR} {profile.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
