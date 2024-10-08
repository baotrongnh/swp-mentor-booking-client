import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

function AdminRouteAuth({ children }) {
     let isAuthenticated = true;

     return (
          isAuthenticated ? children : <Navigate to='/login' />
     )
}

export default AdminRouteAuth

AdminRouteAuth.propTypes = {
     children: PropTypes.any
}