import { getToken } from "../utils/storageUtils";
import axiosClient from "./axiosClient";

export const searchMentor = async ({ skills, search, star, page }) => {
     const token = getToken();
     try {
          return await axiosClient(token).get('/mentor/search', {
               params: {
                    skill: skills,
                    name: search,
                    page,
                    rating: star
               }
          });
     } catch (error) {
          console.log(`Error at searchMentor (mentor.js): ${error}`);
     }
}

export const getProfileMentor = async (id) => {
     const token = getToken();
     try {
          return await axiosClient(token).get('/mentor/profile', {
               params: {
                    id
               }
          });
     } catch (error) {
          console.log(`Error at getProfileMentor(mentor.js): ${error}`);
     }
}

export const getSkillMentor = async (id) => {
     const token = getToken();
     try {
          return await axiosClient(token).get('/mentor/skills', {
               params: {
                    id
               }
          });
     } catch (error) {
          console.log(`Error at getSkillMentor (mentor.js): ${error}`);
     }
}

export const getFeedback = async (id) => {
     const token = getToken();
     try {
          return await axiosClient(token).get('mentor/feedback', {
               params: {
                    id
               }
          });
     } catch (error) {
          console.log(`Error at getFeedback (mentor.js): ${error}`);
     }
}

export const loadAllSkills = async () => {
     const token = getToken();
     try {
          return await axiosClient(token).get('/mentor/loadskills');
     } catch (error) {
          console.log(`Error at loadAllSkills (mentor.js): ${error}`);
     }
}

