import { Mail } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { services } from '../data/services'
import { projects } from '../data/projects'
import { CONTACT_LINKS, SECTIONS } from '../data/site'
import { Logo } from './Logo'
import styles from './Footer.module.css'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandColumn}>
          <Logo size={30} />
          <p className={styles.tagline}>{t('footer.tagline')}</p>
          <a href={CONTACT_LINKS.email} className={styles.email}>
            <Mail size={15} aria-hidden="true" />
            {CONTACT_LINKS.emailPlain}
          </a>
        </div>

        <nav className={styles.column} aria-label={t('footer.services')}>
          <h2 className={styles.heading}>{t('footer.services')}</h2>
          <ul>
            {services.map(({ id }) => (
              <li key={id}>
                <a href={`#${SECTIONS.solutions}`}>{t(`solutions.items.${id}.title`)}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.column} aria-label={t('footer.projects')}>
          <h2 className={styles.heading}>{t('footer.projects')}</h2>
          <ul>
            {projects.map(({ id, name, url }) => (
              <li key={id}>
                <a href={url} target="_blank" rel="noreferrer noopener">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.column} aria-label={t('footer.links')}>
          <h2 className={styles.heading}>{t('footer.links')}</h2>
          <ul>
            <li>
              <a href={`#${SECTIONS.process}`}>{t('nav.process')}</a>
            </li>
            <li>
              <a href={`#${SECTIONS.pricing}`}>{t('nav.pricing')}</a>
            </li>
            <li>
              <a href={`#${SECTIONS.contact}`}>{t('nav.contact')}</a>
            </li>
            <li>
              <a href={CONTACT_LINKS.resume} target="_blank" rel="noreferrer noopener">
                {t('founder.links.resume')}
              </a>
            </li>
            <li>
              <a href={CONTACT_LINKS.itzgalaxy} target="_blank" rel="noreferrer noopener">
                ItzGalaxy
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.hosted}>
          Hosted in{' '}
          <a href={CONTACT_LINKS.itzgalaxy} target="_blank" rel="noreferrer noopener">
            itzgalaxy.com
          </a>{' '}
          · Developed by{' '}
          <a href={CONTACT_LINKS.github} target="_blank" rel="noreferrer noopener">
            PixlGalaxy
          </a>
        </p>
        <p className={styles.rights}>{t('footer.rights')}</p>
      </div>
    </footer>
  )
}
