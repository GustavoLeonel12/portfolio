export type SocialKey = 'linkedin' | 'email' | 'whatsapp';

export interface SocialLink {
  key: SocialKey;
  label: string;
  handle: string;
  href: string;
}

export const profile = {
  name: 'Gustavo Leonel',
  /** primeira linha do lockup do hero */
  nameFirst: 'Gustavo',
  /** segunda linha, levemente recuada em relação à primeira */
  nameLast: 'Leonel',
  initials: 'GL',
  role: 'Tecnologia da Informação',
  tagline: 'INFRAESTRUTURA • REDES • CYBER SECURITY • IA APLICADA',
  /** selo exibido no hero, ao lado do status de disponibilidade */
  aiBadge: 'Entusiasta de IA',
  shortPhrase:
    'Construindo infraestrutura com IA — do prompt ao sistema rodando em produção.',
  location: 'Brasil',
  availability: 'Disponível para novos projetos',
  about: {
    lead:
      'Sou profissional de Tecnologia da Informação e entusiasta de inteligência artificial, com experiência em infraestrutura, redes, suporte e desenvolvimento de soluções.',
    body: [
      'Atuo na camada onde a tecnologia se torna estável: servidores que não caem, redes que se sustentam sob carga, ambientes seguros e processos automatizados para reduzir trabalho manual.',
      'Inteligência artificial faz parte do meu método, não da minha apresentação: uso agentes e modelos generativos todos os dias para escrever, revisar, documentar e automatizar — sempre com a arquitetura definida e a revisão minha antes de ir para produção.',
    ] as string[],
    highlights: [
      'Infraestrutura',
      'Redes',
      'Servidores',
      'Cyber Security',
      'Inteligência Artificial',
      'Agentes de Código',
      'Desenvolvimento',
      'Automação',
    ] as string[],
  },
} as const;

export const socials: SocialLink[] = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    handle: '/in/gustavo-leonel-1b36511b1',
    href: 'https://www.linkedin.com/in/gustavo-leonel-1b36511b1',
  },
  {
    key: 'email',
    label: 'E-mail',
    handle: 'leonel.dgk@gmail.com',
    href: 'mailto:leonel.dgk@gmail.com',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    handle: '(11) 95076-8740',
    href: 'https://wa.me/5511950768740',
  },
];

export const getSocial = (key: SocialKey): SocialLink =>
  socials.find((s) => s.key === key) ?? socials[0];

export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Início', index: '01' },
  { id: 'sobre', label: 'Sobre', index: '02' },
  { id: 'especialidades', label: 'Especialidades', index: '03' },
  { id: 'ia', label: 'IA', index: '04' },
  { id: 'experiencia', label: 'Experiência', index: '05' },
  { id: 'projetos', label: 'Projetos', index: '06' },
  { id: 'formacao', label: 'Formação', index: '07' },
  { id: 'contato', label: 'Contato', index: '08' },
];
