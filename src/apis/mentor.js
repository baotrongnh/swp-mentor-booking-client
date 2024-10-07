import { getToken } from "../utils/storageUtils";
import axiosClient from "./axiosClient";

export const searchMentor = async ({ skills, search, page }) => {

     return await axiosClient(getToken()).get('/mentor/search', {
          params: {
               skill: skills,
               name: search,
               page
          }
     })
}

export const getProfileMentor = async (id) => {
     return await axiosClient(getToken()).get('/mentor/profile', {
          params: {
               id
          }
     });
}

export const getSkillMentor = async (id) => {
     try {
          return await axiosClient(getToken()).get('/mentor/skills', {
               params: {
                    id
               }
          });
     } catch (error) {
          console.log(`Error at getSkillMentor (mentor.js): ${error}`);
     }
}

export const getFeedback = async (id) => {
     try {
          return await axiosClient(getToken()).get('mentor/feedback', {
               params: {
                    id
               }
          })
     } catch (error) {
          console.log(`Error at getFeedback (mentor.js): ${error}`);
     }
}

export const loadAllSkills = async () => {
     try {
          return await axiosClient(getToken()).get('/mentor/loadskills');
     } catch (error) {
          console.log(`Error at loadAllSkills (mentor.js): ${error}`);
     }
}