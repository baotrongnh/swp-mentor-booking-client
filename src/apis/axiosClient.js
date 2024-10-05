import axios from "axios";

const axiosClient = (token) => {
     const instance = axios.create({
          baseURL: import.meta.env.VITE_APP_API_URL,
          headers: {
               Authorization: token
          }
     });

     // Add a response interceptor
     instance.interceptors.response.use(
          response => response.data,  // Return only the data from the response
          error => Promise.reject(error)  // Handle errors
     );

     return instance;
}

export default axiosClient;