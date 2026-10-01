const fs = require('node:fs');
const path = require('node:path');

const out = path.join(__dirname, '..', 'src', 'assets', 'images');
fs.mkdirSync(out, { recursive: true });

const defs = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1018"/>
      <stop offset="55%" stop-color="#070c14"/>
      <stop offset="100%" stop-color="#04070c"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f2a6b"/>
      <stop offset="50%" stop-color="#2f6bff"/>
      <stop offset="100%" stop-color="#7cc4ff"/>
    </linearGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7cc4ff" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#7cc4ff" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0v48" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="1"/>
    </pattern>
    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="rgba(124,196,255,0.16)"/>
    </pattern>
  </defs>`;

const frame = `
  <rect width="1600" height="1000" fill="url(#bg)"/>
  <rect width="1600" height="1000" fill="url(#grid)"/>
  <rect width="1600" height="1000" fill="url(#dots)"/>
  <circle cx="1180" cy="300" r="420" fill="rgba(47,107,255,0.10)"/>
  <circle cx="320" cy="820" r="360" fill="rgba(47,107,255,0.06)"/>`;

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const label = (x, y, w, t, s = 15, op = 0.5) =>
  `<text x="${x}" y="${y}" font-family="'JetBrains Mono',monospace" font-size="${s}" letter-spacing="${(s * 0.14).toFixed(2)}" fill="#7cc4ff" fill-opacity="${op}">${esc(t)}</text>`;

const window = (x, y, w, h, inner) => `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)"/>
    <rect x="${x}" y="${y}" width="${w}" height="42" rx="14" fill="rgba(255,255,255,0.035)"/>
    <rect x="${x}" y="${y + 28}" width="${w}" height="14" fill="rgba(255,255,255,0.035)"/>
    <line x1="${x}" y1="${y + 42}" x2="${x + w}" y2="${y + 42}" stroke="rgba(255,255,255,0.08)"/>
    <circle cx="${x + 26}" cy="${y + 21}" r="5" fill="#ff5f57" fill-opacity="0.65"/>
    <circle cx="${x + 46}" cy="${y + 21}" r="5" fill="#febc2e" fill-opacity="0.65"/>
    <circle cx="${x + 66}" cy="${y + 21}" r="5" fill="#28c840" fill-opacity="0.65"/>
    ${inner}
  </g>`;

/* ---------------- HELP DESK ---------------- */
const helpdesk = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
${defs}
${frame}
${label(120, 132, 0, 'LUFT HELPDESK', 18, 0.75)}
${label(120, 164, 0, 'SERVICE DESK · CHAMADOS', 13, 0.4)}
${window(120, 210, 1000, 640, `
    <g>
      <rect x="160" y="290" width="280" height="120" rx="10" fill="rgba(47,107,255,0.10)" stroke="rgba(47,107,255,0.35)"/>
      <rect x="180" y="318" width="90" height="8" rx="4" fill="rgba(255,255,255,0.22)"/>
      <text x="400" y="400" font-family="'Space Grotesk',sans-serif" font-size="46" font-weight="600" fill="#e9edf6" fill-opacity="0.9">248</text>
      ${label(180, 384, 0, 'CHAMADOS ABERTOS', 12, 0.45)}
      <rect x="470" y="290" width="240" height="120" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
      <rect x="490" y="318" width="80" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
      <text x="700" y="400" font-family="'Space Grotesk',sans-serif" font-size="46" font-weight="600" fill="#e9edf6" fill-opacity="0.75">92%</text>
      ${label(490, 384, 0, 'SLA ATENDIDO', 12, 0.45)}
    </g>
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => {
      const y = 450 + i * 54;
      const w = [860, 780, 900, 700, 840, 760, 820][i];
      return `<g><rect x="160" y="${y}" width="920" height="38" rx="8" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)"/>
        <circle cx="186" cy="${y + 19}" r="6" fill="#2f6bff" fill-opacity="${0.35 + i * 0.1}"/>
        <rect x="208" y="${y + 15}" width="${w * 0.42}" height="8" rx="4" fill="rgba(255,255,255,0.18)"/>
        <rect x="1020" y="${y + 15}" width="46" height="8" rx="4" fill="rgba(124,196,255,0.28)"/></g>`;
    }).join('')}
  `)}
<g>
  <rect x="1160" y="210" width="320" height="300" rx="14" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)"/>
  ${label(1200, 258, 0, 'TEMPO MÉDIO', 12, 0.45)}
  <polyline points="1200,470 1240,410 1280,432 1320,352 1360,378 1400,300 1440,318" fill="none" stroke="url(#accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="1200" y1="470" x2="1440" y2="470" stroke="rgba(255,255,255,0.08)"/>
  <circle cx="1400" cy="300" r="5" fill="#7cc4ff"/>
</g>
<rect x="1160" y="540" width="320" height="310" rx="14" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)"/>
${label(1200, 588, 0, 'CATEGORIAS', 12, 0.45)}
${['REDE', 'SERVIDOR', 'HARDWARE', 'ACESSO', 'E-MAIL'].map((t, i) => {
  const y = 620 + i * 44;
  const p = [0.8, 0.55, 0.68, 0.4, 0.3][i];
  return `<g>${label(1200, y + 18, 0, t, 12, 0.4)}
  <rect x="1200" y="${y + 26}" width="240" height="4" rx="2" fill="rgba(255,255,255,0.07)"/>
  <rect x="1200" y="${y + 26}" width="${240 * p}" height="4" rx="2" fill="url(#accent)"/></g>`;
}).join('')}
<rect x="0" y="0" width="1600" height="1000" fill="none" stroke="rgba(47,107,255,0.18)" stroke-width="2"/>
</svg>`;

