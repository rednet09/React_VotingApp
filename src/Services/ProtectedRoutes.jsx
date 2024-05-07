import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoutes = () => {
  const auth =
    localStorage.getItem("loggedin") || localStorage.getItem("adminLoggedin");

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
