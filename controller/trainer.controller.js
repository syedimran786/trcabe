const {uploadImage,deleteImageFromLocal} = require('../helper/uploadHelper');
const Trainer = require('../model/trainer.model');

let createTrainer=async(req,res,next)=>
{
    try
    {
        let {
            name,
            email,
            mobile,
            designation,
        } = req.body;

   //! perform joi validations before this to avoid the error
   if(!email || !mobile || !name || !designation)
    {
       
        deleteImageFromLocal(req);
        return res.status(400).json({
        error: true,
        message: "All Fields are Mandatory",
       });
    }
   
    //! if file is uploaded only then the multer loads the file to the local folder
    if(!req.file)
     {
 
      return res.status(400).json({
          error: true,
          message: "Image Is Mandatory",
        });
     }
         let isTrainerAvailable=await Trainer.findOne({$or:[{email},{mobile}]})
         if(isTrainerAvailable)
         {
            deleteImageFromLocal(req);
 
             return res.status(503).json({
                 error: true,
                 message: "Trainer Already Added",
               });
         }
         console.log("controller")
        let {data}=await uploadImage(req,"trainers");
      
        const trainer = await Trainer.create({
            photo:data.url,//! cloudinari url after adding
            name,
            email,
            mobile,
            designation,
            })
        console.log("controller 2")
        
              if (trainer) {
               
               return res.status(201).json({
                  error: false,
                  message: "Trainer Added Successfully",
                  data: trainer,
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

let getAllTrainers=async(req,res,next)=>
{
    try
    {
        let trainer=await Trainer.find({});

        if(trainer)
        {
            return res.status(200).json({ error: true, message: "Trainers Fetched Successfully",data:trainer})
        }
        return res.status(404).json({ error: true, message: "Trainers not found" })
    }
    catch(err)
    {
        next(err)
    }
}

module.exports={
    createTrainer,
    getAllTrainers
}