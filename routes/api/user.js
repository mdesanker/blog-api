const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userContoller");

// @route  GET /api/users
// @desc   Test route
// @access Public
router.get("/", userController.usersGet);

// @route  POST /api/users
// @desc   Create a user
// @access Public
router.post("/", userController.userPost);

module.exports = router;
