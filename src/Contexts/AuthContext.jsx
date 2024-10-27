import {useQuery} from '@tanstack/react-query'
import PropTypes from 'prop-types'
import {createContext, useEffect, useState} from "react"
import {getUserInformation} from '../apis/authentication'
import {getToken} from '../utils/storageUtils'

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))
    const {data, isLoading: isFetchData} = useQuery({
        queryKey: ['currentUser'],
        queryFn: getUserInformation,
        enabled: !!getToken()
    })

    useEffect(() => {
        if (data && data.user) {
            setCurrentUser(data.user)
            sessionStorage.setItem('currentUser', JSON.stringify(data.user))
        }
    }, [data])

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                setCurrentUser,
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