import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarCheck,
  Database,
  Globe,
  MessageSquare,
  Server,
  Sparkles,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Fragment, type CSSProperties } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { SECTIONS } from '../data/site'
import { CONTACT_ANCHOR } from '../lib/leadIntent'
import styles from './Hero.module.css'

const BADGES: { label: string; icon: LucideIcon }[] = [
  { label: 'Web Apps', icon: Workflow },
  { label: 'AI Automation', icon: Bot },
  { label: 'Dashboards', icon: BarChart3 },
  { label: 'Chatbots', icon: MessageSquare },
  { label: 'Websites', icon: Globe },
  { label: 'Self-hosted', icon: Server },
]

const CARDS: { id: string; icon: LucideIcon; accent: string }[] = [
  { id: 'lead', icon: MessageSquare, accent: 'var(--i-indigo)' },
  { id: 'booking', icon: CalendarCheck, accent: 'var(--i-cyan)' },
  { id: 'inventory', icon: Database, accent: 'var(--i-violet)' },
  { id: 'dashboard', icon: BarChart3, accent: 'var(--i-green)' },
  { id: 'ai', icon: Bot, accent: 'var(--i-amber)' },
]

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <span className={styles.badge}>
            <Sparkles size={13} aria-hidden="true" />
            {t('hero.badge')}
          </span>

          {/* Split per word so the headline resolves in a stagger rather than
              fading in as one block. aria-label keeps it a single string for
              assistive tech, which would otherwise read it word by word. */}
          <h1 className={styles.title} aria-label={t('hero.title')}>
            {t('hero.title')
              .split(' ')
              .map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  <span
                    className={styles.word}
                    style={{ animationDelay: `${0.18 + index * 0.055}s` }}
                    aria-hidden="true"
                  >
                    {word}
                  </span>{' '}
                </Fragment>
              ))}
          </h1>
          <p className={styles.subtitle}>{t('hero.subtitle')}</p>

          <div className={styles.ctas}>
            <a href={CONTACT_ANCHOR} className="cta-button cta-button--primary">
              {t('hero.ctaPrimary')}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a href={`#${SECTIONS.solutions}`} className="cta-button cta-button--ghost">
              {t('hero.ctaSecondary')}
            </a>
          </div>

          <ul className={styles.badges}>
            {BADGES.map(({ label, icon: Icon }) => (
              <li key={label} className="tag">
                <Icon size={13} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative: it illustrates outcomes rather than carrying information. */}
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.visualGlow} />
          <ul className={styles.cards}>
            {CARDS.map(({ id, icon: Icon, accent }, index) => (
              <li
                key={id}
                className={`glass-card ${styles.card}`}
                style={{
                  '--accent-color': accent,
                  animationDelay: `${index * 0.14}s`,
                } as CSSProperties}
              >
                <span className={styles.cardIcon}>
                  <Icon size={17} />
                </span>
                <span className={styles.cardText}>
                  <strong>{t(`hero.cards.${id}`)}</strong>
                  <small>{t(`hero.cards.${id}Meta`)}</small>
                </span>
                <span className={styles.cardDot} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
