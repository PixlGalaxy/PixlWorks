import { ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { services } from '../data/services'
import { SECTIONS } from '../data/site'
import { CONTACT_ANCHOR, requestQuote } from '../lib/leadIntent'
import { SectionHeader } from './SectionHeader'
import styles from './Solutions.module.css'

/**
 * One full-bleed tile per service, two across with no gap, alternating dark
 * and light like Apple's homepage grid. The band sequence is chosen so that
 * neither the two-column checkerboard nor the one-column phone stack ever
 * puts two identical surfaces next to each other, and the last tile differs
 * from the parchment Industries band that follows.
 */
const BANDS = ['band-dark', 'band-parchment', 'band-white', 'band-black', 'band-dark', 'band-white']

export function Solutions() {
  const { t } = useLanguage()

  return (
    <section className={`band-black ${styles.section}`} id={SECTIONS.solutions}>
      <div className="container">
        <SectionHeader title={t('solutions.title')} lead={t('solutions.lead')} />
      </div>

      <ul className={styles.grid}>
        {services.map(({ id, icon: Icon, tags }, index) => {
          const title = t(`solutions.items.${id}.title`)
          return (
            <li key={id} className={`${BANDS[index % BANDS.length]} ${styles.tile}`}>
              <Icon size={40} strokeWidth={1.5} className={styles.icon} aria-hidden="true" />
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.desc}>{t(`solutions.items.${id}.desc`)}</p>

              {/* Prefills the contact form with this service, like the
                  package buttons do, so the click is captured as a lead. */}
              <a href={CONTACT_ANCHOR} onClick={() => requestQuote(title)} className="text-link">
                {t('solutions.cta')}
                <ChevronRight size={18} aria-hidden="true" />
              </a>

              <p className={styles.stack}>{tags.join(' · ')}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
