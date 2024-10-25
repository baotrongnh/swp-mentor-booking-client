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
     const token = getToken();
     return await axiosClient(token).get(`/booking/list/${type}/${id}`)
}