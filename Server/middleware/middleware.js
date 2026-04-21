const jwt = require("jsonwebtoken");
const secret = "secret";

const checkToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Please login" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  next();
};

module.exports = { checkToken };
