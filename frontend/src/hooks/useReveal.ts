import { useEffect, useRef } from 'react'

/** True when the browser can drive the reveal from CSS alone. */
const hasScrollTimeline =
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('animation-timeline: view()')

/**
 * Adds `is-visible` the first time an element scrolls into view, which the
 * `.reveal` class in index.css animates.
 *
 * On browsers with scroll-driven animations this does nothing: the same class
 * is animated natively by `animation-timeline: view()`, off the main thread.
 * The observer is only the fallback path.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (hasScrollTimeline) return

    const node = ref.current
    if (!node) return

    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
