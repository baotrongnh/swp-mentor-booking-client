import PropTypes from 'prop-types'
import { Navigate } from "react-router-dom"
import { getToken } from "../utils/storageUtils"
import { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'

function PrivateRoutesAuth({ children }) {
     let isAuthenticated = true
     const token = getToken()
     const { currentUser } = useContext(AuthContext)

     if (!token || !currentUser) {
          isAuthenticated = false
     }

     return (
          isAuthenticated ? children : <Navigate to='/login' />
     )
}

export default PrivateRoutesAuth

PrivateRoutesAuth.propTypes = {
     children: PropTypes.any
}