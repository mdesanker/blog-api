const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

//Connect database
connectDB();

// Routes
const authRoute = require("./routes/api/auth");
const userRoute = require("./routes/api/user");
const postRoute = require("./routes/api/post");

// Middleware
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
