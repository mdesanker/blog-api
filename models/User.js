const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 7 },
  date: { type: Date, default: Date.now() },
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
