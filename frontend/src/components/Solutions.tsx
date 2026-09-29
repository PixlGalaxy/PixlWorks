import { Layers } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { useSpotlight } from '../hooks/useSpotlight'
import { mergeRefs } from '../hooks/mergeRefs'
import { services } from '../data/services'
import { SECTIONS } from '../data/site'
import { SectionHeader } from './SectionHeader'
import styles from './Solutions.module.css'

export function Solutions() {
  const { t } = useLanguage()
  const gridRef = useReveal<HTMLUListElement>(0.05)
  const spotlightRef = useSpotlight<HTMLUListElement>()

  return (
    <section className="section" id={SECTIONS.solutions}>
      <div className="container">
        <SectionHeader
          eyebrow={t('solutions.eyebrow')}
          title={t('solutions.title')}
          lead={t('solutions.lead')}
          icon={Layers}
        />

        <ul ref={mergeRefs(gridRef, spotlightRef)} className={`reveal ${styles.grid}`}>
          {services.map(({ id, icon: Icon, accent, tags }) => (
            <li
              key={id}
              className={`glass-card ${styles.card}`}
              style={{ '--accent-color': accent } as CSSProperties}
            >
              <span className={styles.icon}>
                <Icon size={21} />
              </span>
              <h3 className={styles.title}>{t(`solutions.items.${id}.title`)}</h3>
              <p className={styles.desc}>{t(`solutions.items.${id}.desc`)}</p>
              <ul className={styles.tags}>
                {tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
