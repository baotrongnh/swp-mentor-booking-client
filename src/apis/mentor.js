import { getToken } from "../utils/storageUtils";
import axiosClient from "./axiosClient";

export const searchMentor = async ({ skills, search, star, page, dates }) => {
     const token = getToken();
     return await axiosClient(token).get('/mentor/search', {
          params: {
               skill: skills,
               name: search,
               page,
               rating: star,
               dates
          }
     });
}

export const getProfileMentor = async (id) => {
     const token = getToken();
     return await axiosClient(token).get('/mentor/profile', {
          params: {
               mentorId: id
          }
     });
}

export const getSkillMentor = async (id) => {
     const token = getToken();
     return await axiosClient(token).get('/mentor/skills', {
          params: {
               mentorId: id
          }
     });
}

export const getFeedback = async (id) => {
     const token = getToken();
     return await axiosClient(token).get('mentor/feedback', {
          params: {
               mentorId: id
          }
     });
}

export const loadAllSkills = async () => {
     const token = getToken();
     return await axiosClient(token).get('/mentor/loadskills');
}

export const ratingMentor = async ({ studentId, mentorId, rating, text }) => {
     const token = getToken();
     return await axiosClient(token).post('feedback/submit-feedback', {
          studentId, mentorId, rating, text
     });
}

export const getAvailableSlot = async(mentorId) => {
     const token = getToken()
     return await axiosClient(token).get(`/schedule/slots/${mentorId}`);
}

export const createSchedule = async ({ mentorId, description, slotStart }) => {
     const token = getToken();
     return await axiosClient(token).post('/schedule/slots', {
          slotStart, mentorId, description
     })
}