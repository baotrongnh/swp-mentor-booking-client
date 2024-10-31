import { getToken } from "../utils/storageUtils"
import axiosClient from "./axiosClient"

export const getResultPayment = async (orderInfor, status) => {
    const token = getToken()
    return await axiosClient(token).get(`/vnpay/result?vnp_OrderInfo=${orderInfor}&vnp_TransactionStatus=${status}`)
}