// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import path from "path";
// import cors from "cors";
// import multer from "multer"
// import { fileURLToPath } from "url";
// import { upload } from "./utility/cloudinary.js";
// import { uploadBook } from "./utility/bookAddCloudinary.js";
// import orderRoutes from "./routes/orderRoute.js";
// import trackingRoutes from "./routes/trackingRoutes.js";
// import cron from "node-cron";




// import { authMiddleware } from './middleware/authMiddleware.js';


// // import fs, { appendFile } from 'fs';


// import {
//     addBook, addReview,  deleteBookById, deleteContent, deleteImage, deleteOrderPending, getAllBooks, getAllContent, getAllOrders, getBanners, getBookDetails, getBooks, getBooksAllCategory, getImages, getNewBooks, getOldBooksAdd, getOrderAnalytics,
//     getPendingOrders, getRazorpayKey, getReviewsByBook, getUserOrders, logout, pendingUpdateAutoDelete, saveorder, SearchgetAllBooks, singlegetbook, toggleBanner, trackOrder, updateBook, updateContent, updateOrderStatus,
//     uploadContent,
//     uploadCSV, uploadImage, usergetOrders, validateQR, getUserProfile, deleteAccount,
//     getAllPendingOrders,
//     deleteOrderById,
// } from "./controllers/authController.js";
// // import { getLoggedInUserOrders } from "./controllers/authController.js";

// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";


 
// dotenv.config({});



// const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Middleware
// // Middl
// app.use(express.json());  // To parse JSON data
// //app.use(cors()); // To allow cross-origin requests
// // app.use(express.urlencoded({ extended: true }));
// import fs from "fs";

// // const allowedOrigins = [
// //   'https://localhost:9000',
// //   'http://localhost:9000',
// //   'http://127.0.0.1:9000',
// //   'https://www.aravalipublication.com'
// // ];

// // // const allowedOrigins = [
// // //   'http://localhost:9000', // dev
// // //   'https://www.aravalipublication.com' // prod
// // // ];

// // app.use(cors({
// //   origin: function(origin, callback){
// //     // allow requests with no origin (like mobile apps, curl, etc.)
// //     if(!origin) return callback(null, true);
// //     if(allowedOrigins.indexOf(origin) === -1){
// //       var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
// //       return callback(new Error(msg), false);
// //     }
// //     return callback(null, true);
// //   },
// //   credentials: true
// // }));

// const allowedOrigins = [
//   'http://localhost',
//   'http://localhost:9000',
//   'https://aravalipublication.com',
//   'https://www.aravalipublication.com',
//   'http://localhost:3000',  // Added common frontend dev port
//   'http://127.0.0.1:3000',  // Added localhost with IP
//   'http://localhost:5500',  // Added live server port
//   'http://localhost:8000'   // Added another common dev port
// ];

// const corsOptions = {
//   origin(origin, callback) {
//     if (!origin) return callback(null, true);                   // Allow curl, mobile apps, etc.
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }
//     console.warn(`Blocked by CORS: ${origin}`);
//     return callback(new Error('Not allowed by CORS'), false);
//   },
//   credentials: true,
//   methods: ['GET','POST','PUT','DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };

// app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.setHeader('Vary', 'Origin');  // Tell caches responses vary based on Origin
//   next();
// });

// app.use(express.static(path.join(__dirname, "../forntendbook")));
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../index.html"));
// });


// // regester user with otp ..........
// //
// // ✅ Send OTP
// // app.post("/send-otp", sendOtp);

// // ✅ User Signup
// // app.post("/signup", signup);

// app.get('/user/profile', authMiddleware, getUserProfile);
//  app.delete('/user/delete-account', authMiddleware, deleteAccount);

// // ✅ User/Admin Login (Both handled here)
// // app.post("/login", login);

// // app.post("/forgot-password", forgotPassword);

// // app.post("/reset-password", resetPassword);
// app.use("/api/tracking", trackingRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// // Move userRoutes mounted at root "/" below all specific routes to avoid route conflicts
// // This ensures /content and other static routes are matched before userRoutes
// app.get("/content", getAllContent);
// app.delete("/content/:id", deleteContent);
// app.put("/content/:id", updateContent);

// app.use("/", userRoutes);

// // app.get("/admin", authMiddleware)
// // app.post("/verifyUser", verifyUser)

// // baner show...
// app.post("/api/upload-imagepanel", upload.single("image"), uploadImage);
// app.get("/api/get-images", getImages);
// app.delete("/api/delete-image/:id", deleteImage);
// app.put("/api/toggle-banner/:id", toggleBanner);
// app.get("/api/banners", getBanners);


// // book add with qur logo ..........

// // 📌 Book Routes