/* ---------------- REMOTE ---------------- */
const remote = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
${defs}
${frame}
${label(120, 132, 0, 'LUFT REMOTE', 18, 0.75)}
${label(120, 164, 0, 'ACESSO REMOTO SEGURO · TÚNEIS', 13, 0.4)}
<g stroke="rgba(47,107,255,0.35)" fill="none" stroke-width="1.5">
  <path d="M420 560 L700 400 L980 560 L1260 400" stroke-dasharray="6 8"/>
  <path d="M700 400 L700 760"/>
  <path d="M420 560 L420 760"/>
  <path d="M980 560 L980 760"/>
</g>
<g>
  <circle cx="700" cy="400" r="86" fill="rgba(47,107,255,0.14)" stroke="rgba(124,196,255,0.5)"/>
  <circle cx="700" cy="400" r="86" fill="none" stroke="#7cc4ff" stroke-opacity="0.4" stroke-width="1" stroke-dasharray="3 10"/>
  ${label(660, 408, 0, 'HUB', 20, 0.85)}
</g>
${[[420, 560, 'NODE-01'], [980, 560, 'NODE-02'], [1260, 400, 'NODE-03'], [700, 760, 'NODE-04'], [420, 760, 'NODE-05']].map(
  ([x, y, t]) => `<g><circle cx="${x}" cy="${y}" r="44" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.16)"/>
  <circle cx="${x}" cy="${y}" r="6" fill="#7cc4ff"/>
  ${label(x - 40, y + 72, 0, t, 12, 0.4)}</g>`,
).join('')}
${[[0, 560], [1, 470], [2, 520]].map(
  ([i, y]) =>
    `<path d="M420 ${560} Q ${560 + i * 60} ${y} 700 400" fill="none" stroke="#7cc4ff" stroke-width="2" stroke-linecap="round" stroke-opacity="${0.55 - i * 0.15}"/>`,
).join('')}
<g>
  <rect x="1160" y="210" width="320" height="180" rx="14" fill="rgba(47,107,255,0.08)" stroke="rgba(47,107,255,0.3)"/>
  ${label(1196, 258, 0, 'SESSÃO ATIVA', 12, 0.45)}
  <text x="1196" y="330" font-family="'Space Grotesk',sans-serif" font-size="52" font-weight="600" fill="#e9edf6" fill-opacity="0.92">AES-256</text>
  <rect x="1196" y="352" width="200" height="4" rx="2" fill="url(#accent)"/>
</g>
<g>
  <rect x="1160" y="420" width="320" height="430" rx="14" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)"/>
  ${label(1196, 468, 0, 'LOG DE ACESSO', 12, 0.45)}
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
    const y = 500 + i * 42;
    return `<g><rect x="1196" y="${y}" width="${180 - i * 8}" height="7" rx="3.5" fill="rgba(255,255,255,0.14)"/>
    <rect x="1420" y="${y}" width="${40 + (i % 3) * 20}" height="7" rx="3.5" fill="rgba(124,196,255,0.3)"/></g>`;
  }).join('')}
