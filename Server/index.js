require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const postmark = require("postmark");

const path = require("path");
app.use(express.static(path.join(__dirname, "../my-app/dis")));

const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

const ErrorHandler = require("./middleware/errorHandler");
const router = require("./routes/users");
const errorHandler = require("./middleware/errorHandler");

const allowedOrigins = [
  "https://my-app-frontend-kbwz.onrender.com",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
// Default root route to prevent 404 on backend root
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use(express.json());
app.use(cookieParser());
app.use("/users", router);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../my-app/dist/index.html"));
});

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
