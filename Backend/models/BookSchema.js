
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["New", "Old", "All"], default: "New" },
    bookImages: [{ type: String, required: true }], // array of 5 images
    mainImageIndex: { type: Number, default: 0 }, // index of main image (0-4)
    bulletPoints: [{ type: String }], // bullet points array
    isbn: { type: String, required: true },
    shippingDetails: { type: String, enum: ["4-5 Days", "5-7 Days", "7-10 Days"], required: true },
    pageNumber: { type: Number, required: true },
    language: { type: String, required: true },
    weight: { type: String, required: true }
}, { timestamps: true });


const Book = mongoose.model("Book", bookSchema);
export { Book };



