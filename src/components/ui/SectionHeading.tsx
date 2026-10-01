import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  align?: 'left' | 'center';
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  aside,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <header className={styles.wrap} data-align={align}>
      <div className={styles.main}>
        <div className={styles.eyebrowRow} data-reveal>
          <span className={styles.index}>{index}</span>
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h2 className={`h2 ${styles.title}`} data-reveal>
          {title}
        </h2>
        {description ? (
          <p className={`lede ${styles.desc}`} data-reveal>
            {description}
          </p>
        ) : null}
      </div>
      {aside ? (
        <div className={styles.aside} data-reveal>
          {aside}
        </div>
      ) : null}
      <span className={styles.rule} aria-hidden="true" />
    </header>
  );
}
