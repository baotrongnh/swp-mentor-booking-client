import { Login, MentorListPage } from "../Pages";
import PrivateRouteAuth from "./PrivateRoutesAuth";

const publicRoutes = [
     { path: '/', element: Login, layout: null },
]

const privateRoutes = [
     { path: '/mentorlist', element: MentorListPage }
]

export { publicRoutes, privateRoutes, PrivateRouteAuth }