export type StatValue = number | string;

export interface Stat {
  id: string;
  value: StatValue;
  prefix?: string;
  suffix?: string;
  label: string;
  caption: string;
}

export const stats: Stat[] = [
  {
    id: 'years',
    value: 4,
    suffix: '+',
    label: 'Anos com tecnologia',
    caption: 'Experiência acumulada em TI',
  },
  {
    id: 'projects',
    value: 12,
    suffix: '+',
    label: 'Projetos desenvolvidos',
    caption: 'Sistemas e ambientes entregues',
  },
  {
    id: 'ai',
    value: 12,
    suffix: '+',
    label: 'Sistemas com IA',
    caption: 'Do prompt ao deploy',
  },
  {
    id: 'focus',
    value: 'IT + IA',
    label: 'Infraestrutura & IA',
    caption: 'Especialidade principal',
  },
];
