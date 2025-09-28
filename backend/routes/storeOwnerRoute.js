import express from "express";
import { getMyStoreDashboard } from "../controllers/storeOwnerController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/dashboard", protect, getMyStoreDashboard);
export default router;
