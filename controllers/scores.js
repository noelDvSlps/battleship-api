const Score = require("../models/Score");

// @desc Get all scores
//@route GET /api/v1/scores
//@access PUBLIC
exports.getScores = async (req, res, next) => {
  const query = !req.query.level ? {} : { difficultyId: req.query.level };
  try {
    const scores = await Score.find(query)
      .sort({
        value: -1,
      })
      .limit(10)
      .populate("userId", { username: 1 })
      .populate("difficultyId", { difficulty: 1 })
      .exec();
    res.status(200).json({ success: true, count: scores.length, data: scores });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Get single score
//@route GET /api/v1/scores/:id
//@access PUBLIC
exports.getScore = async (req, res, next) => {
  try {
    const score = await Score.findById(req.params.id);
    if (!score) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: score });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Create a new score
//@route POST /api/v1/scores/
//@access PRIVATE
exports.createScore = async (req, res, next) => {
  try {
    let score = await Score.create(req.body);
    score = await Score.findById(score._id)
      .populate("userId")
      .populate("difficultyId")
      .exec();
    res.status(201).json({ success: true, data: score });
  } catch (err) {
    res.status(401).json({ success: false, error: err });
  }
};

// @desc Update single score
//@route PUT /api/v1/scores/:id
//@access PRIVATE
exports.updateScore = async (req, res, next) => {
  try {
    const score = await Score.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!score) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: score });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Delete single score
//@route DELETE /api/v1/scores/:id
//@access PRIVATE
exports.deleteScore = async (req, res, next) => {
  try {
    const score = await Score.findByIdAndDelete(req.params.id);
    if (!score) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
