import React, { useState, useEffect } from "react";
import { getToken, removeToken } from "../utils/auth.js";
import UpdatePassword from "./UpdatePassword.jsx";

const StoreOwnerDashboard = () => {
  const [store, setStore] = useState(null);

  const fetchDashboard = async () => {
    const res = await fetch("http://localhost:5000/api/store-owner/dashboard", { headers: { Authorization: `Bearer ${getToken()}` } });
    setStore(await res.json());
  };

  const handleLogout = () => {
  removeToken();
  localStorage.removeItem("role");
  window.location.href = "/login"; // redirect to login page
};

  useEffect(() => { fetchDashboard(); }, []);

  if(!store) return <p>Loading...</p>;

  return (
    <div>
      <h2>{store.storeName}</h2>
      <p>Address: {store.address}</p>
      <p>Average Rating: {store.averageRating}</p>
      <h3>User Ratings</h3>
      <ul>
        {store.ratedUsers.map(u => (
          <li key={u.userId}>{u.name} ({u.email}): {u.rating}</li>
        ))}
      </ul>

      <UpdatePassword/>

      <button onClick={handleLogout}>Logout</button>

    </div>
  );
};

export default StoreOwnerDashboard;
