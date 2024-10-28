export const getToken = () => {
     return localStorage.getItem('token')
}

export const getTokenAdmin = () => {
     return localStorage.getItem('tokenAdmin')
}

export const deleteToken = () => {
     localStorage.removeItem('token')
}