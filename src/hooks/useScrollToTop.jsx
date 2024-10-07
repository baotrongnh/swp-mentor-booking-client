import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = () => {
     const { pathname } = useLocation();

     useEffect(() => {
          console.log("Route changed to:", pathname);
          console.log("Current scroll position:", window.scrollY);

          const timer = setTimeout(() => {
               window.scrollTo(0, 0);
          }, 100);

          return () => clearTimeout(timer);
     }, [pathname]);

     return null;
};

export default useScrollToTop;