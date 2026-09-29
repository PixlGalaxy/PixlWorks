import { BookOpen, Orbit, Vote } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Project {
  id: string
  name: string
  icon: LucideIcon
  url: string
  stack: string[]
  accent: string
}

/** Only the builds that best demonstrate the services above. */
export const projects: Project[] = [
  {
    id: 'onpe',
    name: "Pixl's ONPE Fetcher",
    icon: Vote,
    url: 'https://github.com/PixlGalaxy/Pixls_ONPE_Fetcher',
    stack: ['React', 'TypeScript', 'FastAPI', 'Docker', 'Nginx', 'AI'],
    accent: 'var(--i-cyan)',
  },
  {
    id: 'eagledocs',
    name: 'EagleDocs',
    icon: BookOpen,
    url: 'https://github.com/PixlGalaxy/EagleDocs',
    stack: ['React', 'Vite', 'Backend', 'Database', 'AI engine'],
    accent: 'var(--i-green)',
  },
  {
    id: 'itzgalaxy',
    name: 'ItzGalaxy',
    icon: Orbit,
    url: 'https://github.com/PixlGalaxy/ItzGalaxy',
    stack: ['React', 'Vite', 'Self-hosted'],
    accent: 'var(--i-violet)',
  },
]
