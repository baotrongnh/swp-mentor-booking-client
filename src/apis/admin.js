import {getTokenAdmin} from "../utils/storageUtils"
import axiosClient from "./axiosClient"

export const getListMentor = async () => {
     const token = getTokenAdmin()
     try {
          return await axiosClient(token).get('/admin/mentor-list')
     } catch (error) {
          console.log(`Error at getListMentor (admin.js): ${error}`)
     }
}

export const getListStudent = async () => {
     const token = getTokenAdmin()
     try {
          return await axiosClient(token).get('admin/student-list')
     } catch (error) {
          console.log(`Error at getListStudent (admin.js): ${error}`)
     }
}

export const getTopMentor = async () => {
     const token = getTokenAdmin();
     try {
          return await axiosClient(token).get('admin/top-mentors')
     } catch (error) {
          console.log(`Error at getTopMentor (admin.js): ${error}`)
     }
}

export const getListDisableMentor = async () => {
     const token = getTokenAdmin();
     try {
          return await axiosClient(token).get('admin/inactive-mentors')
     } catch (error) {
          console.log(`Error at getListDisableMentor (admin.js): ${error}`)
     }
}

export const getlistMentorPending = async () => {
     const token = getTokenAdmin()
     return await axiosClient(token).get('/student/applying')
}

export const promoteMentor = async (accountId) => {
     const token = getTokenAdmin();
     try {
          return await axiosClient(token).post('/admin/promote', {
               accountId
          });
     } catch (error) {
          console.log(`Error at promoteMentor (admin.js): ${error}`)
     }
}

export const startNewSemester = async () => {
     const token = getTokenAdmin()
     try {
          return await axiosClient(token).post('/admin/start-semester')
     } catch (error) {
          console.log(`Error at startNewSemester (admin.js): ${error}`)
     }
}

export const resetStudentPoint = async () => {
     const token = getTokenAdmin()
     try {
          return await axiosClient(token).post('/admin/reset-point')
     } catch (error) {
          console.log(`Error at resetStudentPoint (admin.js): ${error}`)
     }
}

export const setDefaultPoint = async (newDefaultPoint) => {
     const token = getTokenAdmin()
     try {
          return await axiosClient(token).post('/admin/set-default-point', {
               newDefaultPoint
          })
     } catch (error) {
          console.log(`Error at setDefaultPoint (admin.js): ${error}`)
     }
}

export const disableMentor = async (id) => {
     const token = getTokenAdmin()
     try {
          return await axiosClient(token).get(`/admin/disable-mentor/${id}`)
     } catch (error) {
          console.log(`Error at promoteMentor (admin.js): ${error}`)
     }
}

export const activeMentor = async (id) => {
     const token = getTokenAdmin()
     return await axiosClient(token).get(`admin/activate-mentor/${id}`)
}

export const createSkillMentor = async (name) => {
     const token = getTokenAdmin()
     return await axiosClient(token).post('/admin/add-skill', {
          name,
          imgPath: 'url'
     })
}