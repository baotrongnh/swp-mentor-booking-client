import AdminLayout from "../Layouts/AdminLayout"
import { Home, Login, MentorListPage, MentorProfile, PageNotFound, Schedule, StudentProfile, Wallet } from "../Pages"
import { LoginAdmin, ManagerMentor, ManagerSkills, ManagerStudent, Pending } from "../Pages/Admin"
import AdminRoutesAuth from './AdminRoutesAuth'
import PrivateRoutesAuth from "./PrivateRoutesAuth"

const publicRoutes = [
  { path: '/*', element: PageNotFound, layout: null },
  { path: '/login', element: Login, layout: null },
  { path: '/admin/login', element: LoginAdmin, layout: null },
  { path: '/', element: Home },
]

const privateRoutes = [
  { path: 'browser-mentors', element: MentorListPage },
  { path: '/mentor/profile/:id', element: MentorProfile },
  { path: '/student/profile', element: StudentProfile },
  { path: '/schedule/:id', element: Schedule },
  { path: '/wallet', element: Wallet },
]

const adminRoutes = [
  { path: '/admin/mentor/:tab', element: ManagerMentor, layout: AdminLayout },
  { path: '/admin/student', element: ManagerStudent, layout: AdminLayout },
  { path: 'admin/pending-mentors', element: Pending, layout: AdminLayout },
  { path: 'admin/skills', element: ManagerSkills, layout: AdminLayout }
]

export { adminRoutes, AdminRoutesAuth, privateRoutes, PrivateRoutesAuth, publicRoutes }

