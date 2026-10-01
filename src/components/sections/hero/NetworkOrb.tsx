import { useEffect, useRef, type CSSProperties } from 'react';
import { profile } from '../../../data/profile';
import { gsap, prefersReducedMotion } from '../../../hooks/useReveal';
import styles from './NetworkOrb.module.css';

const CENTER = { x: 300, y: 300 };

/** Estrelas cadentes dentro do núcleo (disco r=86). */
const CORE_SHOOTING = 2;

interface Orbit {
  a: number;
  b: number;
  deg: number;
  /** sentido do fluxo de dados: 1 = horário, -1 = anti-horário */
  dir: 1 | -1;
}

/** Três órbitas elípticas com inclinações diferentes — o desenho do átomo. */
const ORBITS: Orbit[] = [
  { a: 238, b: 104, deg: 0, dir: 1 },
  { a: 238, b: 104, deg: 58, dir: -1 },
  { a: 238, b: 104, deg: -58, dir: 1 },
];

interface NodeDef {
  id: string;
  label: string;
  /** índice da órbita e parâmetro (em graus) — garante que o nó caia sobre ela */
  o: number;
  t: number;
}

/** Dois nós em cada órbita, distribuídos em ângulos regulares. */
const NODE_DEFS: NodeDef[] = [
  { id: 'ia', label: 'IA', o: 1, t: 150 },
  { id: 'srv', label: 'SRV', o: 2, t: -45 },
  { id: 'fw', label: 'FW', o: 0, t: -50 },
  { id: 'vlan', label: 'VLAN', o: 1, t: -40 },
  { id: 'rout', label: 'ROUT', o: 2, t: 135 },
  { id: 'sw', label: 'SW', o: 0, t: 130 },
];

/** Malha de interligação entre os nós (além das órbitas e dos raios ao núcleo). */
const MESH: [string, string][] = [
  ['ia', 'srv'],
  ['ia', 'sw'],
  ['srv', 'fw'],
  ['srv', 'rout'],
  ['fw', 'vlan'],
  ['vlan', 'rout'],
  ['rout', 'sw'],
];

/** Ponto sobre a elipse, já com a rotação da órbita aplicada. */
function pointOn(orbit: Orbit, tDeg: number) {
  const t = (tDeg * Math.PI) / 180;
  const r = (orbit.deg * Math.PI) / 180;
  return {
    x: CENTER.x + orbit.a * Math.cos(t) * Math.cos(r) - orbit.b * Math.sin(t) * Math.sin(r),
    y: CENTER.y + orbit.a * Math.cos(t) * Math.sin(r) + orbit.b * Math.sin(t) * Math.cos(r),
  };
}

const NODES = NODE_DEFS.map((def, i) => ({
  ...def,
  ...pointOn(ORBITS[def.o], def.t),
  index: i,
}));

const nodeById = (id: string) => NODES.find((n) => n.id === id)!;

/** Perímetro aproximado da elipse (Ramanujan) — usado no tracejado do fluxo. */
function perimeter(a: number, b: number) {
  return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
}

