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

exports.getSpecificBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id)
      .populate("author", "name-_id")
      .populate("comments.user", "name");
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.create = async (req, res) => {
  const { title, content } = req.body;
  try {
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//extra code
//extra code
