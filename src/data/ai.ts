import type { LucideIcon } from 'lucide-react';
import { Bot, BrainCircuit, Radar } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* console — a rotina real de trabalho com IA, escrita como sessão    */
/* ------------------------------------------------------------------ */

export type ConsoleLineKind = 'prompt' | 'step' | 'output';

export interface ConsoleLine {
  kind: ConsoleLineKind;
  text: string;
}

export const aiConsole: {
  window: string;
  lines: ConsoleLine[];
} = {
  window: 'gustavo@lab:~/projetos',
  lines: [
    {
      kind: 'prompt',
      text: 'opencode "gere um service desk com SLA e aprovação em tempo real"',
    },
    { kind: 'step', text: 'lendo contexto · stack, regras e topologia do ambiente' },
    { kind: 'step', text: 'planejando · 6 etapas · 14 arquivos' },
    { kind: 'step', text: 'escrevendo · auth · tickets · SLA · notificações' },
    { kind: 'step', text: 'revisando · segurança · performance · acessibilidade' },
    {
      kind: 'output',
      text: 'pronto · 4.118 linhas · 0 vulnerabilidades · pronto para produção',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* pilares — o que eu realmente faço com IA                            */
/* ------------------------------------------------------------------ */

export interface AiPillar {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const aiPillars: AiPillar[] = [
  {
    id: 'agentes',
    code: 'AI-01',
    title: 'AGENTES DE CÓDIGO',
    description:
      'Opencode, Antigravity e Claude escrevem o primeiro rascunho em minutos. Eu defino a arquitetura, reviso cada linha e assumo a decisão final do que vai para produção.',
    icon: Bot,
  },
  {
    id: 'operacao',
    code: 'AI-02',
    title: 'IA NA OPERAÇÃO',
    description:
      'Detecção de anomalia em rede, triagem de chamado, resumo de logs e auditoria de hardening rodando 24/7 — do alerta em linguagem clara até a ação sugerida.',
    icon: Radar,
  },
  {
    id: 'contexto',
    code: 'AI-03',
    title: 'CONTEXTO COMO ENGENHARIA',
    description:
      'Prompt não é palavra-chave, é contexto. AGENTS.md, documentação viva e regras de projeto são o que separa um protótipo bonito de um sistema que aguenta carga.',
    icon: BrainCircuit,
  },
];

/* ------------------------------------------------------------------ */
/* fluxo — o critério, não a ferramenta                                */
/* ------------------------------------------------------------------ */

export const aiFlow: string[] = ['CONTEXTO', 'PROMPT', 'AGENTE', 'REVISÃO', 'ENTREGA'];

/* ------------------------------------------------------------------ */
/* stack — ferramentas que uso no dia a dia                            */
/* ------------------------------------------------------------------ */

export interface AiTool {
  id: string;
  name: string;
  role: string;
}

export const aiTools: AiTool[] = [
  { id: 'opencode', name: 'Opencode', role: 'agente no terminal' },
  { id: 'antigravity', name: 'Antigravity', role: 'IDE agêntica' },
  { id: 'claude', name: 'Claude', role: 'arquitetura e revisão' },
  { id: 'chatgpt', name: 'ChatGPT', role: 'pesquisa e rascunho' },
  { id: 'gemini', name: 'Gemini', role: 'análise de contexto longo' },
  { id: 'copilot', name: 'Copilot', role: 'autocomplete em IDE' },
];

/* ------------------------------------------------------------------ */
/* manifesto — a posição                                              */
/* ------------------------------------------------------------------ */

export const aiManifesto = {
  lead:
    'Sou entusiasta de inteligência artificial — não porque trendiu no LinkedIn, mas porque foi ela que tirou meus sistemas do papel.',
  body: [
    'Todo projeto deste portfólio nasceu de uma conversa bem-contextualizada com um modelo: uma especificação, um agente dentro do terminal e minha revisão em cada commit. A IA escreve rápido. Eu faço o sistema valer a pena.',
    'Acompanho o modelo de perto — novos recursos, agentes, ferramentas locais e modelos abertos — porque em infraestrutura quem espera a tecnologia ficar pronta chega tarde demais.',
  ] as string[],
  /** medido de forma honesta: todo projeto entregue passou por um agente */
  metrics: [
    {
      id: 'projetos-ia',
      value: 12,
      suffix: '+',
      label: 'Sistemas com IA',
      caption: 'do rascunho ao deploy',
    },
    {
      id: 'revisao',
      value: '100%',
      label: 'Revisão humana',
      caption: 'a IA propõe, eu libero',
    },
    {
      id: 'rotina',
      value: '24/7',
      label: 'Agentes de guarda',
      caption: 'rede, logs e segurança',
    },
  ],
};
