import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { packages } from '../data/packages'
import { SECTIONS } from '../data/site'
import { CONTACT_ANCHOR, requestQuote } from '../lib/leadIntent'
import { SectionHeader } from './SectionHeader'
import styles from './Packages.module.css'

/**
 * Laid out like Apple's "compare models" page: centred columns divided by
 * hairlines, the action high up, then a list of what each one includes. The
 * recommended package is marked by a word and the only filled button.
 */
export function Packages() {
  const { t, tList } = useLanguage()
  const gridRef = useReveal<HTMLUListElement>(0.05)

  return (
    <section className="section band-white" id={SECTIONS.pricing}>
      <div className="container">
        <SectionHeader title={t('packages.title')} lead={t('packages.lead')} />

        <ul ref={gridRef} className={`reveal ${styles.grid}`}>
          {packages.map(({ id, icon: Icon, featured }) => {
            const name = t(`packages.items.${id}.name`)
            return (
              <li key={id} className={styles.column}>
                <span className={styles.badge}>{featured ? t('packages.badge') : ' '}</span>
                <Icon size={40} strokeWidth={1.5} className={styles.icon} aria-hidden="true" />
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.desc}>{t(`packages.items.${id}.desc`)}</p>

                {/* Scrolls to the form and prefills it, so a quote request is
                    captured as a lead rather than lost in an inbox. */}
                <a
                  href={CONTACT_ANCHOR}
                  onClick={() => requestQuote(name)}
                  className={`btn ${featured ? 'btn--primary' : 'btn--ghost'}`}
                >
                  {t('packages.cta')}
                </a>

                <ul className={styles.features}>
                  {tList(`packages.items.${id}.features`).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
