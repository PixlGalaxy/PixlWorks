import { ArrowUpRight, Code2, GitBranch } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { useSpotlight } from '../hooks/useSpotlight'
import { mergeRefs } from '../hooks/mergeRefs'
import { projects } from '../data/projects'
import { CONTACT_LINKS, SECTIONS } from '../data/site'
import { SectionHeader } from './SectionHeader'
import styles from './Projects.module.css'

export function Projects() {
  const { t } = useLanguage()
  const gridRef = useReveal<HTMLUListElement>(0.05)
  const spotlightRef = useSpotlight<HTMLUListElement>()

  return (
    <section className="section" id={SECTIONS.work}>
      <div className="container">
        <SectionHeader
          eyebrow={t('projects.eyebrow')}
          title={t('projects.title')}
          lead={t('projects.lead')}
          icon={Code2}
        />

        <ul ref={mergeRefs(gridRef, spotlightRef)} className={`reveal ${styles.grid}`}>
          {projects.map(({ id, name, icon: Icon, url, stack, accent }) => (
            <li
              key={id}
              className={`glass-card ${styles.card}`}
              style={{ '--accent-color': accent } as CSSProperties}
            >
              <div className={styles.head}>
                <span className={styles.icon}>
                  <Icon size={21} />
                </span>
                <GitBranch size={17} className={styles.github} aria-hidden="true" />
              </div>

              <h3 className={styles.name}>{name}</h3>
              <p className={styles.desc}>{t(`projects.items.${id}.desc`)}</p>

              <ul className={styles.stack}>
                {stack.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>

              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.view}
              >
                {t('projects.view')}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.more}>
          <a
            href={CONTACT_LINKS.github}
            target="_blank"
            rel="noreferrer noopener"
            className="cta-button cta-button--ghost"
          >
            <GitBranch size={16} aria-hidden="true" />
            github.com/PixlGalaxy
          </a>
        </div>
      </div>
    </section>
  )
}
