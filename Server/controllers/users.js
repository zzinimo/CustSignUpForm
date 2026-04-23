const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postmark = require("postmark");
const user = require("../models/user");
//sandbox API token. Change to My First Server to test real email
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

//practice using centralized error handler for getUser
module.exports.getUser = async (req, res, next) => {
  try {
    // does this return passwords?
    const users = await User.find({});
    if (users.length === 0) {
      const userError = new Error("No users found Zach");
      userError.statusCode = 404;
      return next(userError);
    }
    res.send({ data: users });
  } catch (e) {
    return next(e);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const noUserError = new Error("User Not Found!");
      noUserError.statusCode = 404;
      return next(noUserError);
    }
    return res.send({ data: user });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // send email after user is sent back to client
    try {
      await client.sendEmail({
        From: "zach.zinimon@autoboutique.com",
        To: email,
        Subject: `Hello ${firstName[0].toUpperCase() + firstName.slice(1)} thank you for signing up`,
        HtmlBody: `${firstName[0].toUpperCase() + firstName.slice(1)}, the email used to create your account is ${email}. Please do not share this email with anyone. There will be a representative that reaches out to you shorly, regarding your next steps! If you have any questions feel free to give us a call anytime. Thanks again!`,
        TextBody: `${firstName[0].toUpperCase() + firstName.slice(1)}, the email used to create your account is ${email}. Please do not share this email with anyone. There will be a representative that reaches out to you shortly, regarding your next steps! If you have any questions feel free to give us a call anytime. Thanks again!`,
        MessageStream: "outbound",
      });
    } catch (emailError) {
      console.error("Email failed:", emailError);
    }

    // Send response to client after user creation
    res.status(201).json({ message: "User created", user: newUser });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

//practicing using centralized error handler for deleteUser
module.exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      const deleteUserError = new Error(
        "Cannot delete this user, please try again",
      );
      return next(deleteUserError);
    }
    return res.send({ message: "User deleted" });
  } catch (e) {
    return next(e);
  }
};

//practicing centralized error handling with updateUser
module.exports.updateUser = async (req, res, next) => {
  const { firstName, lastName } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!user) {
      const updateUserError = new Error(
        "Could not find user to update, please try again",
      );
      return next(updateUserError);
    }

    return res.status(201).send("User updated");
  } catch (e) {
    next(e);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      const loginError = new Error("Invalid email or password");
      loginError.statusCode = 401;
      return next(loginError);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const bcryptError = new Error("Please check email or password");
      bcryptError.statusCode = 401;
      return next(bcryptError);
    }

    const userToSend = user.toObject();
    delete userToSend.password;
    delete userToSend.lastName;
    delete userToSend.email;
    //change to environment variable
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    return res.json({ user: userToSend, message: "Logged in successfully!" });
  } catch (e) {
    next(e);
  }
};

module.exports.verify = async (req, res, next) => {
  try {
    res.status(200).json({ authenticated: true, id: req.payload._id });
  } catch (e) {
    next(e);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    res.clearCookie("token", {
      maxAge: 3600000,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    next(e);
  }
};
