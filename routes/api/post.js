const express = require("express");
const router = express.Router();

const postController = require("../../controllers/postController");
const authMiddleware = require("../../middleware/authMiddleware");

// @route  GET /api/post/all
// @desc   Get all posts
// @access Public
router.get("/all", postController.postGetAll);

// @route  GET /api/post/:id
// @desc   Get specific post
// @access Public
router.get("/:id", postController.postGet);

// @route  POST /api/post/create
// @desc   Create post
// @access Private
router.post("/create", authMiddleware, postController.createPost);

// @route  PUT /api/post/update
// @desc   Update post
// @access Private
router.put("/update", authMiddleware, postController.updatePost);

// @route  DELETE /api/post/delete
// @desc   Delete post
// @access Private
router.delete("/delete", authMiddleware, postController.deletePost);

// @route  PUT /api/post/like/:id
// @desc   Toggle like on post
// @access Private
router.put("/like/:id", authMiddleware, postController.likePost);

module.exports = router;
