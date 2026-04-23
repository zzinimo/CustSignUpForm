require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const postmark = require("postmark");

const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

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
app.use("/users", router);

const isProduction = process.env.NODE_ENV === "production";
const atlasURI = process.env.DATABASE_URL;

async function startServer() {
  try {
    await mongoose.connect(atlasURI);

    if (isProduction) {
      console.log("Connected to Production Atlas Cluster");
    } else {
      console.log("Connected to Atlas (Development Mode)");
    }
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`App listening to ${PORT}`);
    });
  } catch (e) {
    console.error("Connection failed", e.message);
    process.exit(1);
  }
}

app.use(errorHandler);

startServer();
