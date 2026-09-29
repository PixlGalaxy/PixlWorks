import { ArrowUpRight, GitBranch, Globe, Orbit, ShieldCheck, Terminal } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { founderStack } from '../data/process'
import { CONTACT_LINKS } from '../data/site'
import styles from './Founder.module.css'

export function Founder() {
  const { t } = useLanguage()
  const ref = useReveal<HTMLDivElement>(0.1)

  const links = [
    { href: CONTACT_LINKS.resume, label: t('founder.links.resume'), icon: Globe },
    { href: CONTACT_LINKS.github, label: t('founder.links.github'), icon: GitBranch },
    { href: CONTACT_LINKS.itzgalaxy, label: t('founder.links.itzgalaxy'), icon: Orbit },
  ]

  return (
    <section className="section" id="founder">
      <div className="container">
        <div ref={ref} className={`reveal glass-card ${styles.panel}`}>
          <div className={styles.copy}>
            <span className="section-eyebrow">
              <ShieldCheck size={14} aria-hidden="true" />
              {t('founder.eyebrow')}
            </span>
            <h2 className={styles.title}>{t('founder.title')}</h2>
            <p className={styles.body}>{t('founder.body')}</p>
            <p className={styles.note}>{t('founder.note')}</p>

            <ul className={styles.links}>
              {links.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.link}
                  >
                    <Icon size={15} aria-hidden="true" />
                    {label}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Full width across the bottom of the panel rather than squeezed into
              a side column, where it read as an afterthought. */}
          <div className={styles.stackBand}>
            <span className={styles.stackLabel}>
              <Terminal size={13} aria-hidden="true" />
              {t('founder.stackLabel')}
            </span>

            <div className={styles.stackGrid}>
              {founderStack.map(({ id, items }) => (
                <div key={id} className={styles.group}>
                  <h3 className={styles.groupLabel}>{t(`founder.stackGroups.${id}`)}</h3>
                  <ul className={styles.groupItems}>
                    {items.map((item) => (
                      <li key={item} className={styles.chip}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
