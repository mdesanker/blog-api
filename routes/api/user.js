const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userContoller");
const authMiddleware = require("../../middleware/authMiddleware");

// @route  GET /api/user/detail
// @desc   Return user data
// @access Private
router.get("/detail", authMiddleware, userController.userGet);

// @route  POST /api/user
// @desc   Create a user
// @access Public
router.post("/", userController.userCreatePost);

// @route  POST /api/user/login
// @desc   Login user
// @access Public
router.post("/login", userController.userLoginPost);

module.exports = router;
