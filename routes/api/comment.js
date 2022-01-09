const express = require("express");
const router = express.Router();

const commentController = require("../../controllers/commentController");
const authMiddleware = require("../../middleware/authMiddleware");

// @route  GET /api/comment/
// @desc   Test route
// @access Public
router.get("/", commentController.commentGet);

module.exports = router;
