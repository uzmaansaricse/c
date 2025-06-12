import express from "express";
import { updateTrackingId } from "../controllers/authController.js";
import { Order } from "../models/Order Model.js"; // Correct import for named export from the actual file

const router = express.Router();

// Update tracking ID
router.patch("/order/:id/tracking", updateTrackingId);

// Get single order by ID for admin (for email sending, etc.)
router.get("/admin/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean();
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

// If you still get import errors, try this alternative (for CommonJS compatibility):
// import * as OrderModel from "../models/Order Model.js";
// const Order = OrderModel.Order;
