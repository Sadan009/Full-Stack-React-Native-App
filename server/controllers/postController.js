const postModel = require("../models/postModel");

const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    // validate:
    if (!title || !description) {
      return res.status(500).json({
        success: false,
        msg: "Please provide all fields",
      });
    }
    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();
    res.status(201).json({
      success: true,
      msg: "Post created successfully!",
      post,
    });
    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Error in Create Post API",
      error,
    });
  }
};

// Get All Posts:
const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel
      // .find will give all the post data:
      .find()
      // find by 'postedBy', this we want ("_id name");
      .populate("postedBy", "_id name")
      // most recent post will be on top:
      // sort on the basis of createdAt:
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      msg: "All Posts Data",
      posts,
    });
  } catch (error) {
    console.log(error);
    console.error("getAllPostsController - Error:", error);
    console.error("getAllPostsController - Stack Trace:", error.stack);
    return res.status(500).json({
      success: false,
      msg: "Error in GETALLPOSTS API",
      error,
    });
  }
};

// Get single user post:

const getUserPostsController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res.status(200).json({
      success: true,
      msg: "user posts",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error in user post api",
      error,
    });
  }
};

// Dlt post:
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      msg: "Your Post is deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error in delete post api",
      error,
    });
  }
};

const updatePostController = async (req, res) => {
  try {
    // update title and description:
    const { title, description } = req.body;
    // find post to update: with help of id:
    const post = await postModel.find({ _id: req.params.id });
    // validation:
    if (!title || !description) {
      return res.status(500).json({
        success: false,
        msg: "Please provide Title and Description",
      });
    }
    // post id got - validation done then :
    const updatedPost = await postModel.findByIdAndUpdate(
      // Find by id:
      { _id: req.params.id },
      // update these - if only one update then leave the rest at it is:
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );
    // if everything's good:
    res.status(200).json({
      success: true,
      msg: "Post updated Successfully!",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Error in UpdatePost API",
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
};
