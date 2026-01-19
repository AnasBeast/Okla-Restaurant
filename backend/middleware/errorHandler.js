/**
 * Global Error Handler Middleware
 * Provides consistent error responses across the API
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Async handler wrapper to avoid try-catch blocks
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Development vs Production error responses
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production: Don't leak error details
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // Programming or unknown error
      console.error("ERROR 💥", err);
      res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }
  }
};

// Handle specific MongoDB errors
const handleMongoErrors = (err) => {
  // Duplicate key error
  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    return new AppError(
      `Duplicate field value: ${value}. Please use another value!`,
      400,
    );
  }

  // Validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    return new AppError(`Invalid input data. ${errors.join(". ")}`, 400);
  }

  // Cast error (invalid ID format)
  if (err.name === "CastError") {
    return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  return err;
};

module.exports = {
  AppError,
  asyncHandler,
  errorHandler,
  handleMongoErrors,
};
