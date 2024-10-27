import {Fragment, useContext} from "react"
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import {Loading} from "./Components"
import {AppContext} from "./Contexts/AppContext"
import {AuthContext} from "./Contexts/AuthContext"
import DefaultLayout from "./Layouts/DefaultLayout"
import {adminRoutes, AdminRoutesAuth, privateRoutes, PrivateRoutesAuth, publicRoutes} from "./Routes"
import {Toaster} from "react-hot-toast";

function App() {
    const {isFetchData} = useContext(AuthContext)
    const {theme} = useContext(AppContext)

    if (isFetchData) return <Loading/>

    return (
        <div className={`App ${theme}`}>
            <Toaster/>
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.element
                        let Layout = DefaultLayout
                        if (route.layout) {
                            Layout = route.layout
                        } else if (route.layout === null) {
                            Layout = Fragment
                        }
                        return (
                            <Route key={index} path={route.path} element={<Layout> <Page/> </Layout>}/>
                        )
                    })}

                    {privateRoutes.map((route, index) => {
                        let Page = route.element
                        let Layout = DefaultLayout
                        if (route.layout === null) {
                            Layout = Fragment
                        } else if (route.layout) {
                            Layout = route.layout
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<PrivateRoutesAuth> <Layout> <Page/> </Layout> </PrivateRoutesAuth>}
                            />
                        )
                    })}

                    {/* ADMIN ROUTES */}
                    {adminRoutes.map((route, index) => {
                        let Page = route.element
                        let Layout = DefaultLayout
                        if (route.layout === null) {
                            Layout = Fragment;
                        } else if (route.layout) {
                            Layout = route.layout
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<AdminRoutesAuth> <Layout> <Page/> </Layout> </AdminRoutesAuth>}
                            />
                        )
                    })}
                </Routes>
            </Router>
        </div>
    )
}

export default App
