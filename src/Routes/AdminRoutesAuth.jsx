import PropTypes from 'prop-types'
import { Navigate } from "react-router-dom"
import {getTokenAdmin} from "../utils/storageUtils.js";
import {useContext} from "react";
import {AuthContext} from "../Contexts/AuthContext.jsx";

function AdminRouteAuth({ children }) {
     let isAuthenticated = true
     const {currentAdmin} = useContext(AuthContext)

     if (!getTokenAdmin() || !currentAdmin) {
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