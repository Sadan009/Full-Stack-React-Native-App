const express = require("express");
const cors = require("cors");
const colors = require("colors");
// morgan: to get the response from server in console:
const morgan = require("morgan");
const connectDB = require("./config/db");
// DOTENV
require("dotenv").config();

// Mongo DB Conncetion:
connectDB();

// PORT
const PORT = process.env.PORT || 8080;

// Rest OBJ:
const app = express();

// Middleware:
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes:
app.use("/api/auth", require("./routes/userRoutes"));
// post-route:
app.use("/api/post", require("./routes/postRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgGreen.white);
});
