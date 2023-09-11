import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './router/index.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Router />
    </QueryClientProvider>
  </React.StrictMode>,
)
