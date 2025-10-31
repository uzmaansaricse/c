// import useragent from "useragent";
// import bcrypt from 'bcryptjs';

// import nodemailer from "nodemailer";
// import jwt from "jsonwebtoken";
// import twilio from "twilio";
// import fs from 'fs';
// import Razorpay from "razorpay";

// import csvParser from 'csv-parser';

// import { uploadToCloudinary, deleteFromCloudinary } from "../utility/cloudinary.js";

// // import { UserLogin } from "../models/User Model & OTP Model.js";
// // import { authMiddleware } from "../utility/middleware.js";

// import { Imageadmin } from "../models/imageModel.js";

// import axios from "axios";  // Added axios import


// // book add withqur code 


// import path from "path";
// import { fileURLToPath } from 'url';

// import { Book } from "../models/BookSchema.js";
// import { bookUploadToCloudinary } from "../utility/bookAddCloudinary.js";


// // excel me data sve sl no or qr code 
// import { Qurexcel } from "../models/QRexcelsheet.js";

// // oder model..
// import { Order } from "../models/Order Model.js";

// //  Order Tracking Model

// import { OrderTracking } from "../models/Order Tracking Model.js";

// //  Review and rating Schema
// import { Review } from "../models/Review Rating model.js";


// // video or iamge 
// import { Content } from "../models/video And image and text Model.js";
// import { uploadFile ,deleteFile } from "../utility/video and image.js";

// import { OAuth2Client } from "google-auth-library";
// const googleClient = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

// // export const socialLogin = async (req, res) => {
// //   try {
// //     const { provider, socialToken } = req.body;
// //     let email;

// //     if (provider === 'google') {
// //       const ticket = await googleClient.verifyIdToken({
// //         idToken: socialToken,
// //         audience: process.env.GOOGLE_CLIENT_ID
// //       });
// //       email = ticket.getPayload().email;
// //     }

// //     // (Optional) Verify Facebook token with FB Graph API here

// //     if (!email) return res.status(400).json({ message: "Social login failed." });

// //     // Find or create user
// //     let user = await UserLogin.findOne({ email });
// //     if (!user) {
// //       user = await UserLogin.create({ name: "Google User", email });
// //     }

// //     // Create JWT
// //     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// //     res.json({ token, email });
// //   } catch (err) {
// //     console.error("Social login error:", err);
// //     res.status(500).json({ message: "Server error during social login" });
// //   }
// // };
// import dotenv from "dotenv";
// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;


// // ...other imports...
// const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
// const ADMIN_MOBILE = process.env.ADMIN_MOBILE;
// const TWILIO_PHONE_NUMBER_USER = process.env.TWILIO_PHONE_NUMBER_USER;
// const TWILIO_PHONE_NUMBER_ADMIN = process.env.TWILIO_PHONE_NUMBER_ADMIN;

// // Two separate Twilio clients for user and admin
// const twilioClientUser = twilio(process.env.TWILIO_ACCOUNT_SID_USER, process.env.TWILIO_AUTH_TOKEN_USER);
// const twilioClientAdmin = twilio(process.env.TWILIO_ACCOUNT_SID_ADMIN, process.env.TWILIO_AUTH_TOKEN_ADMIN);

// // Nodemailer setup
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });
// // silder image and video

// // const ADMIN_EMAIL = "uzmaasr54@gmail.com";      // Your admin email
// // const ADMIN_MOBILE = "8107142344";             // Your admin phone





// //  auth.................

// // const JWT_SECRET = process.env.JWT_SECRET;
// // const ADMIN_MOBILE = "8107142344";
// // const ADMIN_PASSWORD = "123";
// // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// // const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// // const sendOtp = async (req, res) => {
// //     try {
// //         const { mobile } = req.body;
// //         if (!mobile) return res.status(400).json({ message: "Mobile number is required." });
// //
// //         const formattedMobile = mobile.startsWith("+") ? mobile : `+91${mobile}`;
// //         const otp = generateOTP();
// //         const otpExpiresAt = new Date(Date.now() + 5 * 60000);
// //
// //         let user = await UserLogin.findOne({ mobile });
// //         if (user) {
// //             user.otp = otp;
// //             user.otpExpiresAt = otpExpiresAt;
// //         } else {
// //             user = new UserLogin({ name: "Unknown", mobile, password: "defaultpassword", otp, otpExpiresAt });
// //         }
// //         await user.save();
// //
// //         await client.messages.create({
// //             body: `Your OTP is: ${otp}`,
// //             from: process.env.TWILIO_PHONE_NUMBER,
// //             to: formattedMobile
// //         });
// //
// //         res.status(200).json({ message: "OTP sent successfully." });
// //     } catch (error) {
// //         console.error("Twilio Error:", error);
// //         res.status(500).json({ message: "Failed to send OTP. Try again later." });
// //     }
// // };

// // const signup = async (req, res) => {
// //     try {
// //         const { name, mobile, email, password, otp } = req.body; // changes isha
// //         const user = await UserLogin.findOne({ mobile });
// //         if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
// //             return res.status(400).json({ message: "Invalid OTP." });
// //         }
// //         user.name = name;
// //         user.password = await bcrypt.hash(password, 10);
// //         user.otp = null;
// //         user.otpExpiresAt = null;
// //         if (email) user.email = email;
// //         await user.save();
// //         res.status(201).json({ message: "Signup successful." });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };




// import { UserLogin } from "../models/User Model & OTP Model.js";
// import { sendOrderConfirmationEmail } from "./orderController.js";

// // Get user profile (only name and mobile)
// export const getUserProfile = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const user = await UserLogin.findById(userId).select('loginMethod name mobile email');
//     if (!user) return res.status(404).json({ message: 'User not found login again!!' });

//     const responseData = {};
//     if (user.loginMethod === 'phone') {
//       responseData.mobile = user.mobile;
//       responseData.name = "--";
//     } else {
//       responseData.name = user.name;
//       responseData.mobile = user.mobile || user.email || "--";
//       responseData.email = user.email;
//     }

//     res.status(200).json(responseData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// export const deleteAccount = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const deleted = await UserLogin.findByIdAndDelete(userId);
//     if (!deleted) {
//       return res.status(404).json({ message: "User not found or already deleted." });
//     }
//     return res.status(200).json({ message: "Account deleted successfully." });
//   } catch (err) {
//     console.error("Delete account error:", err);
//     return res.status(500).json({ message: "Server error. Could not delete account." });
//   }
// };

// // New logout endpoint for JWT-based auth (frontend removes token)
// // export const logout = (req, res) => {
// //   res.status(200).json({ message: "Logout successful." });
// // };

// export const logout = (req, res) => {
//   // Optionally, you can blacklist token or update user salt in DB for invalidating JWTs
//   return res.status(200).json({ message: "Logout successful." });
// };


// // const forgotPassword = async (req, res) => {
// //     try {
// //         let { mobile } = req.body;
// //         const user = await UserLogin.findOne({ mobile });
// //         if (!user) return res.status(400).json({ message: "User not found." });
// //
// //         const otp = generateOTP();
// //         user.otp = otp;
// //         user.otpExpiresAt = new Date(Date.now() + 5 * 60000);
// //         await user.save();
// //
// //         await client.messages.create({
// //             body: `Your password reset OTP is: ${otp}`,
// //             from: process.env.TWILIO_PHONE_NUMBER,
// //             to: mobile.startsWith("+") ? mobile : `+91${mobile}`
// //         });
// //
// //         res.status(200).json({ message: "OTP sent for password reset." });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // const resetPassword = async (req, res) => {
// //     try {
// //         const { mobile, otp, newPassword } = req.body;
// //
// //         if (mobile === ADMIN_MOBILE) {
// //             return res.status(403).json({ message: "Admin password cannot be reset." });
// //         }
// //
// //         const user = await UserLogin.findOne({ mobile });
// //
// //         if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
// //             return res.status(400).json({ message: "Invalid or expired OTP" });
// //         }
// //
// //         user.password = await bcrypt.hash(newPassword, 10);
// //         user.otp = null;
// //         user.otpExpiresAt = null;
// //         await user.save();
// //
// //         res.json({ message: "Password reset successful. You can now log in." });
// //     } catch (error) {
// //         res.status(500).json({ message: "Server error", error: error.message });
// //     }
// // };

// // export { sendOtp, signup, login, forgotPassword, resetPassword };


// // very /verify-user
// // const verifyUser = async (req, res) => {
// //     try {
// //         const token = req.headers.authorization?.split(" ")[1];
// //         if (!token) return res.status(401).json({ success: false, message: "No token provided" });
// //
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //         const user = await UserLogin.findById(decoded.userId);
// //
// //         if (!user) {
// //             return res.status(404).json({ success: false, message: "User not found" });
// //         }
// //
// //         return res.status(200).json({ success: true, user });
// //     } catch (err) {
// //         return res.status(400).json({ success: false, message: "Invalid token" });
// //     }
// // };

// // export { verifyUser }

// // banner  uplaod ......
// const uploadImage = async (req, res) => {
//     try {
//         const file = req.file;
//         if (!file) return res.status(400).json({ success: false, message: "No file uploaded" });

//         const result = await uploadToCloudinary(file.path);
//         const newImage = await Imageadmin.create({ url: result.secure_url });

//         res.json({ success: true, imageUrl: newImage.url, id: newImage._id });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // upoad image get admin panel banner
// const getImages = async (req, res) => {
//     const images = await Imageadmin.find();
//     res.json({ success: true, images });
// };
// // delet image admin banner
// const deleteImage = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const image = await Imageadmin.findById(id);
//         if (!image) return res.status(404).json({ success: false, message: "Image not found" });

//         await deleteFromCloudinary(image.url);
//         await Imageadmin.findByIdAndDelete(id);

//         res.json({ success: true, message: "Image deleted" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // bannaer update admin .............
// const toggleBanner = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const image = await Imageadmin.findById(id);
//         if (!image) return res.status(404).json({ success: false, message: "Image not found" });

//         image.isBanner = !image.isBanner;
//         await image.save();

//         res.json({ success: true, message: "Banner status updated", isBanner: image.isBanner });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
// //  user page get baner
// const getBanners = async (req, res) => {
//     const banners = await Imageadmin.find({ isBanner: true });
//     res.json({ success: true, banners });
// };



// export { uploadImage, getImages, deleteImage, toggleBanner, getBanners };

// // add book 

// const addBook = async (req, res) => {
//     try {
//         console.log("✅ Body:", req.body);
//         console.log("✅ Files:", req.files);

//         let {
//             title,
//             author,
//             price,
//             offerPrice,
//             description,
//             category,
//             isbn,
//             shippingDetails, // REMOVED  isha changes
//             pageNumber,
//             language,
//             weight,
//             bulletPoints, // from frontend, string or array
//             mainImageIndex // from frontend, default = 0
//         } = req.body;

//         // ✅ Validate file uploads
//         if (!req.files || req.files.length < 1) {
//             return res.status(400).json({ message: "At least 1 image is required." });
//         }
//         // No longer require exactly 5 images
//         const bookImages = req.files.map(file => file.path);

//         // ✅ Handle bulletPoints
//         let bulletArray = [];
//         if (typeof bulletPoints === 'string') {
//             bulletArray = bulletPoints.split(',').map(p => p.trim());
//         } else if (Array.isArray(bulletPoints)) {
//             bulletArray = bulletPoints;
//         }

//         // ✅ Validations (same as before)
//         if (!["New", "Old", "All"].includes(category)) {
//             return res.status(400).json({ message: "Category must be 'New', 'Old', or 'All'" });
//         }

//         // Removed shippingDetails validation

//         if (!title || !author || !price || !offerPrice || !description || !isbn || !pageNumber || !language || !weight) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         price = Number(price);
//         offerPrice = Number(offerPrice);
//         pageNumber = Number(pageNumber);

//         if (isNaN(price) || isNaN(offerPrice) || isNaN(pageNumber)) {
//             return res.status(400).json({ message: "Price, Offer Price & Page Number must be numbers" });
//         }

//         // ✅ Save book
//         const newBook = new Book({
//             title,
//             author,
//             price,
//             offerPrice,
//             description,
//             category,
//             bookImages,
//             mainImageIndex: Number(mainImageIndex) || 0,
//             bulletPoints: bulletArray,
//             isbn,
//             pageNumber,
//             language,
//             weight
//         });

//         await newBook.save();
//         res.status(201).json({ message: "Book added successfully", book: newBook });

//     } catch (error) {
//         console.error("❌ Error adding book:", error.message || error);
//         res.status(500).json({ message: "Error adding book", error: error.message || error });
//     }
// };

// // get addbook and add cart
// const getBooks = async (req, res) => {
//     try {
//         const books = await Book.find();

//         if (!books || books.length === 0) {
//             return res.status(404).json({ message: "No books found" });
//         }


//         const formattedBooks = books.map((book) => ({
//             _id: book._id,
//             title: book.title,
//             author: book.author,
//             price: book.price,
//             offerPrice: book.offerPrice,
//             description: book.description,
//             category: book.category,
//             bookImage: book.bookImage,
//             isbn: book.isbn,
//             pageNumber: book.pageNumber,
//             language: book.language,
//             weight: book.weight
//         }));

//         res.status(200).json({ books: formattedBooks });

//     } catch (error) {
//         console.error("❌ Error fetching books:", error.message || error);
//         res.status(500).json({ message: "Error fetching books", error: error.message || error });
//     }
// };


// export { addBook, getBooks, };





// // new book  add
// const getNewBooks = async (req, res) => {
//     try {
//         const newBooks = await Book.find({ category: "New" });

//         if (!newBooks || newBooks.length === 0) {
//             return res.status(404).json({ message: "No new books found" });
//         }

//         const booksWithRatings = await Promise.all(
//             newBooks.map(async (book) => {
//                 const reviews = await Review.find({ bookId: book._id });

//                 const avgRating =
//                     reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1);

//                 const formattedReviews = reviews.map(review => ({
//                     reviewerName: review.name || "Anonymous",
//                     rating: review.rating,
//                     review: review.review
//                 }));

//                 return {
//                     _id: book._id,
//                     title: book.title,
//                     author: book.author,
//                     price: book.price,
//                     offerPrice: book.offerPrice,
//                     description: book.description,
//                     category: book.category,
//                     bookImage: book.bookImages?.[book.mainImageIndex] || "", // ✅ Fixed
//                     mainImageIndex: book.mainImageIndex,                    // ✅ Optional to include
//                     isbn: book.isbn,
//                     // shippingDetails: book.shippingDetails, // REMOVE
//                     pageNumber: book.pageNumber,
//                     language: book.language,
//                     weight: book.weight,
//                     averageRating: avgRating.toFixed(1),
//                     totalReviews: reviews.length,
//                     reviews: formattedReviews
//                 };
//             })
//         );

//         res.status(200).json({ books: booksWithRatings });

//     } catch (error) {
//         console.error("❌ Error fetching new books:", error.message || error);
//         res.status(500).json({ message: "Error fetching new books", error: error.message || error });
//     }
// };


// export { getNewBooks };
// // new book add cert page



// // new bookDetails....



// const getBookDetails = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const book = await Book.findById(id);

//         if (!book) {
//             return res.status(404).json({ message: "Book not found" });
//         }

//         // Aggregate rating & total reviews
//         const reviewStats = await Review.aggregate([
//             { $match: { bookId: book._id } },
//             {
//                 $group: {
//                     _id: "$bookId",
//                     averageRating: { $avg: "$rating" },
//                     totalReviews: { $sum: 1 }
//                 }
//             }
//         ]);

//         const avgRating = reviewStats[0]?.averageRating ? reviewStats[0].averageRating.toFixed(1) : 0;
//         const totalReviews = reviewStats[0]?.totalReviews || 0;

//         const formattedBook = {
//             _id: book._id,
//             title: book.title,
//             author: book.author,
//             price: book.price,
//             offerPrice: book.offerPrice,
//             description: book.description,
//             category: book.category,
//             isbn: book.isbn,
//             // shippingDetails: book.shippingDetails, // REMOVE
//             pageNumber: book.pageNumber,
//             language: book.language,
//             weight: book.weight,
//             bookImages: book.bookImages || [], // ✅ all images for slider
//             mainImageIndex: book.mainImageIndex || 0, // ✅ so you can show main one first if needed
//             bulletPoints: book.bulletPoints || [], // ✅ for frontend display
//             averageRating: avgRating,
//             totalReviews: totalReviews
//         };

//         res.status(200).json({ book: formattedBook });

//     } catch (error) {
//         res.status(500).json({ message: "Error fetching book details", error: error.message });
//     }
// };


// export { getBookDetails }

// // 

// // old book book show and crat with rating and star



// const getOldBooksAdd = async (req, res) => {
//     try {
//         const oldBooks = await Book.find({ category: "Old" });

//         if (!oldBooks || oldBooks.length === 0) {
//             return res.status(404).json({ message: "No old books found" });
//         }

//         const booksWithRatings = await Promise.all(
//             oldBooks.map(async (book) => {
//                 const reviews = await Review.find({ bookId: book._id });