// //  5 book imges handel
// // Allow up to 5 images, but not required to have all 5
// app.post("/api/add-book", uploadBook.array("bookImages", 5), addBook);


// app.get("/api/get-books", getBooks);  // add cart isme all wali h book h
// // update book admin

// // Sirf JSON data update — koi file nahi
// app.put("/api/updatebook/:bookId", uploadBook.array("bookImages", 5), updateBook);



// app.get("/api/book/:bookId", singlegetbook);

// //  admin delete book 
// app.get("/api/get-All-books", getBooksAllCategory);
// app.delete("/api/delete-book/:id", deleteBookById);

// // all books show and addcart rating and review ke
// app.get("/api/all-book-Show", getAllBooks);
// app.get("/api/getNewBooks", getNewBooks);
// app.get("/api/old-book", getOldBooksAdd);

// //  sbi api newbookdetals page beja is api se
// app.get("/BookDetails/:id", getBookDetails);
// app.get("/api/Searchbook", SearchgetAllBooks);






// // Qr code csv file upolad
// // 📌 Ensure upload directory exists
// const uploadDir = path.join(__dirname, "uploads");

// // 📌 Multer Storage Setup
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir); // Ensure "uploads" folder is correct
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const excelupload = multer({ storage });

// // 📌 CSV Upload Route
// app.post("/api/csvupload", excelupload.single("file"), uploadCSV);

// // 📌 QR Code Validation Route
// app.get("/api/validate/:qrCode", validateQR);

// // // order....

// import { createorder } from "./controllers/authController.js";
// app.post("/api/create-order", createorder);

// app.post("/api/save-order", saveorder);
// app.get("/api/get-razorpay-key", getRazorpayKey);

// // user order  by chek admin.(Order Summary Table)
// app.get("/api/get", usergetOrders)

// app.use("/api", orderRoutes);
// // Also mount orderRoutes at root for admin panel compatibility
// app.use("/", orderRoutes);
// // order tarcking..

// app.get("/admin/analytics", getOrderAnalytics); // Admin Order Analytics (Graph ke liye)
// app.get("/admin/orders", getAllOrders);
// app.put("/admin/order/:orderId", updateOrderStatus); //Admin Order Update (Order status update kare)
// app.get("/track/:orderId", trackOrder); // Order Tracking (User Order ID se order check kare)
// app.get("/user-orders", authMiddleware, getUserOrders);//User Order History for logged-in user

// // 



// app.get("/api/admin/all-pending-orders", getAllPendingOrders);// Admin Alert Page (All Pending Orders)
// app.get("/api/admin/pending-orders", getPendingOrders);//7 Days se Pending Orders (Admin Alert Page)
// //  Admin manually delete kare (single pending order)
// app.delete("/api/admin-delete-order/:orderId", deleteOrderById);
// //  Delete ALL pending orders older than 24 hours
// app.delete("/api/admin/delete-old-pending-orders", async (req, res) => {
//   try {
//     const result = await deleteOrderPending();
//     res.json({ deletedCount: result.deletedCount });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete pending orders." });
//   }
// });
// //  Agar status update ho jaye to order auto-delete ho
// app.post("/api/update-order-status", pendingUpdateAutoDelete);

// // rating and reivew
// app.post("/api/reviewRating", addReview);


// // show review ony
// app.get('/BookReviews/:bookId', getReviewsByBook);


// // vedio and text image

// // ✅ Multer Setup (Memory Storage Fix)
// const uploadFile = multer({ storage: multer.memoryStorage() });

// app.post("/upload-content", uploadFile.single("file"), uploadContent);
// app.get("/content", getAllContent);
// app.delete("/content/:id", deleteContent);
// app.put("/content/:id", updateContent);


// // app.get("/api/user/orders", authMiddleware, getLoggedInUserOrders);
// app.get("/logout", logout);
// // const router = express.Router();




// // MongoDB Connect
// // MongoDB Connection
// const connectionMongoDb = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("MongoDB connected successfully");
//     } catch (error) {
//         console.error("MongoDB connection error:", error);
//         process.exit(1); // Fatal error, exit process
//     }
// };


// const PORT = 9000; // Port number
// app.listen(PORT, async () => {
//     console.log(`App is running on http://localhost:${PORT}`);
//     await connectionMongoDb(); // MongoDB connection call
// });




// cron.schedule("0 0 * * *", async () => {
//   console.log("⏰ Running auto-delete for 24hr+ pending orders...");
//   await deleteOrderPending();
// });

// // Cron job for auto-deleting incomplete orders after 24 hours
// import { deleteOldIncompleteOrders } from './controllers/authController.js';
// // Schedule: runs every hour
// cron.schedule('0 * * * *', async () => {
//   await deleteOldIncompleteOrders();
//   // You can log or handle errors as needed
// });

