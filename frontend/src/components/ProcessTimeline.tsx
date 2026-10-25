import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { processSteps } from '../data/process'
import { SECTIONS } from '../data/site'
import { SectionHeader } from './SectionHeader'
import styles from './ProcessTimeline.module.css'

/**
 * Five columns divided by hairlines, each led by a large light numeral. The
 * numeral is set in weight 300, the rare light cut Apple saves for big,
 * airy reads.
 */
export function ProcessTimeline() {
  const { t } = useLanguage()
  const listRef = useReveal<HTMLOListElement>(0.05)

  return (
    <section className="section band-white" id={SECTIONS.process}>
      <div className="container">
        <SectionHeader title={t('process.title')} lead={t('process.lead')} />

        <ol ref={listRef} className={`reveal ${styles.track}`}>
          {processSteps.map(({ id }, index) => (
            <li key={id} className={styles.step}>
              <span className={styles.index} aria-hidden="true">
                {index + 1}
              </span>
              <h3 className={styles.name}>{t(`process.steps.${id}.name`)}</h3>
              <p className={styles.desc}>{t(`process.steps.${id}.desc`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
