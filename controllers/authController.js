const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// Test route on auth GET
exports.authGet = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Authenticate user & get token on POST
exports.authPost = [
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
          .stats(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Check for password match
      const isMatch = await bcrypt.compare(password, user.password);

      // If not match
      if (!isMatch) {
        return res
          .stats(400)
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
    }
  },
];
