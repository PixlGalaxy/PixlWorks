import { Bot, Globe, Server, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Package {
  id: string
  icon: LucideIcon
  featured?: boolean
}

/** Copy lives in translations under `packages.items.<id>`. No prices anywhere. */
export const packages: Package[] = [
  { id: 'starter', icon: Globe },
  { id: 'automation', icon: Bot, featured: true },
  { id: 'app', icon: Workflow },
  { id: 'infra', icon: Server },
]
