import express from "express";
import { getStores, submitRating } from "../controllers/storeController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", protect, getStores);
router.post("/rate", protect, submitRating);
export default router;
