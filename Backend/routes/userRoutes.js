import express from "express";
import { searchUsers, getUserDetail } from "../controllers/userController.js";
// import { getUserOrders } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect routes with authMiddleware if needed
router.get("/search", authMiddleware, searchUsers);

import { getOrdersByMobile, getUserProfile, getUserOrders } from "../controllers/authController.js";

// Add new route for user orders
router.get("/user-orders", authMiddleware, getUserOrders);

// New route to get orders by mobile number
// router.get("/user-orders-by-mobile/:mobile", authMiddleware, getOrdersByMobile);

// New route to get user profile
router.get("/user-profile", authMiddleware, getUserProfile);

router.get("/:userId", authMiddleware, getUserDetail);

export default router;
