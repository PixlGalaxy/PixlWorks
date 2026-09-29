export const SITE_URL = 'https://pixlworks.itzgalaxy.com'

/**
 * Public API prefix. nginx maps `/backend/api/` to the backend's own `/api/`,
 * and the Vite dev proxy does the same rewrite, so this is the only place the
 * path is spelled out.
 */
export const API_BASE = '/backend/api'

export const CONTACT_LINKS = {
  email: 'mailto:contact@fabriziogamboa.com?subject=PixlWorks%20Free%20Audit',
  emailPlain: 'contact@fabriziogamboa.com',
  github: 'https://github.com/PixlGalaxy',
  resume: 'https://fabriziogamboa.com',
  itzgalaxy: 'https://itzgalaxy.com',
} as const

/** Anchor targets used by the navbar and every in-page CTA. */
export const SECTIONS = {
  solutions: 'solutions',
  work: 'work',
  process: 'process',
  pricing: 'pricing',
  contact: 'contact',
} as const
