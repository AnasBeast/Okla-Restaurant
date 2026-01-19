/**
 * Input Validation Middleware
 * Validates and sanitizes user inputs
 */

const { AppError } = require("./errorHandler");

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize string input
const sanitizeString = (str) => {
  if (typeof str !== "string") return str;
  return str.trim().replace(/<[^>]*>/g, "");
};

// Validate login input
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Email and password are required",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide a valid email address",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      status: "fail",
      message: "Password must be at least 6 characters",
    });
  }

  // Sanitize inputs
  req.body.email = sanitizeString(email.toLowerCase());
  req.body.password = password;

  next();
};

// Validate product input
const validateProduct = (req, res, next) => {
  const { title, type, description } = req.body;

  const validTypes = [
    "burger",
    "pizza",
    "poutine",
    "sandwich",
    "assiette",
    "barquette",
    "cafe",
    "cremerie",
    "patisserie",
  ];

  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "Product title is required",
    });
  }

  if (!type || !validTypes.includes(type.toLowerCase())) {
    return res.status(400).json({
      status: "fail",
      message: `Product type must be one of: ${validTypes.join(", ")}`,
    });
  }

  if (!description || description.trim().length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "Product description is required",
    });
  }

  // Sanitize inputs
  req.body.title = sanitizeString(title);
  req.body.type = type.toLowerCase();
  req.body.description = sanitizeString(description);

  next();
};

// Validate blog input
const validateBlog = (req, res, next) => {
  const { image } = req.body;

  if (!image || image.trim().length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "Image URL is required",
    });
  }

  // Basic URL validation
  try {
    new URL(image);
  } catch (_) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide a valid image URL",
    });
  }

  req.body.image = sanitizeString(image);

  next();
};

// Validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(id)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID format",
    });
  }

  next();
};

// Validate pagination parameters
const validatePagination = (req, res, next) => {
  const { page, pagesize } = req.query;

  if (page && (isNaN(page) || parseInt(page) < 1)) {
    return res.status(400).json({
      status: "fail",
      message: "Page must be a positive number",
    });
  }

  if (
    pagesize &&
    (isNaN(pagesize) || parseInt(pagesize) < 1 || parseInt(pagesize) > 100)
  ) {
    return res.status(400).json({
      status: "fail",
      message: "Page size must be between 1 and 100",
    });
  }

  next();
};

module.exports = {
  validateLogin,
  validateProduct,
  validateBlog,
  validateObjectId,
  validatePagination,
  sanitizeString,
  isValidEmail,
};
