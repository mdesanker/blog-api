const express = require("express");
const router = express.Router();

const commentController = require("../../controllers/commentController");
const authMiddleware = require("../../middleware/authMiddleware");

// @route  GET /api/comment/post/:id
// @desc   Get all comments for a specific post
// @access Public
router.get("/post/:id", commentController.commentForPostGet);

// @route  GET /api/comment/user/:id
// @desc   Get all comments for a specific user
// @access Public
router.get("/user/:id", commentController.commentForUserGet);

// @route  POST /api/comment/create
// @desc   Create comment
// @access Private
router.post("/create", authMiddleware, commentController.commentPost);

// @route  PUT /api/comment/update
// @desc   Update comment
// @access Private
router.put("/update", authMiddleware, commentController.commentUpdate);

// @route  DELETE /api/comment/delete
// @desc   Delete comment
// @access Private
router.delete("/delete", authMiddleware, commentController.commentDelete);

module.exports = router;
