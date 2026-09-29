import { BarChart3, Bot, Globe, MessageSquare, Server, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Service {
  id: string
  icon: LucideIcon
  accent: string
  tags: string[]
}

/**
 * Copy lives in translations under `solutions.items.<id>`.
 * One hue per service so the grid reads as six distinct offerings.
 */
export const services: Service[] = [
  {
    id: 'websites',
    icon: Globe,
    accent: 'var(--i-cyan)',
    tags: ['React', 'Vite', 'SEO', 'Forms'],
  },
  {
    id: 'apps',
    icon: Workflow,
    accent: 'var(--i-violet)',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Auth'],
  },
  {
    id: 'ai',
    icon: Bot,
    accent: 'var(--i-green)',
    tags: ['Ollama', 'Python', 'Workflows'],
  },
  {
    id: 'dashboards',
    icon: BarChart3,
    accent: 'var(--i-indigo)',
    tags: ['Charts', 'Realtime', 'Exports'],
  },
  {
    id: 'chatbots',
    icon: MessageSquare,
    accent: 'var(--i-pink)',
    tags: ['WhatsApp', 'Web', 'Lead capture'],
  },
  {
    id: 'devops',
    icon: Server,
    accent: 'var(--i-amber)',
    tags: ['Docker', 'Nginx', 'CI/CD', 'Linux'],
  },
]
