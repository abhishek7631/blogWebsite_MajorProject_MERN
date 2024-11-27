const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const adminAuth = require("../middleware/admin");

// Get all users
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all blogs with user details
router.get("/blogs", adminAuth, async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/dashboard", adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    const usersWithBlogs = await User.find().populate({
      path: "blogs", // Assuming 'blogs' is a virtual field in the User model
      select: "title", // Only include the blog title
    });

    res.status(200).json({ totalUsers, totalBlogs, usersWithBlogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
