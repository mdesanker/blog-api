const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");

const app = express();

//Connect database
connectDB();

// Enable CORS
const urls = [/\localhost/];

app.use(cors({ origin: urls, credentials: true }));

// Routes
const userRoute = require("./routes/api/user");
const postRoute = require("./routes/api/post");
const commentRoute = require("./routes/api/comment");

// Middleware
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

app.get("/", (req, res) => {
  res.json({ msg: "This is CORS-enabled for all origins" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
