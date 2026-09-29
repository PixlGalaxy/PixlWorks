import { AlertCircle, ArrowDown } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { useSpotlight } from '../hooks/useSpotlight'
import { mergeRefs } from '../hooks/mergeRefs'
import { painPoints } from '../data/painPoints'
import { SectionHeader } from './SectionHeader'
import styles from './PainPoints.module.css'

export function PainPoints() {
  const { t } = useLanguage()
  const gridRef = useReveal<HTMLUListElement>(0.05)
  const spotlightRef = useSpotlight<HTMLUListElement>()

  return (
    <section className="section" id="pains">
      <div className="container">
        <SectionHeader
          eyebrow={t('pains.eyebrow')}
          title={t('pains.title')}
          lead={t('pains.lead')}
          icon={AlertCircle}
        />

        <ul ref={mergeRefs(gridRef, spotlightRef)} className={`reveal ${styles.grid}`}>
          {painPoints.map(({ id, icon: Icon, accent }) => (
            <li
              key={id}
              className={`glass-card ${styles.card}`}
              style={{ '--accent-color': accent } as CSSProperties}
            >
              <span className={styles.icon}>
                <Icon size={19} />
              </span>
              <p className={styles.problem}>{t(`pains.items.${id}.problem`)}</p>
              <div className={styles.divider}>
                <ArrowDown size={13} aria-hidden="true" />
                <span>{t('pains.solutionLabel')}</span>
              </div>
              <p className={styles.solution}>{t(`pains.items.${id}.solution`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
