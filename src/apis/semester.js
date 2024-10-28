import { getToken } from "../utils/storageUtils"
import axiosClient from "./axiosClient"

export const getCurrentSemester = async () => {
     const token = getToken()
     return await axiosClient(token).get('/')
}