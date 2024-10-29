import AdminLayout from "../Layouts/AdminLayout"
import { Gift, Home, Login, MentorListPage, MentorProfile, PageNotFound, Schedule, StudentProfile, Wallet } from "../Pages"
import { LoginAdmin, ManagerItems, ManagerMentor, ManagerSemester, ManagerSkills, ManagerStudent, OverviewChart, Pending } from "../Pages/Admin"
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
  { path: '/schedule', element: Schedule },
  { path: '/wallet', element: Wallet },
  { path: '/gift', element: Gift },
]

const adminRoutes = [
  { path: '/admin/mentor/:tab', element: ManagerMentor, layout: AdminLayout },
  { path: '/admin/student/:tab', element: ManagerStudent, layout: AdminLayout },
  { path: '/admin/pending-mentors', element: Pending, layout: AdminLayout },
  { path: '/admin/skills', element: ManagerSkills, layout: AdminLayout },
  { path: '/admin/items', element: ManagerItems, layout: AdminLayout },
  { path: '/admin/analytics/overview', element: OverviewChart, layout: AdminLayout },
  { path: '/admin/semester', element: ManagerSemester, layout: AdminLayout },
]

export { adminRoutes, AdminRoutesAuth, privateRoutes, PrivateRoutesAuth, publicRoutes }

