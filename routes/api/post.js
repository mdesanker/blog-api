const express = require("express");
const router = express.Router();

const postController = require("../../controllers/postController");
const authMiddleware = require("../../middleware/authMiddleware");

// @route  GET /api/post
// @desc   Test route
// @access Public
router.get("/", postController.postGet);

// @route  POST /api/post/new
// @desc   Create post
// @access Private
router.post("/new", authMiddleware, postController.createPost);

module.exports = router;
