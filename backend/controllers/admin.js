const User = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { asyncHandler, AppError } = require("../middleware/errorHandler");
const {
  JWT_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} = require("../config/constants");

/**
 * Create a new admin user
 * POST /api/admin/register
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(409).json({
      status: "fail",
      message: ERROR_MESSAGES.USER_EXISTS,
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await User.create({
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  // Generate token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.TOKEN_KEY,
    { expiresIn: JWT_CONFIG.EXPIRATION },
  );

  // Update user with token
  user.token = token;
  await user.save();

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: {
      id: user._id,
      email: user.email,
      token,
    },
  });
});

/**
 * Login user
 * POST /api/admin/login
 */
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return res.status(401).json({
      status: "fail",
      message: ERROR_MESSAGES.INVALID_CREDENTIALS,
    });
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      status: "fail",
      message: ERROR_MESSAGES.INVALID_CREDENTIALS,
    });
  }

  // Generate new token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.TOKEN_KEY,
    { expiresIn: JWT_CONFIG.EXPIRATION },
  );

  // Update user token
  user.token = token;
  await user.save();

  res.status(200).json({
    status: "success",
    message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
    data: {
      id: user._id,
      email: user.email,
      token,
    },
  });
});

/**
 * Verify user token
 * POST /api/admin/checkuser
 */
exports.checkUser = asyncHandler(async (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: ERROR_MESSAGES.INVALID_TOKEN,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    // Optionally verify user still exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: ERROR_MESSAGES.INVALID_TOKEN,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Token is valid",
      data: {
        userId: decoded.userId,
        email: decoded.email,
      },
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        message: ERROR_MESSAGES.TOKEN_EXPIRED,
      });
    }
    return res.status(401).json({
      status: "fail",
      message: ERROR_MESSAGES.INVALID_TOKEN,
    });
  }
});

/**
 * Logout user (invalidate token)
 * POST /api/admin/logout
 */
exports.logoutUser = asyncHandler(async (req, res, next) => {
  const token = req.body.token || req.headers["x-access-token"];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      await User.findByIdAndUpdate(decoded.userId, { token: null });
    } catch (err) {
      // Token already invalid, continue with logout
    }
  }

  res.status(200).json({
    status: "success",
    message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
  });
});