// import { markOrderIncomplete } from "./controllers/authController.js";
// app.post("/api/admin/mark-incomplete/:orderId", async (req, res) => {
//     try {
//         await markOrderIncomplete(req.params.orderId, req.body.reason);
//         res.json({ success: true, message: "Order marked as incomplete" });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Failed to mark order incomplete" });
//     }
// });




import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import multer from "multer"
import { fileURLToPath } from "url";
import { upload } from "./utility/cloudinary.js";
import { uploadBook } from "./utility/bookAddCloudinary.js";
import orderRoutes from "./routes/orderRoute.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import cron from "node-cron";
import { authMiddleware } from "./middleware/authMiddleware.js";






// import fs, { appendFile } from 'fs';


import {
    addBook, addReview,  deleteBookById, deleteContent, deleteImage, deleteOrderPending, getAllBooks, getAllContent, getAllOrders, getBanners, getBookDetails, getBooks, getBooksAllCategory, getImages, getNewBooks, getOldBooksAdd, getOrderAnalytics,
    getPendingOrders, getRazorpayKey, getReviewsByBook, getUserOrders, logout, pendingUpdateAutoDelete, saveorder, SearchgetAllBooks, singlegetbook, toggleBanner, trackOrder, updateBook, updateContent, updateOrderStatus,
    uploadContent,
    uploadCSV, uploadImage, usergetOrders, validateQR, getUserProfile, deleteAccount,
    getAllPendingOrders,
    deleteOrderById,
} from "./controllers/authController.js";
// import { getLoggedInUserOrders } from "./controllers/authController.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";


 
dotenv.config({});

// Environment variable validation for production
const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'EMAIL_USER',
  'EMAIL_PASS',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'ADMIN_MOBILE',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_PHONE_NUMBER',
  'VITE_GOOGLE_CLIENT_ID',  // Required for Google OAuth verification in backend
  'VITE_FACEBOOK_APP_ID'    // Now served from backend to frontend
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars);
  console.error('Please set all required environment variables before starting the application.');
  process.exit(1);
}

console.log('✅ All required environment variables are set');

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
// Middl
app.use(express.json());  // To parse JSON data
//app.use(cors()); // To allow cross-origin requests
// app.use(express.urlencoded({ extended: true }));
import fs from "fs";

// const allowedOrigins = [
//   'https://localhost:9000',
//   'http://localhost:9000',
//   'http://127.0.0.1:9000',
//   'https://www.aravalipublication.com'
// ];

// // const allowedOrigins = [
// //   'http://localhost:9000', // dev
// //   'https://www.aravalipublication.com' // prod
// // ];

// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin (like mobile apps, curl, etc.)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true
// }));

const allowedOrigins = [
  'http://localhost',
  'http://localhost:9000',
  'https://aravalipublication.com',
  'https://www.aravalipublication.com',
  'http://localhost:3000',  // Added common frontend dev port
  'http://127.0.0.1:3000',  // Added localhost with IP
  'http://localhost:5500',  // Added live server port
  'http://localhost:8000'   // Added another common dev port
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);                   // Allow curl, mobile apps, etc.
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn(`Blocked by CORS: ${origin}`);
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader('Vary', 'Origin');  // Tell caches responses vary based on Origin
  next();
});

app.use(express.static(path.join(__dirname, "../forntendbook")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});


// regester user with otp ..........
//
// ✅ Send OTP
// app.post("/send-otp", sendOtp);

// ✅ User Signup
// app.post("/signup", signup);

app.get('/user/profile', authMiddleware, getUserProfile);
 app.delete('/user/delete-account', authMiddleware, deleteAccount);

// ✅ User/Admin Login (Both handled here)
// app.post("/login", login);

// app.post("/forgot-password", forgotPassword);

