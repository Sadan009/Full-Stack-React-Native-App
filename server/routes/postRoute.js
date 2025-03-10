const express = require("express");
const requireSignIn = require("../middleware/Decryption");
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");

// router obj:
const router = express.Router();

// Create Post:
router.post("/create-post", requireSignIn, createPostController);
// Get all posts:
router.get("/get-all-posts", getAllPostsController);

// Get User posts:
router.get("/get-user-posts", requireSignIn, getUserPostsController);

// Delete Post:
router.delete("/delete-post/:id", requireSignIn, deletePostController);

// Update Post:
router.put("/update-post/:id", requireSignIn, updatePostController );



// export
module.exports = router;
