const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

//Connect database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
