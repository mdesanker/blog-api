const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

// Test route on users GET
exports.usersGet = (req, res, next) => {
  res.send("Route for /api/users");
};

// Create user on POST
exports.userPost = [
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
