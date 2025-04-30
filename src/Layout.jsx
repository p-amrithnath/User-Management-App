import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/"]; 

  return (
    <>
      <Navbar hide={hideNavbarRoutes.includes(location.pathname)} />
      <App />
    </>
  );
}

export default Layout;
