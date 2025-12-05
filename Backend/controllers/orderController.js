
import Razorpay from "razorpay";
import crypto from "crypto";
import { Order } from "../models/Order Model.js";
import { UserLogin } from "../models/User Model & OTP Model.js";
import { LoginMethod } from "../models/LoginMethod.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Nodemailer setup (Reused from authController)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper: Send Order Confirmation Email
export const sendOrderConfirmationEmail = async (email, name, order) => {
  if (!email) return;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Order Confirmation - Order #${order.orderId || order._id}`,
    html: `
            <h1>Thank you for your order, ${name}!</h1>
            <p>Your order has been successfully placed.</p>
            <p><strong>Order ID:</strong> ${order.orderId || order._id}</p>
            <p><strong>Total Amount:</strong> ₹${order.totalPrice}</p>
            <h3>Items:</h3>
            <ul>
                ${order.books.map(item => `<li>${item.title} x ${item.quantity} - ₹${item.price * item.quantity}</li>`).join('')}
            </ul>
            <p>We will notify you once your order is shipped.</p>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// 1. Create Order (MongoDB + Razorpay)
export const createOrder = async (req, res) => {
  try {
    const { cart, totalAmount, deliveryDetails } = req.body;
    const userId = req.user?.userId;
    const userEmail = req.user?.email;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Create Razorpay Order
    const options = {
      amount: Math.round(totalAmount * 100), // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
      return res.status(500).json({ error: "Failed to create Razorpay order" });
    }

    // Create MongoDB Order (Status: Pending)
    const newOrder = new Order({
      userId: userId || undefined,
      userEmail: userEmail || deliveryDetails.email,
      books: cart.map(book => ({
        bookId: book.id,
        title: book.title,
        price: book.price,
        quantity: book.quantity,
        image: book.image
      })),
      totalPrice: totalAmount,
      deliveryDetails,
      status: "Pending",
      paymentId: null, // Will be updated after verification
      razorpayOrderId: razorpayOrder.id, // Link Razorpay Order ID
      pendingSince: Date.now()
    });

    const savedOrder = await newOrder.save();

    res.json({
      success: true,
      orderId: razorpayOrder.id, // Razorpay Order ID for frontend
      amount: options.amount,
      dbOrderId: savedOrder._id, // MongoDB Order ID
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ error: "Failed to create order", details: error.message });
  }
};

// 2. Verify Payment (Signature Verification)
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment Successful: Update Order
      const order = await Order.findById(dbOrderId);

      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      // Prevent double updates
      if (order.status === "Paid" || order.status === "Unshipped") {
        return res.json({ success: true, message: "Order already processed" });
      }

      order.paymentId = razorpay_payment_id;
      order.status = "Unshipped"; // Or "Paid"
      order.pendingSince = null;
      await order.save();

      // Send Email
      await sendOrderConfirmationEmail(
        order.deliveryDetails.email,
        order.deliveryDetails.fullName,
        order
      );

      return res.json({
        success: true,
        message: "Payment verified and order placed successfully",
        orderId: order._id
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid Signature" });
    }

  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};

// 3. Razorpay Webhook (Fail-safe)
export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET; // You need to set this in .env

    // Verify Webhook Signature
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("Webhook verified");

      const event = req.body.event;
      const payload = req.body.payload;

      if (event === "payment.captured") {
        const payment = payload.payment.entity;
        const razorpayOrderId = payment.order_id;
        const paymentId = payment.id;

        // Find order by Razorpay Order ID
        const order = await Order.findOne({ razorpayOrderId: razorpayOrderId });

        if (order) {
          if (order.status !== "Paid" && order.status !== "Unshipped") {
            order.paymentId = paymentId;
            order.status = "Unshipped";
            order.pendingSince = null;
            await order.save();

            console.log(`Order ${order._id} updated via Webhook`);

            // Send Email
            await sendOrderConfirmationEmail(
              order.deliveryDetails.email,
              order.deliveryDetails.fullName,
              order
            );
          } else {
            console.log(`Order ${order._id} already processed`);
          }
        } else {
          console.error("Order not found for webhook:", razorpayOrderId);
        }
      }
    } else {
      console.error("Invalid Webhook Signature");
      return res.status(400).json({ status: "Invalid signature" });
    }

    res.json({ status: "ok" });

  } catch (error) {
    console.error("Webhook Error:", error);
    res.status(500).json({ error: "Webhook failed" });
  }
};

// Get All Orders (Admin) - Reused/Refactored
export const getAllOrdersWithDeliveryDetails = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map(order => ({
      _id: order._id,
      orderId: order.orderId || order._id,
      customerName: order.deliveryDetails?.fullName || "N/A",
      customerEmail: order.deliveryDetails?.email || order.userEmail || "N/A",
      customerPhone: order.deliveryDetails?.mobile || "N/A",
      totalAmount: order.totalPrice,
      status: order.status,
      paymentId: order.paymentId || "N/A",
      createdAt: order.createdAt,
      items: order.books.map(b => `${b.title} (${b.quantity})`).join(", ")
    }));

    res.json({ success: true, orders: formattedOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
