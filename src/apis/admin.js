import { getToken } from "../utils/storageUtils";
import axiosClient from "./axiosClient";

export const getListMentor = async () => {
     const token = getToken();
     const data = await axiosClient(token).get('/admin/mentor-list');
     return data;
}

export const getListStudent = async () => {
     const token = getToken();
     return await axiosClient(token).get('admin/student-list');
}

export const getTopMentor = async () => {
     const token = getToken();
     return await axiosClient(token).get('admin/top-mentors');
}

export const getListDisableMentor = async () => {
     const token = getToken();
     return await axiosClient(token).get('admin/inactive-mentors');
}