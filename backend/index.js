const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/product");
const blogRoutes = require("./routes/blog");

// Import middleware
const { errorHandler } = require("./middleware/errorHandler");
const { CORS_CONFIG } = require("./config/constants");
const {
  sanitizeBody,
  sanitizeQuery,
  securityHeaders,
  apiRateLimit,
} = require("./middleware/security");

const app = express();

// ===========================================
// Database Connection
// ===========================================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      // Modern mongoose options (v6+)
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err);
});

// ===========================================
// Middleware
// ===========================================

// Security headers
app.use(securityHeaders);

// Rate limiting
app.use(apiRateLimit);

// Parse JSON bodies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Sanitize inputs
app.use(sanitizeBody);
app.use(sanitizeQuery);

// CORS Configuration - More secure than wildcard
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Allow specific origins or all in development
  if (
    process.env.NODE_ENV === "development" ||
    !origin ||
    CORS_CONFIG.ALLOWED_ORIGINS.includes(origin)
  ) {
    res.header("Access-Control-Allow-Origin", origin || "*");
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    CORS_CONFIG.ALLOWED_METHODS.join(","),
  );
  res.header(
    "Access-Control-Allow-Headers",
    CORS_CONFIG.ALLOWED_HEADERS.join(","),
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// Request logging in development
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// ===========================================
// Routes
// ===========================================

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Restaurant Okla API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Health check for monitoring
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    uptime: process.uptime(),
  });
});

// API routes
app.use("/api/product", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use(errorHandler);

// ===========================================
// Server Startup
// ===========================================
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  });
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  process.exit(1);
});

startServer();
