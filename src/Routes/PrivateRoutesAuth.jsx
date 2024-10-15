import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/storageUtils";

function PrivateRoutesAuth({ children }) {
     let isAuthenticated = true;
     const token = getToken();

     if (!token) {
          isAuthenticated = false;
     }

     return (
          isAuthenticated ? children : <Navigate to='/login' />
     )
}

export default PrivateRoutesAuth;

PrivateRoutesAuth.propTypes = {
     children: PropTypes.any
}