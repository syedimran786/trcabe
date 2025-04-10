const Joi = require('joi');
const Batch = require("../model/batch.model");





const addBatch = async (req, res, next) => {
  try {
    const {
      course,
      trainer,
      contact,
      date,
      time,
      duration,
      mode
    } = req.body;

  
   

    //! try to check based on date and time
    //   const batchCheck = await Batch.findOne({$or:[{email,mobile}]});
    
    //   if (batchCheck) {
    //    let batch=await Batch.findOneAndUpdate({$or:[{email,mobile}]},{$set:{re_batch:"Yes",message}},{new:true});
    //    await batchMail({ 
    //     fullname,
    //     email,
    //     mobile,
    //     experience,
    //     message,
    //     encType:"Yes"});
    //    return res.status(200).json({
    //     error: false,
    //     message: "Batch Updated successfully",
    //     data: batch,
    //   });
    //   }
      
    //! try to check based on date and time
       
 
      const batch = await Batch.create({
        course,
        trainer,
        contact,
        date,
        time,
        duration,
        mode
    })


      if (batch) {
       
       return res.status(201).json({
          error: false,
          message: "Batch Added Successfully",
          data: batch,
        });
    }
        res.status(502).json({ error: true, message: "Operation failed" });

    }
    //! Joi validation ends

   catch (err) {
    next(err);
  }
};


let getAllBatches=async(req,res,next)=>
{
    try
    {
        let batches=await Batch.find({});

        if(batches)
        {
            return res.status(200).json({ error: true, message: "batches Fetched Successfully",data:batches})
        }
        return res.status(404).json({ error: true, message: "Batches not found" })
    }
    catch(err)
    {
        next(err)
    }
}


module.exports={
    addBatch,
    getAllBatches
}