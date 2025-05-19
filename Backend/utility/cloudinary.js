
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
    params: {
        folder: "banners",
        format: async (req, file) => "png",
    },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, { folder: "banners" });
};

const deleteFromCloudinary = async (imageUrl) => {
    const publicId = imageUrl.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`banners/${publicId}`);
};

export { upload, uploadToCloudinary, deleteFromCloudinary };







