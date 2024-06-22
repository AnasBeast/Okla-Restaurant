const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.post("/register" , adminController.createUser);

router.post("/login" , adminController.loginUser);

router.post("/checkuser" , adminController.checkUser);


module.exports = router;