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
    return res.status(500).json({
      success: false,
      msg: "Error in GETALLPOSTS API",
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
};
