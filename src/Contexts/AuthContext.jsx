import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
import { getUserInformation } from '../apis/authentication';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
     const [currentUser, setCurrentUser] = useState(null);
     const { data } = useQuery({ queryKey: ['currentUser'], queryFn: getUserInformation });

     useEffect(() => {
          if (data && data.user) {
               setCurrentUser(data.user);
          }
     }, [data]);

     console.log(currentUser);

     return (
          <AuthContext.Provider
               value={{
                    currentUser,
                    setCurrentUser
               }}
          >
               {children}
          </AuthContext.Provider>
     )
}

AuthProvider.propTypes = {
     children: PropTypes.node
}