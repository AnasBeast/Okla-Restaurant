const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const auth = require("../middleware/auth");
const { validateIdParam, validateImageUrl } = require("../middleware/security");

router.post("", auth, validateImageUrl, blogController.createBlog);

router.put(
  "/:id",
  auth,
  validateIdParam,
  validateImageUrl,
  blogController.updateBlog,
);

router.get("", blogController.getBlogs);

router.get("/:id", validateIdParam, blogController.getBlogById);

router.delete("/:id", auth, validateIdParam, blogController.deleteBlog);

router.post("/search", blogController.searchBlogs);

module.exports = router;
