const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const postmark = require("postmark");

const mongoose = require("mongoose");

const client = new postmark.ServerClient(
  "4a6c7651-1e9c-4132-9a20-c3671cb6e043",
);

client.sendEmail({
  From: "zach.zinimon@autoboutique.com",
  To: "zach.zinimon@autoboutique.com",
  Subject: "Subject Welcome to Postmark Zach!",
  Tag: "Practice Tag",
  HtmlBody: "<b>Hello Zach, you've sent a message, this is the HTML BODY</b>",
  TextBody: "TextBody",
});

const router = require("./routes/users");
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

startServer();
