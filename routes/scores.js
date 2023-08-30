const express = require("express");
const router = express.Router();

//controllers: get all the functions
const {
  getScores,
  getScore,
  createScore,
  updateScore,
  deleteScore,
} = require("../controllers/scores");

router.route("/").get(getScores).post(createScore);

router.route("/:id").get(getScore).put(updateScore).delete(deleteScore);

module.exports = router;
