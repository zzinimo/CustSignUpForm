const User = require("../models/user");

module.exports.getUser = async (req, res) => {
  try {
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
    const { firstName, lastName, password } = req.body;
    const newUser = await User.create({
      firstName,
      lastName,
      password,
    });
    return res.status(201).send({ data: newUser });
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
