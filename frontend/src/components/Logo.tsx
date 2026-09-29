import styles from './Logo.module.css'

interface LogoProps {
  /** Pixel size of the square mark. The wordmark scales with its own font size. */
  size?: number
  showMark?: boolean
}

/**
 * Brand mark plus wordmark, shared by the navbar and the footer.
 *
 * The mark points at the same `/favicon.svg` the browser tab uses, so the four
 * pixel colours only ever need changing in one file.
 */
export function Logo({ size = 28, showMark = true }: LogoProps) {
  return (
    <span className={styles.logo}>
      {showMark ? (
        <img
          className={styles.mark}
          src="/favicon.svg"
          width={size}
          height={size}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
      ) : null}

      <span className={styles.wordmark}>
        <span className={styles.pixl}>Pixl</span>
        <span className={styles.works}>Works</span>
      </span>
    </span>
  )
}
