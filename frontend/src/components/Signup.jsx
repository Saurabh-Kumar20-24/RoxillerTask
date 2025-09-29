import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "", role: "user" });

  const navigate = useNavigate()
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://roxillertask.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
       if (res.ok) {
        alert("Signup successful! Please login.");
        navigate("/login");   // 👈 redirect to login
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

    <form onSubmit={handleSubmit}>
      <input placeholder="Name" name="name" onChange={handleChange} required />
      <input placeholder="Email" name="email" type="email" onChange={handleChange} required />
      <input placeholder="Address" name="address" onChange={handleChange} required />
      <input placeholder="Password" name="password" type="password" onChange={handleChange} required />
      <select 
          name="role" 
          value={form.role} 
          onChange={handleChange} 
          required
        >
          <option value="user">User</option>
          <option value="storeOwner">Store Owner</option>
          <option value="admin">Admin</option>
        </select>
      <button type="submit">Signup</button>
    </form>

    <p>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