</g>
<rect x="0" y="0" width="1600" height="1000" fill="none" stroke="rgba(47,107,255,0.18)" stroke-width="2"/>
</svg>`;

/* ---------------- ZYNO ---------------- */
const zyno = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
${defs}
${frame}
${label(120, 132, 0, 'ZYNO WEB', 18, 0.75)}
${label(120, 164, 0, 'APLICAÇÃO WEB · DASHBOARD', 13, 0.4)}
${window(120, 210, 1360, 640, `
  <g>
    <rect x="160" y="290" width="200" height="520" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)"/>
    ${label(184, 330, 0, 'MENU', 11, 0.35)}
    ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="180" y="${360 + i * 44}" width="${i === 1 ? 120 : 100}" height="10" rx="5" fill="${i === 1 ? 'rgba(47,107,255,0.75)' : 'rgba(255,255,255,0.12)'}"/>`).join('')}
  </g>
  <g>
    ${[0, 1, 2].map((i) => {
      const x = 400 + i * 300;
      return `<rect x="${x}" y="290" width="260" height="150" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)"/>
      <rect x="${x + 22}" y="${316}" width="70" height="7" rx="3.5" fill="rgba(255,255,255,0.18)"/>
      <text x="${x + 22}" y="400" font-family="'Space Grotesk',sans-serif" font-size="40" font-weight="600" fill="#e9edf6" fill-opacity="0.9">${['1.2k', '87%', '34'][i]}</text>`;
    }).join('')}
  </g>
  <g>
    <rect x="400" y="470" width="860" height="200" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
      const h = [40, 62, 34, 88, 54, 110, 72, 96, 60, 84, 44, 100][i];
      return `<rect x="${428 + i * 68}" y="${640 - h}" width="34" height="${h}" rx="6" fill="url(#accent)" fill-opacity="${0.3 + i * 0.05}"/>`;
    }).join('')}
  </g>
  <g>
    <rect x="400" y="700" width="560" height="110" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)"/>
    ${[0, 1, 2].map((i) => `<rect x="424" y="${724 + i * 26}" width="${420 - i * 70}" height="8" rx="4" fill="rgba(255,255,255,0.12)"/>`).join('')}
  </g>
  <g>
    <rect x="1000" y="700" width="260" height="110" rx="10" fill="rgba(47,107,255,0.08)" stroke="rgba(47,107,255,0.28)"/>
    ${label(1024, 742, 0, 'STATUS', 11, 0.4)}
    <circle cx="1032" cy="774" r="6" fill="#28c840"/>
    ${label(1050, 780, 0, 'OPERACIONAL', 12, 0.6)}
  </g>
  `)}
<rect x="0" y="0" width="1600" height="1000" fill="none" stroke="rgba(47,107,255,0.18)" stroke-width="2"/>
</svg>`;

/* ---------------- OUTROS ---------------- */
const outros = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
${defs}
${frame}
${label(120, 132, 0, 'AUTOMAÇÃO & INFRAESTRUTURA', 18, 0.75)}
${label(120, 164, 0, 'SCRIPTS · PROVISIONAMENTO · MONITORAMENTO', 13, 0.4)}
<g>
  <rect x="120" y="210" width="700" height="460" rx="14" fill="#05080e" stroke="rgba(255,255,255,0.1)"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => {
    const colors = ['rgba(124,196,255,0.5)', 'rgba(255,255,255,0.28)', 'rgba(47,107,255,0.5)', 'rgba(255,255,255,0.18)'];
    return `<rect x="164" y="${262 + i * 28}" width="${[70, 200, 300, 420, 180, 340, 260, 150, 400, 220, 310, 190, 380, 240][i]}" height="8" rx="4" fill="${colors[i % 4]}"/>`;
  }).join('')}
  <circle cx="164" cy="240" r="5" fill="#2f6bff"/>
  ${label(182, 245, 0, 'deploy.sh — bash', 12, 0.4)}
</g>
<g>
  <rect x="860" y="210" width="620" height="460" rx="14" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)"/>
  ${label(900, 258, 0, 'MONITORAMENTO', 12, 0.45)}
  ${[0, 1, 2, 3, 4, 5].map((i) => {
    const y = 300 + i * 60;
    const p = [0.86, 0.62, 0.74, 0.45, 0.9, 0.68][i];
    return `<g>${label(900, y + 12, 0, ['CPU', 'MEM', 'DISK', 'NET', 'SWITCH', 'BACKUP'][i], 12, 0.4)}
    <rect x="960" y="${y}" width="470" height="8" rx="4" fill="rgba(255,255,255,0.06)"/>
    <rect x="960" y="${y}" width="${470 * p}" height="8" rx="4" fill="url(#accent)" fill-opacity="0.8"/>
    <circle cx="${960 + 470 * p}" cy="${y + 4}" r="6" fill="#7cc4ff"/></g>`;
  }).join('')}
</g>
<g>
  <rect x="120" y="710" width="1360" height="140" rx="14" fill="rgba(47,107,255,0.06)" stroke="rgba(47,107,255,0.25)"/>
  ${['PROVISIONING', 'BACKUP 3-2-1', 'ALERTAS', 'IOT / SENSORES', 'PATCHES'].map((t, i) => {
    const w = 220;
    const x = 168 + i * 268;
    return `<g><rect x="${x}" y="750" width="${w}" height="60" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
    ${label(x + 22, 786, 0, t, 12, 0.5)}
    <circle cx="${x + w - 24}" cy="780" r="5" fill="#7cc4ff" fill-opacity="0.7"/></g>`;
  }).join('')}
</g>
<rect x="0" y="0" width="1600" height="1000" fill="none" stroke="rgba(47,107,255,0.18)" stroke-width="2"/>
</svg>`;

