const router = require("express").Router();
const {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
} = require("../controllers/users");

router.get("/", getUser);

router.get("/:id", getUserById);

router.patch("/:id", updateUser);

router.post("/", createUser);

router.delete("/:id", deleteUser);

module.exports = router;