export function NetworkOrb() {
  const rootRef = useRef<HTMLDivElement>(null);
  const coreShootRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // apenas o anel de fundo gira: as órbitas têm animação própria em CSS
      gsap.to('[data-spin]', {
        rotation: 360,
        duration: 44,
        repeat: -1,
        ease: 'none',
        svgOrigin: '300 300',
      });
      gsap.to('[data-pulse]', {
        scale: 1.9,
        opacity: 0,
        duration: 2.6,
        repeat: -1,
        ease: 'power2.out',
        transformOrigin: '50% 50%',
        stagger: { each: 0.6, from: 'random' },
      });
      gsap.to('[data-blink]', {
        opacity: 0.15,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: { each: 0.35, from: 'start' },
      });

      /* Cadentes do núcleo. A cauda é desenhada sobre o eixo +y local e o
         grupo gira (origin 0,0) para alinhar com a direção do movimento —
         assim a cabeça fica sempre na frente. O clipPath no disco faz
         elas sumirem pela borda em vez de aparecer do nada. */
      coreShootRefs.current.forEach((el, i) => {
        if (!el) return;
        const ang = 26 + Math.random() * 20; // graus, da esquerda p/ a direita
        const rad = (ang * Math.PI) / 180;
        const dist = 135 + Math.random() * 75;
        const from = -80 - Math.random() * 14; // nasce na borda, um pouco fora
        const cx = 300 + Math.cos(rad) * from;
        const cy = 300 + Math.sin(rad) * from;

        gsap
          .timeline({
            repeat: -1,
            repeatDelay: 3.4 + Math.random() * 4.5,
            delay: i * 2.2 + Math.random() * 2,
          })
          .set(el, { x: cx, y: cy, rotation: ang - 90, opacity: 0, transformOrigin: '0px 0px' })
          .to(el, { opacity: 1, duration: 0.14, ease: 'power2.in' })
          .to(
            el,
            {
              x: cx + Math.cos(rad) * dist,
              y: cy + Math.sin(rad) * dist,
              duration: 1.05 + Math.random() * 0.35,
              ease: 'power1.in',
            },
            '<0.04',
          )
          .to(el, { opacity: 0, duration: 0.34, ease: 'power2.out' }, '-=0.28');
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.wrap} ref={rootRef}>
      <svg
        className={styles.svg}
        viewBox="0 0 600 600"
        role="img"
        aria-label="Átomo de infraestrutura: núcleo INFRA CORE com seis elementos em órbita — IA, FW, VLAN, SW, SRV e ROUT — interligados"
      >
        <defs>
          {/* grade do fundo: fina + estrutural, esmaecendo nas bordas */}
          <pattern id="orb-grid-fine" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M12 0H0V12" fill="none" stroke="rgba(124,196,255,0.035)" strokeWidth="1" />
          </pattern>

          <pattern id="orb-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0H0V60" fill="none" stroke="rgba(124,196,255,0.075)" strokeWidth="1" />
          </pattern>

          <radialGradient id="orb-fade">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="60%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>

          <mask id="orb-bg-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
            <circle cx="300" cy="300" r="290" fill="url(#orb-fade)" />
          </mask>

          <radialGradient id="orb-vignette" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#04060a" stopOpacity="0" />
            <stop offset="56%" stopColor="#04060a" stopOpacity="0" />
            <stop offset="86%" stopColor="#04060a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#04060a" stopOpacity="0.88" />
          </radialGradient>

          {/* céu do núcleo: recortado no disco, mesmo truque do background do site */}
          <clipPath id="orb-core-clip">
            <circle cx="300" cy="300" r="83" />
          </clipPath>

          <pattern id="orb-core-stars" width="46" height="46" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="11" r="1.1" fill="rgba(255,255,255,0.45)" />
            <circle cx="31" cy="6" r="0.8" fill="rgba(190,220,255,0.4)" />
            <circle cx="20" cy="30" r="1.3" fill="rgba(214,234,255,0.45)" />
            <circle cx="40" cy="36" r="0.7" fill="rgba(255,255,255,0.3)" />
          </pattern>

          <pattern id="orb-core-stars2" width="79" height="79" patternUnits="userSpaceOnUse">
            <circle cx="18" cy="24" r="1.7" fill="rgba(255,255,255,0.55)" />
            <circle cx="58" cy="48" r="1.3" fill="rgba(160,200,255,0.45)" />
          </pattern>

          <radialGradient id="orb-core" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#2f6bff" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#0f2a6b" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0f2a6b" stopOpacity="0" />
          </radialGradient>

          {/* halo dos nós, feito com gradiente radial em vez de filtro SVG */}
          <radialGradient id="orb-node-halo">
            <stop offset="0%" stopColor="#4d8bff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#2f6bff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#2f6bff" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="orb-node-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7cc4ff" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#2f6bff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7cc4ff" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="orb-core-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7cc4ff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#2f6bff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7cc4ff" stopOpacity="0.9" />
          </linearGradient>

          {/* órbitas: gradiente no sentido do diâmetro, para dar profundidade */}
          <linearGradient id="orb-track" gradientUnits="userSpaceOnUse" x1="62" y1="0" x2="538" y2="0">
            <stop offset="0%" stopColor="#2f6bff" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#7cc4ff" stopOpacity="0.55" />
            <stop offset="65%" stopColor="#4d8bff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2f6bff" stopOpacity="0.6" />
          </linearGradient>

          {NODES.map((n) => (
            <linearGradient
              key={`mesh-${n.id}`}
              id={`orb-mesh-${n.id}`}
              gradientUnits="userSpaceOnUse"
              x1={CENTER.x}
              y1={CENTER.y}
              x2={n.x}
              y2={n.y}
            >
              <stop offset="0%" stopColor="#9ad4ff" stopOpacity="0.75" />
              <stop offset="35%" stopColor="#2f6bff" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#7cc4ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#9ad4ff" stopOpacity="0.7" />
            </linearGradient>
          ))}
        </defs>

        <circle cx="300" cy="300" r="290" fill="url(#orb-core)" />

        {/* ---------- fundo ---------- */}
        <g mask="url(#orb-bg-mask)">
          <circle cx="300" cy="300" r="290" fill="url(#orb-grid-fine)" />
          <circle cx="300" cy="300" r="290" fill="url(#orb-grid)" />
        </g>

        {/* eixos e guias: leitura de esquema técnico */}
        <g className={styles.guide}>
          <line x1="10" y1="300" x2="590" y2="300" />
          <line x1="300" y1="10" x2="300" y2="590" />
          <circle cx="300" cy="300" r="216" fill="none" />
          <circle cx="300" cy="300" r="150" fill="none" />
        </g>

        <circle cx="300" cy="300" r="290" fill="url(#orb-vignette)" />

        {/* colchetes de moldura */}
        <g className={styles.bracket}>
          {(['tl', 'tr', 'bl', 'br'] as const).map((c) => {
            const x = c[1] === 'l' ? 16 : 584;
            const y = c[0] === 't' ? 16 : 584;
            const sx = c[1] === 'l' ? 1 : -1;
            const sy = c[0] === 't' ? 1 : -1;
            return (
              <path
                key={c}
                d={`M ${x} ${y + 30 * sy} L ${x} ${y} L ${x + 30 * sx} ${y}`}
              />
            );
          })}
        </g>

        {/* anéis de fundo, discretos, que já existiam */}
        <g data-spin className={styles.spin} opacity="0.5">
          <circle cx="300" cy="300" r="278" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 12" />
          <circle
            cx="300"
            cy="300"
            r="278"
            fill="none"
            stroke="rgba(124,196,255,0.24)"
            strokeWidth="1"
            strokeDasharray="90 1657"
            strokeLinecap="round"
          />
        </g>

        {/* ---------- órbitas ---------- */}
        {ORBITS.map((orbit, i) => {
          const { a, b } = orbit;
          const half = `M ${CENTER.x - a},${CENTER.y} A ${a},${b} 0 0 1 ${CENTER.x + a},${CENTER.y}`;
          const halfNear = `M ${CENTER.x + a},${CENTER.y} A ${a},${b} 0 0 1 ${CENTER.x - a},${CENTER.y}`;

          return (
            <g
              key={`orbit-${i}`}
              className={styles.orbit}
              style={{ '--dir': orbit.dir } as CSSProperties}
              transform={`rotate(${orbit.deg} ${CENTER.x} ${CENTER.y})`}
            >
              {/* metade distante: mais apagada, dá a sensação de profundidade */}
              <path className={styles.orbitFar} d={half} />
              {/* metade próxima: mais luminosa, passa "à frente" */}
              <path className={styles.orbitNear} d={halfNear} />
              <path className={styles.orbitFarGlow} d={half} />
              <path className={styles.orbitNearGlow} d={halfNear} />
            </g>
          );
        })}

        {/* pontos de dados percorrendo as órbitas */}
        {ORBITS.map((orbit, i) => (
          <g
            key={`flow-${i}`}
            className={styles.flow}
            style={{ '--dir': orbit.dir } as CSSProperties}
            transform={`rotate(${orbit.deg} ${CENTER.x} ${CENTER.y})`}
          >
            <ellipse
              className={styles.flowGlow}
              cx={CENTER.x}
              cy={CENTER.y}
              rx={orbit.a}
              ry={orbit.b}
              strokeDasharray={`3 ${Math.round(perimeter(orbit.a, orbit.b) / 11)}`}
            />
            <ellipse
              className={styles.flowDot}
              cx={CENTER.x}
              cy={CENTER.y}
              rx={orbit.a}
              ry={orbit.b}
              strokeDasharray={`3 ${Math.round(perimeter(orbit.a, orbit.b) / 11)}`}
            />
          </g>
        ))}

        {/* raios sutis: cada no tem alguma relação visual com o núcleo */}
        {NODES.map((n) => (
          <line
            key={`spoke-${n.id}`}
            className={styles.spoke}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={n.x}
            y2={n.y}
          />
        ))}

        {/* malha entre os nós: o "tráfego" da topologia */}
        {MESH.map(([from, to]) => {
          const a = nodeById(from);
          const b = nodeById(to);
          return (
            <g key={`mesh-${from}-${to}`} className={styles.mesh}>
              <line className={styles.meshGlow} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
              <line
                className={styles.meshLine}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={`url(#orb-mesh-${b.id})`}
              />
              <line
                className={styles.meshPulse}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                strokeDasharray="10 240"
              />
            </g>
          );
        })}

        {/* ---------- nós ---------- */}
        {NODES.map((n) => (
          <g key={`node-${n.id}`} className={styles.node} style={{ '--i': n.index } as CSSProperties}>
            <circle className={styles.nodeHalo} cx={n.x} cy={n.y} r="44" fill="url(#orb-node-halo)" />
            <circle
              cx={n.x}
              cy={n.y}
              r="23"
              fill="rgba(4,6,10,0.94)"
              stroke="url(#orb-node-ring)"
              strokeWidth="1.5"
            />
            <circle cx={n.x} cy={n.y} r="9" fill="none" stroke="rgba(124,196,255,0.55)" data-pulse />
            <circle cx={n.x} cy={n.y} r="4" fill="#7cc4ff" data-blink />
            {/* cópia borrada da sigla: só a opacidade anima, o filtro é
                rasterizado uma vez — é o que faz a sigla "acender" */}
            <text
              className={`${styles.nodeLabel} ${styles.nodeLabelGlow}`}
              x={n.x}
              y={n.y + 43}
              textAnchor="middle"
            >
              {n.label}
            </text>
            <text className={styles.nodeLabel} x={n.x} y={n.y + 43} textAnchor="middle">
              {n.label}
            </text>
          </g>
        ))}

        {/* ---------- núcleo ---------- */}
        <g>
          <circle className={styles.coreHalo} cx="300" cy="300" r="112" fill="url(#orb-node-halo)" />
          <circle cx="300" cy="300" r="86" fill="rgba(6,10,18,0.94)" stroke="rgba(124,196,255,0.4)" />
          <circle
            className={styles.coreRing}
            cx="300"
            cy="300"
            r="86"
            fill="none"
            stroke="url(#orb-core-ring)"
            strokeWidth="2"
          />
          <circle
            cx="300"
            cy="300"
            r="86"
            fill="none"
            stroke="rgba(47,107,255,0.5)"
            strokeWidth="1.5"
            strokeDasharray="14 10"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 300 300"
              to="360 300 300"
              dur="18s"
              repeatCount="indefinite"
            />
          </circle>
          {/* ---------- céu do núcleo ---------- */}
          <g clipPath="url(#orb-core-clip)">
            <circle
              cx="300"
              cy="300"
              r="83"
              fill="url(#orb-core-stars)"
              className={styles.coreStars}
            />
            <circle
              cx="300"
              cy="300"
              r="83"
              fill="url(#orb-core-stars2)"
              className={styles.coreStars2}
            />

            {/* cadentes: cauda + cabeça, giradas e Transladas pelo GSAP */}
            {Array.from({ length: CORE_SHOOTING }, (_, i) => (
              <g
                key={`core-shoot-${i}`}
                className={styles.coreShooting}
                ref={(el) => {
                  coreShootRefs.current[i] = el;
                }}
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="30"
                  stroke="rgba(124,196,255,0.4)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <line
                  x1="0"
                  y1="10"
                  x2="0"
                  y2="30"
                  stroke="rgba(207,233,255,0.85)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="0" cy="30" r="2" fill="#fff" />
              </g>
            ))}
          </g>

          {/* dx = metade do letter-spacing: sem ele o texto sai deslocado à esquerda */}
          <text
            x={CENTER.x}
            y={304}
            dx={3.2}
            textAnchor="middle"
            className={styles.coreLabel}
          >
            {profile.initials}
          </text>
          <text
            x={CENTER.x}
            y={329}
            dx={1.95}
            textAnchor="middle"
            className={styles.coreSub}
          >
            INFRA CORE
          </text>
        </g>
      </svg>

      <div className={styles.readout} aria-hidden="true">
        <span className={styles.readoutLine} />
        <span>NODES 06</span>
        <span className={styles.readoutDot} />
        <span>ONLINE</span>
      </div>
    </div>
  );
}