// app.post("/reset-password", resetPassword);
app.use("/api/tracking", trackingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Move userRoutes mounted at root "/" below all specific routes to avoid route conflicts
// This ensures /content and other static routes are matched before userRoutes
app.get("/content", getAllContent);
app.delete("/content/:id", deleteContent);
app.put("/content/:id", updateContent);

app.use("/", userRoutes);

// app.get("/admin", authMiddleware)
// app.post("/verifyUser", verifyUser)

// baner show...
app.post("/api/upload-imagepanel", upload.single("image"), uploadImage);
app.get("/api/get-images", getImages);
app.delete("/api/delete-image/:id", deleteImage);
app.put("/api/toggle-banner/:id", toggleBanner);
app.get("/api/banners", getBanners);


// book add with qur logo ..........

// 📌 Book Routes


//  5 book imges handel
// Allow up to 5 images, but not required to have all 5
app.post("/api/add-book", uploadBook.array("bookImages", 5), addBook);


app.get("/api/get-books", getBooks);  // add cart isme all wali h book h
// update book admin

// Sirf JSON data update — koi file nahi
app.put("/api/updatebook/:bookId", uploadBook.array("bookImages", 5), updateBook);



app.get("/api/book/:bookId", singlegetbook);

//  admin delete book 
app.get("/api/get-All-books", getBooksAllCategory);
app.delete("/api/delete-book/:id", deleteBookById);

// all books show and addcart rating and review ke
app.get("/api/all-book-Show", getAllBooks);
app.get("/api/getNewBooks", getNewBooks);
app.get("/api/old-book", getOldBooksAdd);

//  sbi api newbookdetals page beja is api se
app.get("/BookDetails/:id", getBookDetails);
app.get("/api/Searchbook", SearchgetAllBooks);






// Qr code csv file upolad
// 📌 Ensure upload directory exists
const uploadDir = path.join(__dirname, "uploads");

// 📌 Multer Storage Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Ensure "uploads" folder is correct
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const excelupload = multer({ storage });

// 📌 CSV Upload Route
app.post("/api/csvupload", excelupload.single("file"), uploadCSV);

// 📌 QR Code Validation Route
app.get("/api/validate/:qrCode", validateQR);

// // order....

import { createorder } from "./controllers/authController.js";
app.post("/api/create-order", authMiddleware , createorder);

app.post("/api/save-order", authMiddleware,saveorder);
app.get("/api/get-razorpay-key", getRazorpayKey);

// user order  by chek admin.(Order Summary Table)
app.get("/api/get", usergetOrders)

app.use("/api", orderRoutes);
// Also mount orderRoutes at root for admin panel compatibility
app.use("/", orderRoutes);
// order tarcking..

app.get("/admin/analytics", getOrderAnalytics); // Admin Order Analytics (Graph ke liye)
app.get("/admin/orders", getAllOrders);
app.put("/admin/order/:orderId", updateOrderStatus); //Admin Order Update (Order status update kare)
app.get("/track/:orderId", trackOrder); // Order Tracking (User Order ID se order check kare)
app.get("/user-orders", authMiddleware, getUserOrders);//User Order History for logged-in user

// 



app.get("/api/admin/all-pending-orders", getAllPendingOrders);// Admin Alert Page (All Pending Orders)
app.get("/api/admin/pending-orders", getPendingOrders);//7 Days se Pending Orders (Admin Alert Page)
//  Admin manually delete kare (single pending order)
app.delete("/api/admin-delete-order/:orderId", deleteOrderById);
//  Delete ALL pending orders older than 24 hours
app.delete("/api/admin/delete-old-pending-orders", async (req, res) => {
  try {
    const result = await deleteOrderPending();
    res.json({ deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete pending orders." });
  }
});
//  Agar status update ho jaye to order auto-delete ho
app.post("/api/update-order-status", pendingUpdateAutoDelete);

// rating and reivew
app.post("/api/reviewRating", addReview);


// show review ony
app.get('/BookReviews/:bookId', getReviewsByBook);


// vedio and text image

// ✅ Multer Setup (Memory Storage Fix)
const uploadFile = multer({ storage: multer.memoryStorage() });

app.post("/upload-content", uploadFile.single("file"), uploadContent);
app.get("/content", getAllContent);
app.delete("/content/:id", deleteContent);
app.put("/content/:id", updateContent);


// app.get("/api/user/orders", authMiddleware, getLoggedInUserOrders);
app.get("/logout", logout);
// const router = express.Router();




// MongoDB Connect
// MongoDB Connection
const connectionMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Fatal error, exit process
    }
};


const PORT = process.env.PORT || 9000; // Use environment variable for production
app.listen(PORT, async () => {
    console.log(`App is running on port ${PORT}`);
    await connectionMongoDb(); // MongoDB connection call
});




cron.schedule("0 0 * * *", async () => {
  console.log("⏰ Running auto-delete for 24hr+ pending orders...");
  await deleteOrderPending();
});

// Cron job for auto-deleting incomplete orders after 24 hours
import { deleteOldIncompleteOrders } from './controllers/authController.js';
// Schedule: runs every hour
cron.schedule('0 * * * *', async () => {
  await deleteOldIncompleteOrders();
  // You can log or handle errors as needed
});

import { markOrderIncomplete } from "./controllers/authController.js";
import { auth } from "google-auth-library";

app.post("/api/admin/mark-incomplete/:orderId", async (req, res) => {
    try {
        await markOrderIncomplete(req.params.orderId, req.body.reason);
        res.json({ success: true, message: "Order marked as incomplete" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to mark order incomplete" });
    }
});