export interface Project {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  image: string;
  imageAlt: string;
  live?: string;
  year: string;
  role: string;
}

const img = (name: string) => new URL(`../assets/images/${name}`, import.meta.url).href;

export const projects: Project[] = [
  {
    id: 'luft-helpdesk',
    index: '01',
    name: 'LUFT HELPDESK',
    tagline: 'Service desk interno',
    description:
      'Desenvolvido após identificar limitações no antigo sistema de chamados da empresa, o LUFT HELPDESK é uma solução moderna e sofisticada. Ele introduziu aprovações de gestores em tempo real, eliminando a dependência de ferramentas de terceiros e garantindo total autonomia para futuras evoluções e implantações internas.',
    tech: ['Antigravity', 'OpenCode', 'Claude'],
    image: img('project-helpdesk.svg'),
    imageAlt: 'Tela do sistema LUFT HELPDESK com lista de chamados e painel de SLA',
    year: '2026',
    role: 'Desenvolvimento & Infraestrutura',
  },
  {
    id: 'luft-remote',
    index: '02',
    name: 'LUFT REMOTE',
    tagline: 'Acesso remoto seguro',
    description:
      'Criado para substituir soluções comerciais de acesso remoto, gerando uma economia significativa em licenças para a empresa. Além de fornecer controle remoto seguro, o sistema mapeia todo o parque de máquinas, entregando informações valiosas em tempo real sobre hardware, sistema operacional e status do antivírus.',
    tech: ['OpenCode', 'ChatGPT', 'Gemini'],
    image: img('project-remote.svg'),
    imageAlt: 'Interface do LUFT REMOTE exibindo dispositivos conectados e túnel de acesso',
    year: '2025',
    role: 'Redes & Cyber Security',
  },
  {
    id: 'zyno-web',
    index: '03',
    name: 'ZYNO WEB',
    tagline: 'Aplicação web',
    description:
      'Onde tudo começou: meu primeiro projeto desenvolvido com o auxílio de Inteligência Artificial. Apesar de ser um sistema com um layout que hoje considero simples, tem um valor sentimental enorme por representar o meu ponto de partida, mostrando minha evolução técnica e os objetivos que ainda quero alcançar.',
    tech: ['Antigravity', 'Claude', 'ChatGPT', 'Gemini'],
    image: img('project-zyno.svg'),
    imageAlt: 'Layout da aplicação ZYNO WEB com dashboard e indicadores operacionais',
    year: '2025',
    role: 'Desenvolvimento Full-Stack',
  },
  {
    id: 'barbearia-silvio',
    index: '04',
    name: 'BARBEARIA DO SÍLVIO',
    tagline: 'Site institucional luxuoso',
    description:
      'Criado para renovar a identidade digital da marca e atrair novos clientes. O resultado foi o desenvolvimento de um site ultramoderno, com design sofisticado e luxuoso, perfeitamente alinhado à nova visão do negócio.',
    tech: ['Antigravity', 'React', 'CSS'],
    image: img('project-barbearia.svg'),
    imageAlt: 'Visual luxuoso e moderno do site da Barbearia do Sílvio',
    year: '2026',
    role: 'Desenvolvimento Web',
  },
  {
    id: 'barberflow',
    index: '05',
    name: 'BARBERFLOW',
    tagline: 'Agendamento inteligente',
    description:
      'Sistema completo de agendamentos para barbearia: cliente escolhe barbeiro, serviço e horário em segundos, recebe confirmação e lembrete automático no WhatsApp. O painel do barbeiro mostra ocupação do dia, faturamento, histórico por cliente e bloqueios de agenda — zerando o no-show e as anotações em papel.',
    tech: ['React', 'Node', 'WhatsApp API', 'Claude'],
    image: img('project-barberflow.svg'),
    imageAlt: 'Tela do BARBERFLOW com agenda semanal, ocupação do dia e painel dos barbeiros',
    year: '2026',
    role: 'Desenvolvimento Full-Stack',
  },
  {
    id: 'petflow-os',
    index: '06',
    name: 'PETFLOW OS',
    tagline: 'Ecossistema pet completo',
    description:
      'Ciclo completo de petshop em um só lugar: agendamento de banho e tosa com prontuário do pet, fila de atendimento e alertas de vacina, PDV para venda de produtos com baixa automática de estoque e programa de fidelidade — tudo consolidado em um painel administrativo com faturamento, equipe e indicadores em tempo real.',
    tech: ['Antigravity', 'OpenCode', 'React', 'PostgreSQL'],
    image: img('project-petflow.svg'),
    imageAlt: 'Interface do PETFLOW OS com agenda de banho e tosa, PDV de produtos e painel administrativo',
    year: '2026',
    role: 'Desenvolvimento & Automação',
  },
  {
    id: 'sentinel-ops',
    index: '07',
    name: 'SENTINEL OPS',
    tagline: 'NOC / SOC com IA',
    description:
      'Infraestrutura de monitoramento 24/7 construída com auxílio de IA: mapeia firewall, switches, servidores e IoT, detecta anomalias de tráfego, tentativas de invasão e degradação de link, resume logs em linguagem clara e sugere isolamento automático. O NOC que nunca dorme.',
    tech: ['Zabbix', 'Python', 'OpenCode', 'Gemini'],
    image: img('project-sentinel.svg'),
    imageAlt: 'Mapa de rede do SENTINEL OPS com alertas de anomalias detectadas por IA',
    year: '2026',
    role: 'Redes & Cyber Security',
  },
  {
    id: 'terraflow',
    index: '08',
    name: 'TERRAFLOW',
    tagline: 'Infraestrutura como código',
    description:
      'Provisionamento zero-touch de ambientes inteiros: pipeline code → plan → apply → harden → monitor com Terraform + Ansible, todo o código inicial gerado com IA e revisado por mim. Sobe 24 hosts padronizados, com hardening automático, backup 3-2-1 e uptime de 99,9% — do zero ao produtivo em minutos.',
    tech: ['Terraform', 'Ansible', 'Claude', 'Linux'],
    image: img('project-terraflow.svg'),
    imageAlt: 'Pipeline do TERRAFLOW com código IaC e frota de servidores provisionados',
    year: '2025',
    role: 'Infraestrutura & Automação',
  },
  {
    id: 'vaultsec',
    index: '09',
    name: 'VAULTSEC',
    tagline: 'Auditoria & hardening',
    description:
      'Auditoria de segurança automatizada com IA: varre contas, patches, firewall, backups e senhas vazadas, gera score de 0 a 100, aplica hardening guiado e guarda todos os segredos em cofre criptografado. Entrega relatório executivo pronto para diretoria — do caos ao selo PROTEGIDO.',
    tech: ['OpenCode', 'ChatGPT', 'Bash', 'Cyber Security'],
    image: img('project-vaultsec.svg'),
    imageAlt: 'Painel do VAULTSEC com checklist de hardening, score de segurança e cofre de segredos',
    year: '2026',
    role: 'Cyber Security & Infraestrutura',
  },
  {
    id: 'outros',
    index: '10',
    name: 'OUTROS PROJETOS',
    tagline: 'Automação & infraestrutura',
    description:
      'Scripts de automação, provisionamento de ambientes, monitoramento e integrações entre sistemas — o trabalho que mantém a operação funcionando.',
    tech: ['Gemini', 'OpenCode', 'Antigravity'],
    image: img('project-outros.svg'),
    imageAlt: 'Composição de scripts de automação e painéis de monitoramento de infraestrutura',
    year: '2024 — 2026',
    role: 'Automação & Operação',
  },
];
