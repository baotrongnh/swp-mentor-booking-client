import AdminLayout from "../Layouts/AdminLayout"
import { Home, Login, MentorListPage, MentorProfile, PageNotFound, Schedule, StudentProfile, Wallet } from "../Pages"
import { LoginAdmin, ManagerItems, ManagerMentor, ManagerSemester, ManagerSkills, ManagerStudent, OverviewChart, Pending } from "../Pages/Admin"
import AdminRoutesAuth from './AdminRoutesAuth'
import PrivateRoutesAuth from "./PrivateRoutesAuth"
import DonateProcess from "../Pages/Donate/DonateProcess/DonateProcess"
import DonateSuccess from "../Pages/Donate/DonateSuccess/DonateSuccess"

const publicRoutes = [
  { path: '/*', element: PageNotFound, layout: null },
  { path: '/login', element: Login, layout: null },
  { path: '/admin/login', element: LoginAdmin, layout: null },
  { path: '/', element: Home },
  { path: '/donate-process', element: DonateProcess, layout: null },
  { path: '/donate-success', element: DonateSuccess, layout: null },
]

const privateRoutes = [
  { path: 'browser-mentors', element: MentorListPage },
  { path: '/mentor/profile/:id', element: MentorProfile },
  { path: '/student/profile', element: StudentProfile },
  { path: '/schedule', element: Schedule },
  { path: '/wallet', element: Wallet },
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

