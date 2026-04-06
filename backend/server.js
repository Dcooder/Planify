const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// route
app.get("/", (req, res) => {
  res.send("API is running....");
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});