import mongoose from "mongoose";
import { Book } from "./models/BookSchema.js";
import { Review } from "./models/Review Rating model.js";
import { Order } from "./models/Order Model.js";
import dotenv from "dotenv";

dotenv.config();

const demoReviews = [
    { name: "Rajesh Kumar", rating: 5, review: "Excellent book! Very informative and well-written. Highly recommended for students." },
    { name: "Priya Sharma", rating: 4, review: "Good content and easy to understand. The examples are very helpful." },
    { name: "Amit Singh", rating: 5, review: "Outstanding quality! This book helped me a lot in my studies. Worth every penny." },
    { name: "Sneha Patel", rating: 4, review: "Very good book with clear explanations. The delivery was also fast." },
    { name: "Vikram Gupta", rating: 3, review: "Decent book but could have more detailed examples. Overall satisfied with the purchase." },
    { name: "Anita Verma", rating: 5, review: "Amazing book! The content is up-to-date and very relevant. Highly recommend to everyone." },
    { name: "Rohit Jain", rating: 4, review: "Great book for beginners. Easy language and good presentation. Thank you Aravali Publication!" },
    { name: "Kavita Agarwal", rating: 5, review: "Superb quality and content. This is exactly what I was looking for. Excellent service!" },
    { name: "Deepak Sharma", rating: 4, review: "Well structured content with practical examples. Good value for money." },
    { name: "Meera Singh", rating: 5, review: "Perfect book for exam preparation. Clear concepts and good practice questions." },
    { name: "Arjun Patel", rating: 3, review: "Good book overall but some topics need more explanation. Still useful for studies." },
    { name: "Ritu Gupta", rating: 4, review: "Nice book with updated syllabus. Helped me understand difficult concepts easily." },
    { name: "Sanjay Kumar", rating: 5, review: "Excellent publication quality. The book arrived in perfect condition. Highly satisfied!" },
    { name: "Pooja Verma", rating: 4, review: "Good reference book for competitive exams. Contains all important topics." },
    { name: "Manish Jain", rating: 5, review: "Outstanding book! Clear explanations and good examples. Must buy for students." },
    { name: "Sunita Agarwal", rating: 3, review: "Average book with basic content. Could be better but serves the purpose." },
    { name: "Rahul Singh", rating: 4, review: "Good book for self-study. Well organized chapters and easy to follow." },
    { name: "Neha Sharma", rating: 5, review: "Fantastic book! Helped me score good marks in exams. Thank you Aravali!" },
    { name: "Kiran Patel", rating: 4, review: "Quality content and fast delivery. Good customer service from Aravali Publication." },
    { name: "Ashok Kumar", rating: 5, review: "Best book in the market for this subject. Comprehensive coverage of all topics." }
];

async function addDemoReviews() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        // Clear existing reviews first
        await Review.deleteMany({});
        console.log("Cleared existing reviews");

        // Get all books and orders
        const books = await Book.find();
        const orders = await Order.find();
        
        console.log(`Found ${books.length} books and ${orders.length} orders`);

        if (orders.length === 0) {
            console.log("No orders found. Cannot create reviews without orders.");
            return;
        }

        let totalReviewsAdded = 0;

        for (const book of books) {
            console.log(`Adding 10 reviews for book: ${book.title}`);
            
            // Add exactly 10 reviews per book
            for (let i = 0; i < 10; i++) {
                const randomReview = demoReviews[i % demoReviews.length]; // Cycle through reviews
                const randomOrder = orders[Math.floor(Math.random() * orders.length)];
                
                const review = new Review({
                    bookId: book._id,
                    orderId: randomOrder._id,
                    name: randomReview.name,
                    rating: randomReview.rating,
                    review: randomReview.review
                });

                await review.save();
                totalReviewsAdded++;
            }
        }

        console.log(`\nTotal demo reviews added: ${totalReviewsAdded}`);
        console.log(`Average reviews per book: ${totalReviewsAdded / books.length}`);
        console.log("Demo reviews added successfully!");

    } catch (error) {
        console.error("Error adding demo reviews:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

addDemoReviews();
