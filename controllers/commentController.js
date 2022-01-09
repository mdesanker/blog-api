const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Post");

exports.commentGet = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};
