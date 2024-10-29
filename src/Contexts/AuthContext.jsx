import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from "react"
import { getAdminInformation, getUserInformation } from '../apis/authentication'
import { getToken, getTokenAdmin } from '../utils/storageUtils'

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))
    const [currentAdmin, setCurrentAdmin] = useState(JSON.parse(sessionStorage.getItem('currentAdmin')))

    const {data: dataUser, isLoading: isFetchData} = useQuery({
        queryKey: ['currentUser'],
        queryFn: getUserInformation,
        enabled: !!getToken()
    })

    useEffect(() => {
        if (dataUser && dataUser.user) {
            setCurrentUser(dataUser.user)
            sessionStorage.setItem('currentUser', JSON.stringify(dataUser.user))
        }
    }, [dataUser])

    const {data: dataAdmin} = useQuery({
        queryKey: ['currentAdmin'],
        queryFn: getAdminInformation,
        enabled: !!getTokenAdmin()
    })

    useEffect(() => {
        if (dataAdmin && dataAdmin.user) {
            setCurrentAdmin(dataAdmin.user)
            sessionStorage.setItem('currentAdmin', JSON.stringify(dataAdmin.user))
        }
    }, [dataAdmin])

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                currentAdmin,
                setCurrentAdmin,
                isFetchData
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node
}