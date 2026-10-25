import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { industries } from '../data/industries'
import { SectionHeader } from './SectionHeader'
import styles from './Industries.module.css'

/** A feature grid in Apple's manner: a line glyph, a bold name, one grey line. */
export function Industries() {
  const { t } = useLanguage()
  const gridRef = useReveal<HTMLUListElement>(0.05)

  return (
    <section className="section band-parchment" id="industries">
      <div className="container">
        <SectionHeader title={t('industries.title')} lead={t('industries.lead')} />

        <ul ref={gridRef} className={`reveal ${styles.grid}`}>
          {industries.map(({ id, icon: Icon }) => (
            <li key={id} className={styles.item}>
              <Icon size={28} strokeWidth={1.5} className={styles.icon} aria-hidden="true" />
              <h3 className={styles.name}>{t(`industries.items.${id}.name`)}</h3>
              <p className={styles.desc}>{t(`industries.items.${id}.desc`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
