import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { createContext, useLayoutEffect, useState } from "react";
import { getUserInformation } from '../apis/authentication';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
     const [currentUser, setCurrentUser] = useState({});
     const { data } = useQuery({ queryKey: ['currentUser'], queryFn: getUserInformation });

     useLayoutEffect(() => {
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