//                 const avgRating =
//                     reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1);

//                 const formattedReviews = reviews.map(review => ({
//                     reviewerName: review.name || "Anonymous",
//                     rating: review.rating,
//                     review: review.review
//                 }));

//                 return {
//                     _id: book._id,
//                     title: book.title,
//                     author: book.author,
//                     price: book.price,
//                     offerPrice: book.offerPrice,
//                     description: book.description,
//                     category: book.category,
//                     bookImage: book.bookImages?.[book.mainImageIndex] || "", // ✅ fixed line
//                     mainImageIndex: book.mainImageIndex,
//                     isbn: book.isbn,
//                     // shippingDetails: book.shippingDetails, // REMOVE
//                     pageNumber: book.pageNumber,
//                     language: book.language,
//                     weight: book.weight,
//                     averageRating: avgRating.toFixed(1),
//                     totalReviews: reviews.length,
//                     reviews: formattedReviews
//                 };
//             })
//         );

//         res.status(200).json({ books: booksWithRatings });

//     } catch (error) {
//         console.error("❌ Error fetching old books:", error.message || error);
//         res.status(500).json({ message: "Error fetching old books", error: error.message || error });
//     }
// };


// export { getOldBooksAdd };




// // add book all show and crat with rating and star





// const getAllBooks = async (req, res) => {
//     try {
//         const books = await Book.find();

//         if (!books || books.length === 0) {
//             return res.status(404).json({ message: "No books found" });
//         }

//         const booksWithRatings = await Promise.all(
//             books.map(async (book) => {
//                 const reviews = await Review.find({ bookId: book._id });

//                 const avgRating =
//                     reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1);

//                 const formattedReviews = reviews.map(review => ({
//                     reviewerName: review.name || "Anonymous",
//                     rating: review.rating,
//                     review: review.review
//                 }));

//                 return {
//                     _id: book._id,
//                     title: book.title,
//                     author: book.author,
//                     price: book.price,
//                     offerPrice: book.offerPrice,
//                     description: book.description,
//                     category: book.category,
//                     bookImage: book.bookImages?.[book.mainImageIndex] || "", // ✅ sirf main image
//                     mainImageIndex: book.mainImageIndex, // ✅ ye line add ki gayi hai
//                     isbn: book.isbn,
//                     // shippingDetails: book.shippingDetails, // REMOVE
//                     pageNumber: book.pageNumber,
//                     language: book.language,
//                     weight: book.weight,
//                     averageRating: avgRating.toFixed(1),
//                     totalReviews: reviews.length,
//                     reviews: formattedReviews
//                 };
//             })
//         );

//         res.status(200).json({ books: booksWithRatings });

//     } catch (error) {
//         console.error("❌ Error fetching books:", error.message || error);
//         res.status(500).json({ message: "Error fetching books", error: error.message || error });
//     }
// };



// export { getAllBooks };






// // 📌 get update book

// const singlegetbook = async (req, res) => {
//     try {
//         const { bookId } = req.params;
//         const book = await Book.findById(bookId);

//         if (!book) {
//             return res.status(404).json({ message: "Book not found" });
//         }

//         // ✅ Destructure required fields
//         const {
//             title,
//             author,
//             price,
//             offerPrice,
//             description,
//             category,
//             bookImages, // Now return all images
//             mainImageIndex,
//             bulletPoints,
//             isbn,
//             // shippingDetails,
//             pageNumber,
//             language,
//             weight
//         } = book;

//         res.status(200).json({
//             book: {
//                 title,
//                 author,
//                 price,
//                 offerPrice,
//                 description,
//                 category,
//                 bookImages, // Return all images
//                 mainImageIndex,
//                 bulletPoints,
//                 isbn,
//                 // shippingDetails,
//                 pageNumber,
//                 language,
//                 weight
//             }
//         });

//     } catch (error) {
//         console.error("❌ Error getting book:", error.message || error);
//         res.status(500).json({ message: "Error getting book", error: error.message || error });
//     }
// };

// export {singlegetbook}

// // book update ......... Admin
// const updateBook = async (req, res) => {
//     try {
//         // console.log(req.body); // For debugging
//         // debugger
//         const { bookId } = req.params;
//         const {
//             title,
//             author,
//             price,
//             offerPrice,
//             description,
//             category,
//             isbn,
//             // shippingDetails,
//             pageNumber,
//             language,
//             weight,
//             bulletPoints,
//             mainImageIndex,
//             bookImages
//         } = req.body;

//         const updateData = {};

//         if (title) updateData.title = title;
//         if (author) updateData.author = author;
//         if (price) updateData.price = Number(price);
//         if (offerPrice) updateData.offerPrice = Number(offerPrice);
//         if (description) updateData.description = description;
//         if (category) updateData.category = category;
//         if (isbn) updateData.isbn = isbn;
//         // Do NOT use shippingDetails anywhere
//         // if (shippingDetails) updateData.shippingDetails = shippingDetails; // REMOVE
//         if (pageNumber) updateData.pageNumber = Number(pageNumber);
//         if (language) updateData.language = language;
//         if (weight) updateData.weight = weight;

//         // Bullet points handling
//         if (bulletPoints) {
//             if (Array.isArray(bulletPoints)) {
//                 updateData.bulletPoints = bulletPoints;
//             } else {
//                 updateData.bulletPoints = bulletPoints
//                     .split(',')
//                     .map(pt => pt.trim())
//                     .filter(pt => pt.length > 0);
//             }
//         }

//         // Main image index
//         if (mainImageIndex !== undefined && mainImageIndex !== '') {
//             const parsedIndex = parseInt(mainImageIndex);
//             if (!isNaN(parsedIndex)) {
//                 updateData.mainImageIndex = parsedIndex;
//             }
//         }

//         // ✅ bookImages from array or string
//         if (bookImages) {
//             if (Array.isArray(bookImages)) {
//                 updateData.bookImages = bookImages;
//             } else if (typeof bookImages === 'string') {
//                 updateData.bookImages = bookImages
//                     .split(',')
//                     .map(img => img.trim())
//                     .filter(img => img.length > 0);
//             }
//         }

//         // ✅ Agar naye image upload huye hain, to unka path save karo
//         if (req.files && req.files.length > 0) {
//             console.log("🟩 Uploaded Files:", req.files);
//             updateData.bookImages = req.files.map(file => file.path); // path agar local storage ho
//             // OR file.location if using S3 or Cloudinary
//         }

//         // Validations
//         if (updateData.category && !["New", "Old", "All"].includes(updateData.category)) {
//             return res.status(400).json({ message: "Category must be 'New', 'Old', or 'All'" });
//         }

//         // Do NOT validate shippingDetails
//         // if (updateData.shippingDetails && !["4-5 Days", "5-7 Days", "7-10 Days"].includes(updateData.shippingDetails)) {
//         //     return res.status(400).json({ message: "Shipping Details must be '4-5 Days', '5-7 Days', or '7-10 Days'" });
//         // }

//         const updatedBook = await Book.findByIdAndUpdate(bookId, { $set: updateData }, { new: true });

//         if (!updatedBook) {
//             return res.status(404).json({ message: "Book not found" });
//         }

//         res.status(200).json({ message: "Book updated successfully", book: updatedBook });

//     } catch (error) {
//         console.error("❌ Error updating book:", error.message || error);
//         res.status(500).json({ message: "Error updating book", error: error.message || error });
//     }
// };


// export { updateBook };






// // admin book  fatch requset delete book 

// const getBooksAllCategory = async (req, res) => {
//     try {
//         // Sabhi books fetch karo
//         const books = await Book.find();

//         // Har book ka sirf main image nikal kar naya array banao
//         const booksWithMainImage = books.map(book => {
//             const mainImage = book.bookImages[book.mainImageIndex || 0];
//             return {
//                 _id: book._id,
//                 title: book.title,
//                 author: book.author,
//                 price: book.price,
//                 offerPrice: book.offerPrice,
//                 mainImage,
//                 category: book.category
//             };
//         });

//         res.status(200).json({
//             message: "Books retrieved successfully",
//             books: booksWithMainImage
//         });
//     } catch (error) {
//         console.error("❌ Error retrieving books:", error.message || error);
//         res.status(500).json({
//             message: "Error retrieving books",
//             error: error.message || error
//         });
//     }
// };

// const deleteBookById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const book = await Book.findByIdAndDelete(id);

//         if (!book) {
//             return res.status(404).json({ message: "Book not found" });
//         }

//         res.status(200).json({ message: "Book deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting book:", error.message || error);
//         res.status(500).json({ message: "Error deleting book", error: error.message || error });
//     }
// };


// export { getBooksAllCategory, deleteBookById };




// // search buttion ...
// // Search books by title, author or price
// const SearchgetAllBooks = async (req, res) => {
//     try {
//         const { search } = req.query;
//         let query = {};

//         if (search) {
//             const isNumber = !isNaN(search);

//             query = {
//                 $or: [
//                     { title: { $regex: search, $options: "i" } },
//                     { author: { $regex: search, $options: "i" } },
//                     ...(isNumber ? [{ price: Number(search) }] : [])
//                 ]
//             };
//         }

//         const books = await Book.find(query).sort({ createdAt: -1 });

//         if (!books || books.length === 0) {
//             return res.status(404).json({ message: "No books found" });
//         }

//         const booksWithRatings = await Promise.all(
//             books.map(async (book) => {
//                 const reviews = await Review.find({ bookId: book._id });
//                 const avgRating =
//                     reviews.reduce((acc, curr) => acc + curr.rating, 0) /
//                     (reviews.length || 1);

//                 return {
//                     _id: book._id,
//                     title: book.title,
//                     author: book.author,
//                     price: book.price,
//                     offerPrice: book.offerPrice,
//                     description: book.description,
//                     category: book.category,
//                     bookImage: book.bookImage,
//                     isbn: book.isbn,
//                     // shippingDetails: book.shippingDetails, // REMOVE
//                     pageNumber: book.pageNumber,
//                     language: book.language,
//                     weight: book.weight,
//                     // Yeh naya data:
//                     averageRating: avgRating.toFixed(1),
//                     totalReviews: reviews.length,
//                 };
//             })
//         );

//         res.status(200).json({
//             message: "Books retrieved successfully",
//             books: booksWithRatings,
//         });

//     } catch (error) {
//         console.error("Error retrieving books:", error.message || error);
//         res.status(500).json({
//             message: "Error retrieving books",
//             error: error.message || error
//         });
//     }
// };



// export { SearchgetAllBooks };







// 🔹 Razorpay Instance


// //  Razorpay Configuration
// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // **🔹 Order Create API**
// const createorder = async (req, res) => {
//     try {
//         let { cart, totalAmount, deliveryDetails } = req.body;
//         if (!cart || !Array.isArray(cart) || cart.length === 0) {
//             return res.status(400).json({ error: "Cart is empty or invalid format" });
//         }

//         // 1. Create order in DB with Pending status
//         const newOrder = new Order({
//             books: cart.map(book => ({
//                 bookId: book.id,
//                 title: book.title,
//                 price: book.price,
//                 quantity: book.quantity,
//             })),
//             totalPrice: totalAmount,
//             deliveryDetails,
//             status: "Pending",
//             userEmail: deliveryDetails.email,
//             pendingSince: Date.now()
//             // Do NOT set paymentId here!
//         });

//         const savedOrder = await newOrder.save();

//         // 2. Create Razorpay order
//         const options = {
//             amount: totalAmount * 100, // paise
//             currency: "INR",
//             receipt: savedOrder._id.toString(),
//         };
//         const razorpayOrder = await razorpay.orders.create(options);

//         // 3. Send both orderId (Razorpay) and dbOrderId (MongoDB) to frontend
//         res.json({
//             orderId: razorpayOrder.id,
//             amount: options.amount,
//             dbOrderId: savedOrder._id
//         });
//     } catch (error) {
//         console.error("Payment Error:", error);
//         res.status(500).json({ error: "Payment error", details: error.message });
//     }
// };
                              
// import mongoose from 'mongoose';

// const saveorder = async (req, res) => {
//     try {
//         // Safely extract userId and user from req.user (if available)
//         const userId = req.user?.userId;
//         const user = req.user;
//         const { paymentId, deliveryDetails, cart, totalAmount, sessionToken } = req.body;

//         console.log("saveorder called with sessionToken:", sessionToken);

//         if (!cart || !Array.isArray(cart) || cart.length === 0) {
//             return res.status(400).json({ success: false, message: "Cart data is invalid" });
//         }

//         let loginMethodId = null;
//         if (sessionToken) {
//             const loginMethod = await LoginMethod.findOne({ sessionToken });
//             console.log("Found loginMethod for sessionToken:", loginMethod);
//             if (loginMethod) {
//                 loginMethodId = loginMethod._id;
//             }
//         }

//         // Ensure deliveryDetails.email is saved in deliveryDetails
//         const deliveryDetailsWithEmail = {
//             ...deliveryDetails,
//             email: deliveryDetails.email || (user && user.email) || undefined
//         };

//         const newOrder = new Order({
//             userId: userId || undefined, // If you have userId from auth, otherwise undefined
//             userEmail: (user && user.email) || (deliveryDetails && deliveryDetails.email) || undefined, // Prefer user email, fallback to delivery email
//             loginMethodId: loginMethodId || undefined,
//             books: cart.map(book => ({
//                 bookId: new mongoose.Types.ObjectId(book.id),
//                 title: book.title,
//                 price: book.price,
//                 quantity: book.quantity,
//             })),
//             totalPrice: totalAmount,
//             deliveryDetails: deliveryDetailsWithEmail,
//             paymentId,
//             status: "Paid"
//         });

//         const savedOrder = await newOrder.save();

//         console.log("Order saved with ID:", savedOrder._id, "and loginMethodId:", loginMethodId);

//         // Send order confirmation email after saving order
//         try {
//             await sendOrderConfirmationEmail(
//                 deliveryDetailsWithEmail.email || (user && user.email),
//                 deliveryDetailsWithEmail.fullName,
//                 savedOrder
//             );
//             console.log("Order confirmation email sent successfully.");
//         } catch (emailError) {
//             console.error("Failed to send order confirmation email:", emailError);
//         }

//         // 🟢 Step 1: Book IDs Array nikaalo
//         const bookIds = savedOrder.books.map(book => book.bookId);

//         // 🟢 Step 2: Frontend ko response bhej do with orderId & bookIds[]
//         res.json({
//             success: true,
//             message: "Order saved successfully",
//             orderId: savedOrder._id,
//             bookIds: bookIds
//         });

//     } catch (error) {
//         console.error("Order Save Error:", error);
//         res.status(500).json({ success: false, message: "Failed to save order" });
//     }
// };


// export { createorder, saveorder };
// // getRazorpaykey...
// const getRazorpayKey = (req, res) => {
//     res.json({ key: process.env.RAZORPAY_KEY_ID });
// };
// export { getRazorpayKey };


// // 🔹 Get Orders API (Order Summary Table)

// const usergetOrders = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, status, search } = req.query;

//         console.log("Page:", page, "Limit:", limit, "Status:", status, "Search:", search);

//         let filter = {};
//         if (status) filter.status = status;
//         if (search) {
//             filter.$or = [
//                 { orderId: { $regex: search, $options: "i" } },
//                 { customerName: { $regex: search, $options: "i" } }
//             ];
//         }

//         console.log("Filter Applied:", filter);

//         // SELECT hata diya taaki pura data aaye
//         const orders = await Order.find(filter)
//             .sort({ createdAt: -1 })
//             .limit(parseInt(limit))
//             .skip((parseInt(page) - 1) * parseInt(limit));

//         const totalOrders = await Order.countDocuments(filter);

//         console.log("Orders Found:", orders); // Debugging

//         res.json({
//             success: true,
//             orders,
//             totalPages: Math.ceil(totalOrders / limit),
//             currentPage: parseInt(page)
//         });

//     } catch (error) {
//         console.error("Fetch Orders Error:", error);
//         res.status(500).json({ success: false, message: "Failed to fetch orders" });
//     }
// };

// export { usergetOrders }




// // order  traking........


// const getOrderAnalytics = async (req, res) => {
//     try {
//         const dailyOrders = await Order.aggregate([
//             {
//                 $group: {
//                     _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//                     count: { $sum: 1 },
//                     orderIds: { $push: "$_id" } // ✅ Order IDs include kiye
//                 }
//             },
//             { $sort: { _id: 1 } }
//         ]);

//         const monthlyOrders = await Order.aggregate([
//             {
//                 $group: {
//                     _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
//                     count: { $sum: 1 },
//                     orderIds: { $push: "$_id" } // ✅ Order IDs include kiye
//                 }
//             },
//             { $sort: { _id: 1 } }
//         ]);

//         const yearlyOrders = await Order.aggregate([
//             {
//                 $group: {
//                     _id: { $dateToString: { format: "%Y", date: "$createdAt" } },
//                     count: { $sum: 1 },
//                     orderIds: { $push: "$_id" } // ✅ Order IDs include kiye
//                 }
//             },
//             { $sort: { _id: 1 } }
//         ]);

