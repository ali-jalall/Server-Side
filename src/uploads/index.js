const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const stream = require("stream");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    let upload_stream = cloudinary.uploader.upload_stream((err, image) => {
      err ? reject(err) : resolve(image);
    });
    let bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(upload_stream);
  });
};

module.exports.uploadToCloudinary = uploadToCloudinary