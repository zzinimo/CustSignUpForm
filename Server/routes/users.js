const router = require("express").Router();
const {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  login,
  verify,
} = require("../controllers/users");

const { checkToken } = require("../middleware/middleware");

router.get("/me", checkToken, verify);

router.get("/", checkToken, getUser);

router.get("/:id", checkToken, getUserById);

router.patch("/:id", checkToken, updateUser);

router.post("/", createUser);

router.delete("/:id", checkToken, deleteUser);

//login route
router.post("/login", login);

module.exports = router;
