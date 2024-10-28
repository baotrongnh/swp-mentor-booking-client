import {getToken} from "../utils/storageUtils"
import axiosClient from "./axiosClient"
import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_API_URL

export const login = async ({username, password}) => {
    try {
        const url = `${baseURL}/login/validate`
        return await axios.post(url, {username, password})
    } catch (error) {
        console.log(`Error at login (authentication.js): ${error}`)
    }
}

export const getUserInformation = async () => {
    try {
        const token = getToken()
        return await axiosClient(token).post(`/student/valid`)
    } catch (error) {
        console.log(`Error at getUserInformation(authentication.js): ${error}`)
    }
}

export const loginAdmin = async ({username, password}) => {
    return await axios.post(`${baseURL}/admin/login/validate`, {
        username, password
    })
}

export const getAdminInformation = async () => {
    const token = localStorage.getItem('tokenAdmin')
    return await axiosClient(token).post(`/admin/valid`, {}, {
        headers: {
            'Account-Type': 'admin'
        }
    })
}