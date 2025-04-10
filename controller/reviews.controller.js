const uploadImage = require('../helper/uploadHelper');
const Review = require('../model/review.model');

let createReviews=async(req,res,next)=>
{
    try
    {
        let {
            name,
            stream,
            rating,
            feedback
        } = req.body;

   //! perform joi validations before this to avoid the error
        let {data}=uploadImage(req);
      
        const review = await Review.create({
            photo:data.url,//! cloudinari url after adding
            name,
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
            return res.status(200).json({ error: true, message: "REeviews Fetched Successfully",data:reviews})
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