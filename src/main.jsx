import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// For the engineers who open DevTools first
console.log(
  '%cYASH PETKAR',
  'color:#b8fd4b;background:#0e0e0e;font-size:32px;font-weight:900;padding:8px 16px;letter-spacing:2px;',
)
console.log(
  '%cReading the source? Good instinct. Press / on the site for the terminal, or skip ahead → yashpetkar07@gmail.com',
  'color:#ababab;font-size:12px;font-family:monospace;',
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
