
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "books",
      resource_type: "image", // ✅ Auto detect JPG/PNG/JPEG etc.
      allowed_formats: ["jpg", "jpeg", "png"], // Optional validation
    };
  },
});

const uploadBook = multer({ storage: storage });

const bookUploadToCloudinary = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "books",
    resource_type: "image",
  });
};

export { cloudinary, uploadBook, bookUploadToCloudinary };