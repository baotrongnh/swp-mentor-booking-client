export const getToken = () => {
     return localStorage.getItem('token');
}

export const deleteToken = () => {
     localStorage.removeItem('token');
}