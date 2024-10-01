import { Login, MentorListPage, MentorProfile, StudentProfile } from "../Pages";
import PrivateRouteAuth from "./PrivateRoutesAuth";

const publicRoutes = [{ path: "/", element: Login, layout: null }];

const privateRoutes = [
  { path: "/mentorlist", element: MentorListPage },
  { path: "/mentorprofile/:id", element: MentorProfile },
  { path: "/profile", element: StudentProfile },
];

export { publicRoutes, privateRoutes, PrivateRouteAuth };
