import PropTypes from 'prop-types';
import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
     const [currentUser, setCurrentUser] = useState({});

     return <AuthContext.Provider
          value={{
               currentUser,
               setCurrentUser
          }}
     >
          {children}
     </AuthContext.Provider>
}

AuthProvider.propTypes = {
     children: PropTypes.node
}