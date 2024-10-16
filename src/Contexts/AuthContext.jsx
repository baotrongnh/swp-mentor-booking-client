import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
import { getUserInformation } from '../apis/authentication';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
     const [currentUser, setCurrentUser] = useState({});
     const { data, isLoading: isFetchUserData } = useQuery({ queryKey: ['currentUser'], queryFn: getUserInformation });

     useEffect(() => {
          if (data && data.user) {
               setCurrentUser(data.user);
          }
     }, [data]);

     return (
          <AuthContext.Provider
               value={{
                    currentUser,
                    setCurrentUser,
                    isFetchUserData
               }}
          >
               {children}
          </AuthContext.Provider>
     )
}

AuthProvider.propTypes = {
     children: PropTypes.node
}