/* ---------------- BARBEARIA INSTITUCIONAL (fix: tinha imagem duplicada da ZYNO) ---------------- */
const barbearia = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
${defs}
${frame}
${label(120, 132, 0, 'BARBEARIA DO SILVIO', 18, 0.75)}
${label(120, 164, 0, 'SITE INSTITUCIONAL · IDENTIDADE LUXUOSA', 13, 0.4)}
${window(120, 210, 1360, 640, `
  <rect x="160" y="290" width="560" height="520" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)"/>
  ${label(200, 350, 0, 'CORTE · BARBA · ESTILO', 12, 0.45)}
  <text x="200" y="440" font-family="'Space Grotesk',sans-serif" font-size="64" font-weight="600" fill="#e9edf6" fill-opacity="0.92">NAVALHA</text>
  <text x="200" y="510" font-family="'Space Grotesk',sans-serif" font-size="64" font-weight="600" fill="url(#accent)">DE OURO</text>
  <rect x="200" y="560" width="200" height="44" rx="22" fill="rgba(47,107,255,0.75)"/>
  ${label(232, 588, 0, 'AGENDAR HORÁRIO', 12, 0.9)}
  ${[0, 1, 2].map((i) => `<rect x="200" y="${650 + i * 52}" width="${320 - i * 40}" height="10" rx="5" fill="rgba(255,255,255,0.12)"/>`).join('')}
  <rect x="760" y="290" width="680" height="520" rx="10" fill="rgba(47,107,255,0.06)" stroke="rgba(47,107,255,0.25)"/>
  ${['CORTE CLÁSSICO — R$ 60', 'BARBA + TOALHA QUENTE — R$ 45', 'COMBO SILVIO VIP — R$ 99'].map((t, i) => {
    const y = 350 + i * 130;
    return `<g><rect x="800" y="${y}" width="600" height="100" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
    <circle cx="848" cy="${y + 50}" r="22" fill="none" stroke="url(#accent)" stroke-width="2"/>${label(890, y + 56, 0, t, 13, 0.55)}</g>`;
  }).join('')}
  `)}
