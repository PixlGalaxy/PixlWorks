import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowDown, Bot, MessageSquare, RotateCcw, Send, Square, X } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useChat } from '../../hooks/useChat'
import { CONTACT_ANCHOR } from '../../lib/leadIntent'
import { StatusPill } from './StatusPill'
import styles from './ChatWidget.module.css'

const MAX_CHARS = 600

export function ChatWidget() {
  const { t, tList } = useLanguage()
  const { messages, status, remaining, send, cancel, reset, refreshStatus, isGenerating, isBlocked } =
    useChat()

  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Follow the answer as it streams in.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, status])

  useEffect(() => {
    if (!open) return
    void refreshStatus()
    inputRef.current?.focus()
  }, [open, refreshStatus])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Closing the panel must also stop the generation on the server.
  function close() {
    cancel()
    setOpen(false)
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const text = draft.trim()
    if (!text || isGenerating || isBlocked) return
    setDraft('')
    void send(text)
  }

  function ask(question: string) {
    if (isGenerating || isBlocked) return
    void send(question)
  }

  const showSuggestions = messages.length === 0 && !isBlocked
  const showRemaining = remaining !== null && remaining <= 2 && remaining > 0
  const errorKey = (['offline', 'busy', 'rate_limited', 'model_missing', 'error'] as const).find(
    (key) => key === status,
  )

  return (
    <>
      <button
        type="button"
        className={styles.launcher}
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={open ? t('chat.close') : t('chat.open')}
        aria-expanded={open}
      >
        {open ? <X size={21} /> : <MessageSquare size={21} />}
        {!open ? <span className={styles.launcherPing} aria-hidden="true" /> : null}
      </button>

      {open ? (
        <div className={styles.panel} role="dialog" aria-label={t('chat.title')}>
          <header className={styles.header}>
            <span className={styles.avatar}>
              <Bot size={18} />
            </span>
            <div className={styles.headerText}>
              <strong>{t('chat.title')}</strong>
              <small>{t('chat.subtitle')}</small>
            </div>
            <button
              type="button"
              className={styles.iconButton}
              onClick={reset}
              aria-label={t('chat.clear')}
              title={t('chat.clear')}
              disabled={messages.length === 0}
            >
              <RotateCcw size={15} />
            </button>
            <button
              type="button"
              className={styles.iconButton}
              onClick={close}
              aria-label={t('chat.close')}
            >
              <X size={17} />
            </button>
          </header>

          <div className={styles.statusBar}>
            <StatusPill status={status} />
          </div>

          <div className={styles.messages} ref={listRef}>
            <div className={`${styles.bubble} ${styles.assistant}`}>{t('chat.greeting')}</div>

            {messages.map((message, index) => {
              const isLast = index === messages.length - 1
              const live = isLast && message.role === 'assistant' && isGenerating
              // Nothing written yet: show the typing dots instead of an empty
              // bubble, so the wait reads as activity rather than a stall.
              const pending = live && message.content === ''
              return (
                <div
                  key={index}
                  className={`${styles.bubble} ${
                    message.role === 'user' ? styles.user : styles.assistant
                  }`}
                >
                  {message.content}
                  {pending ? (
                    <span
                      className={styles.typing}
                      role="status"
                      aria-label={t(`chat.status.${status}`)}
                    >
                      <span />
                      <span />
                      <span />
                    </span>
                  ) : null}
                  {live && !pending ? (
                    <span className={styles.caret} aria-hidden="true" />
                  ) : null}
                </div>
              )
            })}

            {errorKey ? (
              <div className={styles.notice}>
                <p>{t(`chat.errors.${errorKey}`)}</p>
                {/* Send them to the form rather than their mail client: the
                    assistant being down should still produce a lead. */}
                <a href={CONTACT_ANCHOR} className={styles.noticeLink} onClick={close}>
                  <ArrowDown size={14} aria-hidden="true" />
                  {t('chat.emailFallback')}
                </a>
              </div>
            ) : null}

            {showSuggestions ? (
              <div className={styles.suggestions}>
                <span className={styles.suggestionsLabel}>{t('chat.suggestionsLabel')}</span>
                {tList('chat.suggestions').map((question) => (
                  <button
                    key={question}
                    type="button"
                    className={styles.chip}
                    onClick={() => ask(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <form className={styles.composer} onSubmit={submit}>
            <input
              ref={inputRef}
              type="text"
              value={draft}
              maxLength={MAX_CHARS}
              placeholder={isBlocked ? t('chat.offlineNotice') : t('chat.placeholder')}
              onChange={(e) => setDraft(e.target.value)}
              disabled={isBlocked}
              aria-label={t('chat.placeholder')}
            />
            {isGenerating ? (
              <button
                type="button"
                className={styles.stop}
                onClick={cancel}
                aria-label={t('chat.stop')}
                title={t('chat.stop')}
              >
                <Square size={15} fill="currentColor" />
              </button>
            ) : (
              <button
                type="submit"
                className={styles.send}
                disabled={!draft.trim() || isBlocked}
                aria-label={t('chat.send')}
              >
                <Send size={16} />
              </button>
            )}
          </form>

          {showRemaining ? (
            <p className={styles.remaining}>
              {t('chat.remaining').replace('{n}', String(remaining))}
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  )
}
