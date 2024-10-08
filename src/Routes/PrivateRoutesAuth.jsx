import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

function PrivateRoutesAuth({ children }) {
     let isAuthenticated = true;

     return (
          isAuthenticated ? children : <Navigate to='/login' />
     )
}

export default PrivateRoutesAuth

PrivateRoutesAuth.propTypes = {
     children: PropTypes.any
}