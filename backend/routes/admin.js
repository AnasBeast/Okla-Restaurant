const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const { validateLogin } = require("../middleware/validators");
const { authRateLimit } = require("../middleware/security");

// POST /api/admin/register - Create new admin user (rate limited)
router.post(
  "/register",
  authRateLimit,
  validateLogin,
  adminController.createUser,
);

// POST /api/admin/login - Login admin user (rate limited)
router.post("/login", authRateLimit, validateLogin, adminController.loginUser);

// POST /api/admin/checkuser - Verify token validity
router.post("/checkuser", adminController.checkUser);

// POST /api/admin/logout - Logout user
router.post("/logout", adminController.logoutUser);

module.exports = router;
