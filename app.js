const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// const dotenv = require("dotenv");

const contactsRouter = require("./routes/api/contacts");
const userRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
  // res.status(500).json({ message: error.message })
});

module.exports = app;
