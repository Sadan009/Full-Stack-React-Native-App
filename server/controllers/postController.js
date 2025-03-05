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
module.exports = {
  createPostController,
};