//         res.json({ dailyOrders, monthlyOrders, yearlyOrders });
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// };
// const getAllOrders = async (req, res) => {
//     try {
//         const { date } = req.query;
//         let filter = {};

//         if (date) {
//             const startDate = new Date(date);
//             startDate.setHours(0, 0, 0, 0);

//             const endDate = new Date(date);
//             endDate.setHours(23, 59, 59, 999);

//             filter.createdAt = { $gte: startDate, $lte: endDate };
//         }

//         const orders = await Order.find(filter)
//             .sort({ createdAt: -1 })
//             .lean();  // Added lean() for better performance

//         res.json(orders);
//     } catch (error) {
//         console.error('Error fetching orders:', error); // Added error logging
//         res.status(500).json({ error: "Server error" });
//     }
// };


// /*
// const getAllOrders = async (req, res) => {
//     try {
//         const { date } = req.query;
//         let filter = {};

//         if (date) {
//             const startDate = new Date(date);
//             startDate.setHours(0, 0, 0, 0); // 🔹 Day start time

//             const endDate = new Date(date);
//             endDate.setHours(23, 59, 59, 999); // 🔹 Day end time

//             filter.createdAt = { $gte: startDate, $lte: endDate };
//         }

//         const orders = await Order.find(filter).sort({ createdAt: -1 });
//         res.json(orders);
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// };

// const getAllOrders = async (req, res) => {
//   try {
//     const { date } = req.query;
//     let filter = {};

//     if (date) {
//       const start = new Date(date);
//       start.setHours(0,0,0,0);
//       const end = new Date(date);
//       end.setHours(23,59,59,999);
//       filter.createdAt = { $gte: start, $lte: end };
//     }

//     const orders = await Order.find(filter)
//       .populate({ path: 'userId', select: 'email' })  // ✅ Populates email from UserLogin :contentReference[oaicite:1]{index=1}
//       .sort({ createdAt: -1 })
//       .lean()
//       .exec();

//     const enriched = orders.map(o => ({
//       ...o,
//       userEmail: o.userId?.email || ''              // ✅ Attaches userEmail to each order
//     }));

//     return res.json(enriched);                       // ✅ Sends the enriched array to the frontend

//   } catch (err) {
//     return res.status(500).json({ error: "Server error" });
//   }
// };*/




// export const updateTrackingId = async (req, res) => {
//   const { id } = req.params;
//   const { trackingId, email, courier } = req.body;

//   try {
//     const order = await Order.findByIdAndUpdate(
//       id,
//       { trackingId, courier },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     // Send email if email is provided
//     if (email) {
//       try {
//         // Import or require your email sending utility here
//         const { sendTrackingEmail } = await import("../utils/sendEmail.js");
//         const name = order.deliveryDetails.fullName;
//         await sendTrackingEmail(email, name, trackingId, JSON.stringify({ courier, trackingId }), courier);
//       } catch (err) {
//         console.error("Email send error:", err);
//       }
//     }

//     res.json({ success: true, message: "Tracking ID and courier updated successfully and email sent", order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };



// // ✅ Order Update API bhi latest sorting ke saath response bhejega
// const updateOrderStatus = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const { status } = req.body;

//         const order = await Order.findByIdAndUpdate(
//             orderId,
//             { status, pendingSince: status === "Pending" ? Date.now() : null, $push: { statusHistory: { status } } },
//             { new: true }
//         );

//         if (!order) return res.status(404).json({ error: "Order not found" });

//         const { sortBy } = req.query;
//         let sortQuery = sortBy === "serialNumber" ? { serialNumber: 1 } : { createdAt: -1 };
//         const updatedOrders = await Order.find({}).sort(sortQuery);

//         res.json(updatedOrders);
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// };




// // ✅ 3️⃣ Order Tracking (User Order ID se apna order check kare)
// const trackOrder = async (req, res) => {
//     try {
//       const { orderId } = req.params;
  
//       const order = await Order.findById(orderId)
//         .populate('books.bookId', 'title price');
  
//       const tracking = await OrderTracking.findOne({ orderId });
  
//       if (!order) return res.status(404).json({ error: "Order not found" });
  
//       const books = order.books.map(book => ({
//         title: book.bookId?.title || "Book not found",
//         price: book.bookId?.price || 0,
//         quantity: book.quantity,
//         totalPrice: book.quantity * (book.bookId?.price || 0)
//       }));
  
//       res.json({
//         orderId: order._id,
//         status: tracking?.status || order.status,
//         lastUpdated: order.updatedAt,
//         books,
//         statusHistory: tracking?.statusHistory || []
//       });
  
//     } catch (error) {
//       console.error("Error tracking order:", error);
//       res.status(500).json({ error: "Server error" });
//     }
//   };
  


// // ✅ 4️⃣ User Order History (Mobile number se user apne orders dekhe)
// // ✅ 4️⃣ User Order History (Mobile number se user apne orders dekhe)
// const getUserOrders = async (req, res) => {
//     try {
//         const userId = req.user?.userId;
//         const userEmail = req.user?.email;
//         const { sessionToken } = req.query;

//         console.log("getUserOrders called with userId:", userId, "userEmail:", userEmail, "sessionToken:", sessionToken);

//         if (!userId && !userEmail) {
//             return res.status(400).json({ error: "User not authenticated" });
//         }

//         // Fetch user profile to get mobile number
//         const user = await UserLogin.findById(userId).select('mobile');
//         const userMobile = user?.mobile;

//         // Find all distinct delivery emails and mobiles for orders linked to userId
//         const distinctEmails = await Order.distinct("deliveryDetails.email", { userId: userId });
//         const distinctMobiles = await Order.distinct("deliveryDetails.mobile", { userId: userId });

//         // Build $or query with userId and all distinct delivery emails and mobiles
//         const orConditions = [
//             { userId: new mongoose.Types.ObjectId(userId) }
//         ];

//         if (userEmail) {
//             orConditions.push({ userEmail: userEmail });
//         }

//         // Instead of distinct emails, match any deliveryDetails.email (any email)
//         orConditions.push({ "deliveryDetails.email": { $exists: true, $ne: null } });

//         if (distinctMobiles && distinctMobiles.length > 0) {
//             orConditions.push({ "deliveryDetails.mobile": { $in: distinctMobiles } });
//         } else if (userMobile) {
//             orConditions.push({ "deliveryDetails.mobile": { $exists: true, $ne: null } });
//         }

//         if (orConditions.length === 0) {
//             return res.status(400).json({ error: "No valid user identifier found" });
//         }

//         const query = { $or: orConditions };

//         // If sessionToken filter is provided, add to query
//         // Disabled loginMethodId filter to fix empty orders issue
//         /*
//         if (sessionToken) {
//             const loginMethod = await LoginMethod.findOne({ sessionToken });
//             if (loginMethod) {
//                 query.loginMethodId = loginMethod._id;
//             }
//         }
//         */

//         console.log("MongoDB query for orders:", query);

//         // Populate book details for each book in orders
//         const orders = await Order.find(query)
//             .select("status createdAt updatedAt books totalPrice deliveryDetails")
//             .populate({
//                 path: "books.bookId",
//                 select: "title bookImages mainImageIndex"
//             })
//             .sort({ createdAt: -1 });

//         console.log("Orders found:", orders.length);

//         // Format orders to include bookImage and bookName in books array
//         const formattedOrders = orders.map(order => {
//             const books = order.books.map(bookItem => {
//                 const book = bookItem.bookId;
//                 return {
//                     bookId: book?._id,
//                     bookName: book?.title || "N/A",
//                     bookImage: book?.bookImages && book?.bookImages.length > 0 ? book.bookImages[book.mainImageIndex || 0] : "",
//                     quantity: bookItem.quantity,
//                     price: bookItem.price,
//                     // Added title for fallback in frontend if needed
//                     title: book?.title || "N/A"
//                 };
//             });
//             return {
//                 _id: order._id,
//                 status: order.status,
//                 createdAt: order.createdAt,
//                 updatedAt: order.updatedAt,
//                 totalPrice: order.totalPrice,
//                 deliveryDetails: {
//                     fullName: order.deliveryDetails?.fullName || "N/A",
//                     mobile: order.deliveryDetails?.mobile || "N/A",
//                     address: order.deliveryDetails?.address || "",
//                     city: order.deliveryDetails?.city || "",
//                     state: order.deliveryDetails?.state || "",
//                     pincode: order.deliveryDetails?.pincode || ""
//                 },
//                 books
//             };
//         });

//         res.json(formattedOrders);
//     } catch (error) {
//         console.error("Error fetching user orders:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// // New API to get orders by mobile number (including deliveryDetails.mobile)
// const getOrdersByMobile = async (req, res) => {
//     try {
//         const userId = req.user?.userId;
//         const userEmail = req.user?.email;
//         const mobileParam = req.params.mobile;

//         if (!userId && !userEmail) {
//             return res.status(400).json({ error: "User not authenticated" });
//         }

//         if (!mobileParam) {
//             return res.status(400).json({ error: "Mobile number parameter is required" });
//         }

//         const query = {
//             $or: []
//         };

//         if (userId) {
//             query.$or.push({ userId: mongoose.Types.ObjectId(userId) });
//         }
//         if (userEmail) {
//             query.$or.push({ userEmail: userEmail });
//         }

//         // Also include orders where deliveryDetails.mobile matches the mobileParam
//         query.$or.push({ "deliveryDetails.mobile": mobileParam });

//         const orders = await Order.find(query)
//             .select("status createdAt updatedAt books totalPrice deliveryDetails")
//             .sort({ createdAt: -1 });

//         res.json(orders);
//     } catch (error) {
//         console.error("Error fetching orders by mobile:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// /*
// // ✅ Get orders pending for more than 7 days
// const getPendingOrders = async (req, res) => {
//     try {
//         const sevenDaysAgo = new Date();
//         sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//         console.log("Seven Days Ago:", sevenDaysAgo);

//         const pendingOrders = await Order.find({
//             status: "Pending",
//             pendingSince: { $lte: sevenDaysAgo }, // Ensure this is a Date field
//         }).select("_id status pendingSince deliveryDetails");

//         console.log("Orders Found:", pendingOrders);
//         res.json(pendingOrders);
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// };

// // ✅ Manually delete an order
// const deleteOrderPending = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         await Order.findByIdAndDelete(orderId);
//         res.json({ success: true, message: "Order deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Failed to delete order" });
//     }
// };

// // ✅ Auto-delete orders when status is updated
// const pendingUpdateAutoDelete = async (req, res) => {
//     try {
//         const { orderId, status } = req.body;
//         const order = await Order.findById(orderId);

//         if (!order) {
//             return res.status(404).json({ success: false, message: "Order not found" });
//         }

//         // ✅ Agar order 7 din se pending tha aur status update ho gaya, to delete kar do
//         if (order.status === "Pending" && new Date(order.pendingSince) <= new Date(new Date().setDate(new Date().getDate() - 7))) {
//             await Order.findByIdAndDelete(orderId);
//             return res.json({ success: true, message: "Order auto-deleted as status updated." });
//         }

//         order.status = status;
//         await order.save();
//         res.json({ success: true, message: "Order status updated." });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Failed to update status." });
//     }
// };
// */
// const getPendingOrders = async (req, res) => {
//     try {
//         const pendingOrders = await Order.find({
//             status: "Pending"
//         }).select("_id status pendingSince deliveryDetails");

//         res.json(pendingOrders);
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// };

// // ✅ Manually delete an order
// // Example Cron Logic
// const deleteOrderPending = async () => {
//   const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

//   const result = await Order.deleteMany({
//     status: "Pending",
//     pendingSince: { $lte: cutoff }
//   });

//   console.log(`Auto-deleted ${result.deletedCount} pending orders.`);
//   return result;
// };

// // ✅ Auto-delete orders when status is updated
// const pendingUpdateAutoDelete = async (req, res) => {
//     try {
//         const { orderId, status } = req.body;
//         const order = await Order.findById(orderId);

//         if (!order) {
//             return res.status(404).json({ success: false, message: "Order not found" });
//         }

//         // ✅ Agar order 24 ghante se pending tha aur status update ho gaya, to delete kar do
//         if (
//             order.status === "Pending" &&
//             new Date(order.pendingSince) <= new Date(Date.now() - 24 * 60 * 60 * 1000)
//         ) {
//             await Order.findByIdAndDelete(orderId);
//             return res.json({ success: true, message: "Order auto-deleted as status updated." });
//         }

//         order.status = status;
//         await order.save();
//         res.json({ success: true, message: "Order status updated." });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Failed to update status." });
//     }
// };


// export { getOrderAnalytics, updateOrderStatus, trackOrder, getUserOrders, getPendingOrders, getAllOrders, deleteOrderPending, pendingUpdateAutoDelete, getOrdersByMobile };

// // Add Review Controller
// // Add Review Controller (Simplified version)
// // Add Review Controller

// const addReview = async (req, res) => {
//     try {
//         const { bookId, orderId, name, rating, review } = req.body; // name field added

//         // 1. Bas orderId ka check
//         const order = await Order.findOne({ _id: orderId });

//         if (!order) {
//             return res.status(400).json({ message: "Order not found." });
//         }

//         // 2. Check agar is book ka already review diya hai ya nahi is order ke liye
//         const alreadyReviewed = await Review.findOne({ bookId, orderId });

//         if (alreadyReviewed) {
//             return res.status(400).json({ message: "You have already reviewed this book for this order." });
//         }

//         // 3. Save Review (with name)
//         const newReview = await Review.create({
//             bookId,
//             orderId,
//             name,  // name added here
//             rating,
//             review
//         });

//         return res.status(201).json({ message: "Review added successfully!", newReview });

//     } catch (error) {
//         return res.status(500).json({ message: "Something went wrong", error: error.message });
//     }
// };



// export { addReview, };


// //  show review 
// const getReviewsByBook = async (req, res) => {
//     try {
//         const bookId = req.params.bookId;
//         const reviews = await Review.find({ bookId });

//         res.status(200).json({ reviews });
//     } catch (error) {
//         return res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
//     }
// };

// export { getReviewsByBook };

// import cloudinary from "cloudinary";


// // ✅ Cloudinary Config
// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // 📌 **Content Upload (Image/Video + Text)**
// const uploadContent = async (req, res) => {
//     try {
//         const { type, content } = req.body;
//         let fileUrl = "";

//         // ✅ File upload to Cloudinary
//         if (req.file) {
//             console.log("📂 File received:", req.file.originalname);

//             const result = await new Promise((resolve, reject) => {
//                 cloudinary.v2.uploader.upload_stream(
//                     { resource_type: req.file.mimetype.includes("video") ? "video" : "image" },
//                     (error, result) => (error ? reject(error) : resolve(result))
//                 ).end(req.file.buffer);
//             });

//             fileUrl = result.secure_url;
//         }

//         // ✅ Save to MongoDB
//         const newContent = new Content({
//             type,
//             filePath: fileUrl,
//             content: content || ""
//         });

//         await newContent.save();

//         res.json({ success: true, message: "✅ Content Uploaded Successfully", data: newContent });
//     } catch (error) {
//         console.error("❌ Upload Error:", error);
//         res.status(500).json({ error: "Server Error" });
//     }
// };

// // 📌 **Get All Content (Sorted by Date)**
// const getAllContent = async (req, res) => {
//     try {
//         const contentList = await Content.find().sort({ createdAt: -1 });
//         res.json(contentList);
//     } catch (error) {
//         console.error("❌ Fetch Error:", error);
//         res.status(500).json({ error: "Server Error" });
//     }
// };

// // 📌 **Delete Content**
// const deleteContent = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const content = await Content.findById(id);

//         if (!content) {
//             return res.status(404).json({ error: "Content not found" });
//         }

//         // ✅ Cloudinary se delete karein (agar image/video hai to)
//         if (content.filePath) {
//             const publicId = content.filePath.split('/').pop().split('.')[0];
//             await cloudinary.v2.uploader.destroy(publicId);
//         }

//         // ✅ MongoDB se delete karein
//         await Content.findByIdAndDelete(id);

//         res.json({ success: true, message: "✅ Content Deleted Successfully" });
//     } catch (error) {
//         console.error("❌ Delete Error:", error);
//         res.status(500).json({ error: "Server Error" });
//     }
// };

// // 📌 **Update Content**
// const updateContent = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { content } = req.body;
//         let fileUrl = "";

//         // ✅ Pehle old content nikal lo
//         const existingContent = await Content.findById(id);
//         if (!existingContent) {
//             return res.status(404).json({ error: "Content not found" });
//         }

//         // ✅ Agar naye file aayi hai to Cloudinary pe upload karo
//         if (req.file) {
//             console.log("📂 New File received:", req.file.originalname);
//             const result = await cloudinary.v2.uploader.upload(req.file.path, {
//                 resource_type: req.file.mimetype.includes("video") ? "video" : "image"
//             });

//             fileUrl = result.secure_url;

