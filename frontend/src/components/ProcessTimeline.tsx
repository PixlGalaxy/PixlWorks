import { Route } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { processSteps } from '../data/process'
import { SECTIONS } from '../data/site'
import { SectionHeader } from './SectionHeader'
import styles from './ProcessTimeline.module.css'

export function ProcessTimeline() {
  const { t } = useLanguage()
  const listRef = useReveal<HTMLOListElement>(0.05)

  return (
    <section className="section" id={SECTIONS.process}>
      <div className="container">
        <SectionHeader
          eyebrow={t('process.eyebrow')}
          title={t('process.title')}
          lead={t('process.lead')}
          icon={Route}
        />

        <ol ref={listRef} className={`reveal ${styles.timeline}`}>
          {processSteps.map(({ id, icon: Icon }, index) => (
            <li key={id} className={styles.step}>
              <div className={styles.marker}>
                <span className={styles.dot}>
                  <Icon size={17} />
                </span>
                {index < processSteps.length - 1 ? <span className={styles.line} /> : null}
              </div>

              <div className={`glass-card ${styles.body}`}>
                <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                <h3 className={styles.name}>{t(`process.steps.${id}.name`)}</h3>
                <p className={styles.desc}>{t(`process.steps.${id}.desc`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
