const express = require("express");
const requireSignIn = require("../middleware/Decryption");
const {
  createPostController,
  getAllPostsController,
} = require("../controllers/postController");

// router obj:
const router = express.Router();

// Create Post:
router.post("/create-post", requireSignIn, createPostController);
// Get all posts:
router.get("/get-all-posts", getAllPostsController);
// export
module.exports = router;
