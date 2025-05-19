const fs = require('fs');
const cloudinary = require('cloudinary').v2;
let uploadImage=async (req,folderName)=>
{
    console.log(req.file)
    if (!req.files && !req.file) {
        return res.status(400).json({ error: 'No files uploaded' });
      }
  
 
      //! both single and multiple files(logic applies when we are using upload.single() or upload.array(). for upload.fields() we have to alter the logic because it returs an object where every key is an array.refer uploadMultipleImageHelper.js)
    //   const files = req.files || [req.file];
    //   const uploadResults = [];
    //   // Process each file
    //   for (const file of files) {
    //     const result = {
    //       originalname: file.originalname,
    //       mimetype: file.mimetype,
    //       size: file.size,
    //       url: file.path, // Cloudinary URL
    //       public_id: file.filename // Cloudinary public ID
    //     };
    //     uploadResults.push(result);
    //   }
    //   return { 
    //     count: uploadResults.length,
    //     data: uploadResults
    // }
     //! both single and multiple files

     //! only single file
     const file = req.file;
      //  const result = {
      //    originalname: file.originalname,
      //    mimetype: file.mimetype,
      //    size: file.size,
      //    url: file.path, // Cloudinary URL
      //    public_id: file.filename // Cloudinary public ID
      //  };
      result = await cloudinary.uploader.upload(file.path, {
        folder: folderName,
      });
      deleteImageFromLocal(req)
     return { 
       data: result
   }
     //! only single file
}   

//!Delete local temp file
let deleteImageFromLocal=(req)=>
    {
        
              console.log("image delete")
                fs.unlinkSync(req.file.path);
                console.log("image delete End")
            
    }

module.exports={uploadImage,deleteImageFromLocal}