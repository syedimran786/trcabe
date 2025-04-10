const multer = require('multer');
const { storage } = require('../helper/cloudinaryHelper');

const upload = multer({
    storage,
    limits: {
      fileSize: 15 * 1024 * 1024, // 5MB limit
      files: 5 // Maximum number of files
    },
    fileFilter: (req, file, cb) => {
      // Validate file types
    //   const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type');
        error.code = 'INVALID_FILE_TYPE';
        return cb(error, false);
      }
      cb(null, true);
    }
  });
  
  // Handle upload errors
  const handleUploadErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: 'File size too large' });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ error: 'Too many files' });
      }
    } else if (err.code === 'INVALID_FILE_TYPE') {
      return res.status(400).json({ error: 'Invalid file type' });
    }
    next(err);
  };
  
  module.exports = { upload, handleUploadErrors };