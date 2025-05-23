const {uploadImage,deleteImageFromLocal} = require('../helper/uploadHelper');
const Review = require('../model/review.model');

let createReviews=async(req,res,next)=>
{
    try
    {
        let {
            name,
            email,
            mobile,
            stream,
            rating,
            feedback
        } = req.body;

   //! perform joi validations before this to avoid the error
   if(!email || !mobile || !name || !stream || !rating || !feedback)
    {
        console.log("empty")
        deleteImageFromLocal(req);
     return res.status(400).json({
         error: true,
         message: "All Fields are Mandatory",
       });
    }
   
    //! if file is uploaded only then the multer loads the file to the local folder
    if(!req.file)
     {
        console.log("images")
 
      return res.status(400).json({
          error: true,
          message: "Image Is Mandatory",
        });
     }
         let isReviewAvailable=await Review.findOne({$or:[{email},{mobile}]})
         if(isReviewAvailable)
         {
            console.log("Exist")
            deleteImageFromLocal(req);
 
             return res.status(503).json({
                 error: true,
                 message: "Review Already Added",
               });
         }
        let {data}=await uploadImage(req,"reviews");
      
        const review = await Review.create({
            photo:data.url,//! cloudinari url after adding
            name,
            email,
            mobile,
            stream,
            rating,
            feedback
            })
        
        
              if (review) {
               
               return res.status(201).json({
                  error: false,
                  message: "Review Added Successfully",
                  data: review,
                });
            }
                res.status(502).json({ error: true, message: "Operation failed" });

    }
    catch(err)
    {
        deleteImageFromLocal(req,res);
        next(err)
    }
}

let getAllReviews=async(req,res,next)=>
{
    try
    {
        let reviews=await Review.find({});

        if(reviews)
        {
            return res.status(200).json({ error: true, message: "Reviews Fetched Successfully",data:reviews})
        }
        return res.status(404).json({ error: true, message: "Reviews not found" })
    }
    catch(err)
    {
        next(err)
    }
}

module.exports={
    createReviews,
    getAllReviews
}