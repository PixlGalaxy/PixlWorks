import { ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { projects } from '../data/projects'
import { CONTACT_LINKS, SECTIONS } from '../data/site'
import { SectionHeader } from './SectionHeader'
import styles from './Projects.module.css'

/** Three cards on black, each closing on a text link to the repository. */
export function Projects() {
  const { t } = useLanguage()
  const gridRef = useReveal<HTMLUListElement>(0.05)

  return (
    <section className="section band-black" id={SECTIONS.work}>
      <div className="container">
        <SectionHeader title={t('projects.title')} lead={t('projects.lead')} />

        <ul ref={gridRef} className={`reveal ${styles.grid}`}>
          {projects.map(({ id, name, icon: Icon, url, stack }) => (
            <li key={id} className={styles.card}>
              <Icon size={32} strokeWidth={1.5} className={styles.icon} aria-hidden="true" />
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.desc}>{t(`projects.items.${id}.desc`)}</p>
              <p className={styles.stack}>{stack.join(' · ')}</p>
              <a href={url} target="_blank" rel="noreferrer noopener" className={`text-link ${styles.view}`}>
                {t('projects.view')}
                <ChevronRight size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={CONTACT_LINKS.github}
          target="_blank"
          rel="noreferrer noopener"
          className={`text-link ${styles.more}`}
        >
          github.com/PixlGalaxy
          <ChevronRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
