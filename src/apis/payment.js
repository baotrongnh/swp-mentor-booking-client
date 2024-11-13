import { getToken, getTokenAdmin } from "../utils/storageUtils"
import axiosClient from "./axiosClient"

export const getResultPayment = async (orderInfor, status) => {
    const token = getToken()
    return await axiosClient(token).get(`/vnpay/result?vnp_OrderInfo=${orderInfor}&vnp_TransactionStatus=${status}`)
}

export const getTotalDonation = async (mentorId) => {
    const token = getToken()
    return await axiosClient(token).get('donate/total-donation', {
        params: {
            mentorId
        }
    })
}

export const withdraw = async (mentorId) => {
    const token = getToken()
    return await axiosClient(token).get(`/donate/checkout`, {
        params: {
            mentorId
        }
    })
}

export const getListCheckout = async () => {
    const token = getTokenAdmin()
    return await axiosClient(token).get('admin/list-checkout')
}

export const confirmCheckout = async (mentorId) => {
    const token = getTokenAdmin()
    return await axiosClient(token).get(`admin/confirm-checkout/${mentorId}`)
}

export const rejectCheckout = async (mentorId) => {
    const token = getTokenAdmin()
    return await axiosClient(token).get(`admin/reject-checkout/${mentorId}`)
}

export const getCheckoutHistory = async (id) => {
    const token = getToken()
    return await axiosClient(token).get(`/checkout/${id}`)
}