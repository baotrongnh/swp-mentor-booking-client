import { Login, MentorListPage, MentorProfile } from "../Pages";
import PrivateRouteAuth from "./PrivateRoutesAuth";

const publicRoutes = [
     { path: '/', element: Login, layout: null },
]

const privateRoutes = [
     { path: '/mentorlist', element: MentorListPage },
     { path: '/mentorprofile/:id', element: MentorProfile }
]

export { publicRoutes, privateRoutes, PrivateRouteAuth }