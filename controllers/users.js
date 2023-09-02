const {
  encryptPassword,
  createUnsecuredUserInformation,
  createTokenForUser,
} = require("../auth-utils");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// @desc Get all users
//@route GET /api/v1/users
//@access PUBLIC
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Get single user
//@route GET /api/v1/users/:id
//@access PUBLIC
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Create a new user
//@route POST /api/v1/users/
//@access PRIVATE
exports.createUser = async (req, res, next) => {
  try {
    const hashedPassword = await encryptPassword(req.body.password);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    console;
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(201).json({ success: false, error: err });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const password = req.body.password;
    const username = req.body.username;

    const user = await User.findOne({ username: username }).exec();

    if (!user) {
      return res.status(404).json({ message: "Username not found" });
    }

    const isPasswordCorrect = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const userInformation = createUnsecuredUserInformation(user);

    const token = createTokenForUser(userInformation);

    return res.status(200).json({ token, userInformation });
  } catch (err) {
    res.status(201).json({ success: false, error: err });
  }
};

// @desc Update single user
//@route PUT /api/v1/users/:id
//@access PRIVATE
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Delete single user
//@route DELETE /api/v1/users/:id
//@access PRIVATE
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
