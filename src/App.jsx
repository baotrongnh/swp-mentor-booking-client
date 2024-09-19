import { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import { publicRoutes } from "./Routes";

function App() {

  return (
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
