import type { SVGProps } from 'react';

type IconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  size?: number | string;
};

const base = ({ size = 24, ...props }: IconProps) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...props,
});

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v1.5" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 21l1.7-4.9A8.4 8.4 0 1 1 8 19.5" />
      <path d="M8.6 8.4c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4-.1.6l-.4.4a6 6 0 0 0 2.6 2.5l.4-.5c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .6-.4 1.4-1 1.5-1 .2-2.4-.2-4.2-1.9-1.8-1.7-2.7-3.5-2.6-4.4 0-.5.2-1 .5-1.2" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2.5 6.5 8.4 6a1.7 1.7 0 0 0 2.2 0l8.4-6" />
    </svg>
  );
}
