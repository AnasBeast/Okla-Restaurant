const Blog = require("../models/blog");
const { asyncHandler } = require("../middleware/errorHandler");
const {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  PAGINATION,
} = require("../config/constants");

/**
 * Get all blogs with pagination
 * GET /api/blogs
 */
exports.getBlogs = asyncHandler(async (req, res, next) => {
  const pageSize = parseInt(req.query.pagesize) || PAGINATION.DEFAULT_PAGE_SIZE;
  const currentPage = parseInt(req.query.page) || PAGINATION.DEFAULT_PAGE;

  // Get blogs with pagination
  const blogs = await Blog.find()
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize)
    .sort({ createdAt: -1 });

  // Get total count
  const totalBlogs = await Blog.countDocuments();

  res.status(200).json({
    status: "success",
    message: "Blogs fetched successfully",
    blogs,
    maxBlogs: totalBlogs,
    pagination: {
      currentPage,
      pageSize,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / pageSize),
    },
  });
});

/**
 * Create a new blog
 * POST /api/blogs
 */
exports.createBlog = asyncHandler(async (req, res, next) => {
  const { image } = req.body;

  if (!image || !image.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Image URL is required",
    });
  }

  const blog = new Blog({
    image: image.trim(),
  });

  const savedBlog = await blog.save();

  res.status(201).json({
    status: "success",
    message: SUCCESS_MESSAGES.BLOG_CREATED,
    blog: {
      ...savedBlog._doc,
      id: savedBlog._id,
    },
  });
});

/**
 * Get blog by ID
 * GET /api/blogs/:id
 */
exports.getBlogById = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      status: "fail",
      message: ERROR_MESSAGES.BLOG_NOT_FOUND,
    });
  }

  res.status(200).json({
    status: "success",
    data: blog,
    ...blog._doc,
  });
});

/**
 * Update blog
 * PUT /api/blogs/:id
 */
exports.updateBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { image } = req.body;

  // Check if blog exists
  const existingBlog = await Blog.findById(id);
  if (!existingBlog) {
    return res.status(404).json({
      status: "fail",
      message: ERROR_MESSAGES.BLOG_NOT_FOUND,
    });
  }

  // Update blog
  const updateData = {
    image: image?.trim() || existingBlog.image,
  };

  await Blog.findByIdAndUpdate(id, updateData);

  res.status(200).json({
    status: "success",
    message: SUCCESS_MESSAGES.BLOG_UPDATED,
  });
});

/**
 * Delete blog
 * DELETE /api/blogs/:id
 */
exports.deleteBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({
      status: "fail",
      message: ERROR_MESSAGES.BLOG_NOT_FOUND,
    });
  }

  await Blog.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: SUCCESS_MESSAGES.BLOG_DELETED,
  });
});

/**
 * Search blogs
 * POST /api/blogs/search
 */
exports.searchBlogs = asyncHandler(async (req, res, next) => {
  const query = req.query.query || req.body.query;

  if (!query || query.trim().length < 2) {
    return res.status(400).json({
      status: "fail",
      message: "Search query must be at least 2 characters",
    });
  }

  const searchRegex = new RegExp(query.trim(), "i");

  const blogs = await Blog.find({
    image: searchRegex,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    data: blogs,
    count: blogs.length,
  });
});
