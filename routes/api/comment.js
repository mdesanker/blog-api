const express = require("express");
const router = express.Router();

const commentController = require("../../controllers/commentController");
const authMiddleware = require("../../middleware/authMiddleware");

// @route  GET /api/comment/
// @desc   Test route
// @access Public
router.get("/", commentController.commentGet);

// @route  POST /api/comment/create
// @desc   Create comment
// @access Private
router.post("/create", authMiddleware, commentController.commentPost);

// @route  PUT /api/comment/update
// @desc   Update comment
// @access Private
router.put("/update", authMiddleware, commentController.commentUpdate);

module.exports = router;
