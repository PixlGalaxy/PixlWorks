import { Store } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { useSpotlight } from '../hooks/useSpotlight'
import { mergeRefs } from '../hooks/mergeRefs'
import { industries } from '../data/industries'
import { SectionHeader } from './SectionHeader'
import styles from './Industries.module.css'

export function Industries() {
  const { t } = useLanguage()
  const gridRef = useReveal<HTMLUListElement>(0.05)
  const spotlightRef = useSpotlight<HTMLUListElement>()

  return (
    <section className="section" id="industries">
      <div className="container">
        <SectionHeader
          eyebrow={t('industries.eyebrow')}
          title={t('industries.title')}
          lead={t('industries.lead')}
          icon={Store}
        />

        <ul ref={mergeRefs(gridRef, spotlightRef)} className={`reveal ${styles.grid}`}>
          {industries.map(({ id, icon: Icon, accent }) => (
            <li
              key={id}
              className={`glass-card ${styles.card}`}
              style={{ '--accent-color': accent } as CSSProperties}
            >
              <span className={styles.icon}>
                <Icon size={18} />
              </span>
              <div>
                <h3 className={styles.name}>{t(`industries.items.${id}.name`)}</h3>
                <p className={styles.desc}>{t(`industries.items.${id}.desc`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
