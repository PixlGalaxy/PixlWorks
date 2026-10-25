import styles from './Logo.module.css'

interface LogoProps {
  /** Pixel height of the mark. The wordmark scales with its own font size. */
  size?: number
  showWordmark?: boolean
}

/**
 * A slab "P": square counter, the bowl's top corner cut at 45 degrees, the
 * foot of the stem sheared, and a square full stop in the signal orange.
 * Same geometry as `public/brand/p-chamfer.svg` and the favicon.
 */
const P_PATH = 'M6 4H44L56 16V42H26V54L6 60Z M26 16V30H38V16Z'

export function Logo({ size = 26, showWordmark = true }: LogoProps) {
  return (
    <span className={styles.logo}>
      <svg className={styles.mark} viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
        <path className={styles.letter} fillRule="evenodd" d={P_PATH} />
        <rect className={styles.stop} x="40" y="46" width="14" height="14" />
      </svg>

      {showWordmark ? <span className={styles.wordmark}>PixlWorks</span> : null}
    </span>
  )
}
