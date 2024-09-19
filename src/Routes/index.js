import { Login } from "../Pages";
import PrivateRouteAuth from "./PrivateRoutesAuth";

const publicRoutes = [
     { path: '/login', element: Login, layout: null },
]

const privateRoutes = [
     {}
]

export { publicRoutes, privateRoutes, PrivateRouteAuth }