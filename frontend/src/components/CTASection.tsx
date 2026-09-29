import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AlertCircle, Check, CheckCircle2, GitBranch, Mail, Rocket, Send } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { API_BASE, CONTACT_LINKS, SECTIONS } from '../data/site'
import { QUOTE_EVENT } from '../lib/leadIntent'
import styles from './CTASection.module.css'

type FormState = 'idle' | 'sending' | 'success' | 'error'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/

export function CTASection() {
  const { t, tList, lang } = useLanguage()
  const ref = useReveal<HTMLDivElement>(0.1)
  const nameRef = useRef<HTMLInputElement>(null)

  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' })

  // A package quote button anchors here; fill in what they asked about and put
  // the cursor in the first empty field so all that is left is their details.
  useEffect(() => {
    const onQuote = (event: Event) => {
      const packageName = (event as CustomEvent<string>).detail
      setForm((prev) => ({
        ...prev,
        message: t('cta.form.prefill').replace('{package}', packageName),
      }))
      setState('idle')
      window.setTimeout(() => nameRef.current?.focus(), 450)
    }

    window.addEventListener(QUOTE_EVENT, onQuote)
    return () => window.removeEventListener(QUOTE_EVENT, onQuote)
  }, [t])

  const update = (field: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'sending') return

    if (!form.name.trim() || !form.email.trim()) {
      setState('error')
      setError(t('cta.form.required'))
      return
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setState('error')
      setError(t('cta.form.errorEmail'))
      return
    }

    setState('sending')
    setError('')

    try {
      const res = await fetch(`${API_BASE}/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      })

      if (res.ok) {
        setState('success')
        setForm({ name: '', email: '', business: '', message: '' })
        return
      }

      const body = (await res.json().catch(() => null)) as { state?: string } | null
      setState('error')
      if (res.status === 429 || body?.state === 'rate_limited') setError(t('cta.form.errorRate'))
      else if (body?.state === 'invalid_email') setError(t('cta.form.errorEmail'))
      else setError(t('cta.form.errorGeneric'))
    } catch {
      // Backend down: the mailto CTA above still works, so say so.
      setState('error')
      setError(t('cta.form.errorGeneric'))
    }
  }

  return (
    <section className="section" id={SECTIONS.contact}>
      <div className="container">
        <div ref={ref} className={`reveal ${styles.panel}`}>
          <div className={styles.copy}>
            <span className="section-eyebrow">
              <Rocket size={14} aria-hidden="true" />
              {t('cta.eyebrow')}
            </span>
            <h2 className={styles.title}>{t('cta.title')}</h2>
            <p className={styles.body}>{t('cta.body')}</p>

            {/* Reassurance instead of a competing mailto button: the form to
                the right is the conversion path, and a second call to action
                here would only split attention away from it. */}
            <ul className={styles.bullets}>
              {tList('cta.bullets').map((item) => (
                <li key={item}>
                  <Check size={15} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={CONTACT_LINKS.github}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.secondary}
            >
              <GitBranch size={15} aria-hidden="true" />
              {t('cta.github')}
            </a>
          </div>

          <form className={`glass-card ${styles.form}`} onSubmit={onSubmit} noValidate>
            <h3 className={styles.formTitle}>{t('cta.form.title')}</h3>

            <div className={styles.row}>
              <label className={styles.field}>
                <span>{t('cta.form.name')}</span>
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  placeholder={t('cta.form.namePlaceholder')}
                  onChange={(e) => update('name')(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <span>{t('cta.form.email')}</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  placeholder={t('cta.form.emailPlaceholder')}
                  onChange={(e) => update('email')(e.target.value)}
                />
              </label>
            </div>

            <label className={styles.field}>
              <span>{t('cta.form.business')}</span>
              <input
                type="text"
                name="business"
                value={form.business}
                placeholder={t('cta.form.businessPlaceholder')}
                onChange={(e) => update('business')(e.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span>{t('cta.form.message')}</span>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                placeholder={t('cta.form.messagePlaceholder')}
                onChange={(e) => update('message')(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className={`cta-button cta-button--primary ${styles.submit}`}
              disabled={state === 'sending'}
            >
              <Send size={16} aria-hidden="true" />
              {state === 'sending' ? t('cta.form.sending') : t('cta.form.submit')}
            </button>

            {/* Email stays available, but as a fallback rather than a rival
                button — a submitted form is a captured lead, an email is not. */}
            <p className={styles.emailAlt}>
              {t('cta.emailAlt')}{' '}
              <a href={CONTACT_LINKS.email}>
                <Mail size={13} aria-hidden="true" />
                {CONTACT_LINKS.emailPlain}
              </a>
            </p>

            {/* Announced politely so a screen reader hears the result. */}
            <p className={styles.feedback} role="status" aria-live="polite">
              {state === 'success' ? (
                <span className={styles.success}>
                  <CheckCircle2 size={15} aria-hidden="true" />
                  {t('cta.form.success')}
                </span>
              ) : null}
              {state === 'error' && error ? (
                <span className={styles.error}>
                  <AlertCircle size={15} aria-hidden="true" />
                  {error}
                </span>
              ) : null}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
