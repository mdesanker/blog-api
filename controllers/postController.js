const { check, validationResult } = require("express-validator");

const Post = require("../models/Post");

exports.postGet = (req, res) => res.send("Post GET test route");

// Create new post on POST
exports.createPost = [
  // Validate and sanitize
  check("title", "A title is required for your post")
    .trim()
    .not()
    .isEmpty()
    .escape(),
  check("content", "Post must have some content")
    .trim()
    .not()
    .isEmpty()
    .escape(),
  check("publish").isBoolean(),

  // Process request
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create new post object
      const { title, content, publish } = req.body;

      const post = new Post({
        author: req.user.id,
        title,
        content,
        publish,
      });

      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
];
