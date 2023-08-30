const Difficulty = require("../models/Difficulty");

// @desc Get all difficulties
//@route GET /api/v1/difficulties
//@access PUBLIC
exports.getDifficulties = async (req, res, next) => {
  try {
    const difficulties = await Difficulty.find();
    res
      .status(200)
      .json({ success: true, count: difficulties.length, data: difficulties });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Get single difficulty
//@route GET /api/v1/difficulties/:id
//@access PUBLIC
exports.getDifficulty = async (req, res, next) => {
  try {
    const difficulty = await Difficulty.findById(req.params.id);
    if (!difficulty) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: difficulty });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Create a new difficulty
//@route POST /api/v1/difficulties/
//@access PRIVATE
exports.createDifficulty = async (req, res, next) => {
  try {
    const difficulty = await Difficulty.create(req.body);
    res.status(201).json({ success: true, data: difficulty });
  } catch (err) {
    res.status(201).json({ success: false, error: err });
  }
};

// @desc Update single difficulty
//@route PUT /api/v1/difficulties/:id
//@access PRIVATE
exports.updateDifficulty = async (req, res, next) => {
  try {
    let difficulty = await Difficulty.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!difficulty) {
      return res.status(400).json({ success: false });
    }
    difficulty = await Difficulty.findById(difficulty._id)
      .populate("scores")
      .exec();

    res.status(200).json({ success: true, data: difficulty });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Delete single difficulty
//@route DELETE /api/v1/difficulties/:id
//@access PRIVATE
exports.deleteDifficulty = async (req, res, next) => {
  try {
    const difficulty = await Difficulty.findByIdAndDelete(req.params.id);
    if (!difficulty) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
