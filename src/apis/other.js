import { getToken } from "../utils/storageUtils"
import axiosClient from "./axiosClient"

export const getNotifications = async (accountId) => {
     const token = getToken()
     return axiosClient(token).get(`/notification/${accountId}`)
}

export const getNumberUnreadNotification = async (accountId) => {
     const token = getToken()
     return axiosClient(token).get(`/notification/unread-count/${accountId}`)
}

export const createComplaint = async (studentId, mentorId, content) => {
     const token = getToken()
     return axiosClient(token).post('/complaint/create', {
          studentId, mentorId, content
     })
}

export const getStudentComplaint = async (studentId) => {
     const token = getToken()
     return axiosClient(token).get(`/complaint/student/${studentId}`)
}

