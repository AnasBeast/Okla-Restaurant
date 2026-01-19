const jwt = require("jsonwebtoken");

/**
 * JWT Authentication Middleware
 * SECURITY: Only accepts tokens from x-access-token header
 * Tokens in body or query parameters are rejected for security
 */
const verifyToken = (req, res, next) => {
  // SECURITY: Only accept token from header, not body or query
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      status: "fail",
      message: "Authentication token is required",
    });
  }

  // Validate token format (should be a non-empty string)
  if (typeof token !== "string" || token.trim().length === 0) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid token format",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    // Check token expiration explicitly
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({
        status: "fail",
        message: "Token has expired",
      });
    }

    req.user = decoded;
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        message: "Token has expired",
      });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token",
      });
    }
    return res.status(401).json({
      status: "fail",
      message: "Token verification failed",
    });
  }
};

module.exports = verifyToken;
