import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { Brain, Sparkles, Terminal as TerminalIcon } from 'lucide-react';
import { aiConsole, aiFlow, aiManifesto, aiPillars, aiTools } from '../../../data/ai';
import { usePrefersReducedMotion } from '../../../hooks/useMediaQuery';
import { ScrollTrigger, useReveal } from '../../../hooks/useReveal';
import { Counter } from '../../ui/Counter';
import { SectionHeading } from '../../ui/SectionHeading';
import { SpotlightCard } from '../../ui/SpotlightCard';
import styles from './AISection.module.css';

/**
 * Efeito de terminal: percorre as linhas do console caractere a caractere,
 * pisca o cursor e reinicia — imitando uma sessão real de agente.
 * Com movimento reduzido, todas as linhas aparecem prontas.
 */
function useTypewriter(lines: string[], enabled: boolean) {
  const [cursor, setCursor] = useState({ line: 0, char: 0 });

  useEffect(() => {
    if (!enabled || lines.length === 0) return;

    const current = lines[cursor.line] ?? '';

    if (cursor.char < current.length) {
      const timer = window.setTimeout(
        () => setCursor((c) => ({ ...c, char: c.char + 1 })),
        current[cursor.char] === ' ' ? 12 : 32,
      );
      return () => window.clearTimeout(timer);
    }

    const isLast = cursor.line === lines.length - 1;
    const timer = window.setTimeout(
      () => setCursor({ line: isLast ? 0 : cursor.line + 1, char: 0 }),
      isLast ? 2800 : 380,
    );
    return () => window.clearTimeout(timer);
  }, [cursor, enabled, lines]);

  return cursor;
}

/** O console só digita depois que entra na viewport — não se gasta animando o que ninguém vê. */
function useInView(target: RefObject<HTMLElement | null>, reduced: boolean) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = target.current;
    if (!el || reduced) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => setSeen(true),
    });

    return () => trigger.kill();
  }, [reduced, target]);

  return reduced || seen;
}

export function AISection() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.07, y: 28 });
  const consoleRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const lines = aiConsole.lines.map((line) => line.text);
  const inView = useInView(consoleRef, reduced);
  // só digita quando a seção entrou na viewport — nada de gastar timer no que ninguém vê
  const typed = useTypewriter(lines, !reduced && inView);

  return (
    <section id="ia" className="section" aria-labelledby="ia-titulo">
      <div className={styles.glow} aria-hidden="true" />

      <div className="container">
        <div ref={ref}>
          <SectionHeading
            index="03"
            eyebrow="Inteligência Artificial"
            title={
              <span id="ia-titulo">
                IA é o meu <em>parceiro</em> de engenharia
              </span>
            }
            description="Não é uma ferramenta que eu abro às vezes. É a camada com que eu desenho, escrevo, reviso e opero — todos os dias."
            aside={
              <span className={`mono-tag ${styles.headingAside}`}>
                <Brain size={12} strokeWidth={1.8} aria-hidden="true" /> ENTUSIASTA
              </span>
            }
          />

          {/* ---------- manifesto + console ---------- */}
          <div className={styles.manifesto}>
            <div className={styles.prose}>
              <p className={styles.lead} data-reveal>
                {aiManifesto.lead}
              </p>
              {aiManifesto.body.map((text) => (
                <p key={text.slice(0, 24)} className={styles.para} data-reveal>
                  {text}
                </p>
              ))}

              <ul className={styles.metrics} data-reveal>
                {aiManifesto.metrics.map((metric) => (
                  <li key={metric.id} className={styles.metric}>
                    <span className={styles.metricValue}>
                      {typeof metric.value === 'number' ? (
                        <Counter value={metric.value} suffix={metric.suffix} />
                      ) : (
                        metric.value
                      )}
                    </span>
                    <span className={styles.metricLabel}>{metric.label}</span>
                    <span className={styles.metricCaption}>{metric.caption}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ---------- console ---------- */}
            <div className={styles.consoleWrap} data-reveal data-cursor="text">
              <div className={styles.console} ref={consoleRef}>
                <div className={styles.consoleBar}>
                  <span className={styles.consoleDots} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className={styles.consolePath}>{aiConsole.window}</span>
                  <span className={styles.consoleBadge}>
                    <TerminalIcon size={11} strokeWidth={1.9} aria-hidden="true" />
                    AGENTE
                  </span>
                </div>

                <ol className={styles.consoleBody}>
                  {aiConsole.lines.map((line, i) => {
                    const text =
                      !inView || i < typed.line
                        ? line.text
                        : i > typed.line
                          ? ''
                          : line.text.slice(0, typed.char);

                    return (
                      <li key={line.text} className={styles.line} data-kind={line.kind}>
                        <span className={styles.gutter} aria-hidden="true">
                          {line.kind === 'prompt' ? '❯' : line.kind === 'output' ? '✓' : '·'}
                        </span>
                        <span className={styles.lineText}>
                          {text}
                          {i === typed.line && inView ? (
                            <span className={styles.caret} aria-hidden="true" />
                          ) : null}
                        </span>
                      </li>
                    );
                  })}
                </ol>

                <div className={styles.consoleFoot}>
                  <span className="mono-tag">{aiConsole.lines.length} COMANDOS</span>
                  <span className={styles.consoleLive}>
                    <span className={styles.liveDot} aria-hidden="true" />
                    IA ATIVA
                  </span>
                </div>

                <span className={styles.consoleScan} aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* ---------- fluxo ---------- */}
          <div className={styles.flow} data-reveal>
            <span className="mono-tag">FLUXO DE TRABALHO</span>
            <ol className={styles.flowList}>
              {aiFlow.map((step, i) => (
                <li
                  key={step}
                  className={styles.flowStep}
                  style={{ '--i': i } as CSSProperties}
                >
                  <span className={styles.flowNode} aria-hidden="true" />
                  <span className={styles.flowLabel}>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* ---------- pilares ---------- */}
          <ul className={styles.pillars}>
            {aiPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <li key={pillar.id}>
                  <SpotlightCard className={styles.pillar} data-reveal data-cursor="link">
                    <div className={styles.pillarTop}>
                      <span className={styles.pillarIcon} aria-hidden="true">
                        <Icon size={20} strokeWidth={1.5} />
                      </span>
                      <span className={styles.pillarCode}>{pillar.code}</span>
                    </div>
                    <h3 className={`h3 ${styles.pillarTitle}`}>{pillar.title}</h3>
                    <p className={styles.pillarDesc}>{pillar.description}</p>
                    <span className={styles.pillarGlow} aria-hidden="true" />
                  </SpotlightCard>
                </li>
              );
            })}
          </ul>

          {/* ---------- stack ---------- */}
          <div className={styles.stack} data-reveal>
            <div className={styles.stackHead}>
              <span className={styles.stackTitle}>
                <Sparkles size={13} strokeWidth={1.8} aria-hidden="true" />
                STACK DE IA
              </span>
              <span className="mono-tag">O QUE USO TODO DIA</span>
            </div>

            <ul className={styles.tools}>
              {aiTools.map((tool) => (
                <li key={tool.id} className={styles.tool}>
                  <span className={styles.toolName}>{tool.name}</span>
                  <span className={styles.toolRole}>{tool.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
