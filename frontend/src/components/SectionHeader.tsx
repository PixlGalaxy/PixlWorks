import { useReveal } from '../hooks/useReveal'
import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  title: string
  lead?: string
}

/** A large headline and one grey line under it. No kicker above. */
export function SectionHeader({ title, lead }: SectionHeaderProps) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className={`reveal ${styles.header}`}>
      <h2 className="section-title">{title}</h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </div>
  )
}
