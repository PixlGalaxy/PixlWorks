import { Hammer, LineChart, Rocket, Search, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ProcessStep {
  id: string
  icon: LucideIcon
}

/** Copy lives in translations under `process.steps.<id>`. */
export const processSteps: ProcessStep[] = [
  { id: 'audit', icon: Search },
  { id: 'blueprint', icon: Workflow },
  { id: 'build', icon: Hammer },
  { id: 'deploy', icon: Rocket },
  { id: 'improve', icon: LineChart },
]

export interface StackGroup {
  id: string
  items: string[]
}

/**
 * Grouped rather than one flat list: a client reading "React, Vite, Docker,
 * Ollama…" sees noise, while five labelled columns show the work is covered
 * end to end. Labels live in translations under `founder.stackGroups.<id>`.
 */
export const founderStack: StackGroup[] = [
  { id: 'frontend', items: ['React', 'Vite', 'TypeScript'] },
  { id: 'backend', items: ['Node.js', 'Python', 'FastAPI', 'Express'] },
  { id: 'data', items: ['PostgreSQL', 'SQLite'] },
  { id: 'infra', items: ['Docker', 'Nginx', 'Linux', 'Cloudflare'] },
  { id: 'ai', items: ['Ollama', 'vLLM', 'AI workflows'] },
]
