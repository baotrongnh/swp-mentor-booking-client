import { getToken } from "../utils/storageUtils";
import axiosClient from "./axiosClient";

export const searchMentor = async ({ skills, search, page }) => {
     try {
          return await axiosClient(getToken()).get('/mentor/search', {
               params: {
                    skill: skills,
                    name: search,
                    page
               }
          })
     } catch (error) {
          console.log(error);
     }
}

export const getProfileMentor = async (id) => {
     try {
          return await axiosClient(getToken()).get('/mentor/profile', {
               params: {
                    id
               }
          })
     } catch (error) {
          console.log(error);
     }
}
