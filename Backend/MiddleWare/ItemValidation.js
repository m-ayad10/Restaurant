const Joi = require("joi");

const ItemValidation = async (req, res, next) => {
  try {  
          
    const schema = Joi.object({
      name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.base": "Name must be a string",
      }),
      category: Joi.string().required().messages({
        "any.required": "Category is required",
        "string.base": "Category must be a string",
      }),
      description: Joi.string().required().messages({
        "any.required": "Description is required",
        "string.base": "Description must be a string",
      }),
      price: Joi.number().required().messages({
        "any.required": "Price is required",
        "number.base": "Price must be a number",
      })
    });
    
    const { error } = await schema.validate(req.body)

    if (error) {
      return res
        .status(500)
        .json({ message: "Bad request", status: false, error });
    }
    
    next();
  } catch (error) {
   return res
      .status(404)
      .json({ message: "Internal server error ", status: false, error });
  }
};

module.exports = { ItemValidation };
