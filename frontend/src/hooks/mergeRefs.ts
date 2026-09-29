import type { Ref, RefCallback } from 'react'

/**
 * Point several refs at the same node.
 *
 * The card grids need two: one for the scroll reveal and one for the pointer
 * spotlight, and an element only takes a single `ref`.
 */
export function mergeRefs<T>(...refs: Ref<T>[]): RefCallback<T> {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as { current: T | null }).current = node
    }
  }
}
