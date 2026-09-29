import { LanguageProvider } from './i18n/LanguageContext'
import { Home } from './pages/Home'

export default function App() {
  return (
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  )
}
