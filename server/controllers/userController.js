const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation:
    if (!name) {
      return res.status(400).send({
        success: false,
        msg: "name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        msg: "email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        msg: "password is required and 6 characters long",
      });
    }
    // Existing user:
    const existingUser = await userModel.findOne({ email });
    // console.log("User: ", existingUser);
    if (existingUser) {
      console.log("User exist");
      return res.status(409).json({
        success: false,
        msg: "user is already exists you can login",
      });
    }
    // encrypt password:
    // save user:
    // way to create a new document with Mongoose
    const user = new userModel({ name, email, password });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.status(201).send({
      success: true,
      msg: "Signup successfull!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Error in Register API",
      error,
    });
  }
};

// Login Controller:

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong!";
    if (!user) {
      return res.status(403).json({
        success: false,
        msg: errorMsg,
      });
    }
    // compare password from db - client if user is available:
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        success: false,
        msg: errorMsg,
      });
    }
    // Token JWT:
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // undefined the password for security purpose:
    user.password = undefined;
    res.status(200).json({
      success: true,
      msg: "Login successfull!",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// update user:
const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    // User find by email:
    const user = await userModel.findOne({ email });
    // Password validate:
    if (!password && !password.length > 6) {
      return res.status(400).json({
        success: false,
        msg: "Password is required and should be 6 character long",
      });
    }
    // user.password = await bcrypt.hash(password, 10);
    const hashedPassord = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    // updated user:
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { name: name || user.name, password: hashedPassord || user.password },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).json({
      success: true,
      msg: "Profile updated please login!",
      updatedUser,
    });
  } catch (error) {
    console.log("Update Error: ", error);
    res.status(500).json({
      success: false,
      msg: "Error In User Update API",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  updateUserController,
};
