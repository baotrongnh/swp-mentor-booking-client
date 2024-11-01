import AdminLayout from "../Layouts/AdminLayout"
import { Gift, Home, Login, MentorListPage, MentorProfile, Notification, PageNotFound, PendingAccept, Schedule, StudentProfile, Wallet } from "../Pages"
import { LoginAdmin, ManagerItems, ManagerMentor, ManagerComplaintPending, ManagerComplaintResolved, ManagerSemester, ManagerSkills, ManagerStudent, OverviewChart, Pending } from "../Pages/Admin"
import AdminRoutesAuth from './AdminRoutesAuth'
import PrivateRoutesAuth from "./PrivateRoutesAuth"
import DonateProcess from "../Pages/Donate/DonateProcess/DonateProcess"
import DonateSuccess from "../Pages/Donate/DonateSuccess/DonateSuccess"
import ProcessAccept from "../Pages/AcceptGroup/ProcessAccept"
import Success from "../Pages/AcceptGroup/Success"
import Reject from "../Pages/AcceptGroup/Reject"
import DonateError from '../Pages/Donate/DonateError/DonateError'


const publicRoutes = [
  { path: '/*', element: PageNotFound, layout: null },
  { path: '/login', element: Login, layout: null },
  { path: '/admin/login', element: LoginAdmin, layout: null },
  { path: '/', element: Home },
  { path: '/donate-process', element: DonateProcess, layout: null },
  { path: '/donate-success/:orderInfor', element: DonateSuccess, layout: null },
  { path: '/process-accept/:type/:bookingId/:memberId', element: ProcessAccept, layout: null },
  { path: '/process-accept/success', element: Success, layout: null },
  { path: '/process-accept/reject', element: Reject, layout: null },
  { path: '/donate-error', element: DonateError, layout: null },
]

const privateRoutes = [
  { path: 'browser-mentors', element: MentorListPage },
  { path: '/mentor/profile/:id', element: MentorProfile },
  { path: '/student/profile', element: StudentProfile },
  { path: '/schedule', element: Schedule },
  { path: '/wallet', element: Wallet },
  { path: '/gift', element: Gift },
  { path: '/notification', element: Notification },
  { path: '/pending-accept', element: PendingAccept }
]

const adminRoutes = [
  { path: '/admin/mentor/:tab', element: ManagerMentor, layout: AdminLayout },
  { path: '/admin/student/:tab', element: ManagerStudent, layout: AdminLayout },
  { path: '/admin/pending-mentors', element: Pending, layout: AdminLayout },
  { path: '/admin/skills', element: ManagerSkills, layout: AdminLayout },
  { path: '/admin/items', element: ManagerItems, layout: AdminLayout },
  { path: '/admin/analytics/overview', element: OverviewChart, layout: AdminLayout },
  { path: '/admin/semester', element: ManagerSemester, layout: AdminLayout },
  { path: '/admin/complaint/pending', element: ManagerComplaintPending, layout: AdminLayout },
  { path: '/admin/complaint/resolved', element: ManagerComplaintResolved, layout: AdminLayout },
]

export { adminRoutes, AdminRoutesAuth, privateRoutes, PrivateRoutesAuth, publicRoutes }

