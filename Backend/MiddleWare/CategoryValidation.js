const Joi = require("joi");

const CategoryValidation = async(req, res, next) => {
  
  const scheema = Joi.object({
    name:Joi.string().required().messages({
        "string.empty": "Category name is required",
      })
  });
  
  const {error}=await scheema.validate(req.body)
  if (error) {    
    return res.status(400).json({message:'Bad Request',error,status:false})
  }  
  next()
  
};

module.exports={CategoryValidation}
