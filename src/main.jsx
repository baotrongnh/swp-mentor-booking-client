import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './Contexts/AppContext.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'
import ConfigProviderAntd from './Styles/ConfigProviderAntd.jsx'
import './i18n'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <AuthProvider>
        <ConfigProviderAntd>
          <Router>
            <App />
          </Router>
        </ConfigProviderAntd>
      </AuthProvider>
    </AppProvider>
  </QueryClientProvider>
)
