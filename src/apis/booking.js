import { getToken } from "../utils/storageUtils"
import axiosClient from "./axiosClient"

export const bookingMentor = async (mentorId, studentId, startTime) => {
     const token = getToken();
     return await axiosClient(token).post('/booking', {
          mentorId,
          studentId,
          startTime
     })
}

export const getScheduleMentor = async (id) => {
     const token = getToken();
     return await axiosClient(token).get(`/booking/get/${id}`)
}

export const getListBooking = async (type, id) => {
     const token = getToken()
     return await axiosClient(token).get(`/booking/list/${type}/${id}`)
}

export const getListAllBooking = async (type, id) => {
     const token = getToken()
     return await axiosClient(token).get(`booking/list-all/${type}/${id}`)
}

export const confirmBooking = async (bookingId) => {
     const token = getToken()
     return await axiosClient(token).post('/booking/confirm', {
          bookingId
     })
}

export const getHistoryTransaction = async (type, id) => {
     const token = getToken()
     return await axiosClient(token).get(`/transaction/${type}/${id}`)
}

export const acceptBooking = async (type, bookingId, memberId) => {
     const token = getToken()
     return await axiosClient(token).get(`group/${type}/${bookingId}/${memberId}`)
}