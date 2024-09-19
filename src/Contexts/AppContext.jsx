import propTypes from 'prop-types';
import { createContext } from 'react';

// const URL = import.meta.env.VITE_APP_API_URL;

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {

     return <AppContext.Provider
          value={{

          }}
     >
          {children}
     </AppContext.Provider>
}

AppProvider.propTypes = {
     children: propTypes.node
}