import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Les pages sont prérendues au build (scripts/prerender.mjs) : on « hydrate »
// le HTML existant. Sans HTML prérendu (npm run dev), rendu classique.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
