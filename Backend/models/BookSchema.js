import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["New", "Old", "All"], default: "New" },
    bookImages: [{ type: String }], // allow 1 or more images, not strictly required
    mainImageIndex: { type: Number, default: 0 }, // index of main image (0-4)
    bulletPoints: [{ type: String }], // bullet points array
    isbn: { type: String, required: true },
    pageNumber: { type: Number, required: true },
    language: { type: String, required: true },
    weight: { type: String, required: true },
    yearOfPublish: { type: Number }, // Year of publication
    edition: { type: String } // Edition of the book
}, { timestamps: true });


const Book = mongoose.model("Book", bookSchema);
export { Book };



