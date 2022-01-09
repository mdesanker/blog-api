const { check, validationResult } = require("express-validator");

const Post = require("../models/Post");
const User = require("../models/User");

// Get all posts on GET
exports.postGetAll = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate("author");

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get specific post by id
exports.postGet = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

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
      // Check user is admin
      const user = await User.findById(req.user.id).select("-password");

      if (!user.admin) {
        return res
          .status(401)
          .json({ error: [{ msg: "Invalid credentials" }] });
      }

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

// Update existing post on PUT
exports.updatePost = [
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

    const { id, title, content, publish } = req.body;

    const newPost = new Post({
      title,
      content,
      publish,
      _id: id,
    });

    try {
      // Find existing post
      const post = await Post.findById(id).populate("author");

      // Only allow author to update
      if (!(post.author.id === req.user.id)) {
        return res
          .status(401)
          .json({ error: [{ msg: "Invalid credentials" }] });
      }

      // Update the post
      const doc = await Post.findByIdAndUpdate(id, newPost, {
        new: true,
      });

      res.json(doc);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
];

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.body;

    // Verify author
    const post = await Post.findById(id).populate("author");

    if (!(post.author.id === req.user.id)) {
      return res.status(401).json({ error: [{ msg: "Invalid credentials" }] });
    }

    await Post.findByIdAndDelete(id);

    res.json({ msg: "Post deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
