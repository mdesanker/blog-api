const express = require("express");
const router = express.Router();

const authController = require("../../controllers/authController");
const authMiddleware = require("../../middleware/authMiddleware");

// @route  GET /api/auth
// @desc   Test route
// @access Private
router.get("/", authMiddleware, authController.authGet);

// @route  POST /api/auth
// @desc   Authenticate & get jwt
// @access Public
router.post("/", authController.authPost);

module.exports = router;
