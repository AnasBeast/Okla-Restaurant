/**
 * Security Middleware
 * Provides XSS protection, input sanitization, and rate limiting
 */

/**
 * Sanitize a string by removing potential XSS vectors
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
const sanitizeString = (str) => {
  if (typeof str !== "string") return str;

  return (
    str
      // Remove HTML tags
      .replace(/<[^>]*>/g, "")
      // Encode special characters
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      // Remove potential script injections
      .replace(/javascript:/gi, "")
      .replace(/on\w+=/gi, "")
      .trim()
  );
};

/**
 * Recursively sanitize object properties
 * @param {Object} obj - Object to sanitize
 * @returns {Object} Sanitized object
 */
const sanitizeObject = (obj) => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "string") return sanitizeString(obj);
  if (typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeObject);

  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    // Sanitize the key as well
    const sanitizedKey = sanitizeString(key);
    sanitized[sanitizedKey] = sanitizeObject(value);
  }
  return sanitized;
};

/**
 * Middleware to sanitize request body
 */
const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    // Don't sanitize file uploads
    if (!req.is("multipart/form-data")) {
      req.body = sanitizeObject(req.body);
    }
  }
  next();
};

/**
 * Middleware to sanitize query parameters
 */
const sanitizeQuery = (req, res, next) => {
  if (req.query && typeof req.query === "object") {
    req.query = sanitizeObject(req.query);
  }
  next();
};

/**
 * Simple in-memory rate limiter
 * For production, use redis-based rate limiting
 */
const rateLimitStore = new Map();

/**
 * Clean up old entries periodically
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now - data.firstRequest > 60000) {
      rateLimitStore.delete(key);
    }
  }
}, 60000);

/**
 * Rate limiting middleware
 * @param {Object} options - Rate limit options
 * @param {number} options.maxRequests - Maximum requests per window
 * @param {number} options.windowMs - Time window in milliseconds
 */
const rateLimit = ({ maxRequests = 100, windowMs = 60000 } = {}) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || "unknown";
    const key = `${ip}:${req.path}`;
    const now = Date.now();

    const data = rateLimitStore.get(key);

    if (!data) {
      rateLimitStore.set(key, { count: 1, firstRequest: now });
      return next();
    }

    // Reset if window has passed
    if (now - data.firstRequest > windowMs) {
      rateLimitStore.set(key, { count: 1, firstRequest: now });
      return next();
    }

    // Increment count
    data.count++;

    if (data.count > maxRequests) {
      return res.status(429).json({
        status: "fail",
        message: "Too many requests, please try again later",
      });
    }

    next();
  };
};

/**
 * Stricter rate limit for authentication endpoints
 */
const authRateLimit = rateLimit({
  maxRequests: 5,
  windowMs: 60000, // 5 attempts per minute
});

/**
 * General API rate limit
 */
const apiRateLimit = rateLimit({
  maxRequests: 100,
  windowMs: 60000, // 100 requests per minute
});

/**
 * Validate MongoDB ObjectId format
 * @param {string} id - ID to validate
 * @returns {boolean} Whether ID is valid
 */
const isValidObjectId = (id) => {
  return /^[a-fA-F0-9]{24}$/.test(id);
};

/**
 * Middleware to validate route ID parameters
 */
const validateIdParam = (req, res, next) => {
  if (req.params.id && !isValidObjectId(req.params.id)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID format",
    });
  }
  next();
};

/**
 * Security headers middleware
 */
const securityHeaders = (req, res, next) => {
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Enable XSS filter
  res.setHeader("X-XSS-Protection", "1; mode=block");
  // Control referrer information
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  // Content Security Policy
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' https: data:; script-src 'self'",
  );
  next();
};

/**
 * Validate URL format (for blog images)
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is valid
 */
const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

/**
 * Middleware to validate image URL in request body
 */
const validateImageUrl = (req, res, next) => {
  if (req.body.image) {
    if (!isValidUrl(req.body.image)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid image URL. Only HTTP/HTTPS URLs are allowed.",
      });
    }

    // Block potentially dangerous URLs
    const url = req.body.image.toLowerCase();
    if (
      url.includes("javascript:") ||
      url.includes("data:") ||
      url.includes("vbscript:")
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid image URL format",
      });
    }
  }
  next();
};

module.exports = {
  sanitizeString,
  sanitizeObject,
  sanitizeBody,
  sanitizeQuery,
  rateLimit,
  authRateLimit,
  apiRateLimit,
  isValidObjectId,
  validateIdParam,
  securityHeaders,
  isValidUrl,
  validateImageUrl,
};
