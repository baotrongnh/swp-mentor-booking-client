import axiosClient from "./axiosClient";

export const searchMentor = async ({ skills, search, page }) => {
     try {
          return await axiosClient.get('/mentor/search', {
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
     return await axiosClient.get('/mentor', {
          params: {
               id
          }
     })
}