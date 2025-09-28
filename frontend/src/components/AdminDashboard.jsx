import React, { useState, useEffect } from "react";
import { getToken, removeToken } from "../utils/auth.js";
import AddUser from "./AddUser.jsx";
import AddStore from "./AddStore.jsx";
import UpdatePassword from "./UpdatePassword.jsx";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [userFilter, setUserFilter] = useState({ name: "", email: "", address: "", role: "" });

  const fetchDashboard = async () => {
    const res = await fetch("http://localhost:5000/api/admin/dashboard", { 
      headers: { Authorization: `Bearer ${getToken()}` } 
    });
    setStats(await res.json());
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/admin/users", { 
      headers: { Authorization: `Bearer ${getToken()}` } 
    });
    setUsers(await res.json());
  };

  const fetchStores = async () => {
    const res = await fetch("http://localhost:5000/api/admin/stores", { 
      headers: { Authorization: `Bearer ${getToken()}` } 
    });
    setStores(await res.json());
  };

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  useEffect(() => { 
    fetchDashboard(); 
    fetchUsers(); 
    fetchStores(); 
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Admin Dashboard</h2>
    

      <div style={{ marginTop: "20px" }}>
        <p><strong>Total Users:</strong> {stats.totalUsers}</p>
        <p><strong>Total Stores:</strong> {stats.totalStores}</p>
        <p><strong>Total Ratings:</strong> {stats.totalRatings}</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
        <div style={{ width: "48%" }}>
          <AddUser /> {/* Admin can add Normal, Admin, or Store Owner */}
        </div>

        <div style={{ width: "48%" }}>
          <AddStore /> {/* Admin can add a store and assign a store owner */}
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <div style={{ marginTop: "20px" }}>
            <h3>Filter Users</h3>
            <input placeholder="Name" onChange={e => setUserFilter({...userFilter, name: e.target.value})} />
            <input placeholder="Email" onChange={e => setUserFilter({...userFilter, email: e.target.value})} />
            <input placeholder="Address" onChange={e => setUserFilter({...userFilter, address: e.target.value})} />
            <input placeholder="Role" onChange={e => setUserFilter({...userFilter, role: e.target.value})} />
        </div>
        <h3>Users</h3>
        {/* <ul>{users.map(u => <li key={u._id}>{u.name} - {u.role}</li>)}</ul> */}

        <ul>
            {users
                .filter(u => 
                u.name.toLowerCase().includes(userFilter.name.toLowerCase()) &&
                u.email.toLowerCase().includes(userFilter.email.toLowerCase()) &&
                (u.address || "").toLowerCase().includes(userFilter.address.toLowerCase()) &&
                u.role.toLowerCase().includes(userFilter.role.toLowerCase())
                )
                .map(u => <li key={u._id}>{u.name} - {u.email} - {u.address} - {u.role}</li>)
            }
        </ul>

        <h3>Stores</h3>
        <ul>{stores.map(s => <li key={s._id}>{s.name} - Avg Rating: {s.averageRating || "N/A"}</li>)}</ul>
      </div>
      {/* <UpdatePassword/> */}
        <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
