const dotenv = require("dotenv");
// import { config, uploader } from 'cloudinary';

const { config, uploader } = require("cloudinary");

dotenv.config({
  path: "./config.env",
});

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};



module.exports.cloudinaryConfig = cloudinaryConfig;
module.exports.uploader = uploader;
