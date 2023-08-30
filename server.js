const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const logger = require("./middleware/logger");
const morgan = require("morgan");
const connectDB = require("./config/db");

//Route files
const users = require("./routes/users");
const difficulties = require("./routes/difficulties");
const scores = require("./routes/scores");

dotenv.config({ path: "./config/config.env" });

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/users", users);
app.use("/api/v1/difficulties", difficulties);
app.use("/api/v1/scores", scores);
app.get("/", (req, res) => {
  res.send("Success");
});

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
