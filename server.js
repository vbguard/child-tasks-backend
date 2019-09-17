require("dotenv").config();
require("./core/express-promise");
const express = require("express");
// const app = express();
const config = require("./config/config");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const next = require("next");
const chalk = require("chalk");
const sassMiddleware = require("node-sass-middleware");
// const path = require("path");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./services/swagger.json");

// core
const { ValidationError } = require("./core/error");
const onError = require("./core/onError");

// middleware
// const validationErrorHandler = require("./middleware/validation-error-handler");
// const errorHandler = require("./middleware/error-handler");

const router = require("./routes/routes.js");
const ssrRoutes = require("./routes/ssrRoutes.js");

const PORT = config.PORT;

const mode = process.env.NODE_ENV || "development";

const dev = process.env.NODE_ENV !== "production";
const nextjs = next({ dev });
const handle = nextjs.getRequestHandler();

nextjs.prepare().then(() => {
  const app = express();
  mongoose
    .connect(config.MONGO_DB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => console.error(chalk.yellow(`DB Connected...`)))
    .catch(err => console.log(err));

  if (mode) {
    app.use(logger("dev"));
  }

  app
    .disable("x-powered-by")
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

    // ssr
    .set("views", __dirname + "/views")
    .set("view engine", "jsx")
    .engine("jsx", require("express-react-views").createEngine())
    .use(
      sassMiddleware({
        src: path.join(__dirname, "public"),
        dest: path.join(__dirname, "public"),
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true
      })
    )

    .use(passport.initialize())
    .use(passport.session());
  require("./services/passport")(passport);

  app
    .use(express.static(path.resolve(__dirname, "static")))
    .use("/_next", express.static(path.resolve(__dirname, ".next")))
    .use("/public", express.static(path.join(__dirname, "public")))
    .use("/api", router)
    .use(
      "/doc",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, { customeSiteTitle: "Task Manager" })
    )
    // .use("/", ssrRoutes)

    .get("/auth", (req, res) => {
      return nextjs.render(req, res, "auth");
    })
    .get("/admin", (req, res) => {
      return nextjs.render(req, res, "admin");
    })
    .get("/restore/:token", (req, res) => {
      return nextjs.render(req, res, "restore/Restore");
    })
    .all("*", (req, res) => {
      return handle(req, res, "notfound");
    })

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
      console.error(
        `Server start on ${chalk.yellow(`http://localhost:${PORT}`)}`
      );
    })
    .on("error", onError);
});
