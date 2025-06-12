// import cloudinary from "cloudinary";
// import fs from "fs";

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadFile = async (filePath, resourceType = "image") => {
//   try {
//     const result = await cloudinary.v2.uploader.upload(filePath, { resource_type: resourceType });
//     fs.unlinkSync(filePath); // ✅ Local file delete kar do
//     return result;
//   } catch (error) {
//     console.error("❌ Cloudinary Upload Error:", error);
//     throw error;
//   }
// };

// export { uploadFile };

import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ **Upload File to Cloudinary**
const uploadFile = async (filePath, resourceType = "image") => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, { resource_type: resourceType });
    fs.unlinkSync(filePath); // ✅ Local file delete kar do
    return result;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);
    throw error;
  }
};

// ✅ **Delete File from Cloudinary**
const deleteFile = async (fileUrl) => {
  try {
    if (!fileUrl) return;
    const publicId = fileUrl.split('/').pop().split('.')[0]; // ✅ Public ID extract
    await cloudinary.v2.uploader.destroy(publicId);
    console.log(`✅ Deleted from Cloudinary: ${fileUrl}`);
  } catch (error) {
    console.error("❌ Cloudinary Delete Error:", error);
  }
};

export { uploadFile, deleteFile };
