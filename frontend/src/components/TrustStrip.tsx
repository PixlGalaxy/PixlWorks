import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import styles from './TrustStrip.module.css'

/**
 * Four statements of how PixlWorks works, right under the hero — the spot where
 * a visitor decides whether to keep reading. Deliberately factual commitments
 * rather than metrics, since there are no public client numbers to cite.
 * Set as plain type in four columns: no icons, no boxes.
 */
const ITEMS = ['speed', 'ownership', 'infra', 'direct']

export function TrustStrip() {
  const { t } = useLanguage()
  const ref = useReveal<HTMLUListElement>(0.1)

  return (
    <section className={`band-black ${styles.wrap}`} aria-label={t('trust.label')}>
      <div className="container">
        <ul ref={ref} className={`reveal ${styles.grid}`}>
          {ITEMS.map((id) => (
            <li key={id} className={styles.item}>
              <strong>{t(`trust.items.${id}.title`)}</strong>
              <span>{t(`trust.items.${id}.desc`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
