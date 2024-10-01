import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ConfigProviderAntd from './Styles/ConfigProviderAntd.jsx'
import { AppProvider } from './Contexts/AppContext.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <AppProvider>
      <AuthProvider>
        <ConfigProviderAntd>
          <App />
        </ConfigProviderAntd>
      </AuthProvider>
    </AppProvider>
  </React.Fragment>,
)
