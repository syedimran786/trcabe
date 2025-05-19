const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

let cloudinaryConfig=(folderName)=>
{
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/'); // Local folder
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  // const storage = new CloudinaryStorage({
  //   cloudinary: cloudinary,
  //   params: {
  //     folder: folderName, // Organize files in Cloudinary
  //     allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'mp4'],
  //     resource_type: 'auto', // Automatically detect file type
  //     transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional transformations
  //   }
  // });

  return  { cloudinary, storage };
}

  module.exports =cloudinaryConfig