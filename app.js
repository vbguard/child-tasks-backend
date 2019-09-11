require("dotenv").config();
const express = require("express");
const app = express();
const config = require("./config/config.js");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

// const validationErrorHandler = require("./middleware/validation-error-handler");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

const router = require("./routes/routes.js");

const PORT = config.PORT;

const mode = process.env.NODE_ENV || "development";

mongoose.connect(
  config.MONGO_DB_URL,
  { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true },
  () => {
    console.log("DB Connected...");
  }
);

if (mode) {
  app.use(logger("dev"));
}

app
  .use(express.json({ limit: "2mb" }))
  .use(express.urlencoded({ extended: false, limit: "2mb" }))

  .use(passport.initialize())
  .use(passport.session())

  .use("/api", router)
  .use("/*", notFound)

  // add error handlers
  // app.use(validationErrorHandler);
  .use(errorHandler)

  .listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`);
  });
