import React, { useState } from "react";
import { getToken } from "../utils/auth.js";

const AddUser = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", address: "", role: "user" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/add-user", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}` 
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      alert(data.message || "User added successfully!");
      setForm({ name: "", email: "", password: "", address: "", role: "user" });
    } catch (err) { console.error(err); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New User</h3>
      <input placeholder="Name" name="name" value={form.name} onChange={handleChange} required />
      <input placeholder="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
      <input placeholder="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
      <input placeholder="Address" name="address" value={form.address} onChange={handleChange} required />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="user">Normal User</option>
        <option value="admin">Admin</option>
        <option value="storeOwner">Store Owner</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
