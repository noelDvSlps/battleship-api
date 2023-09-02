const mongoose = require("mongoose");
const dotenv = require("dotenv");

// load env
dotenv.config({ path: "./config/config.env" });

//load models
const User = require("./models/User");
const Difficulty = require("./models/Difficulty");
const Score = require("./models/Score");

//connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//create user func
createUser = async (username, password) => {
  try {
    await User.create({
      username,
      password,
    });
  } catch (err) {
    console.log(err);
  }
};

//create users func
createUsers = async (users) => {
  await users.forEach(async (user) => {
    await createUser(user.username, user.password);
  });
};
1;
//create user func
createScore = async (userId, score) => {
  try {
    await User.create({
      username,
      password,
    });
  } catch (err) {
    console.log(err);
  }
};

//create diff func
createDifficulty = async (_id, difficulty, gridSize, scores) => {
  try {
    await Difficulty.create({
      _id,
      difficulty,
      gridSize,
      scores,
    });
  } catch (err) {
    console.log(err);
  }
};

//create diff func
createScore = async () => {
  try {
    const user = await User.findOne({
      username: users[Math.floor(Math.random() * users.length)].username,
    }).exec();
    const userId = user._id;
    await Score.create({
      value: 1000 + Math.floor(Math.random() * 1000),
      userId,
      difficultyId: difficulties[Math.floor(Math.random() * 3)]._id,
    });
  } catch (err) {
    console.log(err);
  }
};

//import into DB
const importData = async () => {
  try {
    await Score.create({ value: 500 });
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

//delete into DB
const deleteData = async () => {
  try {
    await Score.deleteMany();
    await User.deleteMany();
    await Difficulty.deleteMany();
  } catch (e) {
    console.log(e);
  }
};
const difficulties = [
  {
    _id: "64eedd7f6efeb1415d5873fb",
    difficulty: "Easy",
    gridSize: 6,
    scores: [],
  },
  {
    _id: "64eef2c75918a59af78c946c",
    difficulty: "Medium",
    gridSize: 9,
    scores: [],
  },
  {
    _id: "64eef2d65918a59af78c946e",
    difficulty: "Hard",
    gridSize: 12,
    scores: [],
  },
];
const users = [
  {
    username: "battleship",
    password: "$2b$11$fi6yU.kySoql8QvYYvsXeuKa6TahaZamhKe2SjjdaRXTu/sy34Hxe",
  },
  {
    username: "eminem",
    password: "$2b$11$cjRxMs0WrnVO2G3RDq2g4OWGRcaJ8fTKx4QiCbV2do/viTUByIjoi",
  },
  {
    username: "devslopes",
    password: "$2b$11$fHjLyW.71DdTy2a5gJkOcu8R7CIMf48u261sPOD8upYQ1kRhsJdTm",
  },
];

reseed = async () => {
  console.log("Seeding started...🌱🌱🌱");
  try {
    console.log("🌱🌱🌱 deleting...");
    await deleteData();
    console.log("🌱🌱🌱 creating users collection...");
    for (let i = 0; i < users.length; i++) {
      console.log(`🌱 creating user ${i + 1} of ${users.length}...`);
      await createUser(users[i].username, users[0].password);
    }
    console.log("🌱🌱🌱 creating difficulty collection...");
    difficulties.forEach(async (diff) => {
      console.log(`🌱 creating difficulty ${diff.difficulty}`);
      await createDifficulty(
        diff._id,
        diff.difficulty,
        diff.gridSize,
        diff.scores
      );
    });
    console.log("🌱🌱🌱 creating scores collection...");
    const numScores = 50;
    for (let i = 0; i < numScores; i++) {
      console.log(`🌱 creating score ${i + 1} of ${numScores} `);
      await createScore();
    }
    console.log("Seeded🌱🌱🌱");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

reseed();
