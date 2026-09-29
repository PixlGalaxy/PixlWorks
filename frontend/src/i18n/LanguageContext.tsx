import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { translations, type Lang } from './translations'

const STORAGE_KEY = 'pixlworks-lang'

/** Regions where a Spanish-speaking visitor is the safe assumption. */
const SPANISH_TIMEZONES = [
  'America/Lima',
  'America/Bogota',
  'America/Mexico_City',
  'America/Santiago',
  'America/Argentina/Buenos_Aires',
  'America/Guayaquil',
  'America/La_Paz',
  'America/Caracas',
  'America/Montevideo',
  'America/Asuncion',
  'America/Panama',
  'America/Costa_Rica',
  'America/Santo_Domingo',
  'Europe/Madrid',
]

function detectLang(): Lang {
  if (typeof window === 'undefined') return 'es'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'es' || stored === 'en') return stored

  const browserLang = navigator.language || 'en'
  if (browserLang.toLowerCase().startsWith('es')) return 'es'

  // Timezone is a non-invasive regional hint, unlike geolocation which would
  // trigger a permission prompt on first paint.
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (SPANISH_TIMEZONES.includes(timezone)) return 'es'
  } catch {
    /* Intl unavailable: fall through to English. */
  }

  return 'en'
}

type Translate = (path: string) => string
type TranslateList = (path: string) => string[]

interface LanguageValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translate
  tList: TranslateList
}

const LanguageContext = createContext<LanguageValue | null>(null)

function resolve(lang: Lang, path: string): unknown {
  let node: unknown = translations[lang]
  for (const key of path.split('.')) {
    if (node === null || typeof node !== 'object') return undefined
    node = (node as Record<string, unknown>)[key]
  }
  return node
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const setLang = useCallback((next: Lang) => {
    const apply = () => setLangState(next)

    // Swapping the language rewrites almost every string on the page. A view
    // transition cross-fades that in one pass instead of letting each block
    // pop independently.
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => unknown
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (doc.startViewTransition && !reduced) doc.startViewTransition(apply)
    else apply()

    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* Private mode: the choice just will not persist. */
    }
  }, [])

  // Keep the document in sync so SEO and screen readers follow the toggle.
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = translations[lang].meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', translations[lang].meta.description)
  }, [lang])

  const value = useMemo<LanguageValue>(() => {
    const t: Translate = (path) => {
      const found = resolve(lang, path)
      // Surfacing the path makes a missing key obvious instead of silent.
      return typeof found === 'string' ? found : path
    }
    const tList: TranslateList = (path) => {
      const found = resolve(lang, path)
      return Array.isArray(found) ? (found as string[]) : []
    }
    return { lang, setLang, t, tList }
  }, [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
