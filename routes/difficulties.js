const express = require("express");
const router = express.Router();

//controllers: get all the functions
const {
  getDifficulties,
  getDifficulty,
  createDifficulty,
  updateDifficulty,
  deleteDifficulty,
} = require("../controllers/difficulties");

router.route("/").get(getDifficulties).post(createDifficulty);

router
  .route("/:id")
  .get(getDifficulty)
  .put(updateDifficulty)
  .delete(deleteDifficulty);

module.exports = router;
