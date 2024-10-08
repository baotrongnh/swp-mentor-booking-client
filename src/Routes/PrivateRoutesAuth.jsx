import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { getToken } from "../utils/storageUtils";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

function PrivateRoutesAuth({ children }) {
     let isAuthenticated = true;
     const token = getToken();
     const { currentUser } = useContext(AuthContext);

     if (token === null && currentUser === null) {
          isAuthenticated = false;
     }

     return (
          isAuthenticated ? children : <Navigate to='/login' />
     )
}

export default PrivateRoutesAuth

PrivateRoutesAuth.propTypes = {
     children: PropTypes.any
}