//             // ✅ Pehle wali file delete karo (agar thi)
//             if (existingContent.filePath) {
//                 const publicId = existingContent.filePath.split('/').pop().split('.')[0];
//                 await cloudinary.v2.uploader.destroy(publicId);
//             }
//         }

//         // ✅ Update MongoDB
//         const updatedData = {
//             content: content || existingContent.content,
//             filePath: fileUrl || existingContent.filePath
//         };

//         const updatedContent = await Content.findByIdAndUpdate(id, updatedData, { new: true });

//         res.json({ success: true, message: "✅ Content Updated Successfully", data: updatedContent });
//     } catch (error) {
//         console.error("❌ Update Error:", error);
//         res.status(500).json({ error: "Server Error" });
//     }
// };

// export { uploadContent, getAllContent, deleteContent, updateContent };




// // ✅ Get all pending orders (not just 7+ days)
// const getAllPendingOrders = async (req, res) => {
//     try {
//         const { date } = req.query;
//         console.log("getAllPendingOrders - date query param:", date);
//         let filter = { status: "Pending" };

//         if (date && date !== "all") {
//             const days = parseInt(date, 10);
//             console.log("Parsed days:", days);
//             if (!isNaN(days)) {
//                 const now = new Date();
//                 const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
//                 console.log("Filtering orders from", pastDate, "to", now);
//                 // Use pendingSince for filtering pending orders by date
//                 filter.pendingSince = { $gte: pastDate, $lte: now };
//             }
//         }

//         const pendingOrders = await Order.find(filter).sort({ createdAt: -1 }).lean();
//         console.log("Found pending orders count:", pendingOrders.length);
//         pendingOrders.forEach(order => {
//             console.log(`Order ID: ${order._id}, pendingSince: ${order.pendingSince}, createdAt: ${order.createdAt}`);
//         });

//         res.json(pendingOrders);
//     } catch (error) {
//         console.error("Error in getAllPendingOrders:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// export { getAllPendingOrders };

// // Delete a single pending order by ID (only if status is 'Pending')
// export const deleteOrderById = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const order = await Order.findOne({ _id: orderId, status: 'Pending' });
//     if (!order) {
//       return res.status(404).json({ success: false, message: 'Order not found or not pending.' });
//     }
//     await Order.findByIdAndDelete(orderId);
//     res.json({ success: true, message: 'Pending order deleted.' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to delete order.' });
//   }
// };

// // Mark order as Incomplete with failureReason
// const markOrderIncomplete = async (orderId, reason = 'Payment failed or not completed') => {
//     try {
//         await Order.findByIdAndUpdate(orderId, {
//             status: 'Incomplete',
//             failureReason: reason,
//             $push: { statusHistory: { status: 'Incomplete' } }
//         });
//         console.log(`Order ${orderId} marked as Incomplete. Reason: ${reason}`);
//     } catch (err) {
//         console.error('Error marking order as Incomplete:', err);
//     }
// };

// // Cron job: Delete all Incomplete orders older than 24 hours
// const deleteOldIncompleteOrders = async () => {
//     const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
//     try {
//         const result = await Order.deleteMany({
//             status: 'Incomplete',
//             createdAt: { $lte: cutoff }
//         });
//         if (result.deletedCount > 0) {
//             console.log(`Auto-deleted ${result.deletedCount} incomplete orders (older than 24h).`);
//         }
//         return result;
//     } catch (err) {
//         console.error('Error auto-deleting incomplete orders:', err);
//     }
// };

// // API endpoint to get all incomplete orders
// const getIncompleteOrders = async (req, res) => {
//     try {
//         // Populate books with title, quantity, price and deliveryDetails fully
//         const incompleteOrders = await Order.find({ status: 'Incomplete' })
//             .select('_id userEmail failureReason createdAt books deliveryDetails')
//             .sort({ createdAt: -1 })
//             .lean();

//         // Map books to include only required fields
//         const orders = incompleteOrders.map(order => {
//             const books = order.books.map(book => ({
//                 title: book.title,
//                 quantity: book.quantity,
//                 price: book.price,
//                 totalPrice: book.price * book.quantity
//             }));
//             return {
//                 ...order,
//                 books,
//                 phoneNumber: order.deliveryDetails?.mobile || 'N/A',
//                 address: order.deliveryDetails
//                     ? `${order.deliveryDetails.address}, ${order.deliveryDetails.city}, ${order.deliveryDetails.state} - ${order.deliveryDetails.pincode}`
//                     : 'N/A'
//             };
//         });

//         res.json({ success: true, orders });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to fetch incomplete orders' });
//     }
// };

// export { markOrderIncomplete, deleteOldIncompleteOrders, getIncompleteOrders };

// // --- NEW AUTHENTICATION FLOW ---
// // (Do NOT re-import jwt or UserLogin here, they are already imported at the top)

// // POST /api/auth/check-user-type
// export const checkUserType = async (req, res) => {
//   const { identifier } = req.body; // phone or email
//   if (!identifier) return res.status(400).json({ message: "Phone or email required" });

//   const user = await UserLogin.findOne({
//     $or: [{ mobile: identifier }, { email: identifier }]
//   });

//   if (!user) return res.json({ role: "not_found" });

//   // Normalize for comparison
//   const normId = identifier.includes('@') ? normalizeEmail(identifier) : normalizeMobile(identifier);
//   const normAdminEmail = normalizeEmail(ADMIN_EMAIL);
//   const normAdminMobile = normalizeMobile(ADMIN_MOBILE);

//   // Only allow admin role for fixed admin email/phone, else downgrade to user
//   if (
//     user.role === "admin" &&
//     normId !== normAdminEmail &&
//     normId !== normAdminMobile
//   ) {
//     // Downgrade to user
//     return res.json({ role: "user" });
//   }

//   return res.json({ role: user.role });
// };

// // Helper to generate OTP
// const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// // Helper: Normalize email (lowercase, trim)
// function normalizeEmail(email) {
//   return (email || '').trim().toLowerCase();
// }
// // Helper: Normalize mobile (remove spaces, ensure +91 if Indian, trim)
// function normalizeMobile(mobile) {
//   let m = (mobile || '').replace(/\s+/g, '').trim();
//   if (m.startsWith('+91')) return m;
//   if (m.length === 10 && /^\d{10}$/.test(m)) return '+91' + m;
//   return m;
// }

// // POST /api/auth/send-otp
// export const sendOtp = async (req, res) => {
//   const { identifier } = req.body; // phone or email
//   if (!identifier) return res.status(400).json({ message: "Phone or email required" });

//   let user = await UserLogin.findOne({
//     $or: [{ mobile: identifier }, { email: identifier }]
//   });

//   // If user not found, create a new user with the identifier
//   if (!user) {
//     // Check if identifier is an email or mobile
//     const isEmail = identifier.includes('@');
//     user = new UserLogin({
//       name: "New User",
//       email: isEmail ? identifier : undefined,
//       mobile: !isEmail ? identifier : undefined,
//       loginMethod: isEmail ? 'email' : 'phone',
//       password: "otp",
//       otp: null,
//       otpExpiresAt: null
//     });
//   }

//   // Normalize for comparison
//   const normId = identifier.includes('@') ? normalizeEmail(identifier) : normalizeMobile(identifier);
//   const normAdminEmail = normalizeEmail(ADMIN_EMAIL);
//   const normAdminMobile = normalizeMobile(ADMIN_MOBILE);

//   // Only allow admin OTP for fixed admin email/phone, else downgrade to user
//   if (
//     user.role === "admin" &&
//     normId !== normAdminEmail &&
//     normId !== normAdminMobile
//   ) {
//     user.role = "user";
//   }

//   const otp = generateOTP();
//   user.otp = otp;
//   user.otpExpiresAt = new Date(Date.now() + 5 * 60000);
//   await user.save();

//   // Send OTP via SMS if mobile is present
//   if (user.mobile) {
//     try {
//       // Use admin client/number for admin, user client/number for others
//       const isAdmin = (normId === normAdminEmail || normId === normAdminMobile);
//       const twilioClientToUse = isAdmin ? twilioClientAdmin : twilioClientUser;
//       const fromNumber = isAdmin ? TWILIO_PHONE_NUMBER_ADMIN : TWILIO_PHONE_NUMBER_USER;
//       await twilioClientToUse.messages.create({
//         body: `Your OTP is: ${otp}`,
//         from: fromNumber,
//         to: user.mobile.startsWith("+") ? user.mobile : `+91${user.mobile}`,
//       });
//     } catch (err) {
//       console.error("Twilio SMS error:", err);
//     }
//   }

//   // Send OTP via email if email is present
//   if (user.email) {
//     try {
//       await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: user.email,
//         subject: "Your OTP Code",
//         text: `Your OTP is: ${otp}`,
//       });
//     } catch (err) {
//       console.error("Nodemailer error:", err);
//     }
//   }

//   return res.json({ message: "OTP sent" });
// };

// // POST /api/auth/verify-otp
// import { v4 as uuidv4 } from 'uuid';
// import { LoginMethod } from '../models/LoginMethod.js';

// export const verifyOtp = async (req, res) => {
//   const { identifier, otp } = req.body;
//   if (!identifier || !otp) return res.status(400).json({ message: "All fields required" });

//   // Normalize for comparison
//   const normId = identifier.includes('@') ? normalizeEmail(identifier) : normalizeMobile(identifier);
//   const normAdminEmail = normalizeEmail(ADMIN_EMAIL);
//   const normAdminMobile = normalizeMobile(ADMIN_MOBILE);

//   // --- ADMIN OTP LOGIN WITHOUT DB ---
//   if (normId === normAdminEmail || normId === normAdminMobile) {
//     // For demo: Accept any OTP (or you can check a fixed OTP, or store OTP in-memory)
//     // In production, you should store OTP in-memory or use a secure method
//     // For now, just allow any OTP for admin for demonstration
//     const payload = { userId: 'admin', role: 'admin' };
//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
//     return res.json({ token, role: 'admin' });
//   }

//   // --- NORMAL USER FLOW (DB) ---
//   const user = await UserLogin.findOne({
//     $or: [{ mobile: identifier }, { email: identifier }]
//   });

//   let roleToReturn = user?.role;
//   if (
//     user &&
//     user.role === "admin" &&
//     normId !== normAdminEmail &&
//     normId !== normAdminMobile
//   ) {
//     roleToReturn = "user";
//   }

//   if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
//     return res.status(400).json({ message: "Invalid or expired OTP" });
//   }

//   user.otp = null;
//   user.otpExpiresAt = null;
//   if (roleToReturn === "user" && user.role === "admin" && normId !== normAdminEmail && normId !== normAdminMobile) {
//     user.role = "user";
//   }
//   await user.save();

//   // Create login method record
//   const sessionToken = uuidv4();

//   // Map user.loginMethod to valid enum values
//   let methodType = 'mobile_otp';
//   if (user.loginMethod === 'email_otp' || user.loginMethod === 'email') {
//     methodType = 'email_otp';
//   } else if (user.loginMethod === 'mobile_otp' || user.loginMethod === 'phone') {
//     methodType = 'mobile_otp';
//   } else if (user.loginMethod === 'google') {
//     methodType = 'google';
//   } else if (user.loginMethod === 'facebook') {
//     methodType = 'facebook';
//   } else {
//     methodType = 'mobile_otp'; // default fallback
//   }

//   const loginMethod = new LoginMethod({
//     userId: user._id,
//     methodType,
//     loginAt: new Date(),
//     sessionToken
//   });
//   await loginMethod.save();

//   const payload = { userId: user._id, email: user.email, role: roleToReturn };
//   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

//   return res.json({ token, role: roleToReturn, sessionToken });
// };

// // POST /api/auth/social-login
// export const socialLogin = async (req, res) => {
//   const { provider, socialToken } = req.body;
//   let email, name;

//   try {
//     if (provider === "google") {
//       // Google token verification
//       const ticket = await googleClient.verifyIdToken({
//         idToken: socialToken,
//         audience: process.env.VITE_GOOGLE_CLIENT_ID,  // Fixed usage to match client ID
//       });
//       const payload = ticket.getPayload();
//       email = payload.email;
//       name = payload.name;
//     } else if (provider === "facebook") {
//       // Facebook token verification
//       // Get user info from Facebook Graph API
//       const fbRes = await axios.get(
//         `https://graph.facebook.com/me?fields=id,name,email&access_token=${socialToken}`
//       );
//       email = fbRes.data.email;
//       name = fbRes.data.name;
//     } else {
//       return res.status(400).json({ message: "Unsupported provider" });
//     }

//     if (!email) {
//       return res.status(400).json({ message: "Email not found from provider" });
//     }

//     // Find or create user
//     let user = await UserLogin.findOne({ email });
//     if (!user) {
//       user = new UserLogin({ name, email, role: "user", password: "social", mobile: null });
//       await user.save();
//     }

//     const jwtPayload = { userId: user._id, email: user.email, role: user.role };
//     const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: "7d" });

//     // Create login method record for social login
//     let methodType = '';
//     if (provider === 'google') {
//       methodType = 'google';
//     } else if (provider === 'facebook') {
//       methodType = 'facebook';
//     }

//     const sessionToken = uuidv4();
//     const loginMethod = new LoginMethod({
//       userId: user._id,
//       methodType,
//       loginAt: new Date(),
//       sessionToken
//     });
//     await loginMethod.save();

//     return res.json({ token, role: user.role, sessionToken });
//   } catch (err) {
//     console.error("Social login error:", err);
//     return res.status(401).json({ message: "Invalid social token" });
//   }
// };








import useragent from "useragent";
import bcrypt from 'bcryptjs';

import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import fs from 'fs';
import Razorpay from "razorpay";

import csvParser from 'csv-parser';

import { uploadToCloudinary, deleteFromCloudinary } from "../utility/cloudinary.js";

import { UserLogin } from "../models/User Model & OTP Model.js";
// import { authMiddleware } from "../utility/middleware.js";

import { Imageadmin } from "../models/imageModel.js";

import axios from "axios";  // Added axios import


// book add withqur code 


import path from "path";
import { fileURLToPath } from 'url';

import { Book } from "../models/BookSchema.js";
import { bookUploadToCloudinary } from "../utility/bookAddCloudinary.js";


// excel me data sve sl no or qr code 
import { Qurexcel } from "../models/QRexcelsheet.js";

// oder model..
import { Order } from "../models/Order Model.js";

//  Order Tracking Model

import { OrderTracking } from "../models/Order Tracking Model.js";

//  Review and rating Schema
import { Review } from "../models/Review Rating model.js";


// video or iamge 
import { Content } from "../models/video And image and text Model.js";
import { uploadFile ,deleteFile } from "../utility/video and image.js";

import { OAuth2Client } from "google-auth-library";
const googleClient = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

// export const socialLogin = async (req, res) => {
//   try {
//     const { provider, socialToken } = req.body;
//     let email;

//     if (provider === 'google') {
//       const ticket = await googleClient.verifyIdToken({
//         idToken: socialToken,
//         audience: process.env.GOOGLE_CLIENT_ID
//       });
//       email = ticket.getPayload().email;
//     }

//     // (Optional) Verify Facebook token with FB Graph API here

//     if (!email) return res.status(400).json({ message: "Social login failed." });

//     // Find or create user
//     let user = await UserLogin.findOne({ email });
//     if (!user) {
//       user = await UserLogin.create({ name: "Google User", email });
//     }

//     // Create JWT
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.json({ token, email });
//   } catch (err) {
//     console.error("Social login error:", err);
//     res.status(500).json({ message: "Server error during social login" });
//   }
// };
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


// ...other imports...
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_MOBILE = process.env.ADMIN_MOBILE;
// const TWILIO_PHONE_NUMBER_USER = process.env.TWILIO_PHONE_NUMBER_USER;
// const TWILIO_PHONE_NUMBER_ADMIN = process.env.TWILIO_PHONE_NUMBER_ADMIN;



const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// Two separate Twilio clients for user and admin
// const twilioClientUser = twilio(process.env.TWILIO_ACCOUNT_SID_USER, process.env.TWILIO_AUTH_TOKEN_USER);
// const twilioClientAdmin = twilio(process.env.TWILIO_ACCOUNT_SID_ADMIN, process.env.TWILIO_AUTH_TOKEN_ADMIN);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error("Nodemailer configuration error:", error);
  } else {
    console.log("Nodemailer is ready to send emails");
  }
});
// silder image and video

// const ADMIN_EMAIL = "uzmaasr54@gmail.com";      // Your admin email
// const ADMIN_MOBILE = "8107142344";             // Your admin phone





//  auth.................