<rect x="0" y="0" width="1600" height="1000" fill="none" stroke="rgba(47,107,255,0.18)" stroke-width="2"/>
</svg>`;

/* ---------------- BARBERFLOW — agendamentos barbearia ---------------- */
const barberflow = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
${defs}
${frame}
${label(120, 132, 0, 'BARBERFLOW', 18, 0.75)}
${label(120, 164, 0, 'AGENDAMENTO ONLINE · BARBEIROS · WHATSAPP', 13, 0.4)}
${window(120, 210, 880, 640, `
  ${['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'].map((d, i) => {
    const x = 160 + i * 130;
    return `<g>${label(x, 310, 0, d, 11, 0.4)}
    ${[0, 1, 2, 3, 4].map((s) => {
      const y = 330 + s * 88;
      const busy = (i * 5 + s) % 3 === 0;
      return `<rect x="${x}" y="${y}" width="110" height="68" rx="8" fill="${busy ? 'rgba(47,107,255,0.55)' : 'rgba(255,255,255,0.03)'}" stroke="${busy ? 'rgba(124,196,255,0.5)' : 'rgba(255,255,255,0.08)'}"/>`;
    }).join('')}</g>`;
  }).join('')}
  `)}
<g>
  <rect x="1040" y="210" width="440" height="300" rx="14" fill="rgba(47,107,255,0.08)" stroke="rgba(47,107,255,0.3)"/>
  ${label(1080, 258, 0, 'OCUPAÇÃO HOJE', 12, 0.45)}
  <text x="1080" y="340" font-family="'Space Grotesk',sans-serif" font-size="56" font-weight="600" fill="#e9edf6" fill-opacity="0.92">87%</text>
  <rect x="1080" y="360" width="360" height="8" rx="4" fill="rgba(255,255,255,0.07)"/>
  <rect x="1080" y="360" width="313" height="8" rx="4" fill="url(#accent)"/>
  ${label(1080, 410, 0, '32 CORTES · 3 BARBEIROS · 0 NO-SHOW', 11, 0.4)}
  <rect x="1080" y="430" width="200" height="36" rx="18" fill="#28c840" fill-opacity="0.8"/>
  ${label(1104, 453, 0, 'WHATSAPP ATIVO', 11, 0.95)}
</g>
<g>
  <rect x="1040" y="540" width="440" height="310" rx="14" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)"/>
  ${label(1080, 588, 0, 'BARBEIROS', 12, 0.45)}
  ${['SÍLVIO — 12 cortes', 'RAFA — 11 cortes', 'DIEGO — 9 cortes'].map((t, i) => {
    const y = 616 + i * 66;
    const p = [0.9, 0.75, 0.6][i];
    return `<g>${label(1080, y + 14, 0, t, 12, 0.5)}
    <rect x="1080" y="${y + 22}" width="360" height="6" rx="3" fill="rgba(255,255,255,0.07)"/>
    <rect x="1080" y="${y + 22}" width="${360 * p}" height="6" rx="3" fill="url(#accent)"/></g>`;
  }).join('')}
</g>
<rect x="0" y="0" width="1600" height="1000" fill="none" stroke="rgba(47,107,255,0.18)" stroke-width="2"/>
</svg>`;

/* ---------------- PETFLOW — ciclo completo petshop ---------------- */
const petflow = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
${defs}
${frame}
${label(120, 132, 0, 'PETFLOW OS', 18, 0.75)}
${label(120, 164, 0, 'BANHO · TOSA · PDV · PAINEL ADMIN', 13, 0.4)}
${window(120, 210, 460, 640, `
  ${label(160, 300, 0, 'AGENDA BANHO & TOSA', 11, 0.4)}
  ${['09:00 BELINHA — BANHO', '10:30 THOR — TOSA', '13:00 LUNA — BANHO+TOSA', '15:00 MAX — HIDRATAÇÃO', '16:30 MEL — BANHO'].map((t, i) => {
    const y = 330 + i * 92;
    return `<g><rect x="160" y="${y}" width="380" height="70" rx="8" fill="${i === 2 ? 'rgba(47,107,255,0.35)' : 'rgba(255,255,255,0.03)'}" stroke="rgba(255,255,255,0.08)"/>
    <circle cx="186" cy="${y + 35}" r="8" fill="${i === 2 ? '#7cc4ff' : '#2f6bff'}" fill-opacity="0.7"/>${label(206, y + 40, 0, t, 11, 0.55)}</g>`;
  }).join('')}
  `)}
