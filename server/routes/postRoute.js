const express = require("express");
const requireSignIn = require("../middleware/Decryption");
const { createPostController } = require("../controllers/postController");

// router obj:
const router = express.Router();

// Create Post:
router.post("/create-post", requireSignIn, createPostController);

// export
module.exports = router;
