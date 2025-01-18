import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Configure Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_KEY_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("No file path provided for Cloudinary upload.");
    }

    // Upload the file to Cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect file type
    });

    console.log(`File uploaded successfully. URL: ${response.url}`);

    // Delete the local file

    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
        console.log("Local file deleted successfully.");
      }
    } catch (err) {
      console.error(`Error deleting local file: ${err.message}`);
    }

    return response;
  } catch (error) {
    console.error(`Error uploading file: ${error.message}`);

    // Cleanup local file in case of error

    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (err) {
      console.error(`Error deleting local file: ${err.message}`);
    }
    return null;
  }
};

const deletedFromCloudinary = async function (publicId) {
  try {
    if (!publicId) {
      throw new Error("Public ID is not found in cloudinary");
    }
    const result = cloudinary.uploader.destroy(publicId);
    return result;
    
  } catch (error) {
    console.log(`Error Deleting From Cloudinary ${error}`);
    return null;
  }
};

export { uploadCloudinary, deletedFromCloudinary };
