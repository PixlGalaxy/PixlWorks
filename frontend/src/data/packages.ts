import { Bot, Globe, Server, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Package {
  id: string
  icon: LucideIcon
  featured?: boolean
  accent: string
}

/** Copy lives in translations under `packages.items.<id>`. No prices anywhere. */
export const packages: Package[] = [
  { id: 'starter', icon: Globe, accent: 'var(--i-cyan)' },
  { id: 'automation', icon: Bot, featured: true, accent: 'var(--i-violet)' },
  { id: 'app', icon: Workflow, accent: 'var(--i-indigo)' },
  { id: 'infra', icon: Server, accent: 'var(--i-amber)' },
]
