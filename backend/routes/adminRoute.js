import express from "express";
import {
  getDashboardStats,
  addUser,
  addStore,
  listStores,
  listUsers,
  getUserDetails,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly); // all admin routes are protected

router.get("/dashboard", getDashboardStats);
router.post("/add-user", addUser);
router.post("/add-store", addStore);
router.get("/stores", listStores);
router.get("/users", listUsers);
router.get("/users/:id", getUserDetails);

export default router;
