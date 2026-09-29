import { useEffect, useRef } from 'react'

/**
 * Tracks the pointer across a grid and writes its position onto whichever
 * `.glass-card` is under it, which `index.css` renders as a soft spotlight.
 *
 * One listener on the container rather than one per card, and the write is a
 * custom property so it never triggers layout or paint of the React tree.
 */
export function useSpotlight<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Pointer effects are noise for touch and for reduced-motion users.
    if (!window.matchMedia('(hover: hover)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let pending: { card: HTMLElement; x: number; y: number } | null = null

    const flush = () => {
      frame = 0
      if (!pending) return
      const { card, x, y } = pending
      card.style.setProperty('--spotlight-x', `${x}px`)
      card.style.setProperty('--spotlight-y', `${y}px`)
      pending = null
    }

    const onMove = (event: PointerEvent) => {
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>('.glass-card')
      if (!card) return

      const rect = card.getBoundingClientRect()
      pending = { card, x: event.clientX - rect.left, y: event.clientY - rect.top }
      // Coalesce to one write per frame; pointermove can fire far more often.
      if (!frame) frame = requestAnimationFrame(flush)
    }

    node.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      node.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}
