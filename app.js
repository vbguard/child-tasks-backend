require("dotenv").config();
require('./core/express-promise');
const express = require("express");
const app = express();
const config = require("./config/config.js");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

const { ValidationError } = require('./core/error');

const validationErrorHandler = require("./middleware/validation-error-handler");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

const router = require("./routes/routes.js");

const PORT = config.PORT;

const mode = process.env.NODE_ENV || "development";

mongoose
  .connect(config.MONGO_DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("DB Connected..."))
  .catch(err => console.log(err));

if (mode) {
  app.use(logger("dev"));
}

app
  .use(express.json({ limit: "2mb" }))
  .use(express.urlencoded({ extended: false, limit: "2mb" }))

  .use(passport.initialize())
  .use(passport.session());

require("./services/passport")(passport);

app
  .use("/api", router)
  .use("*", notFound)
  
  // add error handlers
  .use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: err.message });
    }
  
    next(err);
  })
  .use(validationErrorHandler)
  .use(errorHandler)

  .listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`);
  });
