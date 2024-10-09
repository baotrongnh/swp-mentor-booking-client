import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './Contexts/AppContext.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'
import ConfigProviderAntd from './Styles/ConfigProviderAntd.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AuthProvider>
          <ConfigProviderAntd>
            <App />
          </ConfigProviderAntd>
        </AuthProvider>
      </AppProvider>
    </QueryClientProvider>
  </React.Fragment>,
)
