import AdminLayout from "../Layouts/AdminLayout";
import { Login, MentorListPage, MentorProfile, PageNotFound, Schedule, StudentProfile } from "../Pages";
import PrivateRoutesAuth from "./PrivateRoutesAuth";
import AdminRoutesAuth from './AdminRoutesAuth';
import { LoginAdmin, ManagerMentor, ManagerStudent } from "../Pages/Admin";

const publicRoutes = [
  { path: '/*', element: PageNotFound, layout: null },
  { path: "/login", element: Login, layout: null },
  { path: '/login/admin', element: LoginAdmin, layout: null }
];

const privateRoutes = [
  { path: "/mentor", element: MentorListPage },
  { path: "/mentor/profile/:id", element: MentorProfile },
  { path: "/profile", element: StudentProfile },
  { path: "/schedule/:id", element: Schedule }
];

const adminRoutes = [
  { path: "/admin/mentor", element: ManagerMentor, layout: AdminLayout },
  { path: "/admin/student", element: ManagerStudent, layout: AdminLayout }
];

export { publicRoutes, privateRoutes, PrivateRoutesAuth, adminRoutes, AdminRoutesAuth };
