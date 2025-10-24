import mongoose from "mongoose";
import dotenv from "dotenv";
import { Order } from "./models/Order Model.js";

dotenv.config();

const testStatusFlow = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Create orders with different statuses to test the flow
    const testOrders = [
      {
        orderId: `TEST_PENDING_${Date.now()}`,
        userEmail: "pending@test.com",
        books: [
          {
            bookId: new mongoose.Types.ObjectId(),
            title: "Test Book - Pending",
            price: 100,
            quantity: 1
          }
        ],
        totalPrice: 100,
        deliveryDetails: {
          fullName: "Pending Order Test",
          mobile: "9999999999",
          email: "pending@test.com",
          address: "Test Address",
          city: "Test City",
          state: "Test State",
          pincode: "123456"
        },
        status: "Pending" // No paymentId - payment failed/incomplete
      },
      {
        orderId: `TEST_UNSHIPPED_${Date.now()}`,
        userEmail: "unshipped@test.com",
        books: [
          {
            bookId: new mongoose.Types.ObjectId(),
            title: "Test Book - Unshipped",
            price: 200,
            quantity: 1
          }
        ],
        totalPrice: 200,
        deliveryDetails: {
          fullName: "Unshipped Order Test",
          mobile: "8888888888",
          email: "unshipped@test.com",
          address: "Test Address 2",
          city: "Test City 2",
          state: "Test State 2",
          pincode: "654321"
        },
        paymentId: "pay_test_success_123",
        status: "Unshipped" // Payment successful via Razorpay
      },
      {
        orderId: `TEST_SHIPPED_${Date.now()}`,
        userEmail: "shipped@test.com",
        books: [
          {
            bookId: new mongoose.Types.ObjectId(),
            title: "Test Book - Shipped",
            price: 300,
            quantity: 1
          }
        ],
        totalPrice: 300,
        deliveryDetails: {
          fullName: "Shipped Order Test",
          mobile: "7777777777",
          email: "shipped@test.com",
          address: "Test Address 3",
          city: "Test City 3",
          state: "Test State 3",
          pincode: "987654"
        },
        paymentId: "pay_test_success_456",
        status: "Shipped" // Invoice generated and shipped
      }
    ];

    // Insert test orders
    for (const orderData of testOrders) {
      const order = new Order(orderData);
      await order.save();
      console.log(`✅ Created ${order.status} order: ${order.orderId}`);
    }

    console.log("\n📊 Status Flow Test Summary:");
    console.log("1. PENDING: Payment failed/incomplete (no paymentId) - Will be auto-deleted after 24h");
    console.log("2. UNSHIPPED: Payment successful (has paymentId) - Ready for invoice generation");
    console.log("3. SHIPPED: Invoice generated - Order completed");

    // Display all orders by status
    const allOrders = await Order.find({}).sort({ createdAt: -1 });
    console.log("\n📋 All Orders by Status:");
    
    const statusGroups = {};
    allOrders.forEach(order => {
      if (!statusGroups[order.status]) {
        statusGroups[order.status] = [];
      }
      statusGroups[order.status].push(order);
    });

    Object.keys(statusGroups).forEach(status => {
      console.log(`\n${status.toUpperCase()} (${statusGroups[status].length}):`);
      statusGroups[status].forEach(order => {
        const payment = order.paymentId ? '✅ Paid' : '❌ No Payment';
        console.log(`  - ${order.orderId} | ${order.deliveryDetails.fullName} | ${payment}`);
      });
    });

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

testStatusFlow();
