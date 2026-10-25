// index.css must be imported BEFORE App, or every CSS module in the tree is
// emitted ahead of the global stylesheet. Utility classes like .text-link and
// .btn share specificity with the module classes applied to the same
// element, so with globals last they silently won every tie — which is why a
// navbar rule of `display: none` had no effect on the contact button.
import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
