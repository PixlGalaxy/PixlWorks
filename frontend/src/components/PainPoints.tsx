import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { painPoints } from '../data/painPoints'
import { SectionHeader } from './SectionHeader'
import styles from './PainPoints.module.css'

/**
 * A horizontal gallery of tall cards, the way Apple runs "Get to know
 * iPhone": the problem as a small caption, our answer as the headline. It
 * scrolls natively (touch, trackpad, shift-wheel); the two buttons just step
 * it one card at a time for mouse and keyboard users.
 */
export function PainPoints() {
  const { t } = useLanguage()
  const trackRef = useRef<HTMLUListElement>(null)

  function step(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const distance = card ? card.offsetWidth + gap : track.clientWidth * 0.8
    track.scrollBy({ left: direction * distance, behavior: 'smooth' })
  }

  return (
    <section className="section band-white" id="pains">
      <div className="container">
        <SectionHeader title={t('pains.title')} lead={t('pains.lead')} />
      </div>

      <ul ref={trackRef} className={styles.track} aria-label={t('pains.eyebrow')}>
        {painPoints.map(({ id }) => (
          <li key={id} className={styles.card}>
            <p className={styles.problem}>{t(`pains.items.${id}.problem`)}</p>
            <p className={styles.solution}>{t(`pains.items.${id}.solution`)}</p>
          </li>
        ))}
      </ul>

      <div className={`container ${styles.controls}`}>
        <button type="button" className={styles.arrow} onClick={() => step(-1)} aria-label={t('pains.prev')}>
          <ChevronLeft size={20} />
        </button>
        <button type="button" className={styles.arrow} onClick={() => step(1)} aria-label={t('pains.next')}>
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
