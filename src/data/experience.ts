export interface ExperienceEntry {
  id: string;
  year: string;
  role: string;
  area: string;
  summary: string;
  highlights: string[];
  current?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    id: 'exp-2026',
    year: '2026',
    role: 'Infraestrutura / Tecnologia',
    area: 'Tecnologia da Informação',
    summary:
      'Atuação consolidada em infraestrutura de TI, conectando redes, servidores e segurança em um ambiente integrado.',
    highlights: [
      'Manutenção de servidores Windows e Linux',
      'Gestão de redes e segmentação',
      'Monitoramento e otimização de ambientes',
    ],
    current: true,
  },
  {
    id: 'exp-2025',
    year: '2025',
    role: 'Infraestrutura de TI',
    area: 'Operação de TI',
    summary:
      'Responsável por ambientes de TI, do hardening à disponibilidade dos serviços críticos do negócio.',
    highlights: [
      'Padronização de endpoints e servidores',
      'Planos de backup e recuperação',
      'Suporte de segunda linha',
    ],
  },
  {
    id: 'exp-2024',
    year: '2024',
    role: 'Redes e Infraestrutura',
    area: 'Redes',
    summary:
      'Estruturação e evolução da rede corporativa, com foco em performance, redundância e diagnóstico de falhas.',
    highlights: [
      'Configuração de switches e roteadores',
      'Diagnóstico e resolução de incidentes',
      'Documentação de topologia',
    ],
  },
  {
    id: 'exp-2023',
    year: '2023',
    role: 'Suporte Técnico',
    area: 'Service Desk',
    summary:
      'Primeiro contato com o usuário final: triagem, resolução de chamados e registro de base de conhecimento.',
    highlights: [
      'Atendimento e triagem de chamados',
      'Instalação e configuração de estações',
      'Base de conhecimento interna',
    ],
  },
];
