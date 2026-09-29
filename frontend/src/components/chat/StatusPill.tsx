import {
  Brain,
  CloudOff,
  Hourglass,
  Loader2,
  PowerOff,
  Sparkles,
  TriangleAlert,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import type { ChatStatus } from '../../hooks/useChat'
import styles from './StatusPill.module.css'

interface Appearance {
  icon: LucideIcon
  color: string
  /** Spinning or pulsing marks "work in progress" beyond colour alone. */
  motion?: 'spin' | 'pulse'
}

const APPEARANCE: Record<ChatStatus, Appearance> = {
  idle: { icon: Zap, color: 'var(--text-soft)' },
  ready: { icon: Zap, color: 'var(--brand-3)' },
  not_loaded: { icon: PowerOff, color: 'var(--text-soft)' },
  loading: { icon: Loader2, color: 'var(--warning)', motion: 'spin' },
  thinking: { icon: Brain, color: 'var(--brand-2)', motion: 'pulse' },
  streaming: { icon: Sparkles, color: 'var(--brand)', motion: 'pulse' },
  offline: { icon: CloudOff, color: 'var(--danger)' },
  busy: { icon: Hourglass, color: 'var(--warning)' },
  rate_limited: { icon: Hourglass, color: 'var(--warning)' },
  model_missing: { icon: TriangleAlert, color: 'var(--danger)' },
  error: { icon: TriangleAlert, color: 'var(--danger)' },
}

export function StatusPill({ status }: { status: ChatStatus }) {
  const { t } = useLanguage()
  const { icon: Icon, color, motion } = APPEARANCE[status]

  const motionClass = motion === 'spin' ? styles.spin : motion === 'pulse' ? styles.pulse : ''

  return (
    <span
      className={styles.pill}
      style={{ '--pill-color': color } as CSSProperties}
      role="status"
      aria-live="polite"
    >
      <Icon size={13} className={motionClass} aria-hidden="true" />
      <span className={styles.label}>{t(`chat.status.${status}`)}</span>
    </span>
  )
}
