import { BarChart3, Bot, Globe, MessageSquare, Server, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Service {
  id: string
  icon: LucideIcon
  tags: string[]
}

/**
 * Copy lives in translations under `solutions.items.<id>`.
 */
export const services: Service[] = [
  {
    id: 'websites',
    icon: Globe,
    tags: ['React', 'Vite', 'SEO', 'Forms'],
  },
  {
    id: 'apps',
    icon: Workflow,
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Auth'],
  },
  {
    id: 'ai',
    icon: Bot,
    tags: ['Ollama', 'Python', 'Workflows'],
  },
  {
    id: 'dashboards',
    icon: BarChart3,
    tags: ['Charts', 'Realtime', 'Exports'],
  },
  {
    id: 'chatbots',
    icon: MessageSquare,
    tags: ['WhatsApp', 'Web', 'Lead capture'],
  },
  {
    id: 'devops',
    icon: Server,
    tags: ['Docker', 'Nginx', 'CI/CD', 'Linux'],
  },
]
