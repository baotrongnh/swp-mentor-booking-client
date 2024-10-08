import AdminLayout from "../Layouts/AdminLayout";
import { Login, MentorListPage, MentorProfile, StudentProfile } from "../Pages";
import ManagerMentor from "../Pages/Admin/ManagerMentor/ManagerMentor";
import PrivateRoutesAuth from "./PrivateRoutesAuth";
import AdminRoutesAuth from './AdminRoutesAuth';

const publicRoutes = [{ path: "/login", element: Login, layout: null }];

const privateRoutes = [
  { path: "/mentorlist", element: MentorListPage },
  { path: "/mentorprofile/:id", element: MentorProfile },
  { path: "/profile", element: StudentProfile },
];

const adminRoutes = [
  { path: "/admin/mentor", element: ManagerMentor, layout: AdminLayout }
];

export { publicRoutes, privateRoutes, PrivateRoutesAuth, adminRoutes, AdminRoutesAuth };
