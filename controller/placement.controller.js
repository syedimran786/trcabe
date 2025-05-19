const {uploadMultipleImage,deleteFileFromLocal} = require('../helper/uploadMultipleImageHelper');
const Placement = require('../model/placement.model');
const fs = require('fs');


let createPlacements=async(req,res,next)=>
{
    try
    {
        let {
            name,
            email,
            mobile,
            designation,
        } = req.body;
     

   //! perform joi validations before this to avoid the error;

   if(!email || !mobile || !name || !designation )
   {
    deleteFileFromLocal(req);
    return res.status(400).json({
        error: true,
        message: "All Fields are Mandatory",
      });
   }
  
   if(Object.keys(req.files).length<2)
    {
        deleteFileFromLocal(req);

     return res.status(400).json({
         error: true,
         message: "All Images are Mandatory",
       });
    }
        let isPlacementAvailable=await Placement.findOne({$or:[{email},{mobile}]})
        if(isPlacementAvailable)
        {
            deleteFileFromLocal(req);

            return res.status(503).json({
                error: true,
                message: "Placement Already Added",
              });
        }
        let {data}=await uploadMultipleImage(req);
      
      
        const placement = await Placement.create({
            name,
            email,
            mobile,
            photo:data[0].url,
            designation,
            company:data[1].url,
            })
        
        
              if (placement) {
               
               return res.status(201).json({
                  error: false,
                  message: "Placement Added Successfully",
                  data: placement,
                });
            }
                res.status(502).json({ error: true, message: "Operation failed" });

    }
    catch(err)
    {
        // Clean up temp file just in case
    if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
        next(err)
    }
}

let getAllPlacements=async(req,res,next)=>
{
    try
    {
        let placements=await Placement.find({});

        if(placements)
        {
            return res.status(200).json({ error: true, message: "Placements Fetched Successfully",data:placements})
        }
        return res.status(404).json({ error: true, message: "Placements not found" })
    }
    catch(err)
    {
        next(err)
    }
}

module.exports={
    createPlacements,
    getAllPlacements
}