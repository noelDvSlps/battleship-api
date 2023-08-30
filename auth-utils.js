const bcrypt = require("bcrypt");
const { NextFunction, Request, Response } = "express";
const jwt = require("jsonwebtoken");
const { z } = "zod";
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const saltRounds = 11;

const encryptPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
};

const createUnsecuredUserInformation = (user) => ({
  username: user.username,
  userId: user.id,
});

const createTokenForUser = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

const createTokenForApp = () => {
  return jwt.sign(process.env.JWT_SECRET, process.env.JWT_SECRET);
};

const getDataFromAuthToken = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const authMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization?.split?.(" ") || [];
  const myJwtData = getDataFromAuthToken(token);
  if (!myJwtData) {
    return res.status(401).json({ message: "invalid Token" });
  }

  const userFromJwt = await prisma.user.findFirst({
    where: {
      username: myJwtData.username,
    },
  });

  if (!userFromJwt) {
    return res.status(401).json({ message: "user not found" });
  }
  // req.user = userFromJwt;
  next();
};

module.exports = {
  encryptPassword,
  createUnsecuredUserInformation,
  createTokenForUser,
  createTokenForApp,
  getDataFromAuthToken,
  authMiddleware,
};
