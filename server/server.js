require("dotenv").config();
require("./core/express-promise");
const express = require("express");
const app = express();
const config = require("../config/config");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const path = require("path");

// NEXT
const next = require("next");
const dev = process.env.NODE_DEV !== "production"; //true false
const nextApp = next({ dev });
// const handle = nextApp.getRequestHandler(); //part of next config

const { ValidationError } = require("./core/error");

// middleware
const validationErrorHandler = require("./middleware/validation-error-handler");
const errorHandler = require("./middleware/error-handler");
// const notFound = require("./middleware/not-found");

const router = require("./routes/routes.js");
const ssrRoutes = require("./routes/ssrRoutes.js");

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
// nextApp
//   .prepare()
//   .then(() => {
app

  .use(express.json({ limit: "2mb" }))
  .use(express.urlencoded({ extended: false, limit: "2mb" }))
  .use(
    session({
      secret: "super-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    })
  )

  .use(passport.initialize())
  .use(passport.session());
require("./services/passport")(passport);

app
  .use("/api", router)
  .use("/_next", express.static(path.join(__dirname, "../.next")))
  .get("*", ssrRoutes)
  // .use("*", notFound)
  // add error handlers

  .use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(400).json({ status: "error", message: err.message });
    }
    next(err);
  })

  // .use(validationErrorHandler)
  // .use(errorHandler)

  .listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`);
  });
// })
// .catch(error => console.error(error));
