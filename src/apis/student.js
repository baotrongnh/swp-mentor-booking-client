import { getToken } from "../utils/storageUtils"
import axiosClient from "./axiosClient"

export const addStudentToGroup = async (bookingId, studentId, memberMails) => {
     const token = getToken()
     return await axiosClient(token).post('/group/add', {
          bookingId, studentId, memberMails
     })
}

export const getListInviteGroup = async (accountId) => {
     const token = getToken()
     return await axiosClient(token).get(`group/list-invite-group`, {
          params: {
               accountId 
          }
     })
}