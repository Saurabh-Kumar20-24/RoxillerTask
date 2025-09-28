import React, { useState } from "react";
import { setToken } from "../utils/auth.js";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://roxillertask.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("role", data.role);
        if(data.role === "admin") window.location.href = "/admin";
        else if(data.role === "user") window.location.href = "/user";
        else if(data.role === "storeOwner") window.location.href = "/owner";
      } else alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

    <form onSubmit={handleSubmit}>
      <input placeholder="Email" name="email" type="email" onChange={handleChange} required />
      <input placeholder="Password" name="password" type="password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>

    <p>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "blue", textDecoration: "underline" }}>
          Sign up
        </Link>
      </p>
    </div>
    
  );
};

export default Login;
