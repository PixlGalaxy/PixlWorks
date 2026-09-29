import {
  Building2,
  GraduationCap,
  HardHat,
  Rocket,
  Scale,
  ShoppingBag,
  Stethoscope,
  Utensils,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Industry {
  id: string
  icon: LucideIcon
  accent: string
}

/** Copy lives in translations under `industries.items.<id>`. */
export const industries: Industry[] = [
  { id: 'restaurants', icon: Utensils, accent: 'var(--i-violet)' },
  { id: 'clinics', icon: Stethoscope, accent: 'var(--i-green)' },
  { id: 'realestate', icon: Building2, accent: 'var(--i-cyan)' },
  { id: 'workshops', icon: Wrench, accent: 'var(--i-amber)' },
  { id: 'lawyers', icon: Scale, accent: 'var(--i-pink)' },
  { id: 'retail', icon: ShoppingBag, accent: 'var(--i-indigo)' },
  { id: 'construction', icon: HardHat, accent: 'var(--i-violet)' },
  { id: 'schools', icon: GraduationCap, accent: 'var(--i-cyan)' },
  { id: 'startups', icon: Rocket, accent: 'var(--i-green)' },
]
