import { ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { founderStack } from '../data/process'
import { CONTACT_LINKS } from '../data/site'
import styles from './Founder.module.css'

/**
 * Editorial two-column spread: the statement and bio on the left, the stack
 * as a plain spec list on the right, the way Apple sets a tech-specs table.
 */
export function Founder() {
  const { t } = useLanguage()
  const ref = useReveal<HTMLDivElement>(0.1)

  const links = [
    { href: CONTACT_LINKS.resume, label: t('founder.links.resume') },
    { href: CONTACT_LINKS.github, label: t('founder.links.github') },
    { href: CONTACT_LINKS.itzgalaxy, label: t('founder.links.itzgalaxy') },
  ]

  return (
    <section className="section band-parchment" id="founder">
      <div ref={ref} className={`container reveal ${styles.layout}`}>
        <div className={styles.copy}>
          <h2 className="section-title">{t('founder.title')}</h2>
          <p className={styles.body}>{t('founder.body')}</p>
          <p className={styles.note}>{t('founder.note')}</p>

          <ul className={styles.links}>
            {links.map(({ href, label }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer noopener" className="text-link">
                  {label}
                  <ChevronRight size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.specs}>
          <h3 className={styles.specsTitle}>{t('founder.stackLabel')}</h3>
          <dl className={styles.specList}>
            {founderStack.map(({ id, items }) => (
              <div key={id} className={styles.specRow}>
                <dt>{t(`founder.stackGroups.${id}`)}</dt>
                <dd>{items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
