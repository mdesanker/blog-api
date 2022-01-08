const express = require("express");
const router = express.Router();

const authController = require("../../controllers/authController");

// @route  GET /api/auth
// @desc   Test route
// @access Public
router.get("/", authController.authGet);

// @route  POST /api/auth
// @desc   Authenticate & get jwt
// @access Public
router.post("/", authController.authPost);

module.exports = router;
