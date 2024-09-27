import axiosClient from "./axiosClient";
import axios from 'axios';
const baseURL = import.meta.env.VITE_APP_API_URL;

export const login = async ({username, password}) => {
     try {
          const url = `${baseURL}/login/validate`;
          return await axios.post(url, { username, password });
     } catch (error) {
          console.log(`Error at login (authentication.js): ${error}`);
     }
}

export const getUserInformation = async () => {
     try {
          const token = localStorage.getItem('token');
          return await axiosClient(token).get(`/user/valid`);
     } catch (error) {
          console.log(`Error at getUserInformation(authentication.js): ${error}`);
     }
}