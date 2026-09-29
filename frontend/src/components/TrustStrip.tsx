import { Clock, KeyRound, ShieldCheck, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import styles from './TrustStrip.module.css'

/**
 * Four statements of how PixlWorks works, right under the hero — the spot where
 * a visitor decides whether to keep reading. Deliberately factual commitments
 * rather than metrics, since there are no public client numbers to cite.
 */
const ITEMS: { id: string; icon: LucideIcon }[] = [
  { id: 'speed', icon: Clock },
  { id: 'ownership', icon: KeyRound },
  { id: 'infra', icon: ShieldCheck },
  { id: 'direct', icon: UserRound },
]

export function TrustStrip() {
  const { t } = useLanguage()
  const ref = useReveal<HTMLUListElement>(0.1)

  return (
    <section className={styles.wrap} aria-label={t('trust.label')}>
      <div className="container">
        <ul ref={ref} className={`reveal ${styles.grid}`}>
          {ITEMS.map(({ id, icon: Icon }) => (
            <li key={id} className={styles.item}>
              <Icon size={17} className={styles.icon} aria-hidden="true" />
              <div className={styles.text}>
                <strong>{t(`trust.items.${id}.title`)}</strong>
                <span>{t(`trust.items.${id}.desc`)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
