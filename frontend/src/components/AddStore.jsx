import React, { useState, useEffect } from "react";
import { getToken } from "../utils/auth.js";

const AddStore = () => {
  const [form, setForm] = useState({ name: "", email: "", address: "", owner: "" });
  const [storeOwners, setStoreOwners] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Fetch all store owners
  const fetchStoreOwners = async () => {
    const res = await fetch("http://localhost:5000/api/admin/users?role=storeOwner", {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    const data = await res.json();
    setStoreOwners(data);
  };

  useEffect(() => { fetchStoreOwners(); }, []);

  // Submit new store
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/add-store", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}` 
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if(data.message){
        alert(data.message);
        setForm({ name: "", email: "", address: "", owner: "" });
      } else {
        alert("Something went wrong");
      }

    } catch (err) { console.error(err); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Store</h3>
      <input 
        placeholder="Store Name" 
        name="name" 
        value={form.name} 
        onChange={handleChange} 
        required 
      />
      <input 
        placeholder="Store Email" 
        name="email" 
        type="email" 
        value={form.email} 
        onChange={handleChange} 
        required 
      />
      <input 
        placeholder="Store Address" 
        name="address" 
        value={form.address} 
        onChange={handleChange} 
        required 
      />
      <select 
        name="owner" 
        value={form.owner} 
        onChange={handleChange} 
        required
      >
        <option value="">Select Store Owner</option>
        {storeOwners.map(owner => (
          <option key={owner._id} value={owner._id}>
            {owner.name} ({owner.email})
          </option>
        ))}
      </select>
      <button type="submit">Add Store</button>
    </form>
  );
};

export default AddStore;
