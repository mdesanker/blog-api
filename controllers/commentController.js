const { check, validationResult } = require("express-validator");

const Comment = require("../models/Comment");
const User = require("../models/User");

// Get count of all comments
exports.commentCountGet = async (req, res, next) => {
  try {
    const count = await Comment.countDocuments({});

    res.json(count);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get comments for specific post
exports.commentForPostGet = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ post: id }).populate("author");

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get comments for specific user
exports.commentForUserGet = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ author: id }).populate("author");

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Create new comment on POST
exports.commentPost = [
  // Validate and sanitize input
  check("content", "Comment must not be blank").trim().not().isEmpty(),

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
        // author: req.user.id,
        post,
        content,
      });

      comment.author = await User.findById(req.user.id);

      await comment.save();
      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
];

// Update comment on PUT
exports.commentUpdate = [
  // Validate and sanitize input
  check("content", "Comment must not be blank").trim().not().isEmpty(),

  // Process input
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: [{ msg: errors.array() }] });
    }

    try {
      const { id, post, content } = req.body;

      // Check user is author of comment
      const comment = await Comment.findById(id).populate("author");

      if (comment.author.id !== req.user.id) {
        return res
          .status(401)
          .json({ error: [{ msg: "Invalid credentials" }] });
      }

      // Create new comment object
      const newComment = new Comment({
        author: req.user.id,
        post,
        content,
        _id: id,
      });

      // Update comment
      const doc = await Comment.findByIdAndUpdate(id, newComment, {
        new: true,
      });

      res.json(doc);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
];

exports.commentDelete = async (req, res, next) => {
  try {
    const { id } = req.body;

    // Check that user is comment author
    const comment = await Comment.findById(id).populate("author");

    if (comment.author.id !== req.user.id) {
      return res.status(401).json({ error: [{ msg: "Invalid credentials" }] });
    }

    await Comment.findByIdAndDelete(id);

    res.json({ msg: "Comment deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
