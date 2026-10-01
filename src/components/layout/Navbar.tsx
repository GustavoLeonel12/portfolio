import { useEffect, useState } from 'react';
import { Cpu, Menu, X } from 'lucide-react';
import { navItems, profile } from '../../data/profile';
import { scrollToSection, useActiveSection } from '../../hooks/useActiveSection';
import { gsap, prefersReducedMotion } from '../../hooks/useReveal';
import { useIsMobile } from '../../hooks/useMediaQuery';
import styles from './Navbar.module.css';

const sectionIds = navItems.map((i) => i.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuOpen = isMobile && open;

  useEffect(() => {
    if (!menuOpen) return;
    document.body.classList.add('is-locked');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `[data-menu-item]`,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.055, ease: 'power3.out' },
      );
      gsap.fromTo(
        `[data-menu-meta]`,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.15, ease: 'power3.out' },
      );
    });
    return () => ctx.revert();
  }, [menuOpen]);

  const go = (id: string) => {
    const wasOpen = menuOpen;
    setOpen(false);
    window.setTimeout(() => scrollToSection(id), wasOpen ? 320 : 0);
  };

  return (
    <>
      <header className={styles.header} data-scrolled={scrolled || undefined}>
        <nav className={styles.nav} aria-label="Navegação principal">
          <a
            href="#home"
            className={styles.brand}
            onClick={(e) => {
              e.preventDefault();
              go('home');
            }}
            aria-label={`${profile.name} — início`}
          >
            <span className={styles.brandMark} aria-hidden="true">
              <Cpu className={styles.brandIcon} size={16} strokeWidth={1.6} />
            </span>
            <span className={styles.brandName}>{profile.name}</span>
          </a>

          <ul className={styles.links}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={styles.link}
                  data-active={active === item.id || undefined}
                  onClick={() => go(item.id)}
                >
                  <span className={styles.linkIndex}>{item.index}</span>
                  <span className={styles.linkLabel}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cta}
              onClick={() => go('contato')}
              data-cursor="link"
            >
              Fale comigo
            </button>
            <button
              type="button"
              className={styles.burger}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        <div className={styles.scrollLine} aria-hidden="true" />
      </header>

      <div
        id="mobile-menu"
        className={styles.overlay}
        data-open={menuOpen || undefined}
        aria-hidden={!menuOpen}
      >
        <div className={styles.overlayInner}>
          <ul className={styles.mobileList}>
            {navItems.map((item) => (
              <li key={item.id} className={styles.mobileItem} data-menu-item>
                <span className={styles.revealLine}>
                  <button
                    type="button"
                    className={styles.mobileLink}
                    data-active={active === item.id || undefined}
                    onClick={() => go(item.id)}
                    tabIndex={menuOpen ? 0 : -1}
                  >
                    <span className={styles.mobileIndex}>{item.index}</span>
                    <span className={styles.mobileLabel}>{item.label}</span>
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <div className={styles.mobileMeta} data-menu-meta>
            <span className="mono-tag">{profile.tagline}</span>
            <button
              type="button"
              className="btn btn--sm"
              onClick={() => go('contato')}
              tabIndex={menuOpen ? 0 : -1}
            >
              Vamos conversar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
