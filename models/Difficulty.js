const mongoose = require("mongoose");
const { Schema } = mongoose;

const DifficultySchema = new mongoose.Schema({
  difficulty: {
    type: String,
    required: [true, "Please add difficulty"],
  },
  gridSize: {
    type: Number,
    required: [true, "Please add gridSize"],
  },
  scores: [
    {
      type: Schema.Types.ObjectId,
      ref: "Score",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Difficulty", DifficultySchema);
