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
}

/**
 * Copy lives in translations under `pains.items.<id>`.
 */
export const painPoints: PainPoint[] = [
  { id: 'messages', icon: MessagesSquare },
  { id: 'bookings', icon: CalendarCheck },
  { id: 'data', icon: Database },
  { id: 'visibility', icon: Gauge },
  { id: 'website', icon: MousePointerClick },
  { id: 'repetition', icon: Repeat2 },
]
