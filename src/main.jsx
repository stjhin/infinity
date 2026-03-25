import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import applyTokens from './setupTokens'

// ensure tokens are applied at app startup
applyTokens()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
