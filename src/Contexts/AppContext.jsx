import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

// const URL = import.meta.env.VITE_APP_API_URL;

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
     const [theme, setTheme] = useState('');

     return <AppContext.Provider
          value={{
               theme,
               setTheme
          }}
     >
          {children}
     </AppContext.Provider>
}

AppProvider.propTypes = {
     children: PropTypes.node
}