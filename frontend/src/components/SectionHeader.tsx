import type { LucideIcon } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  lead?: string
  icon?: LucideIcon
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  icon: Icon,
  align = 'left',
}: SectionHeaderProps) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`reveal ${styles.header} ${align === 'center' ? styles.center : ''}`}
    >
      <span className="section-eyebrow">
        {Icon ? <Icon size={14} aria-hidden="true" /> : null}
        {eyebrow}
      </span>
      <h2 className="section-title">{title}</h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </div>
  )
}
