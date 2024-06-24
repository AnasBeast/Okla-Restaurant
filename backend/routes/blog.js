const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const auth = require("../middleware/auth");

router.post("" ,auth, blogController.createBlog);

router.put("/:id",auth , blogController.updateBlog);

router.get("", blogController.getBlogs);

router.get("/:id", blogController.getBlogById);

router.delete("/:id",auth , blogController.deleteBlog);

router.post("/search", blogController.searchBlogs);

module.exports = router;