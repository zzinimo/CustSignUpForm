require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const postmark = require("postmark");

const mongoose = require("mongoose");

const ErrorHandler = require("./middleware/errorHandler");
const router = require("./routes/users");
const errorHandler = require("./middleware/errorHandler");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const { PORT = 3000 } = process.env;

app.use("/users", router);

async function startServer() {
  try {
    await mongoose.connect("mongodb://localhost:27017/login");
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`App listening to ${PORT}`);
    });
  } catch (e) {
    console.error("MongoDB connection error:", e);
  }
}

app.use(errorHandler);

startServer();
