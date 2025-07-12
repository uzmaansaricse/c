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




import { authMiddleware } from './middleware/authMiddleware.js';


import fs, { appendFile } from 'fs';


import {
    addBook, addReview, createorder, deleteBookById, deleteContent, deleteImage, deleteOrderPending, forgotPassword, getAllBooks, getAllContent, getAllOrders, getBanners, getBookDetails, getBooks, getBooksAllCategory, getImages, getNewBooks, getOldBooksAdd, getOrderAnalytics,



    getPendingOrders, getRazorpayKey, getReviewsByBook, getUserOrders, login, logout, pendingUpdateAutoDelete, resetPassword, saveorder, SearchgetAllBooks, sendOtp, signup, singlegetbook, toggleBanner, trackOrder, updateBook, updateContent, updateOrderStatus,

    uploadContent,

    uploadCSV, uploadImage, usergetOrders, validateQR, getUserProfile, deleteAccount,
    verifyUser,
    getAllPendingOrders,
    deleteOrderById,
} from "./controllers/authController.js";




 
dotenv.config({});



const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
// Middl
app.use(express.json());  // To parse JSON data
app.use(cors()); // To allow cross-origin requests
// app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../forntendbook")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});


// regester user with otp ..........
//
// ✅ Send OTP
app.post("/send-otp", sendOtp);

// ✅ User Signup
app.post("/signup", signup);

app.get('/user/profile', authMiddleware, getUserProfile);
app.delete('/user/delete-account', authMiddleware, deleteAccount);

// ✅ User/Admin Login (Both handled here)
app.post("/login", login);

app.post("/forgot-password", forgotPassword);

app.post("/reset-password", resetPassword);
app.use("/api/tracking", trackingRoutes);

// app.get("/admin", authMiddleware)
app.post("/verifyUser", verifyUser)

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
app.get("/getNewBooks", getNewBooks);
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

app.post("/api/create-order", createorder);

app.post("/api/save-order", saveorder);
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
app.get("/user-orders/:mobile", getUserOrders);//User Order History (Mobile number se orders check kare)

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


app.get("/logout", logout);
// const router = express.Router();




// MongoDB Connect
// MongoDB Connection
const connectionMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB se connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Fatal error, exit process
    }
};

// Server start
const PORT = 9000; // Port number
app.listen(PORT, async () => {
    console.log(`App is running on http://localhost:${PORT}`);
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






