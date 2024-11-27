const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog,
  addComment,
  deleteComment,
} = require("../controllers/blog");

const router = express.Router();

// Blog routes
router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

// Like/Unlike routes
router.post("/:id/like", likeBlog);
router.post("/:id/unlike", unlikeBlog);

// Comment routes
router.post("/:id/comments", addComment);
router.delete("/:blogId/comments/:commentId", deleteComment);

module.exports = router;
