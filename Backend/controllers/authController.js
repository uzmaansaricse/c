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


// silder image and video







//  auth.................

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_MOBILE = "8107142344";
const ADMIN_PASSWORD = "123";
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOtp = async (req, res) => {
    try {
        const { mobile } = req.body;
        if (!mobile) return res.status(400).json({ message: "Mobile number is required." });

        const formattedMobile = mobile.startsWith("+") ? mobile : `+91${mobile}`;
        const otp = generateOTP();
        const otpExpiresAt = new Date(Date.now() + 5 * 60000);

        let user = await UserLogin.findOne({ mobile });
        if (user) {
            user.otp = otp;
            user.otpExpiresAt = otpExpiresAt;
        } else {
            user = new UserLogin({ name: "Unknown", mobile, password: "defaultpassword", otp, otpExpiresAt });
        }
        await user.save();

        await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: formattedMobile
        });

        res.status(200).json({ message: "OTP sent successfully." });
    } catch (error) {
        console.error("Twilio Error:", error);
        res.status(500).json({ message: "Failed to send OTP. Try again later." });
    }
};


const signup = async (req, res) => {
    try {
        const { name, mobile, email, password, otp } = req.body; // changes isha
        const user = await UserLogin.findOne({ mobile });
        if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
            return res.status(400).json({ message: "Invalid OTP." });
        }
        user.name = name;
        user.password = await bcrypt.hash(password, 10);
        user.otp = null;
        user.otpExpiresAt = null;
        if (email) user.email = email;
        await user.save();
        res.status(201).json({ message: "Signup successful." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get user profile (only name and mobile)
export const getUserProfile = async (req, res) => {
  try {
    // use the same key you signed with
    const userId = req.user.userId;   

    const user = await UserLogin.findById(userId).select('name mobile');
    if (!user) return res.status(404).json({ message: 'User not found login again!!' });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const deleteAccount = async (req, res) => {
  try {
    // pull the userId out of req.user (set by authMiddleware)
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

const login = async (req, res) => {
    try {
        const { mobile, password } = req.body;

        if (mobile === ADMIN_MOBILE) {
            if (password !== ADMIN_PASSWORD) {
                return res.status(401).json({ message: "Invalid admin credentials." });
            }
            let admin = await UserLogin.findOne({ mobile: ADMIN_MOBILE });
            if (!admin) {
                admin = new UserLogin({
                    name: "Admin",
                    mobile: ADMIN_MOBILE,
                    password: await bcrypt.hash(ADMIN_PASSWORD, 10),
                    role: "admin"
                });
                await admin.save();
            }
            const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
            return res.status(200).json({ message: "Admin login successful.", token, role: "admin" });
        }

        const user = await UserLogin.findOne({ mobile });
        if (!user) return res.status(400).json({ message: "User not found." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ message: "Login successful.", token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// const login = async (req, res) => {
//     try {
//         const { mobile, password } = req.body;

//         if (mobile === ADMIN_MOBILE) {
//             if (password !== ADMIN_PASSWORD) {
//                 return res.status(401).json({ message: "Invalid admin credentials." });
//             }
//             let admin = await UserLogin.findOne({ mobile: ADMIN_MOBILE });
//             if (!admin) {
//                 admin = new UserLogin({
//                     name: "Admin",
//                     mobile: ADMIN_MOBILE,
//                     password: await bcrypt.hash(ADMIN_PASSWORD, 10),
//                     role: "admin"
//                 });
//                 await admin.save();
//             }
//             const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
//             return res.status(200).json({ message: "Admin login successful.", token, role: "admin" });
//         }

//         const user = await UserLogin.findOne({ mobile });
//         if (!user) return res.status(400).json({ message: "User not found." });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

//         const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

//         res.status(200).json({ message: "Login successful.", token, role: user.role });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const logout = async (req, res) => {
    try {
        // Token frontend se remove karwana hoga
        res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        res.status(500).json({ message: "Logout failed.", error: error.message });
    }
};

export {  logout };



const forgotPassword = async (req, res) => {
    try {
        let { mobile } = req.body;
        const user = await UserLogin.findOne({ mobile });
        if (!user) return res.status(400).json({ message: "User not found." });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiresAt = new Date(Date.now() + 5 * 60000);
        await user.save();

        await client.messages.create({
            body: `Your password reset OTP is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobile.startsWith("+") ? mobile : `+91${mobile}`
        });

        res.status(200).json({ message: "OTP sent for password reset." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { mobile, otp, newPassword } = req.body;

        if (mobile === ADMIN_MOBILE) {
            return res.status(403).json({ message: "Admin password cannot be reset." });
        }

        const user = await UserLogin.findOne({ mobile });

        if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        res.json({ message: "Password reset successful. You can now log in." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { sendOtp, signup, login, forgotPassword, resetPassword };


// very /verify-user
const verifyUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ success: false, message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserLogin.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, user });
    } catch (err) {
        return res.status(400).json({ success: false, message: "Invalid token" });
    }
};

export { verifyUser }

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
        // No longer require exactly 5 images
        const bookImages = req.files.map(file => file.path);

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

        // ✅ Save book
        const newBook = new Book({
            title,
            author,
            price,
            offerPrice,
            description,
            category,
            bookImages,
            mainImageIndex: Number(mainImageIndex) || 0,
            bulletPoints: bulletArray,
            isbn,
            pageNumber,
            language,
            weight
        });

        await newBook.save();
        res.status(201).json({ message: "Book added successfully", book: newBook });

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
        if (req.files && req.files.length > 0) {
            console.log("🟩 Uploaded Files:", req.files);
            updateData.bookImages = req.files.map(file => file.path); // path agar local storage ho
            // OR file.location if using S3 or Cloudinary
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







// 📌 Excel File Upload API (QR Code Number and Serial Number upload)

// CSV Upload Controller
const uploadCSV = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "CSV file required" });
    }

    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csvParser()) // Now it will work
        .on("data", (data) => {
            if (data.qrCode && data.serialNumber) {
                results.push({
                    qrCode: data.qrCode,
                    serialNumber: data.serialNumber
                });
            }
        })
        .on("end", async () => {
            try {
                if (results.length === 0) {
                    return res.status(400).json({ message: "No valid data found in CSV" });
                }

                await Qurexcel.insertMany(results);
                fs.unlinkSync(req.file.path); // Delete uploaded CSV
                res.json({ message: "CSV uploaded successfully", data: results });
            } catch (err) {
                res.status(500).json({ message: "Error saving data", error: err });
            }
        });
};

// QR Code Validation Controller
const validateQR = async (req, res) => {
    try {
        const { qrCode } = req.params;
        console.log("Scanned QR Code:", qrCode);

        const book = await Qurexcel.findOne({ qrCode: { $regex: new RegExp(`^${qrCode}$`, 'i') } });
        console.log("Database Book:", book);

        if (book) {
            return res.json({ message: "Valid Book", serialNumber: book.serialNumber });
        } else {
            return res.json({ message: "Fake Book" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};




export { uploadCSV, validateQR };
// 🔹 Razorpay Instance


import mongoose from "mongoose";


//  Razorpay Configuration
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// **🔹 Order Create API**
const createorder = async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging ke liye

        let { cart } = req.body;
        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ error: "Cart is empty or invalid format" });
        }

        // ✅ Total Amount Calculate karo
        const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // ✅ Razorpay Order Options
        const options = {
            amount: totalAmount * 100, // Convert to paise
            currency: "INR",
        };

        // ✅ Razorpay Order Create
        const order = await razorpay.orders.create(options);
        res.json({ orderId: order.id, amount: options.amount });

    } catch (error) {
        console.error("Payment Error:", error); // Debugging ke liye
        res.status(500).json({ error: "Payment error", details: error.message });
    }
};


const saveorder = async (req, res) => {
    try {
        // Safely extract userId and user from req.user (if available)
        const userId = req.user?.userId;
        const user = req.user;
        const { paymentId, deliveryDetails, cart, totalAmount } = req.body;

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ success: false, message: "Cart data is invalid" });
        }

        const newOrder = new Order({
            userId: userId || undefined, // If you have userId from auth, otherwise undefined
            userEmail: (user && user.email) || (deliveryDetails && deliveryDetails.email) || undefined, // Prefer user email, fallback to delivery email
            books: cart.map(book => ({
                bookId: new mongoose.Types.ObjectId(book.id),
                title: book.title,
                price: book.price,
                quantity: book.quantity,
                
            })),
            totalPrice: totalAmount,
            deliveryDetails,
            paymentId,
            status: "Paid"
        });

        const savedOrder = await newOrder.save();

        // 🟢 Step 1: Book IDs Array nikaalo
        const bookIds = savedOrder.books.map(book => book.bookId);

        // 🟢 Step 2: Frontend ko response bhej do with orderId & bookIds[]
        res.json({
            success: true,
            message: "Order saved successfully",
            orderId: savedOrder._id,
            bookIds: bookIds
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
  const { trackingId, email } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { trackingId },
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
        await sendTrackingEmail(email, name, trackingId, trackingId); // message is trackingId for now
      } catch (err) {
        console.error("Email send error:", err);
      }
    }

    res.json({ success: true, message: "Tracking ID updated successfully and email sent", order });
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
        const { mobile } = req.params;

        const orders = await Order.find({
            "deliveryDetails.mobile": mobile
        })
            .select("status createdAt updatedAt books totalPrice")
            .sort({ createdAt: -1 }); // 👈 Yeh line add karo

        res.json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ error: "Server error" });
    }
};


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



export { getOrderAnalytics, updateOrderStatus, trackOrder, getUserOrders, getPendingOrders, getAllOrders, deleteOrderPending, pendingUpdateAutoDelete };

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
        const pendingOrders = await Order.find({ status: "Pending" }).select("_id status pendingSince deliveryDetails");
        res.json(pendingOrders);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export { getAllPendingOrders };












