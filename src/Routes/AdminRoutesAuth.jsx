import PropTypes from 'prop-types'
import {Navigate, useLocation, useNavigate} from "react-router-dom"
import {getTokenAdmin} from "../utils/storageUtils.js";
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function AdminRouteAuth({ children }) {
     let isAuthenticated = true

     const location = useLocation()
     const navigate = useNavigate()

     useEffect(() => {
          const adminToken = localStorage.getItem('adminToken')

          if (!location.pathname.startsWith('/admin') && adminToken) {
               localStorage.removeItem('adminToken')
               toast('Logout admin')
          }
     }, [location.pathname, navigate])

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