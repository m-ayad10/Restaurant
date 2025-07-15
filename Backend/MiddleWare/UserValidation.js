const Joi = require("joi");

const loginValidation = async (req, res, next) => {
  const scheema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
    }),
    password: Joi.string().min(6).max(30).required().messages({
      "string.empty": "Confirm password is required",
      "string.min": "Confirm password must be at least 6 characters",
      "string.max": "Confirm password cannot exceed 30 characters",
    }),
  });
  const { error } = await scheema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Bad Request:", error, status: false });
  }
  
  next();
};

const signupValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
    }),
    fullName: Joi.string().min(4).max(40).required().messages({
      "string.empty": "Full Name is required",
      "string.min": "Full Name must be at least 4 characters",
      "string.max": "Full Name cannot exceed 40 characters",
    }),
    phone: Joi.string().required().messages({
      "string.empty": "Phone number is required",
    }),
    password: Joi.string().min(6).max(30).required().messages({
      "string.empty": "Confirm password is required",
      "string.min": "Confirm password must be at least 6 characters",
      "string.max": "Confirm password cannot exceed 30 characters",
    }),
    confirmPassword: Joi.string()
      .min(6)
      .max(30)
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "any.only": "Passwords do not match",
        "string.empty": "Confirm password is required",
        "string.min": "Confirm password must be at least 6 characters",
        "string.max": "Confirm password cannot exceed 30 characters",
      }),
  });

  const { error } = await schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Bad Request", error: error.details, status: false });
  }
  next();
};

module.exports = { loginValidation, signupValidation };
