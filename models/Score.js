const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScoreSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: [true, "Please add value"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  difficultyId: {
    type: Schema.Types.ObjectId,
    ref: "Difficulty",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Score", ScoreSchema);
