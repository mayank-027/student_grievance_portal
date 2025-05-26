import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import SubmitGrievance from "./components/Grievance/SubmitGrievance";
import GrievanceDetails from "./components/Grievance/GrievanceDetails";
import ChatBot from "./pages/Chatbot";
import AdminLogin from "./pages/admin/Login";
import Grievances from "./pages/admin/Grievances";
import Users from "./pages/admin/Users";
import AdminDashboard from "./pages/admin/Dashboard";
import Stats from "./pages/admin/Stats";
import Layout from "./components/Layout/Layout";
import DepartmentLogin from "./pages/department/Login";
import DepartmentDashboard from "./pages/department/Dashboard";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Profile from "./pages/Profile";
import AdminChatbot from "./components/admin/AdminChatbot";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  return token && user.role === "admin" ? (
    <>
      {children}
      <AdminChatbot />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/submit-grievance"
            element={
              <PrivateRoute>
                <SubmitGrievance />
              </PrivateRoute>
            }
          />
          <Route
            path="/grievance/:id"
            element={
              <PrivateRoute>
                <GrievanceDetails />
              </PrivateRoute>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/grievances"
            element={
              <AdminRoute>
                <Grievances />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/stats"
            element={
              <AdminRoute>
                <Stats />
              </AdminRoute>
            }
          />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/department/login" element={<DepartmentLogin />} />
          <Route path="/department/dashboard" element={<DepartmentDashboard />} />

          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
