import express from "express";
import { getAllOrdersWithDeliveryDetails } from "../controllers/orderController.js";
import { updateTrackingId } from "../controllers/authController.js";
import { Order } from "../models/Order Model.js"; // Correct import for named export from the actual file

const router = express.Router();

// Update tracking ID
router.patch("/order/:id/tracking", updateTrackingId);

// Send order confirmation email
router.post("/order/send-confirmation-email", async (req, res) => {
  const { orderId, email, fullName } = req.body;
  try {
    const order = await Order.findById(orderId).lean();
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Enrich deliveryDetails with email if missing
    if (!order.deliveryDetails) {
      order.deliveryDetails = {};
    }
    if (!order.deliveryDetails.email && order.userEmail) {
      order.deliveryDetails.email = order.userEmail;
    }

    // Import and use sendOrderConfirmationEmail
    const { sendOrderConfirmationEmail } = await import("../controllers/orderController.js");
    await sendOrderConfirmationEmail(email, fullName, order);
    res.json({ message: "Email sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single order by ID for admin (for email sending, etc.)
router.get("/admin/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: "books.bookId",
        select: "title price bookImages mainImageIndex"
      })
      .lean();

    if (!order) return res.status(404).json({ error: "Order not found" });

    // Enrich deliveryDetails with email if missing
    if (!order.deliveryDetails) {
      order.deliveryDetails = {};
    }
    if (!order.deliveryDetails.email && order.userEmail) {
      order.deliveryDetails.email = order.userEmail;
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all incomplete orders for admin
router.get("/admin/incomplete-orders", async (req, res) => {
  try {
    const incompleteOrders = await Order.find({ status: 'Incomplete' })
      .select('_id userEmail failureReason createdAt books deliveryDetails')
      .sort({ createdAt: -1 })
      .lean();

    // Map books to include only required fields
    const orders = incompleteOrders.map(order => {
      const books = order.books.map(book => ({
        title: book.title,
        quantity: book.quantity,
        price: book.price,
        totalPrice: book.price * book.quantity
      }));
      return {
        ...order,
        books,
        phoneNumber: order.deliveryDetails?.mobile || 'N/A',
        address: order.deliveryDetails
          ? `${order.deliveryDetails.address}, ${order.deliveryDetails.city}, ${order.deliveryDetails.state} - ${order.deliveryDetails.pincode}`
          : 'N/A'
      };
    });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch incomplete orders' });
  }
});

// New route to get all orders with delivery details for admin panel
router.get("/admin/all-orders", getAllOrdersWithDeliveryDetails);

export default router;
