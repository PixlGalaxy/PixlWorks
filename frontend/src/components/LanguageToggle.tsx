import { useLanguage } from '../i18n/LanguageContext'
import type { Lang } from '../i18n/translations'
import styles from './LanguageToggle.module.css'

const OPTIONS: Lang[] = ['es', 'en']

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className={styles.toggle} role="group" aria-label={t('nav.language')}>
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={option === lang ? `${styles.option} ${styles.active}` : styles.option}
          onClick={() => setLang(option)}
          // Not colour alone: assistive tech gets the selected state explicitly.
          aria-pressed={option === lang}
          lang={option}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
