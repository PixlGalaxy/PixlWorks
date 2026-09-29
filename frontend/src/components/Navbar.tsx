import { useEffect, useState } from 'react'
import { ArrowDown, Menu, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useActiveSection } from '../hooks/useActiveSection'
import { SECTIONS } from '../data/site'
import { CONTACT_ANCHOR } from '../lib/leadIntent'
import { LanguageToggle } from './LanguageToggle'
import { Logo } from './Logo'
import styles from './Navbar.module.css'

/** Must stay in the same order the sections appear on the page, or the
    scroll-spy highlight jumps backwards as the visitor scrolls. */
const LINKS = [
  { id: SECTIONS.solutions, key: 'nav.solutions' },
  { id: SECTIONS.process, key: 'nav.process' },
  { id: SECTIONS.work, key: 'nav.work' },
  { id: SECTIONS.pricing, key: 'nav.pricing' },
  { id: SECTIONS.contact, key: 'nav.contact' },
]

/** Stable identity: the scroll-spy effect depends on this array. */
const SECTION_IDS = LINKS.map((link) => link.id)

export function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The open mobile sheet covers the page, so the body must not scroll behind it.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      {/* Reading progress, driven entirely by the document scroll timeline. */}
      <span className={styles.progress} aria-hidden="true" />

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <nav className={styles.nav} aria-label="Main">
          <a href="#top" className={styles.brand} aria-label="PixlWorks">
            <Logo size={30} />
            <span className={styles.byline}>{t('nav.byline')}</span>
          </a>

          <ul className={styles.links}>
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`${styles.link} ${active === link.id ? styles.linkActive : ''}`}
                  // Communicates the highlight to assistive tech, which cannot
                  // see the pill behind the label.
                  aria-current={active === link.id ? 'true' : undefined}
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <LanguageToggle />
            <a href={CONTACT_ANCHOR} className={`cta-button cta-button--primary ${styles.cta}`}>
              {t('nav.cta')}
              <ArrowDown size={15} className={styles.ctaIcon} aria-hidden="true" />
            </a>
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen ? (
        <div className={styles.sheet} id="mobile-menu">
          <button
            type="button"
            className={styles.sheetClose}
            onClick={() => setMenuOpen(false)}
            aria-label={t('nav.closeMenu')}
          >
            <X size={22} />
          </button>
          <ul className={styles.sheetLinks}>
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={active === link.id ? styles.sheetActive : undefined}
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={CONTACT_ANCHOR}
            className="cta-button cta-button--primary"
            onClick={() => setMenuOpen(false)}
          >
            {t('nav.cta')}
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </>
  )
}
