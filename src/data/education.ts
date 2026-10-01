export interface EducationItem {
  id: string;
  institution: string;
  course: string;
  area: string;
  year: string;
  status: 'concluído' | 'em andamento' | 'previsto';
  kind: 'Formação' | 'Certificação' | 'Curso';
}

export const education: EducationItem[] = [
  {
    id: 'edu-mba',
    institution: 'MBA em Cyber Security',
    course: 'MBA em Cyber Security',
    area: 'Segurança da Informação',
    year: '2026',
    status: 'em andamento',
    kind: 'Formação',
  },
  {
    id: 'edu-cisco',
    institution: 'Cisco Networking Academy',
    course: 'Redes de Computadores',
    area: 'Redes e Infraestrutura',
    year: '2024 — 2025',
    status: 'concluído',
    kind: 'Certificação',
  },
  {
    id: 'edu-cyber',
    institution: 'Cyber Security',
    course: 'Fundamentos de Segurança Cibernética',
    area: 'Cyber Security',
    year: '2025',
    status: 'concluído',
    kind: 'Certificação',
  },
  {
    id: 'edu-dev',
    institution: 'Desenvolvimento de Sistemas',
    course: 'Desenvolvimento de Sistemas Web',
    area: 'Desenvolvimento',
    year: '2024',
    status: 'concluído',
    kind: 'Formação',
  },
  {
    id: 'edu-courses',
    institution: 'Cursos e Certificações',
    course: 'Linux, Cloud, Automação e Governança de TI',
    area: 'Continuidade técnica',
    year: '2025 — 2026',
    status: 'concluído',
    kind: 'Curso',
  },
  {
    id: 'edu-next',
    institution: 'Próximo passo',
    course: 'Aprofundamento em Cloud e Governança de Segurança',
    area: 'Estudo contínuo',
    year: '2027',
    status: 'previsto',
    kind: 'Formação',
  },
];
