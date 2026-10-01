import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { profile, socials } from '../../../data/profile';
import { useReveal } from '../../../hooks/useReveal';
import {
  LinkedinIcon,
  MailIcon,
  WhatsappIcon,
} from '../../ui/BrandIcons';
import { SectionHeading } from '../../ui/SectionHeading';
import { SpotlightCard } from '../../ui/SpotlightCard';
import styles from './Contact.module.css';

const SOCIAL_ICONS = {
  linkedin: LinkedinIcon,
  email: MailIcon,
  whatsapp: WhatsappIcon,
} as const;

type Status = 'idle' | 'sending' | 'sent';

export function Contact() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.08 });
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '' });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Sem backend por enquanto: integra com um serviço externo no futuro.
    setStatus('sending');
    window.setTimeout(() => {
      setStatus('sent');
      setForm({ nome: '', email: '', assunto: '', mensagem: '' });
    }, 700);
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <section id="contato" className="section" aria-labelledby="contato-titulo">
      <div className="container" ref={ref}>
        <div>
          <SectionHeading
            index="07"
            eyebrow="Contato"
            title={
              <span id="contato-titulo">
                VAMOS CONSTRUIR <em>ALGO?</em>
              </span>
            }
            description="Tem um projeto, ideia ou oportunidade? Vamos conversar."
          />
        </div>

        <div className={styles.layout}>
          <div className={styles.side}>
            <p className={styles.sideText} data-reveal>
              Respondo em até 24 horas úteis. Quanto mais contexto sobre o
              ambiente ou o problema, mais precisa é a primeira conversa.
            </p>

            <ul className={styles.channels} data-reveal>
              {socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.key];
                return (
                  <li key={social.key}>
                    <SpotlightCard
                      as="a"
                      className={styles.channel}
                      href={social.href}
                      target={social.key === 'email' ? undefined : '_blank'}
                      rel="noreferrer"
                      data-cursor="link"
                    >
                      <span className={styles.channelIcon} aria-hidden="true">
                        <Icon size={17} strokeWidth={1.6} />
                      </span>
                      <span className={styles.channelBody}>
                        <span className={styles.channelLabel}>{social.label}</span>
                        <span className={styles.channelValue}>{social.handle}</span>
                      </span>
                      <span className={styles.channelArrow} aria-hidden="true">
                        <Send size={14} strokeWidth={1.6} />
                      </span>
                    </SpotlightCard>
                  </li>
                );
              })}
            </ul>

            <div className={styles.statusCard} data-reveal>
              <span className={styles.statusDot} aria-hidden="true" />
              <div>
                <span className={styles.statusTitle}>{profile.availability}</span>
                <span className={styles.statusText}>
                  Resposta em até 24h úteis · {profile.location}
                </span>
              </div>
            </div>
          </div>

          <SpotlightCard className={styles.formCard} data-reveal>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span className={styles.label}>Nome</span>
                  <input
                    className={styles.input}
                    type="text"
                    name="nome"
                    autoComplete="name"
                    placeholder="Seu nome"
                    required
                    {...field('nome')}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>E-mail</span>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="voce@empresa.com"
                    required
                    {...field('email')}
                  />
                </label>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>Assunto</span>
                <input
                  className={styles.input}
                  type="text"
                  name="assunto"
                  placeholder="Infraestrutura, redes, sistema…"
                  required
                  {...field('assunto')}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Mensagem</span>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  name="mensagem"
                  rows={5}
                  placeholder="Descreva o contexto, o problema e o que espera resolver."
                  required
                  {...field('mensagem')}
                />
              </label>

              <div className={styles.formFoot}>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={status === 'sending'}
                  data-cursor="link"
                >
                  {status === 'sent' ? 'Mensagem enviada' : 'Enviar mensagem'}
                  <Send size={14} strokeWidth={1.8} />
                </button>
                <p className={styles.note} role="status" aria-live="polite">
                  {status === 'sent'
                    ? 'Recebido. Agradeço o contato — respondo em breve.'
                    : 'Seus dados ficam apenas no navegador.'}
                </p>
              </div>
            </form>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
