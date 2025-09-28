import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import StoreOwnerDashboard from "./components/StoreOwnerDashboard.jsx";

function App() {
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {role === "user" && <Route path="/user" element={<UserDashboard />} />}
        {role === "admin" && <Route path="/admin" element={<AdminDashboard />} />}
        {role === "storeOwner" && <Route path="/owner" element={<StoreOwnerDashboard />} />}
      </Routes>
    </Router>
  );
}

export default App;
