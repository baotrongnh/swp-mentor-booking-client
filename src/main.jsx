import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ConfigProviderAntd from './GlobalStyles/ConfigProviderAntd.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProviderAntd>
      <App />
    </ConfigProviderAntd>
  </StrictMode>,
)
