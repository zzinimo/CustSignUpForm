const router = require("express").Router();
const {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  login,
} = require("../controllers/users");

router.get("/", getUser);

router.get("/:id", getUserById);

router.patch("/:id", updateUser);

router.post("/", createUser);

router.delete("/:id", deleteUser);

//login route
router.post("/login", login);

module.exports = router;
