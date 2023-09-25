import React from 'react'
import ReactDOM from 'react-dom/client'
import { Providers } from './Providers'
import { Router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <Router />
    </Providers>
  </React.StrictMode>,
)
