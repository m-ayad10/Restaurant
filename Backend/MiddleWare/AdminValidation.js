const Joi = require("joi");

const AdminLoginValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
    }),
    password: Joi.string().min(6).max(30).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password cannot exceed 30 characters",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      errors: error.details.map((err) => err.message),
      status: false,
    });
  }
  next();
};

const AdminSignupValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
    }),
    password: Joi.string().min(6).max(30).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password cannot exceed 30 characters",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      errors: error.details.map((err) => err.message),
      status: false,
    });
  }
  next();
};

module.exports = { AdminLoginValidation, AdminSignupValidation };
