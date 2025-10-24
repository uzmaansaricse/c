import mongoose from "mongoose";
import dotenv from "dotenv";
import { Order } from "./models/Order Model.js";

dotenv.config();

const createTestOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Sample test orders
    const testOrders = [
      {
        orderId: `ORD${Date.now()}001`,
        userEmail: "customer1@example.com",
        books: [
          {
            bookId: new mongoose.Types.ObjectId(),
            title: "Mathematics Class 10",
            price: 250,
            quantity: 2
          }
        ],
        totalPrice: 500,
        deliveryDetails: {
          fullName: "Rajesh Kumar",
          mobile: "9876543210",
          email: "rajesh@example.com",
          address: "123 Main Street",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001"
        },
        paymentId: "pay_" + Math.random().toString(36).substr(2, 9),
        status: "Unshipped"
      },
      {
        orderId: `ORD${Date.now()}002`,
        userEmail: "customer2@example.com",
        books: [
          {
            bookId: new mongoose.Types.ObjectId(),
            title: "Physics Class 12",
            price: 300,
            quantity: 1
          },
          {
            bookId: new mongoose.Types.ObjectId(),
            title: "Chemistry Class 12",
            price: 280,
            quantity: 1
          }
        ],
        totalPrice: 580,
        deliveryDetails: {
          fullName: "Priya Sharma",
          mobile: "9876543211",
          email: "priya@example.com",
          address: "456 Park Avenue",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001"
        },
        paymentId: "pay_" + Math.random().toString(36).substr(2, 9),
        status: "Unshipped"
      },
      {
        orderId: `ORD${Date.now()}003`,
        userEmail: "customer3@example.com",
        books: [
          {
            bookId: new mongoose.Types.ObjectId(),
            title: "English Grammar",
            price: 200,
            quantity: 3
          }
        ],
        totalPrice: 600,
        deliveryDetails: {
          fullName: "Amit Singh",
          mobile: "9876543212",
          email: "amit@example.com",
          address: "789 Garden Road",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560001"
        },
        paymentId: "pay_" + Math.random().toString(36).substr(2, 9),
        status: "Unshipped"
      },
      {
        orderId: `ORD${Date.now()}004`,
        userEmail: "customer4@example.com",
        books: [
          {
            bookId: new mongoose.Types.ObjectId(),
            title: "History Class 8",
            price: 180,
            quantity: 1
          }
        ],
        totalPrice: 180,
        deliveryDetails: {
          fullName: "Sunita Patel",
          mobile: "9876543213",
          email: "sunita@example.com",
          address: "321 Lake View",
          city: "Pune",
          state: "Maharashtra",
          pincode: "411001"
        },
        status: "Pending" // No payment ID - should not be selectable
      },
      {
        orderId: `ORD${Date.now()}005`,
        userEmail: "customer5@example.com",
        books: [
          {
            bookId: new mongoose.Types.ObjectId(),
            title: "Science Class 9",
            price: 220,
            quantity: 2
          }
        ],
        totalPrice: 440,
        deliveryDetails: {
          fullName: "Vikram Gupta",
          mobile: "9876543214",
          email: "vikram@example.com",
          address: "654 Hill Station",
          city: "Jaipur",
          state: "Rajasthan",
          pincode: "302001"
        },
        paymentId: "pay_" + Math.random().toString(36).substr(2, 9),
        status: "Shipped" // Already shipped - should not be selectable
      }
    ];

    // Insert test orders
    for (const orderData of testOrders) {
      const order = new Order(orderData);
      await order.save();
      console.log(`Created order: ${order.orderId} - Status: ${order.status}`);
    }

    console.log("\n✅ Test orders created successfully!");
    console.log("Orders with 'Unshipped' status and payment ID can be selected for invoice generation.");
    
    // Display summary
    const allOrders = await Order.find({}).sort({ createdAt: -1 });
    console.log("\n📊 Current orders in database:");
    allOrders.forEach(order => {
      console.log(`- ${order.orderId} | ${order.deliveryDetails.fullName} | ${order.status} | Payment: ${order.paymentId ? '✅' : '❌'}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error creating test orders:", error);
    process.exit(1);
  }
};

createTestOrders();
