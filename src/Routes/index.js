import AdminLayout from "../Layouts/AdminLayout"
import { Login, MentorListPage, MentorProfile, PageNotFound, Schedule, StudentProfile, Wallet } from "../Pages"
import { LoginAdmin, ManagerMentor, ManagerStudent } from "../Pages/Admin"
import AdminRoutesAuth from './AdminRoutesAuth'
import PrivateRoutesAuth from "./PrivateRoutesAuth"

const publicRoutes = [
  { path: '/*', element: PageNotFound, layout: null },
  { path: "/login", element: Login, layout: null },
  { path: '/login/admin ', element: LoginAdmin, layout: null }
]

const privateRoutes = [
  { path: "browser-mentors", element: MentorListPage },
  { path: "/mentor/profile/:id", element: MentorProfile },
  { path: "/student/profile", element: StudentProfile },
  { path: "/schedule/:id", element: Schedule },
  { path: "/wallet", element: Wallet },
]

const adminRoutes = [
  { path: "/admin/mentor/:tab", element: ManagerMentor, layout: AdminLayout },
  { path: "/admin/student", element: ManagerStudent, layout: AdminLayout },
]

export { adminRoutes, AdminRoutesAuth, privateRoutes, PrivateRoutesAuth, publicRoutes }

