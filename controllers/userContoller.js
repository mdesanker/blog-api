const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

// Return user data on GET
exports.userGet = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Create user on POST
exports.userCreatePost = [
  // Validate and sanitize input
  check("username", "Username is required").trim().not().isEmpty().escape(),
  check("password", "Password must be at least 7 characters")
    .trim()
    .isLength({ min: 7 })
    .escape(),

  // Process validated and sanitized input
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Send errors in msg
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Check whether username exists in db
      let user = await User.findOne({ username });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Create new user object
      user = new User({
        username,
        password,
      });

      // Encrypt password
      user.password = await bcrypt.hash(password, 10);

      // Save user in db
      await user.save();
      // return res.json(user);

      // Return jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.KEY, { expiresIn: "5h" }, (err, token) => {
        if (err) throw new Error(err);
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
];

// Login user on POST
exports.userLoginPost = [
  // Validate and sanitize input
  check("username").exists(),
  check("password").exists(),

  // Process request
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ username });

      // If user not found
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Check for password match
      const isMatch = await bcrypt.compare(password, user.password);

      // If not match
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Return JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.KEY, { expiresIn: "5h" }, (err, token) => {
        if (err) throw new Error(err);
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      return;
    }
  },
];
