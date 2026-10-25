import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { TrustStrip } from '../components/TrustStrip'
import { PainPoints } from '../components/PainPoints'
import { Solutions } from '../components/Solutions'
import { Industries } from '../components/Industries'
import { ProcessTimeline } from '../components/ProcessTimeline'
import { Projects } from '../components/Projects'
import { Founder } from '../components/Founder'
import { Packages } from '../components/Packages'
import { CTASection } from '../components/CTASection'
import { Footer } from '../components/Footer'
import { ChatWidget } from '../components/chat/ChatWidget'

/**
 * Section order follows the sales argument a visitor actually walks through:
 * the problem they recognise, what we build, whether it fits their industry,
 * how the work runs, proof it has been done, who does it, what it costs, and
 * only then the ask. Credibility (Projects, Founder) sits immediately before
 * pricing, where it does the most work.
 *
 * Each section sets its own band (black, dark, white or parchment) and the
 * sequence alternates, so the change of colour is the only divider needed.
 */
export function Home() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <PainPoints />
        <Solutions />
        <Industries />
        <ProcessTimeline />
        <Projects />
        <Founder />
        <Packages />
        <CTASection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
