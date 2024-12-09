const Blog = require("../models/blog");

exports.getAllBlog = async (req, res) => {
  try {
    const blog = Blog.find()
      .populate("author", "name-_id")
      .populate("comments.user", "name");

    res.status(200).json({ blog });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
