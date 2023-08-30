const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add username"],
    unique: true,
    trim: true,
    maxlength: [20, "Username cannot be more than 20 characters"],
  },
  password: {
    type: String,
    required: [true, "Please add password"],
    trim: true,
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

module.exports = mongoose.model("User", UserSchema);
