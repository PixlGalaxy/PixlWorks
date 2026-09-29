import { SECTIONS } from '../data/site'

export const QUOTE_EVENT = 'pixlworks:quote'

/**
 * Announce that the visitor asked about a specific package.
 *
 * The contact form listens and prefills itself, so a quote request lands as a
 * captured lead instead of an untracked mailto. A DOM event rather than shared
 * state: the two sections are far apart in the tree and this is the only thing
 * they ever need to say to each other.
 */
export function requestQuote(packageName: string) {
  window.dispatchEvent(new CustomEvent(QUOTE_EVENT, { detail: packageName }))
}

/** The in-page contact form — the primary conversion target for every CTA. */
export const CONTACT_ANCHOR = `#${SECTIONS.contact}`