<g>
  <rect x="620" y="210" width="440" height="640" rx="14" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)"/>
  ${label(660, 258, 0, 'PDV · VENDA DE PRODUTOS', 12, 0.45)}
  ${['RAÇÃO PREMIUM 10KG — R$ 189', 'SHAMPOO NEUTRO — R$ 42', 'BRINQUEDO + PETISCO — R$ 35'].map((t, i) => {
    const y = 290 + i * 90;
    return `<g><rect x="660" y="${y}" width="360" height="70" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)"/>${label(680, y + 42, 0, t, 11, 0.5)}</g>`;
  }).join('')}
  <rect x="660" y="580" width="360" height="80" rx="10" fill="rgba(47,107,255,0.12)" stroke="rgba(47,107,255,0.3)"/>
  ${label(684, 612, 0, 'TOTAL DO CARRINHO', 11, 0.4)}
  <text x="684" y="648" font-family="'Space Grotesk',sans-serif" font-size="32" font-weight="600" fill="#e9edf6">R$ 266,00</text>
  <rect x="660" y="690" width="360" height="110" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)"/>
  ${label(684, 724, 0, 'ESTOQUE BAIXADO AUTO', 11, 0.4)}
  ${label(684, 756, 0, 'NOTA + WHATSAPP ENVIADOS', 11, 0.4)}
  ${label(684, 786, 0, 'FIDELIDADE: +26 PONTOS', 11, 0.5)}
</g>
<g>
  <rect x="1100" y="210" width="380" height="640" rx="14" fill="#05080e" stroke="rgba(255,255,255,0.1)"/>
  ${label(1140, 258, 0, 'PAINEL ADMIN', 12, 0.45)}
  <text x="1140" y="330" font-family="'Space Grotesk',sans-serif" font-size="48" font-weight="600" fill="#e9edf6">R$ 8,4k</text>
  ${label(1140, 360, 0, 'FATURAMENTO / MÊS', 11, 0.4)}
  <polyline points="1140,470 1175,430 1210,445 1245,400 1280,415 1315,370 1350,385 1400,340" fill="none" stroke="url(#accent)" stroke-width="2.5" stroke-linecap="round"/>
  ${['AGENDAMENTOS 96%', 'ESTOQUE OK 124', 'VACINAS ALERTA 3', 'EQUIPE 6 ATIVOS'].map((t, i) => `<g><rect x="1140" y="${520 + i * 78}" width="300" height="56" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)"/>${label(1158, 554 + i * 78, 0, t, 11, 0.5)}</g>`).join('')}
</g>
<rect x="0" y="0" width="1600" height="1000" fill="none" stroke="rgba(47,107,255,0.18)" stroke-width="2"/>
</svg>`;

/* ---------------- SENTINEL — NOC/SOC com IA ---------------- */
const sentinel = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
${defs}
${frame}
${label(120, 132, 0, 'SENTINEL OPS', 18, 0.75)}
${label(120, 164, 0, 'NOC · SOC · DETECÇÃO COM IA', 13, 0.4)}
<g stroke="rgba(47,107,255,0.35)" fill="none" stroke-width="1.5">
  <circle cx="520" cy="540" r="180" stroke-dasharray="6 8"/>
  <circle cx="520" cy="540" r="110" stroke-dasharray="4 8"/>
  <path d="M520 540 L340 340 M520 540 L700 340 M520 540 L760 620 M520 540 L300 640 M520 540 L520 780"/>
</g>
<g>
  <circle cx="520" cy="540" r="52" fill="rgba(47,107,255,0.2)" stroke="#7cc4ff"/>
  ${label(495, 548, 0, 'CORE', 16, 0.85)}
  ${[[340, 340, 'FW-01'], [700, 340, 'SW-02'], [760, 620, 'SRV-03'], [300, 640, 'IOT'], [520, 780, 'WAN']].map(([x, y, t]) => `<g><circle cx="${x}" cy="${y}" r="30" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.16)"/><circle cx="${x}" cy="${y}" r="6" fill="${t === 'IOT' ? '#ff5f57' : '#7cc4ff'}"/>${label(x - 28, y + 52, 0, t, 11, 0.4)}</g>`).join('')}
</g>
<g>
  <rect x="900" y="210" width="580" height="300" rx="14" fill="rgba(255,80,80,0.06)" stroke="rgba(255,95,87,0.3)"/>
  ${label(940, 258, 0, 'IA · ANOMALIAS DETECTADAS — 3', 12, 0.6)}
  ${['TRÁFEGO ANÔMALO 02:14 — IoT VLAN', 'TENTATIVA SSH EM MASSA — FW-01', 'LATÊNCIA WAN +240% — LINK 2'].map((t, i) => `<g><circle cx="956" cy="${310 + i * 56}" r="6" fill="#ff5f57" fill-opacity="0.8"/>${label(976, 315 + i * 56, 0, t, 12, 0.55)}</g>`).join('')}
  <rect x="940" y="440" width="220" height="36" rx="18" fill="rgba(255,95,87,0.2)" stroke="rgba(255,95,87,0.4)"/>
  ${label(962, 463, 0, 'ISOLAR + ALERTAR', 11, 0.7)}