// const JWT_SECRET = process.env.JWT_SECRET;
// const ADMIN_MOBILE = "8107142344";
// const ADMIN_PASSWORD = "123";
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// const sendOtp = async (req, res) => {
//     try {
//         const { mobile } = req.body;
//         if (!mobile) return res.status(400).json({ message: "Mobile number is required." });
//
//         const formattedMobile = mobile.startsWith("+") ? mobile : `+91${mobile}`;
//         const otp = generateOTP();
//         const otpExpiresAt = new Date(Date.now() + 5 * 60000);
//
//         let user = await UserLogin.findOne({ mobile });
//         if (user) {
//             user.otp = otp;
//             user.otpExpiresAt = otpExpiresAt;
//         } else {
//             user = new UserLogin({ name: "Unknown", mobile, password: "defaultpassword", otp, otpExpiresAt });
//         }
//         await user.save();
//
//         await client.messages.create({
//             body: `Your OTP is: ${otp}`,
//             from: process.env.TWILIO_PHONE_NUMBER,
//             to: formattedMobile
//         });
//
//         res.status(200).json({ message: "OTP sent successfully." });
//     } catch (error) {
//         console.error("Twilio Error:", error);
//         res.status(500).json({ message: "Failed to send OTP. Try again later." });
//     }
// };

// const signup = async (req, res) => {
//     try {
//         const { name, mobile, email, password, otp } = req.body; // changes isha
//         const user = await UserLogin.findOne({ mobile });
//         if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
//             return res.status(400).json({ message: "Invalid OTP." });
//         }
//         user.name = name;
//         user.password = await bcrypt.hash(password, 10);
//         user.otp = null;
//         user.otpExpiresAt = null;
//         if (email) user.email = email;
//         await user.save();
//         res.status(201).json({ message: "Signup successful." });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };




import { sendOrderConfirmationEmail } from "./orderController.js";

// Get user profile (only name and mobile)
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await UserLogin.findById(userId).select('loginMethod name mobile email');
    if (!user) return res.status(404).json({ message: 'User not found login again!!' });

    const responseData = {};
    if (user.loginMethod === 'phone') {
      responseData.mobile = user.mobile;
      responseData.name = "--";
    } else {
      responseData.name = user.name;
      responseData.mobile = user.mobile || user.email || "--";
      responseData.email = user.email;
    }

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const deleted = await UserLogin.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ message: "User not found or already deleted." });
    }
    return res.status(200).json({ message: "Account deleted successfully." });
  } catch (err) {
    console.error("Delete account error:", err);
    return res.status(500).json({ message: "Server error. Could not delete account." });
  }
};

// New logout endpoint for JWT-based auth (frontend removes token)
// export const logout = (req, res) => {
//   res.status(200).json({ message: "Logout successful." });
// };

export const logout = (req, res) => {
  // Optionally, you can blacklist token or update user salt in DB for invalidating JWTs
  return res.status(200).json({ message: "Logout successful." });
};


// const forgotPassword = async (req, res) => {
//     try {
//         let { mobile } = req.body;
//         const user = await UserLogin.findOne({ mobile });
//         if (!user) return res.status(400).json({ message: "User not found." });
//
//         const otp = generateOTP();
//         user.otp = otp;
//         user.otpExpiresAt = new Date(Date.now() + 5 * 60000);
//         await user.save();
//
//         await client.messages.create({
//             body: `Your password reset OTP is: ${otp}`,
//             from: process.env.TWILIO_PHONE_NUMBER,
//             to: mobile.startsWith("+") ? mobile : `+91${mobile}`
//         });
//
//         res.status(200).json({ message: "OTP sent for password reset." });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const resetPassword = async (req, res) => {
//     try {
//         const { mobile, otp, newPassword } = req.body;
//
//         if (mobile === ADMIN_MOBILE) {
//             return res.status(403).json({ message: "Admin password cannot be reset." });
//         }
//
//         const user = await UserLogin.findOne({ mobile });
//
//         if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
//             return res.status(400).json({ message: "Invalid or expired OTP" });
//         }
//
//         user.password = await bcrypt.hash(newPassword, 10);
//         user.otp = null;
//         user.otpExpiresAt = null;
//         await user.save();
//
//         res.json({ message: "Password reset successful. You can now log in." });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// export { sendOtp, signup, login, forgotPassword, resetPassword };


// very /verify-user
// const verifyUser = async (req, res) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) return res.status(401).json({ success: false, message: "No token provided" });
//
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await UserLogin.findById(decoded.userId);
//
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }
//
//         return res.status(200).json({ success: true, user });
//     } catch (err) {
//         return res.status(400).json({ success: false, message: "Invalid token" });
//     }
// };

// export { verifyUser }

// banner  uplaod ......
const uploadImage = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ success: false, message: "No file uploaded" });

        const result = await uploadToCloudinary(file.path);
        const newImage = await Imageadmin.create({ url: result.secure_url });

        res.json({ success: true, imageUrl: newImage.url, id: newImage._id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// upoad image get admin panel banner
const getImages = async (req, res) => {
    const images = await Imageadmin.find();
    res.json({ success: true, images });
};
// delet image admin banner
const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Imageadmin.findById(id);
        if (!image) return res.status(404).json({ success: false, message: "Image not found" });

        await deleteFromCloudinary(image.url);
        await Imageadmin.findByIdAndDelete(id);

        res.json({ success: true, message: "Image deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// bannaer update admin .............
const toggleBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Imageadmin.findById(id);
        if (!image) return res.status(404).json({ success: false, message: "Image not found" });

        image.isBanner = !image.isBanner;
        await image.save();

        res.json({ success: true, message: "Banner status updated", isBanner: image.isBanner });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
//  user page get baner
const getBanners = async (req, res) => {
    const banners = await Imageadmin.find({ isBanner: true });
    res.json({ success: true, banners });
};



export { uploadImage, getImages, deleteImage, toggleBanner, getBanners };

// add book 

const addBook = async (req, res) => {
    try {
        console.log("✅ Body:", req.body);
        console.log("✅ Files:", req.files);

        let {
            title,
            author,
            price,
            offerPrice,
            description,
            category,
            isbn,
            shippingDetails, // REMOVED  isha changes
            pageNumber,
            language,
            weight,
            bulletPoints, // from frontend, string or array
            mainImageIndex // from frontend, default = 0
        } = req.body;

        // ✅ Validate file uploads
        if (!req.files || req.files.length < 1) {
            return res.status(400).json({ message: "At least 1 image is required." });
        }
        
        // ✅ SEQUENTIAL IMAGE ORDER - Images are stored in the exact order they're uploaded
        // The first image (index 0) will always be the front cover
        const bookImages = req.files.map(file => file.path);
        console.log("✅ Images stored in sequential order:", bookImages);

        // ✅ Handle bulletPoints
        let bulletArray = [];
        if (typeof bulletPoints === 'string') {
            bulletArray = bulletPoints.split(',').map(p => p.trim());
        } else if (Array.isArray(bulletPoints)) {
            bulletArray = bulletPoints;
        }

        // ✅ Validations (same as before)
        if (!["New", "Old", "All"].includes(category)) {
            return res.status(400).json({ message: "Category must be 'New', 'Old', or 'All'" });
        }

        // Removed shippingDetails validation

        if (!title || !author || !price || !offerPrice || !description || !isbn || !pageNumber || !language || !weight) {
            return res.status(400).json({ message: "All fields are required" });
        }

        price = Number(price);
        offerPrice = Number(offerPrice);
        pageNumber = Number(pageNumber);

        if (isNaN(price) || isNaN(offerPrice) || isNaN(pageNumber)) {
            return res.status(400).json({ message: "Price, Offer Price & Page Number must be numbers" });
        }

        // ✅ Always set mainImageIndex to 0 (first image is front cover)
        const finalMainImageIndex = 0;

        // ✅ Save book with sequential image order
        const newBook = new Book({
            title,
            author,
            price,
            offerPrice,
            description,
            category,
            bookImages, // Images in sequential order
            mainImageIndex: finalMainImageIndex, // First image is front cover
            bulletPoints: bulletArray,
            isbn,
            pageNumber,
            language,
            weight
        });

        await newBook.save();
        console.log("✅ Book saved with images in sequential order. Front cover at index 0.");
        res.status(201).json({ 
            message: "Book added successfully. First image will be displayed as front cover.", 
            book: newBook 
        });

    } catch (error) {
        console.error("❌ Error adding book:", error.message || error);
        res.status(500).json({ message: "Error adding book", error: error.message || error });
    }
};

// get addbook and add cart
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();

        if (!books || books.length === 0) {
            return res.status(404).json({ message: "No books found" });
        }


        const formattedBooks = books.map((book) => ({
            _id: book._id,
            title: book.title,
            author: book.author,
            price: book.price,
            offerPrice: book.offerPrice,
            description: book.description,
            category: book.category,
            bookImage: book.bookImage,
            isbn: book.isbn,
            pageNumber: book.pageNumber,
            language: book.language,
            weight: book.weight
        }));

        res.status(200).json({ books: formattedBooks });

    } catch (error) {
        console.error("❌ Error fetching books:", error.message || error);
        res.status(500).json({ message: "Error fetching books", error: error.message || error });
    }
};


export { addBook, getBooks, };





// new book  add
const getNewBooks = async (req, res) => {
    try {
        const newBooks = await Book.find({ category: "New" });

        if (!newBooks || newBooks.length === 0) {
            return res.status(404).json({ message: "No new books found" });
        }

        const booksWithRatings = await Promise.all(
            newBooks.map(async (book) => {
                const reviews = await Review.find({ bookId: book._id });

                const avgRating =
                    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1);

                const formattedReviews = reviews.map(review => ({
                    reviewerName: review.name || "Anonymous",
                    rating: review.rating,
                    review: review.review
                }));

                return {
                    _id: book._id,
                    title: book.title,
                    author: book.author,
                    price: book.price,
                    offerPrice: book.offerPrice,
                    description: book.description,
                    category: book.category,
                    bookImage: book.bookImages?.[book.mainImageIndex] || "", // ✅ Fixed
                    mainImageIndex: book.mainImageIndex,                    // ✅ Optional to include
                    isbn: book.isbn,
                    // shippingDetails: book.shippingDetails, // REMOVE
                    pageNumber: book.pageNumber,
                    language: book.language,
                    weight: book.weight,
                    averageRating: avgRating.toFixed(1),
                    totalReviews: reviews.length,
                    reviews: formattedReviews
                };
            })
        );

        res.status(200).json({ books: booksWithRatings });

    } catch (error) {
        console.error("❌ Error fetching new books:", error.message || error);
        res.status(500).json({ message: "Error fetching new books", error: error.message || error });
    }
};


export { getNewBooks };
// new book add cert page



// new bookDetails....



const getBookDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Aggregate rating & total reviews
        const reviewStats = await Review.aggregate([
            { $match: { bookId: book._id } },
            {
                $group: {
                    _id: "$bookId",
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        const avgRating = reviewStats[0]?.averageRating ? reviewStats[0].averageRating.toFixed(1) : 0;
        const totalReviews = reviewStats[0]?.totalReviews || 0;

        const formattedBook = {
            _id: book._id,
            title: book.title,
            author: book.author,
            price: book.price,
            offerPrice: book.offerPrice,
            description: book.description,
            category: book.category,
            isbn: book.isbn,
            // shippingDetails: book.shippingDetails, // REMOVE
            pageNumber: book.pageNumber,
            language: book.language,
            weight: book.weight,
            bookImages: book.bookImages || [], // ✅ all images for slider
            mainImageIndex: book.mainImageIndex || 0, // ✅ so you can show main one first if needed
            bulletPoints: book.bulletPoints || [], // ✅ for frontend display
            averageRating: avgRating,
            totalReviews: totalReviews
        };

        res.status(200).json({ book: formattedBook });

    } catch (error) {
        res.status(500).json({ message: "Error fetching book details", error: error.message });
    }
};


export { getBookDetails }

// 

// old book book show and crat with rating and star



const getOldBooksAdd = async (req, res) => {
    try {
        const oldBooks = await Book.find({ category: "Old" });

        if (!oldBooks || oldBooks.length === 0) {
            return res.status(404).json({ message: "No old books found" });
        }

        const booksWithRatings = await Promise.all(
            oldBooks.map(async (book) => {
                const reviews = await Review.find({ bookId: book._id });

                const avgRating =
                    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1);

                const formattedReviews = reviews.map(review => ({
                    reviewerName: review.name || "Anonymous",
                    rating: review.rating,
                    review: review.review
                }));

                return {
                    _id: book._id,
                    title: book.title,
                    author: book.author,
                    price: book.price,
                    offerPrice: book.offerPrice,
                    description: book.description,
                    category: book.category,
                    bookImage: book.bookImages?.[book.mainImageIndex] || "", // ✅ fixed line
                    mainImageIndex: book.mainImageIndex,
                    isbn: book.isbn,
                    // shippingDetails: book.shippingDetails, // REMOVE
                    pageNumber: book.pageNumber,
                    language: book.language,
                    weight: book.weight,
                    averageRating: avgRating.toFixed(1),
                    totalReviews: reviews.length,
                    reviews: formattedReviews
                };
            })
        );

        res.status(200).json({ books: booksWithRatings });

    } catch (error) {
        console.error("❌ Error fetching old books:", error.message || error);
        res.status(500).json({ message: "Error fetching old books", error: error.message || error });
    }
};


export { getOldBooksAdd };




// add book all show and crat with rating and star





const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();

        if (!books || books.length === 0) {
            return res.status(404).json({ message: "No books found" });
        }

        const booksWithRatings = await Promise.all(
            books.map(async (book) => {
                const reviews = await Review.find({ bookId: book._id });

                const avgRating =
                    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1);

                const formattedReviews = reviews.map(review => ({
                    reviewerName: review.name || "Anonymous",
                    rating: review.rating,
                    review: review.review
                }));

                return {
                    _id: book._id,
                    title: book.title,
                    author: book.author,
                    price: book.price,
                    offerPrice: book.offerPrice,
                    description: book.description,
                    category: book.category,
                    bookImage: book.bookImages?.[book.mainImageIndex] || "", // ✅ sirf main image
                    mainImageIndex: book.mainImageIndex, // ✅ ye line add ki gayi hai
                    isbn: book.isbn,
                    // shippingDetails: book.shippingDetails, // REMOVE
                    pageNumber: book.pageNumber,
                    language: book.language,
                    weight: book.weight,
                    averageRating: avgRating.toFixed(1),
                    totalReviews: reviews.length,
                    reviews: formattedReviews
                };
            })
        );

        res.status(200).json({ books: booksWithRatings });

    } catch (error) {
        console.error("❌ Error fetching books:", error.message || error);
        res.status(500).json({ message: "Error fetching books", error: error.message || error });
    }
};



export { getAllBooks };






// 📌 get update book

const singlegetbook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // ✅ Destructure required fields
        const {
            title,
            author,
            price,
            offerPrice,
            description,
            category,
            bookImages, // Now return all images
            mainImageIndex,
            bulletPoints,
            isbn,
            // shippingDetails,
            pageNumber,
            language,
            weight
        } = book;

        res.status(200).json({
            book: {
                title,
                author,
                price,
                offerPrice,
                description,
                category,
                bookImages, // Return all images
                mainImageIndex,
                bulletPoints,
                isbn,
                // shippingDetails,
                pageNumber,
                language,
                weight
            }
        });

    } catch (error) {
        console.error("❌ Error getting book:", error.message || error);
        res.status(500).json({ message: "Error getting book", error: error.message || error });
    }
};

export {singlegetbook}

