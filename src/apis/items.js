import { getToken } from "../utils/storageUtils"
import axiosClient from "./axiosClient"

export const getAllItems = async (page) => {
     const token = getToken()
     return axiosClient(token).get('/item/list-item', {
          params: {
               page
          }
     })
}

export const getListGift = async (type, id) => {
     const token = getToken()
     return axiosClient(token).get(`/donate/${type}/${id}`)
}