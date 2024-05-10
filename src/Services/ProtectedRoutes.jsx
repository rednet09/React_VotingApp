import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoutes = () => {
  const auth =
    localStorage.getItem("loggedIn") || localStorage.getItem("adminLoggedIn");

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
