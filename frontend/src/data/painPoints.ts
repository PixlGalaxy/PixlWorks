import {
  CalendarCheck,
  Database,
  Gauge,
  MessagesSquare,
  MousePointerClick,
  Repeat2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface PainPoint {
  id: string
  icon: LucideIcon
  accent: string
}

/**
 * Copy lives in translations under `pains.items.<id>`.
 * One hue each: six identical red chips read as a warning banner rather than
 * six distinct problems worth reading.
 */
export const painPoints: PainPoint[] = [
  { id: 'messages', icon: MessagesSquare, accent: 'var(--i-pink)' },
  { id: 'bookings', icon: CalendarCheck, accent: 'var(--i-cyan)' },
  { id: 'data', icon: Database, accent: 'var(--i-violet)' },
  { id: 'visibility', icon: Gauge, accent: 'var(--i-amber)' },
  { id: 'website', icon: MousePointerClick, accent: 'var(--i-green)' },
  { id: 'repetition', icon: Repeat2, accent: 'var(--i-indigo)' },
]
