import express from "express";
import { updatePassword } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.put("/update-password", protect, updatePassword);
export default router;





// import express from "express";
// import { getAllUsers, getUserById, updatePassword } from "../controllers/userController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Admin: View all users
// router.get("/", protect, adminOnly, getAllUsers);

// // Admin: View single user by ID
// router.get("/:id", protect, adminOnly, getUserById);

// // User: Update own password
// router.put("/update-password", protect, updatePassword);

// export default router;
