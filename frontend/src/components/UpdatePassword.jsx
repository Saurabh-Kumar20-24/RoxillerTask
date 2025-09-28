import React, { useState } from "react";
import { getToken, removeToken } from "../utils/auth.js";

const UpdatePassword = () => {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://roxillertask.onrender.com/api/user/update-password", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}` 
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setForm({ oldPassword: "", newPassword: "" });

        // Logout after password change for security
        removeToken();
        localStorage.removeItem("role");
        window.location.href = "/login";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h4>Update Password</h4>
      <input
        type="password"
        name="oldPassword"
        placeholder="Old Password"
        value={form.oldPassword}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={form.newPassword}
        onChange={handleChange}
        required
      />
      <button type="submit">Update Password</button>
    </form>
  );
};

export default UpdatePassword;