// book update ......... Admin
const updateBook = async (req, res) => {
    try {
        // console.log(req.body); // For debugging
        // debugger
        const { bookId } = req.params;
        const {
            title,
            author,
            price,
            offerPrice,
            description,
            category,
            isbn,
            // shippingDetails,
            pageNumber,
            language,
            weight,
            bulletPoints,
            mainImageIndex,
            bookImages
        } = req.body;

        const updateData = {};

        if (title) updateData.title = title;
        if (author) updateData.author = author;
        if (price) updateData.price = Number(price);
        if (offerPrice) updateData.offerPrice = Number(offerPrice);
        if (description) updateData.description = description;
        if (category) updateData.category = category;
        if (isbn) updateData.isbn = isbn;
        // Do NOT use shippingDetails anywhere
        // if (shippingDetails) updateData.shippingDetails = shippingDetails; // REMOVE
        if (pageNumber) updateData.pageNumber = Number(pageNumber);
        if (language) updateData.language = language;
        if (weight) updateData.weight = weight;

        // Bullet points handling
        if (bulletPoints) {
            if (Array.isArray(bulletPoints)) {
                updateData.bulletPoints = bulletPoints;
            } else {
                updateData.bulletPoints = bulletPoints
                    .split(',')
                    .map(pt => pt.trim())
                    .filter(pt => pt.length > 0);
            }
        }

        // Main image index
        if (mainImageIndex !== undefined && mainImageIndex !== '') {
            const parsedIndex = parseInt(mainImageIndex);
            if (!isNaN(parsedIndex)) {
                updateData.mainImageIndex = parsedIndex;
            }
        }

        // ✅ bookImages from array or string
        if (bookImages) {
            if (Array.isArray(bookImages)) {
                updateData.bookImages = bookImages;
            } else if (typeof bookImages === 'string') {
                updateData.bookImages = bookImages
                    .split(',')
                    .map(img => img.trim())
                    .filter(img => img.length > 0);
            }
        }

        // ✅ Agar naye image upload huye hain, to unka path save karo
        // Images will be stored in sequential order as uploaded
        if (req.files && req.files.length > 0) {
            console.log("🟩 Uploaded Files in sequential order:", req.files);
            // Store images in the exact order they're uploaded
            updateData.bookImages = req.files.map(file => file.path);
            // When new images are uploaded, set first image as front cover
            updateData.mainImageIndex = 0;
            console.log("✅ New images uploaded. First image set as front cover (index 0).");
        }

        // Validations
        if (updateData.category && !["New", "Old", "All"].includes(updateData.category)) {
            return res.status(400).json({ message: "Category must be 'New', 'Old', or 'All'" });
        }

        // Do NOT validate shippingDetails
        // if (updateData.shippingDetails && !["4-5 Days", "5-7 Days", "7-10 Days"].includes(updateData.shippingDetails)) {
        //     return res.status(400).json({ message: "Shipping Details must be '4-5 Days', '5-7 Days', or '7-10 Days'" });
        // }

        const updatedBook = await Book.findByIdAndUpdate(bookId, { $set: updateData }, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book updated successfully", book: updatedBook });

    } catch (error) {
        console.error("❌ Error updating book:", error.message || error);
        res.status(500).json({ message: "Error updating book", error: error.message || error });
    }
};


export { updateBook };






// admin book  fatch requset delete book 

const getBooksAllCategory = async (req, res) => {
    try {
        // Sabhi books fetch karo
        const books = await Book.find();

        // Har book ka sirf main image nikal kar naya array banao
        const booksWithMainImage = books.map(book => {
            const mainImage = book.bookImages[book.mainImageIndex || 0];
            return {
                _id: book._id,
                title: book.title,
                author: book.author,
                price: book.price,
                offerPrice: book.offerPrice,
                mainImage,
                category: book.category
            };
        });

        res.status(200).json({
            message: "Books retrieved successfully",
            books: booksWithMainImage
        });
    } catch (error) {
        console.error("❌ Error retrieving books:", error.message || error);
        res.status(500).json({
            message: "Error retrieving books",
            error: error.message || error
        });
    }
};

const deleteBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error.message || error);
        res.status(500).json({ message: "Error deleting book", error: error.message || error });
    }
};


export { getBooksAllCategory, deleteBookById };




// search buttion ...
// Search books by title, author or price
const SearchgetAllBooks = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            const isNumber = !isNaN(search);

            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { author: { $regex: search, $options: "i" } },
                    ...(isNumber ? [{ price: Number(search) }] : [])
                ]
            };
        }

        const books = await Book.find(query).sort({ createdAt: -1 });

        if (!books || books.length === 0) {
            return res.status(404).json({ message: "No books found" });
        }

        const booksWithRatings = await Promise.all(
            books.map(async (book) => {
                const reviews = await Review.find({ bookId: book._id });
                const avgRating =
                    reviews.reduce((acc, curr) => acc + curr.rating, 0) /
                    (reviews.length || 1);

                return {
                    _id: book._id,
                    title: book.title,
                    author: book.author,
                    price: book.price,
                    offerPrice: book.offerPrice,
                    description: book.description,
                    category: book.category,
                    bookImage: book.bookImage,
                    isbn: book.isbn,
                    // shippingDetails: book.shippingDetails, // REMOVE
                    pageNumber: book.pageNumber,
                    language: book.language,
                    weight: book.weight,
                    // Yeh naya data:
                    averageRating: avgRating.toFixed(1),
                    totalReviews: reviews.length,
                };
            })
        );

        res.status(200).json({
            message: "Books retrieved successfully",
            books: booksWithRatings,
        });

    } catch (error) {
        console.error("Error retrieving books:", error.message || error);
        res.status(500).json({
            message: "Error retrieving books",
            error: error.message || error
        });
    }
};



export { SearchgetAllBooks };







// 📌 Old QR functions removed to avoid duplicates - new implementations are at the end of file

//  Razorpay Configuration
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createorder = async (req, res) => {
    try {
        const { cart, totalAmount, deliveryDetails } = req.body;

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ error: "Cart is empty or invalid format" });
        }

        // ✅ Corrected orderId generation using template literal
        const orderId = `AP-${new Date().getFullYear()}${(Date.now() % 1000000).toString().padStart(6, '0')}`;

        // Check if orderId already exists
        const existingOrder = await Order.findOne({ orderId });
        if (existingOrder) {
            return res.status(400).json({
                success: false,
                message: "Order ID already exists, please try again"
            });
        }

        // Try to find user by email to link the order
        let userId = null;
        if (deliveryDetails.email) {
            try {
                const user = await UserLogin.findOne({ email: deliveryDetails.email });
                if (user) {
                    userId = user._id;
                }
            } catch (error) {
                console.log("User lookup failed, proceeding without userId:", error.message);
            }
        }

        // Create order in DB with Pending status
        const newOrder = new Order({
            orderId,
            userId: userId, // Link to user if found
            books: cart.map(book => ({
                bookId: book.id,
                title: book.title,
                price: book.price,
                quantity: book.quantity
            })),
            totalPrice: totalAmount,
            deliveryDetails,
            status: "Pending",
            userEmail: deliveryDetails.email,
            pendingSince: Date.now()
            // Do NOT set paymentId here!
        });

        const savedOrder = await newOrder.save();
        console.log("Order saved:", savedOrder);

        // Create Razorpay order
        const options = {
            amount: totalAmount * 100, // paise
            currency: "INR",
            receipt: savedOrder._id.toString()
        };

        console.log("Razorpay Order Options:", options);
        const razorpayOrder = await razorpay.orders.create(options);
        console.log("Razorpay Order Created:", razorpayOrder);

        // Send both orderId (Razorpay) and dbOrderId (MongoDB) to frontend
        res.json({
            orderId: razorpayOrder.id,
            amount: options.amount,
            dbOrderId: savedOrder._id
        });
    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ error: "Payment error", details: error.message });
    }
};

                              
import mongoose from 'mongoose';

// const saveorder = async (req, res) => {
//     try {
//         // Safely extract userId and user from req.user (if available)
//         const userId = req.user?.userId;
//         const user = req.user;
//         const { paymentId, deliveryDetails, cart, totalAmount, sessionToken } = req.body;

//         console.log("saveorder called with sessionToken:", sessionToken);

//         if (!cart || !Array.isArray(cart) || cart.length === 0) {
//             return res.status(400).json({ success: false, message: "Cart data is invalid" });
//         }

//         let loginMethodId = null;
//         if (sessionToken) {
//             const loginMethod = await LoginMethod.findOne({ sessionToken });
//             console.log("Found loginMethod for sessionToken:", loginMethod);
//             if (loginMethod) {
//                 loginMethodId = loginMethod._id;
//             }
//         }

//         // Ensure deliveryDetails.email is saved in deliveryDetails
//         const deliveryDetailsWithEmail = {
//             ...deliveryDetails,
//             email: deliveryDetails.email || (user && user.email) || undefined
//         };

//         const newOrder = new Order({
//             userId: userId || undefined, // If you have userId from auth, otherwise undefined
//             userEmail: (user && user.email) || (deliveryDetails && deliveryDetails.email) || undefined, // Prefer user email, fallback to delivery email
//             loginMethodId: loginMethodId || undefined,
//             books: cart.map(book => ({
//                 bookId: new mongoose.Types.ObjectId(book.id),
//                 title: book.title,
//                 price: book.price,
//                 quantity: book.quantity,
//             })),
//             totalPrice: totalAmount,
//             deliveryDetails: deliveryDetailsWithEmail,
//             paymentId,
//             status: "Paid"
//         });

//         const savedOrder = await newOrder.save();

//         console.log("Order saved with ID:", savedOrder._id, "and loginMethodId:", loginMethodId);

//         // Send order confirmation email after saving order
//         try {
//             await sendOrderConfirmationEmail(
//                 deliveryDetailsWithEmail.email || (user && user.email),
//                 deliveryDetailsWithEmail.fullName,
//                 savedOrder
//             );
//             console.log("Order confirmation email sent successfully.");
//         } catch (emailError) {
//             console.error("Failed to send order confirmation email:", emailError);
//         }

//         // 🟢 Step 1: Book IDs Array nikaalo
//         const bookIds = savedOrder.books.map(book => book.bookId);

//         // 🟢 Step 2: Frontend ko response bhej do with orderId & bookIds[]
//         res.json({
//             success: true,
//             message: "Order saved successfully",
//             orderId: savedOrder._id,
//             bookIds: bookIds
//         });

//     } catch (error) {
//         console.error("Order Save Error:", error);
//         res.status(500).json({ success: false, message: "Failed to save order" });
//     }
// };

const saveorder = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const user = req.user;
        const { paymentId, deliveryDetails, cart, totalAmount, sessionToken, dbOrderId } = req.body;

        console.log("saveorder called for dbOrderId:", dbOrderId, req.body);

        if (!dbOrderId) {
            return res.status(400).json({ success: false, message: "dbOrderId is required" });
        }

        // 🔹 Find and update the existing order
        const existingOrder = await Order.findById(dbOrderId);
        if (!existingOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Optional: Validate cart and price match (to prevent tampering)
        if (existingOrder.totalPrice !== totalAmount) {
            return res.status(400).json({ success: false, message: "Amount mismatch" });
        }

        let loginMethodId = null;
        if (sessionToken) {
            const loginMethod = await LoginMethod.findOne({ sessionToken });
            if (loginMethod) {
                loginMethodId = loginMethod._id;
            }
        }

        // Update order details
        existingOrder.userId = userId || existingOrder.userId;
        existingOrder.userEmail = (user && user.email) || deliveryDetails.email || existingOrder.userEmail;
        existingOrder.loginMethodId = loginMethodId || existingOrder.loginMethodId;
        existingOrder.paymentId = paymentId;
        existingOrder.status = "Unshipped"; // Changed from "Paid" to "Unshipped"
        existingOrder.deliveryDetails = {
            ...existingOrder.deliveryDetails,
            ...deliveryDetails
        };

        await existingOrder.save();

        // Send confirmation email
        try {
            await sendOrderConfirmationEmail(
                existingOrder.userEmail,
                deliveryDetails.fullName,
                existingOrder
            );
            console.log("Order confirmation email sent successfully.");
        } catch (emailError) {
            console.error("Failed to send order confirmation email:", emailError);
        }

        // 🟢 Step 1: Book IDs Array
        const bookIds = existingOrder.books.map(book => book.bookId);

        // 🟢 Step 2: Send response
        res.json({
            success: true,
            message: "Order updated successfully",
            orderId: existingOrder._id,
            bookIds
        });

    } catch (error) {
        console.error("Order Save Error:", error);
        res.status(500).json({ success: false, message: "Failed to save order" });
    }
};
export { createorder, saveorder };
// getRazorpaykey...
const getRazorpayKey = (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
};
export { getRazorpayKey };


// 🔹 Get Orders API (Order Summary Table)

const usergetOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, search } = req.query;

        console.log("Page:", page, "Limit:", limit, "Status:", status, "Search:", search);

        let filter = {};
        if (status) filter.status = status;
        if (search) {
            filter.$or = [
                { orderId: { $regex: search, $options: "i" } },
                { customerName: { $regex: search, $options: "i" } }
            ];
        }

        console.log("Filter Applied:", filter);

        // SELECT hata diya taaki pura data aaye
        const orders = await Order.find(filter)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const totalOrders = await Order.countDocuments(filter);

        console.log("Orders Found:", orders); // Debugging

        res.json({
            success: true,
            orders,
            totalPages: Math.ceil(totalOrders / limit),
            currentPage: parseInt(page)
        });

    } catch (error) {
        console.error("Fetch Orders Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};

export { usergetOrders }




// order  traking........


const getOrderAnalytics = async (req, res) => {
    try {
        const dailyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                    orderIds: { $push: "$_id" } // ✅ Order IDs include kiye
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const monthlyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 },
                    orderIds: { $push: "$_id" } // ✅ Order IDs include kiye
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const yearlyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y", date: "$createdAt" } },
                    count: { $sum: 1 },
                    orderIds: { $push: "$_id" } // ✅ Order IDs include kiye
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({ dailyOrders, monthlyOrders, yearlyOrders });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
const getAllOrders = async (req, res) => {
    try {
        const { date } = req.query;
        let filter = {};

        if (date) {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);

            filter.createdAt = { $gte: startDate, $lte: endDate };
        }

        const orders = await Order.find(filter)
            .sort({ createdAt: -1 })
            .lean();  // Added lean() for better performance

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error); // Added error logging
        res.status(500).json({ error: "Server error" });
    }
};


/*
const getAllOrders = async (req, res) => {
    try {
        const { date } = req.query;
        let filter = {};

        if (date) {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0); // 🔹 Day start time

            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999); // 🔹 Day end time

            filter.createdAt = { $gte: startDate, $lte: endDate };
        }

        const orders = await Order.find(filter).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const getAllOrders = async (req, res) => {
  try {
    const { date } = req.query;
    let filter = {};

    if (date) {
      const start = new Date(date);
      start.setHours(0,0,0,0);
      const end = new Date(date);
      end.setHours(23,59,59,999);
      filter.createdAt = { $gte: start, $lte: end };
    }

    const orders = await Order.find(filter)
      .populate({ path: 'userId', select: 'email' })  // ✅ Populates email from UserLogin :contentReference[oaicite:1]{index=1}
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    const enriched = orders.map(o => ({
      ...o,
      userEmail: o.userId?.email || ''              // ✅ Attaches userEmail to each order
    }));

    return res.json(enriched);                       // ✅ Sends the enriched array to the frontend

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};*/




export const updateTrackingId = async (req, res) => {
  const { id } = req.params;
  const { trackingId, email, courier } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { trackingId, courier },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Send email if email is provided
    if (email) {
      try {
        // Import or require your email sending utility here
        const { sendTrackingEmail } = await import("../utils/sendEmail.js");
        const name = order.deliveryDetails.fullName;
        await sendTrackingEmail(email, name, trackingId, JSON.stringify({ courier, trackingId }), courier);
      } catch (err) {
        console.error("Email send error:", err);
      }
    }

    res.json({ success: true, message: "Tracking ID and courier updated successfully and email sent", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



// ✅ Order Update API bhi latest sorting ke saath response bhejega
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status, pendingSince: status === "Pending" ? Date.now() : null, $push: { statusHistory: { status } } },
            { new: true }
        );

        if (!order) return res.status(404).json({ error: "Order not found" });

        const { sortBy } = req.query;
        let sortQuery = sortBy === "serialNumber" ? { serialNumber: 1 } : { createdAt: -1 };
        const updatedOrders = await Order.find({}).sort(sortQuery);

        res.json(updatedOrders);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};




// ✅ 3️⃣ Order Tracking (User Order ID se apna order check kare)
const trackOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      const order = await Order.findById(orderId)
        .populate('books.bookId', 'title price');
  
      const tracking = await OrderTracking.findOne({ orderId });
  
      if (!order) return res.status(404).json({ error: "Order not found" });
  
      const books = order.books.map(book => ({
        title: book.bookId?.title || "Book not found",
        price: book.bookId?.price || 0,
        quantity: book.quantity,
        totalPrice: book.quantity * (book.bookId?.price || 0)
      }));
  
      res.json({
        orderId: order._id,
        status: tracking?.status || order.status,
        lastUpdated: order.updatedAt,
        books,
        statusHistory: tracking?.statusHistory || []
      });
  
    } catch (error) {
      console.error("Error tracking order:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  


// ✅ 4️⃣ User Order History (Mobile number se user apne orders dekhe)
// ✅ 4️⃣ User Order History (Mobile number se user apne orders dekhe)
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const userEmail = req.user?.email;
        const { sessionToken } = req.query;

        console.log("getUserOrders called with userId:", userId, "userEmail:", userEmail, "sessionToken:", sessionToken);

        if (!userId && !userEmail) {
            return res.status(400).json({ error: "User not authenticated" });
        }

        // Fetch user profile to get mobile number and email
        const user = await UserLogin.findById(userId).select('mobile email');
        const userMobile = user?.mobile;
        const userEmails = [userEmail, user?.email].filter(Boolean);

        // Build $or query with userId, userEmail, deliveryDetails.email, deliveryDetails.mobile
        const orConditions = [
            { userId: new mongoose.Types.ObjectId(userId) }
        ];

        if (userEmails.length > 0) {
            orConditions.push({ userEmail: { $in: userEmails } });
            orConditions.push({ "deliveryDetails.email": { $in: userEmails } });
        } else if (userEmail) {
            orConditions.push({ userEmail: userEmail });
            orConditions.push({ "deliveryDetails.email": userEmail });
        }

        if (userMobile) {
            orConditions.push({ "deliveryDetails.mobile": userMobile });
        }

        // If sessionToken is provided, find loginMethodId and add to query
        if (sessionToken) {
            const loginMethod = await LoginMethod.findOne({ sessionToken });
            if (loginMethod) {
                orConditions.push({ loginMethodId: loginMethod._id });
            }
        }

        if (orConditions.length === 0) {
            return res.status(400).json({ error: "No valid user identifier found" });
        }

        const query = { $or: orConditions };

        console.log("MongoDB query for orders:", query);

        // Populate book details for each book in orders
        let orders = await Order.find(query)
            .select("orderId status createdAt updatedAt books totalPrice deliveryDetails paymentId")
            .populate({
                path: "books.bookId",
                select: "title bookImages mainImageIndex"
            })
            .sort({ createdAt: -1 });

        console.log("Orders found:", orders.length);

        // Filter out "Pending" orders if a "Paid" order exists for the same user and book
        // BUT keep "Payment Failed" orders so users can retry payment
        const paidOrders = orders.filter(order => order.status === "Paid" || order.status === "Unshipped" || order.status === "Shipped" || order.status === "Delivered");
        const paidOrderBookIds = new Set();
        paidOrders.forEach(order => {
            order.books.forEach(bookItem => {
                if (bookItem.bookId) {
                    paidOrderBookIds.add(bookItem.bookId.toString());
                }
            });
        });

        orders = orders.filter(order => {
            // Always show Payment Failed orders so users can retry
            if (order.status === "Payment Failed") return true;
            // Show all non-pending orders
            if (order.status !== "Pending") return true;
            // For pending orders, check if any book in this pending order is in paidOrderBookIds
            return !order.books.some(bookItem => bookItem.bookId && paidOrderBookIds.has(bookItem.bookId.toString()));
        });

        // Format orders to include bookImage and bookName in books array
        const formattedOrders = orders.map(order => {
            const books = order.books.map(bookItem => {
                const book = bookItem.bookId;
                return {
                    bookId: book?._id,
                    bookName: book?.title || "N/A",
                    bookImage: book?.bookImages && book?.bookImages.length > 0 ? book.bookImages[book.mainImageIndex || 0] : "",
                    quantity: bookItem.quantity,
                    price: bookItem.price,
                    // Added title for fallback in frontend if needed
                    title: book?.title || "N/A"
                };
            });
            return {
                _id: order._id,
                orderId: order.orderId || order._id,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                totalPrice: order.totalPrice,
                paymentId: order.paymentId || null, // Include payment ID to check if payment was successful
                deliveryDetails: {
                    fullName: order.deliveryDetails?.fullName || "N/A",
                    mobile: order.deliveryDetails?.mobile || "N/A",
                    email: order.deliveryDetails?.email || "",
                    address: order.deliveryDetails?.address || "",
                    city: order.deliveryDetails?.city || "",
                    state: order.deliveryDetails?.state || "",
                    pincode: order.deliveryDetails?.pincode || ""
                },
                books
            };
        });

        res.json(formattedOrders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// New API to get orders by mobile number (including deliveryDetails.mobile)
const getOrdersByMobile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const userEmail = req.user?.email;
        const mobileParam = req.params.mobile;

        if (!userId && !userEmail) {
            return res.status(400).json({ error: "User not authenticated" });
        }

        if (!mobileParam) {
            return res.status(400).json({ error: "Mobile number parameter is required" });
        }

        const query = {
            $or: []
        };

        if (userId) {
            query.$or.push({ userId: mongoose.Types.ObjectId(userId) });
        }
        if (userEmail) {
            query.$or.push({ userEmail: userEmail });
        }

        // Also include orders where deliveryDetails.mobile matches the mobileParam
        query.$or.push({ "deliveryDetails.mobile": mobileParam });

        const orders = await Order.find(query)
            .select("status createdAt updatedAt books totalPrice deliveryDetails")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders by mobile:", error);
        res.status(500).json({ error: "Server error" });
    }
};

/*
// ✅ Get orders pending for more than 7 days
const getPendingOrders = async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        console.log("Seven Days Ago:", sevenDaysAgo);

        const pendingOrders = await Order.find({
            status: "Pending",
            pendingSince: { $lte: sevenDaysAgo }, // Ensure this is a Date field
        }).select("_id status pendingSince deliveryDetails");

        console.log("Orders Found:", pendingOrders);
        res.json(pendingOrders);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Manually delete an order
const deleteOrderPending = async (req, res) => {
    try {
        const { orderId } = req.params;
        await Order.findByIdAndDelete(orderId);
        res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete order" });
    }
};

// ✅ Auto-delete orders when status is updated
const pendingUpdateAutoDelete = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // ✅ Agar order 7 din se pending tha aur status update ho gaya, to delete kar do
        if (order.status === "Pending" && new Date(order.pendingSince) <= new Date(new Date().setDate(new Date().getDate() - 7))) {
            await Order.findByIdAndDelete(orderId);
            return res.json({ success: true, message: "Order auto-deleted as status updated." });
        }

        order.status = status;
        await order.save();
        res.json({ success: true, message: "Order status updated." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update status." });
    }
};
*/
const getPendingOrders = async (req, res) => {
    try {
        const pendingOrders = await Order.find({
            status: "Pending"
        }).select("_id status pendingSince deliveryDetails");

        res.json(pendingOrders);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Manually delete an order
// Example Cron Logic
const deleteOrderPending = async () => {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const result = await Order.deleteMany({
    status: "Pending",
    pendingSince: { $lte: cutoff }
  });

  console.log(`Auto-deleted ${result.deletedCount} pending orders.`);
  return result;
};

// ✅ Auto-delete orders when status is updated
const pendingUpdateAutoDelete = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // ✅ Agar order 24 ghante se pending tha aur status update ho gaya, to delete kar do
        if (
            order.status === "Pending" &&
            new Date(order.pendingSince) <= new Date(Date.now() - 24 * 60 * 60 * 1000)
        ) {
            await Order.findByIdAndDelete(orderId);
            return res.json({ success: true, message: "Order auto-deleted as status updated." });
        }

        order.status = status;
        await order.save();
        res.json({ success: true, message: "Order status updated." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update status." });
    }
};


export { getOrderAnalytics, updateOrderStatus, trackOrder, getUserOrders, getPendingOrders, getAllOrders, deleteOrderPending, pendingUpdateAutoDelete, getOrdersByMobile };

// Add Review Controller
// Add Review Controller (Simplified version)
// Add Review Controller

const addReview = async (req, res) => {
    try {
        const { bookId, orderId, name, rating, review } = req.body; // name field added

        // 1. Bas orderId ka check
        const order = await Order.findOne({ _id: orderId });

        if (!order) {
            return res.status(400).json({ message: "Order not found." });
        }

        // 2. Check agar is book ka already review diya hai ya nahi is order ke liye
        const alreadyReviewed = await Review.findOne({ bookId, orderId });

        if (alreadyReviewed) {
            return res.status(400).json({ message: "You have already reviewed this book for this order." });
        }

        // 3. Save Review (with name)
        const newReview = await Review.create({
            bookId,
            orderId,
            name,  // name added here
            rating,
            review
        });

        return res.status(201).json({ message: "Review added successfully!", newReview });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// Get Book Details by ID
export const getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;
    
    const book = await Book.findById(bookId).select('title author price category');
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    res.json({
      success: true,
      book: book
    });

  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching book details"
    });
  }
};



export { addReview, };


//  show review 
const getReviewsByBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const reviews = await Review.find({ bookId });

        res.status(200).json({ reviews });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
    }
};

export { getReviewsByBook };

import cloudinary from "cloudinary";


// ✅ Cloudinary Config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 📌 **Content Upload (Image/Video + Text)**
const uploadContent = async (req, res) => {
    try {
        const { type, content } = req.body;
        let fileUrl = "";

        // ✅ File upload to Cloudinary
        if (req.file) {
            console.log("📂 File received:", req.file.originalname);

            const result = await new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload_stream(
                    { resource_type: req.file.mimetype.includes("video") ? "video" : "image" },
                    (error, result) => (error ? reject(error) : resolve(result))
                ).end(req.file.buffer);
            });

            fileUrl = result.secure_url;
        }

        // ✅ Save to MongoDB
        const newContent = new Content({
            type,
            filePath: fileUrl,
            content: content || ""
        });

        await newContent.save();

        res.json({ success: true, message: "✅ Content Uploaded Successfully", data: newContent });
    } catch (error) {
        console.error("❌ Upload Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

// 📌 **Get All Content (Sorted by Date)**
const getAllContent = async (req, res) => {
    try {
        const contentList = await Content.find().sort({ createdAt: -1 });
        res.json(contentList);
    } catch (error) {
        console.error("❌ Fetch Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

// 📌 **Delete Content**
const deleteContent = async (req, res) => {
    try {
        const { id } = req.params;
        const content = await Content.findById(id);

        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }

        // ✅ Cloudinary se delete karein (agar image/video hai to)
        if (content.filePath) {
            const publicId = content.filePath.split('/').pop().split('.')[0];
            await cloudinary.v2.uploader.destroy(publicId);
        }

        // ✅ MongoDB se delete karein
        await Content.findByIdAndDelete(id);

        res.json({ success: true, message: "✅ Content Deleted Successfully" });
    } catch (error) {
        console.error("❌ Delete Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

// 📌 **Update Content**
const updateContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        let fileUrl = "";

        // ✅ Pehle old content nikal lo
        const existingContent = await Content.findById(id);
        if (!existingContent) {
            return res.status(404).json({ error: "Content not found" });
        }

        // ✅ Agar naye file aayi hai to Cloudinary pe upload karo
        if (req.file) {
            console.log("📂 New File received:", req.file.originalname);
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                resource_type: req.file.mimetype.includes("video") ? "video" : "image"
            });

            fileUrl = result.secure_url;

            // ✅ Pehle wali file delete karo (agar thi)
            if (existingContent.filePath) {
                const publicId = existingContent.filePath.split('/').pop().split('.')[0];
                await cloudinary.v2.uploader.destroy(publicId);
            }
        }

        // ✅ Update MongoDB
        const updatedData = {
            content: content || existingContent.content,
            filePath: fileUrl || existingContent.filePath
        };

        const updatedContent = await Content.findByIdAndUpdate(id, updatedData, { new: true });

        res.json({ success: true, message: "✅ Content Updated Successfully", data: updatedContent });
    } catch (error) {
        console.error("❌ Update Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

export { uploadContent, getAllContent, deleteContent, updateContent };




// ✅ Get all pending orders (not just 7+ days)
const getAllPendingOrders = async (req, res) => {
    try {
        const { date } = req.query;
        console.log("getAllPendingOrders - date query param:", date);
        let filter = { status: "Pending" };

        if (date && date !== "all") {
            const days = parseInt(date, 10);
            console.log("Parsed days:", days);
            if (!isNaN(days)) {
                const now = new Date();
                const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
                console.log("Filtering orders from", pastDate, "to", now);
                // Use pendingSince for filtering pending orders by date
                filter.pendingSince = { $gte: pastDate, $lte: now };
            }
        }

        const pendingOrders = await Order.find(filter).sort({ createdAt: -1 }).lean();
        console.log("Found pending orders count:", pendingOrders.length);
        pendingOrders.forEach(order => {
            console.log(`Order ID: ${order._id}, pendingSince: ${order.pendingSince}, createdAt: ${order.createdAt}`);
        });

        res.json(pendingOrders);
    } catch (error) {
        console.error("Error in getAllPendingOrders:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export { getAllPendingOrders };

// Delete a single pending order by ID (only if status is 'Pending')
export const deleteOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, status: 'Pending' });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found or not pending.' });
    }
    await Order.findByIdAndDelete(orderId);
    res.json({ success: true, message: 'Pending order deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete order.' });
  }
};

// Mark order as Incomplete with failureReason
const markOrderIncomplete = async (orderId, reason = 'Payment failed or not completed') => {
    try {
        await Order.findByIdAndUpdate(orderId, {
            status: 'Incomplete',
            failureReason: reason,
            $push: { statusHistory: { status: 'Incomplete' } }
        });
        console.log(`Order ${orderId} marked as Incomplete. Reason: ${reason}`);
    } catch (err) {
        console.error('Error marking order as Incomplete:', err);
    }
};

// Cron job: Delete all Incomplete orders older than 24 hours
const deleteOldIncompleteOrders = async () => {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    try {
        const result = await Order.deleteMany({
            status: 'Incomplete',
            createdAt: { $lte: cutoff }
        });
        if (result.deletedCount > 0) {
            console.log(`Auto-deleted ${result.deletedCount} incomplete orders (older than 24h).`);
        }
        return result;
    } catch (err) {
        console.error('Error auto-deleting incomplete orders:', err);
    }
};

// API endpoint to get all incomplete orders
const getIncompleteOrders = async (req, res) => {
    try {
        // Populate books with title, quantity, price and deliveryDetails fully
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
};

export { markOrderIncomplete, deleteOldIncompleteOrders, getIncompleteOrders };

// --- NEW AUTHENTICATION FLOW ---
// (Do NOT re-import jwt or UserLogin here, they are already imported at the top)

// POST /api/auth/check-user-type
export const checkUserType = async (req, res) => {
  const { identifier } = req.body; // phone or email
  if (!identifier) return res.status(400).json({ message: "Phone or email required" });

  const user = await UserLogin.findOne({
    $or: [{ mobile: identifier }, { email: identifier }]
  });

  if (!user) return res.json({ role: "not_found" });

  // Normalize for comparison
  const normId = identifier.includes('@') ? normalizeEmail(identifier) : normalizeMobile(identifier);
  const normAdminEmail = normalizeEmail(ADMIN_EMAIL);
  const normAdminMobile = normalizeMobile(ADMIN_MOBILE);

  // Only allow admin role for fixed admin email/phone, else downgrade to user
  if (
    user.role === "admin" &&
    normId !== normAdminEmail &&
    normId !== normAdminMobile
  ) {
    // Downgrade to user
    return res.json({ role: "user" });
  }

  return res.json({ role: user.role });
};

// Helper to generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Helper: Normalize email (lowercase, trim)
function normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}
// Helper: Normalize mobile (remove spaces, ensure +91 if Indian, trim)
function normalizeMobile(mobile) {
  let m = (mobile || '').replace(/\s+/g, '').trim();
  if (m.startsWith('+91')) return m;
  if (m.length === 10 && /^\d{10}$/.test(m)) return '+91' + m;
  return m;
}

let adminOtp = null;
let adminOtpExpiresAt = null;

// POST /api/auth/send-otp
export const sendOtp = async (req, res) => {
  const { identifier } = req.body; // phone or email
  if (!identifier) return res.status(400).json({ message: "Phone or email required" });

  // Normalize for comparison
  const normId = identifier.includes('@') ? normalizeEmail(identifier) : normalizeMobile(identifier);
  const normAdminEmail = normalizeEmail(ADMIN_EMAIL);
  const normAdminMobile = normalizeMobile(ADMIN_MOBILE);

  // Handle admin OTP generation and storage in memory
  if (normId === normAdminEmail || normId === normAdminMobile) {
    // Generate OTP for admin and store in memory
    adminOtp = generateOTP();
    adminOtpExpiresAt = new Date(Date.now() + 5 * 60000);

    // Send OTP via SMS using admin Twilio client if admin mobile exists
    if (normAdminMobile) {
      try {
        await twilioClient.messages.create({
          body: `Your Admin OTP is: ${adminOtp}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: normAdminMobile.startsWith("+") ? normAdminMobile : `+91${normAdminMobile}`,
        });
      } catch (err) {
        console.error("Twilio SMS error (admin):", err);
      }
    }

    // Send OTP via email using nodemailer if admin email exists
    if (normAdminEmail) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: normAdminEmail,
          subject: "Your Admin OTP Code",
          text: `Your Admin OTP is: ${adminOtp}`,
        });
      } catch (err) {
        console.error("Nodemailer error (admin):", err);
      }
    }

    return res.json({ message: "Admin OTP sent" });
  }

  // For regular users, find or create user
  let user = await UserLogin.findOne({
    $or: [{ mobile: identifier }, { email: identifier }]
  });

  // If user not found, create a new user with the identifier
  if (!user) {
    // Check if identifier is an email or mobile
    const isEmail = identifier.includes('@');
    
    // Double-check to prevent duplicates
    const existingUser = await UserLogin.findOne(
      isEmail ? { email: identifier } : { mobile: identifier }
    );
    
    if (existingUser) {
      user = existingUser;
      console.log(`Found existing user during double-check: ${identifier}`);
    } else {
      // Create user data object
      const userData = {
        name: isEmail ? `User (${identifier.split('@')[0]})` : "New User",
        loginMethod: isEmail ? 'email_otp' : 'mobile_otp',
        password: "otp",
        otp: null,
        otpExpiresAt: null
      };
      
      // Set email or mobile based on identifier type
      if (isEmail) {
        userData.email = identifier;
        userData.mobile = null;
      } else {
        userData.mobile = identifier;
        userData.email = null;
      }
      
      try {
        user = new UserLogin(userData);
        await user.save();
        console.log(`✅ Created new user with ${isEmail ? 'email' : 'mobile'}: ${identifier}`);
      } catch (error) {
        // If save fails due to duplicate, try to find the user again
        console.log(`Error creating user, trying to find existing: ${error.message}`);
        user = await UserLogin.findOne(
          isEmail ? { email: identifier } : { mobile: identifier }
        );
        if (!user) {
          return res.status(500).json({ message: "Error creating user account" });
        }
      }
    }
  } else {
    console.log(`✅ Found existing user: ${identifier}`);
  }

  // Only allow admin OTP for fixed admin email/phone, else downgrade to user
  if (
    user.role === "admin" &&
    normId !== normAdminEmail &&
    normId !== normAdminMobile
  ) {
    user.role = "user";
  }

  // Update loginMethod based on identifier type for existing users
  const isEmail = identifier.includes('@');
  if (isEmail && user.loginMethod !== 'email_otp') {
    user.loginMethod = 'email_otp';
  } else if (!isEmail && user.loginMethod !== 'mobile_otp') {
    user.loginMethod = 'mobile_otp';
  }

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60000);
  
  try {
    await user.save();
    console.log(`User saved/updated successfully. ID: ${user._id}, LoginMethod: ${user.loginMethod}`);
  } catch (saveError) {
    console.error("Error saving user:", saveError);
    
    // If it's a duplicate key error, try to find the existing user
    if (saveError.code === 11000) {
      console.log("Duplicate key error detected, trying to find existing user...");
      
      // Try to find user by email or mobile
      const existingUser = await UserLogin.findOne({
        $or: [
          { email: identifier },
          { mobile: identifier }
        ]
      });
      
      if (existingUser) {
        console.log("Found existing user, updating OTP...");
        user = existingUser;
        user.otp = otp;
        user.otpExpiresAt = new Date(Date.now() + 5 * 60000);
        await user.save();
      } else {
        console.error("Could not find existing user after duplicate key error");
        throw new Error("Database error: Could not create or find user. Please try again.");
      }
    } else {
      throw saveError;
    }
  }

  // Send OTP via SMS if mobile is present
  if (user.mobile) {
    try {
      await twilioClient.messages.create({
        body: `Your OTP is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.mobile.startsWith("+") ? user.mobile : `+91${user.mobile}`,
      });
      console.log(`SMS OTP sent to ${user.mobile}`);
    } catch (err) {
      console.error("Twilio SMS error:", err);
    }
  }

  // Send OTP via email if email is present
  if (user.email) {
    try {
      console.log(`Attempting to send email OTP to: ${user.email}`);
      console.log(`Using email config - USER: ${process.env.EMAIL_USER}, PASS: ${process.env.EMAIL_PASS ? "SET" : "NOT SET"}`);
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
            <h2 style="color: #333;">Your OTP Code</h2>
            <p>Hello,</p>
            <p>Your OTP code is: <strong style="font-size: 24px; color: #007bff;">${otp}</strong></p>
            <p>This code will expire in 5 minutes.</p>
            <p>If you didn't request this OTP, please ignore this email.</p>
            <p>Best regards,<br>Aravali Publication Team</p>
          </div>
        `
      };
      
      const result = await transporter.sendMail(mailOptions);
      console.log(`Email OTP sent successfully to ${user.email}. Message ID: ${result.messageId}`);
    } catch (err) {
      console.error("Nodemailer error details:", {
        message: err.message,
        code: err.code,
        command: err.command,
        responseCode: err.responseCode,
        response: err.response
      });
      console.error("Email config - USER:", process.env.EMAIL_USER, "PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");
      
      // Still return success to user but log the error
      console.error("Failed to send email OTP, but continuing...");
    }
  }

  const responseMessage = user.email 
    ? `OTP sent to ${user.email}` 
    : `OTP sent to ${user.mobile}`;
    
  return res.json({ 
    message: responseMessage,
    identifier: identifier,
    loginMethod: user.loginMethod
  });
};

// POST /api/auth/verify-otp
import { v4 as uuidv4 } from 'uuid';
import { LoginMethod } from '../models/LoginMethod.js';

export const verifyOtp = async (req, res) => {
  const { identifier, otp } = req.body;
  if (!identifier || !otp) return res.status(400).json({ message: "All fields required" });

  // Normalize for comparison
  const normId = identifier.includes('@') ? normalizeEmail(identifier) : normalizeMobile(identifier);
  const normAdminEmail = normalizeEmail(ADMIN_EMAIL);
  const normAdminMobile = normalizeMobile(ADMIN_MOBILE);

  // --- ADMIN OTP LOGIN WITH VALIDATION ---
  if (normId === normAdminEmail || normId === normAdminMobile) {
    // Validate OTP against stored adminOtp and expiry
    if (otp !== adminOtp || !adminOtpExpiresAt || adminOtpExpiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    // Clear admin OTP after successful login
    adminOtp = null;
    adminOtpExpiresAt = null;

    const payload = { userId: 'admin', role: 'admin' };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, role: 'admin' });
  }

  // --- NORMAL USER FLOW (DB) ---
  let user = await UserLogin.findOne({
    $or: [{ mobile: identifier }, { email: identifier }]
  });

  // If user still not found, this shouldn't happen if sendOtp was called first
  if (!user) {
    console.log(`❌ User not found during OTP verification: ${identifier}`);
    return res.status(400).json({ message: "User not found. Please request OTP again." });
  }

  console.log(`✅ User found for OTP verification: ${identifier}`);

  let roleToReturn = user?.role;
  if (
    user &&
    user.role === "admin" &&
    normId !== normAdminEmail &&
    normId !== normAdminMobile
  ) {
    roleToReturn = "user";
  }

  if (user.otp !== otp || user.otpExpiresAt < new Date()) {
    console.log(`❌ Invalid OTP for user: ${identifier}`);
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  console.log(`✅ OTP verified successfully for user: ${identifier}`);

  user.otp = null;
  user.otpExpiresAt = null;
  if (roleToReturn === "user" && user.role === "admin" && normId !== normAdminEmail && normId !== normAdminMobile) {
    user.role = "user";
  }
  await user.save();

  // Create login method record
  const sessionToken = uuidv4();

  // Map user.loginMethod to valid enum values
  let methodType = 'mobile_otp';
  if (user.loginMethod === 'email_otp' || user.loginMethod === 'email') {
    methodType = 'email_otp';
  } else if (user.loginMethod === 'mobile_otp' || user.loginMethod === 'phone') {
    methodType = 'mobile_otp';
  } else if (user.loginMethod === 'google') {
    methodType = 'google';
  } else if (user.loginMethod === 'facebook') {
    methodType = 'facebook';
  } else {
    methodType = 'mobile_otp'; // default fallback
  }

  const loginMethod = new LoginMethod({
    userId: user._id,
    methodType,
    loginAt: new Date(),
    sessionToken
  });
  await loginMethod.save();

  const payload = { userId: user._id, email: user.email, role: roleToReturn };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

  return res.json({ token, role: roleToReturn, sessionToken });
};

// POST /api/auth/social-login
export const socialLogin = async (req, res) => {
  const { provider, socialToken } = req.body;
  let email, name;

  try {
    if (provider === "google") {
      // Google token verification
      const ticket = await googleClient.verifyIdToken({
        idToken: socialToken,
        audience: process.env.VITE_GOOGLE_CLIENT_ID,  // Fixed usage to match client ID
      });
      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.name;
    } else if (provider === "facebook") {
      // Facebook token verification
      // Get user info from Facebook Graph API
      const fbRes = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email&access_token=${socialToken}`
      );
      email = fbRes.data.email;
      name = fbRes.data.name;
    } else {
      return res.status(400).json({ message: "Unsupported provider" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email not found from provider" });
    }

    // Find or create user
    let user = await UserLogin.findOne({ email });
    if (!user) {
      user = new UserLogin({ name, email, role: "user", password: "social", mobile: null });
      await user.save();
    }

    const jwtPayload = { userId: user._id, email: user.email, role: user.role };
    const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: "7d" });

    // Create login method record for social login
    let methodType = '';
    if (provider === 'google') {
      methodType = 'google';
    } else if (provider === 'facebook') {
      methodType = 'facebook';
    }

    const sessionToken = uuidv4();
    const loginMethod = new LoginMethod({
      userId: user._id,
      methodType,
      loginAt: new Date(),
      sessionToken
    });
    await loginMethod.save();

    return res.json({ token, role: user.role, sessionToken });
  } catch (err) {
    console.error("Social login error:", err);
    return res.status(401).json({ message: "Invalid social token" });
  }
};

// POST /api/auth/verify-token
export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ valid: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Handle admin token
    if (decoded.userId === 'admin') {
      return res.json({ valid: true, role: 'admin', userId: 'admin' });
    }

    // Handle regular user token
    const user = await UserLogin.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ valid: false, message: "User not found" });
    }

    return res.json({ 
      valid: true, 
      role: user.role, 
      userId: user._id,
      email: user.email 
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ valid: false, message: "Invalid token" });
  }
};

