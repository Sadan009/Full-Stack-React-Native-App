const Joi = require("joi");

// Signup: 
const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  //   in req.body there is (value and error),
  // here we are going for the error present in the body:
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      msg: "Bad Request",
      error,
    });
  }
  next();
};

// Login:
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  //   in req.body there is (value and error),
  // here we are going for the error present in the body:
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      msg: "Please enter correct email and password",
      error,
    });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
