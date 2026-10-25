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
}

/** Copy lives in translations under `industries.items.<id>`. */
export const industries: Industry[] = [
  { id: 'restaurants', icon: Utensils },
  { id: 'clinics', icon: Stethoscope },
  { id: 'realestate', icon: Building2 },
  { id: 'workshops', icon: Wrench },
  { id: 'lawyers', icon: Scale },
  { id: 'retail', icon: ShoppingBag },
  { id: 'construction', icon: HardHat },
  { id: 'schools', icon: GraduationCap },
  { id: 'startups', icon: Rocket },
]
