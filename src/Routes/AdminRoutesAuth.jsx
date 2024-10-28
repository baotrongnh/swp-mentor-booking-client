import PropTypes from 'prop-types'
import {Navigate} from "react-router-dom"
import {getTokenAdmin} from "../utils/storageUtils.js";

function AdminRouteAuth({ children }) {
     let isAuthenticated = true

     if (!getTokenAdmin()) {
          isAuthenticated = false
     } else {
          isAuthenticated = true
     }

     return (
          isAuthenticated ? children : <Navigate to='/admin/login' />
     )
}

export default AdminRouteAuth

AdminRouteAuth.propTypes = {
     children: PropTypes.any
}