import React, { useState, useEffect } from "react";
import { getToken } from "../utils/auth.js";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState({ name: "", address: "" });

  // Fetch stores from backend
  const fetchStores = async () => {
    const query = `?name=${search.name}&address=${search.address}`;
    try {
      const res = await fetch(`https://roxillertask.onrender.com/api/stores${query}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setStores(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Submit or modify rating
  const submitRating = async (storeId, rating) => {
    try {
      await fetch(`https://roxillertask.onrender.com/api/stores/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ storeId, rating })
      });
      fetchStores(); // refresh list after rating
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchStores(); }, []);

  return (
    <div>
      <h2>All Stores</h2>

      {/* Search */}
      <input 
        placeholder="Search by Name" 
        value={search.name} 
        onChange={e => setSearch({ ...search, name: e.target.value })} 
      />
      <input 
        placeholder="Search by Address" 
        value={search.address} 
        onChange={e => setSearch({ ...search, address: e.target.value })} 
      />
      <button onClick={fetchStores}>Search</button>

      {/* Store List */}
      <ul>
        {stores.map(store => (
          <li key={store._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{store.name}</h3>
            <p>Address: {store.address}</p>
            <p>Overall Rating: {store.averageRating || "Not rated yet"}</p>
            <p>Your Rating: {store.userRating || "Not rated"}</p>

            <input 
              type="number" 
              min="1" max="5" 
              placeholder="Rate 1-5" 
              onBlur={e => {
                const val = Number(e.target.value);
                if (val >= 1 && val <= 5) submitRating(store._id, val);
                else alert("Rating must be between 1 and 5");
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
