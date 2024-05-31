import Login from "./Components/Login";
import Register from "./Components/Register";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toast";
import ProtectedRoutes from "./Services/ProtectedRoutes";
import UserDashboard from "./Pages/UserDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import ViewProfile from "./Pages/ViewProfile";
function App() {
  return (
    <>
      <div className="flex justify-center items-center bg-blue-400 h-screen">
        <ToastContainer delay={3000} />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/userDashboard" element={<UserDashboard />} />
              <Route path="/viewProfile" element={<ViewProfile />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
