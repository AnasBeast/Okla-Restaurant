const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validate Cloudinary configuration
const validateCloudinaryConfig = () => {
  const { cloud_name, api_key, api_secret } = cloudinary.config();
  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      "Cloudinary configuration is incomplete. Please check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in environment variables.",
    );
  }
};

// Validate on startup
validateCloudinaryConfig();

/**
 * Upload an image to Cloudinary
 * @param {Object} file - The file object from multer (with buffer)
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
exports.uploadImage = async (file) => {
  try {
    if (!file || !file.buffer) {
      throw new Error("No file provided for upload.");
    }

    // Create a unique filename
    const filename = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    // Upload to Cloudinary using buffer
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "okla-restaurant", // Organize uploads in a folder
          public_id: filename.split(".")[0], // Remove extension for public_id
          resource_type: "image",
          transformation: [
            { quality: "auto:good" }, // Automatic quality optimization
            { fetch_format: "auto" }, // Automatic format selection (webp, etc.)
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      uploadStream.end(file.buffer);
    });

    console.log("✅ Image uploaded to Cloudinary:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("❌ Error uploading to Cloudinary:", error);
    throw error;
  }
};

/**
 * Delete an image from Cloudinary
 * @param {string} imageUrl - The URL of the image to delete
 * @returns {Promise<boolean>} - True if deleted successfully
 */
exports.deleteImage = async (imageUrl) => {
  try {
    if (!imageUrl) {
      return false;
    }

    // Extract public_id from Cloudinary URL
    // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{public_id}.{format}
    const urlParts = imageUrl.split("/");
    const filenameWithExt = urlParts[urlParts.length - 1];
    const folder = urlParts[urlParts.length - 2];
    const publicId = `${folder}/${filenameWithExt.split(".")[0]}`;

    const result = await cloudinary.uploader.destroy(publicId);
    console.log("🗑️ Image deleted from Cloudinary:", publicId, result);
    return result.result === "ok";
  } catch (error) {
    console.error("❌ Error deleting from Cloudinary:", error);
    return false;
  }
};

/**
 * Get Cloudinary instance for advanced operations
 */
exports.cloudinary = cloudinary;
