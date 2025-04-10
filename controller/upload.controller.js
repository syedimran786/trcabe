const { cloudinary } = require('../helper/cloudinaryHelper');

uploadFile = async (req, res, next) => {
  try {
    if (!req.files && !req.file) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const files = req.files || [req.file];
    const uploadResults = [];

    // Process each file
    for (const file of files) {
      const result = {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: file.path, // Cloudinary URL
        public_id: file.filename // Cloudinary public ID
      };
      uploadResults.push(result);
    }

    // In production, you might want to store these references in your database
    res.status(201).json({
      success: true,
      count: uploadResults.length,
      data: uploadResults
    });
  } catch (error) {
    next(error);
  }
};

deleteFile = async (req, res, next) => {
  try {
    const { public_id } = req.params;
    const result = await cloudinary.uploader.destroy(public_id);
    
    if (result.result !== 'ok') {
      return res.status(404).json({ error: 'File not found' });
    }
    
    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports={
    uploadFile,
    deleteFile,
    }