// Test email configuration endpoint
export const testEmailConfig = async (req, res) => {
  try {
    console.log("Testing email configuration...");
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");
    
    // Test transporter verification
    transporter.verify(function(error, success) {
      if (error) {
        console.error("Transporter verification failed:", error);
        return res.status(500).json({ 
          success: false, 
          message: "Email configuration error", 
          error: error.message 
        });
      } else {
        console.log("Transporter verification successful");
        return res.json({ 
          success: true, 
          message: "Email configuration is working",
          emailUser: process.env.EMAIL_USER
        });
      }
    });
  } catch (error) {
    console.error("Test email config error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Test failed", 
      error: error.message 
    });
  }
};

// Check if user is admin based on env credentials
export const checkAdminAccess = async (req, res) => {
  try {
    console.log("🔍 Admin access check started");
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      console.log("❌ No token provided");
      return res.status(401).json({ isAdmin: false, message: "No token provided" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded);

    // Check if this is a direct admin token
    if (decoded.userId === "admin" || decoded.role === "admin") {
      console.log("✅ Direct admin token detected");
      return res.json({ 
        isAdmin: true, 
        message: "Admin access granted",
        user: { id: "admin", email: process.env.ADMIN_EMAIL, mobile: process.env.ADMIN_MOBILE }
      });
    }

    // For regular user tokens, check against database
    const userId = decoded.userId;
    const user = await UserLogin.findById(userId);
    
    if (!user) {
      console.log("❌ User not found in database");
      return res.status(401).json({ isAdmin: false, message: "User not found" });
    }

    console.log("👤 User found:", { email: user.email, mobile: user.mobile });

    // Check if user email or mobile matches admin credentials from env
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminMobile = process.env.ADMIN_MOBILE;
    
    const isAdmin = (user.email === adminEmail) || (user.mobile === adminMobile);
    
    console.log("🎯 Admin check result:", { isAdmin });
    
    if (isAdmin) {
      console.log("✅ Admin access granted");
      return res.json({ 
        isAdmin: true, 
        message: "Admin access granted",
        user: { id: user._id, email: user.email, mobile: user.mobile }
      });
    } else {
      console.log("❌ Admin access denied");
      return res.status(403).json({ 
        isAdmin: false, 
        message: "Access denied. Admin privileges required." 
      });
    }

  } catch (error) {
    console.error("💥 Admin access check error:", error);
    return res.status(401).json({ isAdmin: false, message: "Invalid token" });
  }
};

// Get all users for admin management
export const getAllUsers = async (req, res) => {
  try {
    console.log("📋 getAllUsers API called");
    
    const users = await UserLogin.find({})
      .select('name email mobile loginMethod role createdAt')
      .sort({ createdAt: -1 });
    
    console.log(`📊 Found ${users.length} users in database`);
    console.log("👥 Users:", users.map(u => ({ name: u.name, email: u.email, mobile: u.mobile })));
    
    res.json({ 
      success: true, 
      users: users,
      total: users.length 
    });
  } catch (error) {
    console.error("💥 Error in getAllUsers:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching users",
      error: error.message 
    });
  }
};

// QR Code CSV Upload
export const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fs = await import('fs');
    let data = [];

    // Check file extension
    const fileName = req.file.originalname.toLowerCase();
    
    if (fileName.endsWith('.csv')) {
      // Handle CSV files
      const csvParser = await import('csv-parser');
      const results = [];
      
      await new Promise((resolve, reject) => {
        fs.createReadStream(req.file.path)
          .pipe(csvParser.default())
          .on('data', (row) => {
            results.push(row);
          })
          .on('end', resolve)
          .on('error', reject);
      });
      
      data = results;
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      // Handle Excel files
      const XLSX = await import('xlsx');
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      data = XLSX.utils.sheet_to_json(worksheet);
    } else {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "Unsupported file format. Please upload CSV or Excel files." });
    }

    let successfulInserts = 0;
    let duplicates = 0;
    let errors = [];

    for (const row of data) {
      const qrCode = row['Qr Details'];
      const serialNumber = row['SL No Below Qr Code'];

      if (!qrCode || !serialNumber) {
        errors.push(`Missing data in row: QR=${qrCode}, Serial=${serialNumber}`);
        continue;
      }

      try {
        const existingQR = await Qurexcel.findOne({
          $or: [{ qrCode }, { serialNumber }]
        });

        if (existingQR) {
          duplicates++;
        } else {
          await Qurexcel.create({
            qrCode,
            serialNumber,
            status: 'uploaded',
            scanCount: 0
          });
          successfulInserts++;
        }
      } catch (error) {
        errors.push(`Error processing QR ${qrCode}: ${error.message}`);
      }
    }

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "File upload completed with errors",
        successfulInserts,
        duplicates,
        errors
      });
    }

    if (successfulInserts === 0 && duplicates > 0) {
      return res.json({
        message: "All entries already exist in database",
        successfulInserts,
        duplicates
      });
    }

    if (duplicates > 0) {
      return res.json({
        message: "CSV uploaded with some duplicates",
        successfulInserts,
        duplicates
      });
    }

    res.json({
      message: "CSV uploaded successfully",
      successfulInserts,
      duplicates
    });

  } catch (error) {
    console.error("CSV upload error:", error);
    
    // Clean up file if it exists
    if (req.file && req.file.path) {
      try {
        const fs = await import('fs');
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      } catch (cleanupError) {
        console.error("File cleanup error:", cleanupError);
      }
    }
    
    res.status(500).json({ message: "Server error during upload" });
  }
};

// QR Code Validation
export const validateQR = async (req, res) => {
  try {
    const { qrCode } = req.params;

    // Search only by QR code, not serial number
    const qrRecord = await Qurexcel.findOne({ qrCode: qrCode });

    if (!qrRecord) {
      return res.json({
        success: false,
        message: "Invalid QR Code - not found in database",
        status: "invalid"
      });
    }

    if (qrRecord.scanCount === 0) {
      // First time scan
      qrRecord.status = 'verified';
      qrRecord.scanCount = 1;
      qrRecord.firstScanDate = new Date();
      qrRecord.lastScanDate = new Date();
      await qrRecord.save();

      return res.json({
        success: true,
        message: "Book is Authenticated - First scan",
        qrCode: qrRecord.qrCode,
        status: "authenticated",
        scanCount: 1
      });
    } else {
      // Already scanned
      qrRecord.scanCount += 1;
      qrRecord.lastScanDate = new Date();
      qrRecord.status = 'scanned';
      await qrRecord.save();

      return res.json({
        success: false,
        message: "Duplicate scan detected",
        qrCode: qrRecord.qrCode,
        status: "already_scanned",
        scanCount: qrRecord.scanCount,
        firstScanDate: qrRecord.firstScanDate
      });
    }

  } catch (error) {
    console.error("QR validation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during validation"
    });
  }
};

// Get QR Statistics
export const getQRStats = async (req, res) => {
  try {
    const { limit = 100, sortBy = 'scanCount' } = req.query;

    const totalUploaded = await Qurexcel.countDocuments();
    const totalUnscanned = await Qurexcel.countDocuments({ scanCount: 0 });
    const totalVerified = await Qurexcel.countDocuments({ scanCount: 1 });
    const totalScanned = await Qurexcel.countDocuments({ scanCount: { $gt: 1 } });

    // Get QR codes sorted by scan count (descending)
    const qrCodes = await Qurexcel.find()
      .sort({ [sortBy]: -1, createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      stats: {
        totalUploaded,
        totalUnscanned,
        totalVerified,
        totalScanned
      },
      qrCodes
    });

  } catch (error) {
    console.error("QR stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching QR statistics"
    });
  }
};

// Get User Orders for Admin Management
export const getUserOrdersForAdmin = async (req, res) => {
  try {
    const { email, userId } = req.query;
    
    if (!email && !userId) {
      return res.status(400).json({
        success: false,
        message: "Email or userId is required"
      });
    }

    // Build query to find orders by email or userId
    let query = {};
    if (email) {
      query.userEmail = email;
    }
    if (userId) {
      query.userId = userId;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate('books.bookId', 'title')
      .lean();

    res.json({
      success: true,
      orders: orders,
      total: orders.length
    });

  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user orders"
    });
  }
};

// Clear All QR Data
export const clearAllQR = async (req, res) => {
  try {
    const result = await Qurexcel.deleteMany({});
    
    res.json({
      success: true,
      message: "All QR code data cleared successfully",
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error("Clear all QR error:", error);
    res.status(500).json({
      success: false,
      message: "Error clearing QR data"
    });
  }
};