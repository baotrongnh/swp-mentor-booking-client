import { getToken } from "../utils/storageUtils";
import axiosClient from "./axiosClient";

export const searchMentor = async ({ skills, search, star, page }) => {
     const token = getToken();
     return await axiosClient(token).get('/mentor/search', {
          params: {
               skill: skills,
               name: search,
               page,
               rating: star
          }
     });
}

export const getProfileMentor = async (id) => {
     const token = getToken();
     return await axiosClient(token).get('/mentor/profile', {
          params: {
               id
          }
     });
}

export const getSkillMentor = async (id) => {
     const token = getToken();
     return await axiosClient(token).get('/mentor/skills', {
          params: {
               id
          }
     });
}

export const getFeedback = async (id) => {
     const token = getToken();
     return await axiosClient(token).get('mentor/feedback', {
          params: {
               id
          }
     });
}

export const loadAllSkills = async () => {
     const token = getToken();
     return await axiosClient(token).get('/mentor/loadskills');
}

export const ratingMentor = async ({studentId, mentorId, rating, text}) => {
     const token = getToken();
     console.log(studentId, mentorId, rating, text);
     return await axiosClient(token).post('/mentor/rating', {
          studentId, mentorId, rating, text
     });
}