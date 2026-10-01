import type { LucideIcon } from 'lucide-react';
import {
  Server,
  Network,
  HardDrive,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export interface Skill {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  keywords: string[];
  /** tamanho no grid assimétrico (desktop) */
  span: 'lg' | 'md' | 'sm' | 'full';
  code: string;
  /** Domain em destaque — recebe tratamento visual diferenciado */
  featured?: boolean;
}

export const skills: Skill[] = [
  {
    id: 'inteligencia-artificial',
    title: 'INTELIGÊNCIA ARTIFICIAL',
    description:
      'A camada que escrevo todos os dias: agentes no terminal, IDE agêntica e modelos generativos transformam especificação em código revisado, testado e documentado — e ficam de guarda em produção monitorando rede, logs e segurança.',
    icon: Sparkles,
    keywords: ['Agentes de código', 'Opencode', 'Antigravity', 'Claude', 'Gemini', 'ChatGPT'],
    span: 'lg',
    code: 'AI-01',
    featured: true,
  },
  {
    id: 'infraestrutura',
    title: 'INFRAESTRUTURA',
    description:
      'Ambientes de TI projetados para operar de forma estável: virtualização, armazenamento, política de backup e monitoramento contínuo da infraestrutura.',
    icon: Server,
    keywords: ['Virtualização', 'Backup', 'Monitoramento', 'AD'],
    span: 'md',
    code: 'INF-02',
  },
  {
    id: 'redes',
    title: 'REDES',
    description:
      'Segmentação, roteamento, switchagem e enlace de redes corporativas com foco em disponibilidade, latência e troubleshooting.',
    icon: Network,
    keywords: ['LAN/WAN', 'VLAN', 'TCP/IP', 'Wi-Fi'],
    span: 'sm',
    code: 'NET-03',
  },
  {
    id: 'servidores',
    title: 'SERVIDORES',
    description:
      'Servidores Windows e Linux: instalação, hardening, serviços, permissões e manutenções planejadas sem impacto no negócio.',
    icon: HardDrive,
    keywords: ['Windows Server', 'Linux', 'DNS', 'AD'],
    span: 'sm',
    code: 'SRV-04',
  },
  {
    id: 'cyber',
    title: 'CYBER SECURITY',
    description:
      'Defesa em profundidade, controle de acesso, proteção de endpoints e boas práticas para reduzir a superfície de ataque.',
    icon: ShieldCheck,
    keywords: ['Firewall', 'Hardening', 'Backup 3-2-1', 'Consciência'],
    span: 'sm',
    code: 'SEC-05',
  },
];
