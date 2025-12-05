import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'

const rootEl = document.getElementById('root')
const root = createRoot(rootEl)

try {
  root.render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  )
} catch (err) {
  const div = document.createElement('div')
  div.style.padding = '24px'
  div.style.fontFamily = 'system-ui, sans-serif'
  div.style.color = '#b91c1c'
  div.innerText = `App failed to load: ${err?.message || err}`
  rootEl.appendChild(div)
}
