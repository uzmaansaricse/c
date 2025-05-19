// import mongoose from "mongoose";

// const contentSchema = new mongoose.Schema({
//   type: { type: String, required: true }, // image, video, text, link, etc.
//   filePath: String, // Cloudinary URL ke liye
//   content: String, // Text ya link ke liye
//   createdAt: { type: Date, default: Date.now, expires: '20d' } // 20 din ke baad delete ho jayega
// });

// const Content = mongoose.model("Content", contentSchema);

// export { Content };


import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  type: { type: String, required: true }, // image, video, text, link, etc.
  filePath: String, // Cloudinary URL ke liye
  content: String, // Text ya link ke liye
  createdAt: { type: Date, default: Date.now } // Auto-delete hata diya
});

const Content = mongoose.model("Content", contentSchema);

export { Content };
