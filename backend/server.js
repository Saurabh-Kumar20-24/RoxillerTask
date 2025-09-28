import express from "express"
import connectDB from "./config/db.js"
import authRoutes from "../backend/routes/authRoute.js"
import userRoutes from "../backend/routes/userRoute.js"
import adminRoutes from "../backend/routes/adminRoute.js"
import storeRoutes from "../backend/routes/storeRoute.js"
import storeOwnerRoutes from "../backend/routes/storeOwnerRoute.js"
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json()); 

connectDB()

app.use("/api/auth", authRoutes);      // register/login
app.use("/api/user", userRoutes);    // user management
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/store-owner", storeOwnerRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(5000, ()=>{
    console.log('running on 1k')
})