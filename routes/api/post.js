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

// @route  PUT /api/post/update
// @desc   Update post
// @access Private
router.put("/update", authMiddleware, postController.updatePost);

// @route  DELETE /api/post/delete
// @desc   Delete post
// @access Private
router.delete("/delete", authMiddleware, postController.deletePost);

module.exports = router;
