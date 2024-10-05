import PropTypes from 'prop-types';
import { createContext, useState } from "react";
// import { getUserInformation } from '../apis/authentication';
// import { getToken } from '../utils/storageUtils';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
     const [currentUser, setCurrentUser] = useState({});

     // useLayoutEffect(() => {
     //      const fetchUserData = async () => {
     //           const { data } = await getUserInformation();
     //           if (data.user) {
     //                sessionStorage.setItem('currentUser', data.user);
     //                setCurrentUser(data.user);
     //           }
     //      }

     //      if (getToken()) {
     //           console.log(getToken());
     //           fetchUserData();
     //      }
     // }, []);

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