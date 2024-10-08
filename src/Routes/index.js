import AdminLayout from "../Layouts/AdminLayout";
import { Login, MentorListPage, MentorProfile, StudentProfile } from "../Pages";
import PrivateRoutesAuth from "./PrivateRoutesAuth";
import AdminRoutesAuth from './AdminRoutesAuth';
import { ManagerMentor, ManagerStudent } from "../Pages/Admin";

const publicRoutes = [{ path: "/login", element: Login, layout: null }];

const privateRoutes = [
  { path: "/mentorlist", element: MentorListPage },
  { path: "/mentorprofile/:id", element: MentorProfile },
  { path: "/profile", element: StudentProfile },
];

const adminRoutes = [
  { path: "/admin/mentor", element: ManagerMentor, layout: AdminLayout },
  { path: "/admin/student", element: ManagerStudent, layout: AdminLayout }
];

export { publicRoutes, privateRoutes, PrivateRoutesAuth, adminRoutes, AdminRoutesAuth };
