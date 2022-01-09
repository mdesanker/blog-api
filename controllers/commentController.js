const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Test route
exports.commentGet = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};

// Create new comment on POST
exports.commentPost = [
  // Validate and sanitize input
  check("content", "Comment must not be blank").trim().not().isEmpty().escape(),
  // check("post").exists(),

  // Process input
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: [{ msg: errors.array() }] });
    }

    try {
      const { content, post } = req.body;

      // Create new comment object
      const comment = new Comment({
        author: req.user.id,
        post,
        content,
      });

      await comment.save();
      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
];