</g>
<g>
  <rect x="900" y="540" width="580" height="310" rx="14" fill="#05080e" stroke="rgba(255,255,255,0.1)"/>
  ${label(940, 588, 0, 'LOG IA RESUMO — TEMPO REAL', 12, 0.45)}
  ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="940" y="${620 + i * 36}" width="${[420, 340, 380, 280, 400, 300][i]}" height="8" rx="4" fill="${i % 2 ? 'rgba(255,255,255,0.14)' : 'rgba(124,196,255,0.4)'}"/>`).join('')}
</g>
<rect x="0" y="0" width="1600" height="1000" fill="none" stroke="rgba(47,107,255,0.18)" stroke-width="2"/>
</svg>`;

/* ---------------- TERRAFLOW — IaC provisionada com IA ---------------- */
const terraflow = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
${defs}
${frame}
${label(120, 132, 0, 'TERRAFLOW', 18, 0.75)}
${label(120, 164, 0, 'IAC · TERRAFORM + ANSIBLE · ZERO-TOUCH', 13, 0.4)}
<g>
  ${['CODE', 'PLAN', 'APPLY', 'HARDEN', 'MONITOR'].map((t, i) => {
    const x = 120 + i * 288;
    return `<g><rect x="${x}" y="210" width="260" height="110" rx="12" fill="${i === 2 ? 'rgba(47,107,255,0.25)' : 'rgba(255,255,255,0.03)'}" stroke="${i === 2 ? 'rgba(124,196,255,0.5)' : 'rgba(255,255,255,0.09)'}"/>${label(x + 28, 258, 0, '0' + (i + 1), 12, 0.4)}${label(x + 28, 290, 0, t, 14, 0.7)}${i < 4 ? `<path d="M${x + 260} 265 h28" stroke="#7cc4ff" stroke-width="2"/>` : ''}</g>`;
  }).join('')}
</g>
<g>
  <rect x="120" y="360" width="880" height="490" rx="14" fill="#05080e" stroke="rgba(255,255,255,0.1)"/>
  ${label(160, 408, 0, 'main.tf — gerado com IA + revisado', 12, 0.4)}
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
    const colors = ['rgba(124,196,255,0.5)', 'rgba(255,255,255,0.22)', 'rgba(47,107,255,0.55)', 'rgba(40,200,64,0.5)'];
    return `<rect x="160" y="${444 + i * 32}" width="${[120, 300, 220, 420, 180, 340, 260, 400, 200, 320, 150, 380][i]}" height="9" rx="4.5" fill="${colors[i % 4]}"/>`;
  }).join('')}
</g>
<g>
  <rect x="1040" y="360" width="440" height="490" rx="14" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)"/>
  ${label(1080, 408, 0, 'FROTA PROVISIONADA — 24 HOSTS', 12, 0.45)}
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
    const x = 1080 + (i % 2) * 200;
    const y = 440 + Math.floor(i / 2) * 92;
    return `<g><rect x="${x}" y="${y}" width="180" height="70" rx="8" fill="rgba(47,107,255,0.08)" stroke="rgba(47,107,255,0.25)"/><circle cx="${x + 26}" cy="${y + 35}" r="6" fill="#28c840"/>${label(x + 42, y + 40, 0, 'SRV-0' + (i + 1), 11, 0.5)}</g>`;
  }).join('')}
  ${label(1080, 820, 0, 'BACKUP 3-2-1 ✓ · UPTIME 99,9%', 11, 0.5)}
