const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");

const router = require("./routes/users");
app.use(cors());
app.use(express.json());

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

startServer();
