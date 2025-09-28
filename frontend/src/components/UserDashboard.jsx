import React, { useState, useEffect } from "react";
import { getToken, removeToken } from "../utils/auth.js";
import UpdatePassword from "./UpdatePassword.jsx";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState({ name: "", address: "" });

  const fetchStores = async () => {
    const query = `?name=${search.name}&address=${search.address}`;
    const res = await fetch(`https://roxillertask.onrender.com/api/stores${query}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    const data = await res.json();
    setStores(data);
  };

  const submitRating = async (storeId, rating) => {
    await fetch(`https://roxillertask.onrender.com/api/stores/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ storeId, rating })
    });
    fetchStores();
  };

  const handleLogout = () => {
  removeToken();
  localStorage.removeItem("role");
  window.location.href = "/login"; // redirect to login page
};

  useEffect(() => { fetchStores(); }, []);

  return (
    <div>
      <h2>Stores</h2>
      <input placeholder="Search Name" onChange={e => setSearch({ ...search, name: e.target.value })} />
      <input placeholder="Search Address" onChange={e => setSearch({ ...search, address: e.target.value })} />
      <button onClick={fetchStores}>Search</button>

      <ul>
        {stores.map(store => (
          <li key={store.id}>
            <h3>{store.name}</h3>
            <p>{store.address}</p>
            <p>Overall Rating: {store.averageRating}</p>
            <p>Your Rating: {store.userRating || "Not rated"}</p>
            <input type="number" min="1" max="5" placeholder="Rate" 
                   onBlur={e => submitRating(store.id, Number(e.target.value))} />
          </li>
        ))}
      </ul>


      <UpdatePassword/>
      <button onClick={handleLogout}>Logout</button>

    </div>
  );
};

export default UserDashboard;
