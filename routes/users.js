const express = require("express");
const router = express.Router();

//controllers: get all the functions
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/users");

router.route("/").get(getUsers).post(loginUser);

router.route("/register").post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
