const jwt = require("jsonwebtoken");
const secret = "secret";

const checkToken = (req, res, next) => {
  console.log("COOKIES request with token ", req.cookies);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Please login" });
  }

  try {
    const payload = jwt.verify(token, secret);
    req.payload = payload;
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  next();
};

module.exports = { checkToken };
