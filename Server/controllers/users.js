const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.getUser = async (req, res) => {
  try {
    // does this return passwords?
    const users = await User.find({});
    res.send({ data: users });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error" });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.send({ data: user });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error finding User" });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const userToReturn = await User.findById(newUser._id).select("-password");
    return res.status(201).send({ data: userToReturn });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error Creating User" });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.send({ data: deletedUser });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "error deleting user" });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: "Olivia",
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return res.status(201).send({ data: user });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error finding user" });
  }
};

module.exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const userToSend = user.toObject();
  delete userToSend.password;
  //change to environment variable
  const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
  res.cookie("token", token, {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.json({ user: userToSend, message: "Logged in successfully!" });
};

module.exports.verify = (req, res) => {
  res.status(200).json({ authenticated: true, id: req.payload._id });
};

module.exports.logOut = (req, res) => {
  res.clearCookie("token", {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
