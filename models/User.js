const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 7 },
  date: { type: Date, default: Date.now() },
});

// Virtual for full name
UserSchema.virtual("name").get(function () {
  return `${this.first} ${this.last}`;
});

module.exports = mongoose.model("User", UserSchema);
