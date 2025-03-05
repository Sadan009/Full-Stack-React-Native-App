const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
} = require("../controllers/userController");
const {
  signupValidation,
  loginValidation,
} = require("../middleware/AuthValidators");
const requireSignIn = require("../middleware/Decryption");

// Router Obj:
const router = express.Router();

// Routes:
// Signup
router.post("/register", signupValidation, registerController);

// Login:
router.post("/login", loginValidation, loginController);

// UPDATE || PUT
router.put("/update-user", requireSignIn, updateUserController);

module.exports = router;
