const express = require("express");
const router = express.Router();

const authController = require("../../controllers/authController");

// @route  GET /api/auth
// @desc   Test route
// @access Public
router.get("/", authController.authGet);

module.exports = router;