</g>
<rect x="0" y="0" width="1600" height="1000" fill="none" stroke="rgba(47,107,255,0.18)" stroke-width="2"/>
</svg>`;

/* ---------------- VAULTSEC — auditoria + hardening com IA ---------------- */
const vaultsec = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
${defs}
${frame}
${label(120, 132, 0, 'VAULTSEC', 18, 0.75)}
${label(120, 164, 0, 'CYBER SECURITY · AUDITORIA AUTOMATIZADA', 13, 0.4)}
<g>
  <rect x="120" y="210" width="620" height="640" rx="14" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)"/>
  ${label(160, 258, 0, 'CHECKLIST DE HARDENING — IA', 12, 0.45)}
  ${['MFA EM 100% DAS CONTAS', 'PATCHES CRÍTICOS EM DIA', 'FIREWALL + SEGMENTAÇÃO', 'BACKUP TESTADO / RESTORE OK', 'SENHAS VAZADAS — 0', 'LOGS CENTRALIZADOS SIEM'].map((t, i) => {
    const y = 300 + i * 88;
    const ok = i !== 4;
    return `<g><rect x="160" y="${y}" width="540" height="66" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)"/>
    <circle cx="192" cy="${y + 33}" r="12" fill="${ok ? 'rgba(40,200,64,0.25)' : 'rgba(255,95,87,0.25)'}" stroke="${ok ? '#28c840' : '#ff5f57'}"/>
    ${label(220, y + 38, 0, t, 12, 0.55)}</g>`;
  }).join('')}
</g>
<g>
  <rect x="780" y="210" width="360" height="300" rx="14" fill="rgba(47,107,255,0.1)" stroke="rgba(47,107,255,0.32)"/>
  ${label(820, 258, 0, 'SCORE DE SEGURANÇA', 12, 0.45)}
  <text x="820" y="350" font-family="'Space Grotesk',sans-serif" font-size="72" font-weight="600" fill="#e9edf6">94</text>
  <text x="910" y="350" font-family="'Space Grotesk',sans-serif" font-size="28" fill="#7cc4ff">/100</text>
  <rect x="820" y="380" width="280" height="10" rx="5" fill="rgba(255,255,255,0.07)"/>
  <rect x="820" y="380" width="263" height="10" rx="5" fill="url(#accent)"/>
  ${label(820, 430, 0, '+31 PTS APÓS HARDENING IA', 11, 0.5)}
  <rect x="820" y="452" width="180" height="32" rx="16" fill="rgba(40,200,64,0.2)" stroke="rgba(40,200,64,0.4)"/>
  ${label(842, 473, 0, '● PROTEGIDO', 11, 0.7)}
</g>
<g>
  <rect x="780" y="540" width="360" height="310" rx="14" fill="#05080e" stroke="rgba(255,255,255,0.1)"/>
  ${label(820, 588, 0, 'COFRE · SEGREDOS', 12, 0.45)}
  ${[0, 1, 2, 3].map((i) => `<g><rect x="820" y="${620 + i * 54}" width="280" height="36" rx="8" fill="rgba(255,255,255,0.04)"/><rect x="836" y="${633 + i * 54}" width="${140 - i * 14}" height="8" rx="4" fill="rgba(255,255,255,0.2)"/><circle cx="1080" cy="${638 + i * 54}" r="5" fill="#7cc4ff"/></g>`).join('')}
</g>
<g>
  <rect x="1180" y="210" width="300" height="640" rx="14" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)"/>
  ${label(1214, 258, 0, 'RELATÓRIO IA', 12, 0.45)}
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<rect x="1214" y="${300 + i * 58}" width="${[220, 180, 200, 150, 210, 170, 190, 160, 200][i]}" height="8" rx="4" fill="${i % 3 === 0 ? 'rgba(124,196,255,0.4)' : 'rgba(255,255,255,0.14)'}"/>`).join('')}
</g>
<rect x="0" y="0" width="1600" height="1000" fill="none" stroke="rgba(47,107,255,0.18)" stroke-width="2"/>
</svg>`;

fs.writeFileSync(path.join(out, 'project-helpdesk.svg'), helpdesk);
fs.writeFileSync(path.join(out, 'project-remote.svg'), remote);
fs.writeFileSync(path.join(out, 'project-zyno.svg'), zyno);
fs.writeFileSync(path.join(out, 'project-outros.svg'), outros);
fs.writeFileSync(path.join(out, 'project-barbearia.svg'), barbearia);
fs.writeFileSync(path.join(out, 'project-barberflow.svg'), barberflow);
fs.writeFileSync(path.join(out, 'project-petflow.svg'), petflow);
fs.writeFileSync(path.join(out, 'project-sentinel.svg'), sentinel);
fs.writeFileSync(path.join(out, 'project-terraflow.svg'), terraflow);
fs.writeFileSync(path.join(out, 'project-vaultsec.svg'), vaultsec);

console.log('placeholders gerados em', out);
console.log('nota: o retrato nao e gerado — use a foto real em src/assets/images/gustavo-leonel.jpg');
