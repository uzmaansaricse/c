import cloudinary from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImages = async (imageFile) => {
    try {
      const result = await cloudinary.v2.uploader.upload(imageFile, {
        folder: 'books'
      });
      return result.secure_url;
    } catch (error) {
      throw new Error('Error uploading image to Cloudinary');
    }
  };
  
  