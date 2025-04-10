let uploadImage=(req)=>
{
    console.log(req.file)
    if (!req.files && !req.file) {
        return res.status(400).json({ error: 'No files uploaded' });
      }
  
      //! both single and multiple files
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
    
       const result = {
         originalname: file.originalname,
         mimetype: file.mimetype,
         size: file.size,
         url: file.path, // Cloudinary URL
         public_id: file.filename // Cloudinary public ID
       };
  
     return { 
       data: result
   }
     //! only single file
}   

module.exports=uploadImage