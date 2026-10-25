import { ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { SECTIONS } from '../data/site'
import { CONTACT_ANCHOR } from '../lib/leadIntent'
import styles from './Hero.module.css'

/**
 * Apple's hero grammar: one headline, one line of support, a pill and a text
 * link. No badge, no illustration and no invented numbers; the type is the
 * whole composition.
 */
export function Hero() {
  const { t } = useLanguage()

  return (
    <section className={`band-black ${styles.hero}`} id="top">
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.title}>{t('hero.title')}</h1>
        <p className={styles.subtitle}>{t('hero.subtitle')}</p>

        <div className={styles.ctas}>
          <a href={CONTACT_ANCHOR} className="btn btn--primary">
            {t('hero.ctaPrimary')}
          </a>
          <a href={`#${SECTIONS.solutions}`} className="text-link">
            {t('hero.ctaSecondary')}
            <ChevronRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
