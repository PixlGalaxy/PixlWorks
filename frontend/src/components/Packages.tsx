import { Check, Package as PackageIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { useSpotlight } from '../hooks/useSpotlight'
import { mergeRefs } from '../hooks/mergeRefs'
import { packages } from '../data/packages'
import { SECTIONS } from '../data/site'
import { CONTACT_ANCHOR, requestQuote } from '../lib/leadIntent'
import { SectionHeader } from './SectionHeader'
import styles from './Packages.module.css'


export function Packages() {
  const { t, tList } = useLanguage()
  const gridRef = useReveal<HTMLUListElement>(0.05)
  const spotlightRef = useSpotlight<HTMLUListElement>()

  return (
    <section className="section" id={SECTIONS.pricing}>
      <div className="container">
        <SectionHeader
          eyebrow={t('packages.eyebrow')}
          title={t('packages.title')}
          lead={t('packages.lead')}
          icon={PackageIcon}
        />

        <ul ref={mergeRefs(gridRef, spotlightRef)} className={`reveal ${styles.grid}`}>
          {packages.map(({ id, icon: Icon, featured, accent }) => {
            const name = t(`packages.items.${id}.name`)
            return (
              <li
                key={id}
                className={`glass-card ${styles.card} ${featured ? styles.featured : ''}`}
                style={{ '--accent-color': accent } as CSSProperties}
              >
                {featured ? <span className={styles.badge}>{t('packages.badge')}</span> : null}

                <span className={styles.icon}>
                  <Icon size={20} />
                </span>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.desc}>{t(`packages.items.${id}.desc`)}</p>

                <ul className={styles.features}>
                  {tList(`packages.items.${id}.features`).map((feature) => (
                    <li key={feature}>
                      <Check size={14} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Scrolls to the form and prefills it, so a quote request is
                    captured as a lead rather than lost in an inbox. */}
                <a
                  href={CONTACT_ANCHOR}
                  onClick={() => requestQuote(name)}
                  className={`cta-button cta-button--ghost ${styles.cta}`}
                >
                  {t('packages.cta')}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
