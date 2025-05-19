const cloudinary = require('cloudinary').v2;
const fs = require('fs');


let uploadMultipleImage=async (req)=>
    {
        // console.log("req.files",req.files)// will be empty object if no files are coming
       let reqFiles=Object.values(req.files).flat()// will be empty array if no files are coming
        if (!req.files && !req.file) {
            return res.status(400).json({ error: 'No Images uploaded' });
          }
      
          //! both single and multiple files
          const files =reqFiles.length!==0?reqFiles:[req.file];
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

        //   console.log(uploadResults)
        //   return { 
        //     count: uploadResults.length,
        //     data: uploadResults
        // }
         //! both single and multiple files
         let uploadResults=[]
         let result;

         for (const file of files) 
            {
                result = await cloudinary.uploader.upload(file.path, {
                folder: 'placements',
              });
              uploadResults.push(result);
            // fs.unlink(file.path,(err=>
            // {
            //     console.log("Files Deleted Successfully From Local System")
            // }
            // ));
            }
            deleteFileFromLocal(req)
            
              return { 
                    count: uploadResults.length,
                    data: uploadResults
                }

        // const uploadPromises = files.map((file) =>
        //     cloudinary.uploader.upload(file.path, {
        //       folder: 'placements',
        //     }).catch((err) => {
        //       console.error(`Error uploading ${file.path}:`, err);
        //       return null; // So Promise.all doesn't fail entirely
        //     })
        //   );
        
        //   const results = await Promise.all(uploadPromises);
        //   const successfulUploads = results.filter((res) => res !== null);
        // console.log(successfulUploads)
        //   return {
        //     count: successfulUploads.length,
        //     data: successfulUploads,
        //   };
    }   

//!Delete local temp file
let deleteFileFromLocal=(req)=>
    {
        let reqFiles=Object.values(req.files).flat()// will be empty array if no files are coming
       
          const files =reqFiles.length!==0?reqFiles:[req.file];
        console.log("deleteFileFromLocal")
            for (const file of files) 
            {
                console.log(file.path)
                fs.unlinkSync(file.path);
            }
            
    }
    
    module.exports={uploadMultipleImage,deleteFileFromLocal}