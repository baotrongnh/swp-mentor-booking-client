import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import { adminRoutes, AdminRoutesAuth, privateRoutes, PrivateRoutesAuth, publicRoutes } from "./Routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App light-theme'>
        <Router>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.element
              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              return (
                <Route key={index} path={route.path} element={<Layout> <Page /> </Layout>} />
              )
            })}

            {privateRoutes.map((route, index) => {
              let Page = route.element;
              let Layout = DefaultLayout;
              if (route.layout === null) {
                Layout = Fragment;
              } else if (route.layout) {
                Layout = route.layout;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<PrivateRoutesAuth> <Layout> <Page /> </Layout> </PrivateRoutesAuth>}
                />
              )
            })}

            {/* ADMIN ROUTES */}
            {adminRoutes.map((route, index) => {
              let Page = route.element;
              let Layout = DefaultLayout;
              if (route.layout === null) {
                Layout = Fragment;
              } else if (route.layout) {
                Layout = route.layout;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<AdminRoutesAuth> <Layout> <Page /> </Layout> </AdminRoutesAuth>}
                />
              )
            })}
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
