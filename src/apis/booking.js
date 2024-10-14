import { getToken } from "../utils/storageUtils";
import axiosClient from "./axiosClient";

export const bookingMentor = async ({ mentorId, studentId, size }) => {
     const token = getToken();
     try {
          return await axiosClient(token).post('/booking/book', {
               mentorId,
               studentId,
               size
          })
     } catch (error) {
          console.log(`Error at bookingMentor (booking.js): ${error}`);
     }
}

export const getScheduleMentor = async (id) => {
     const token = getToken();
     try {
          return await axiosClient(token).get(`/booking/get/${id}`);
     } catch (error) {
          console.log(`Error at getScheduleMentor (booking.js) : ${error}`);
     }
}

export const getListBooking = async () => {
     const token = getToken();
     try {
          return await axiosClient(token).get('/booking/list');
     } catch (error) {
          console.log(`Error at getListbooking (booking.js): ${error}`);
     }
}