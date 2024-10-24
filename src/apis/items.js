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