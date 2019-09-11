const router = require("express").Router();
const authRouter = require("./auth.router");
const goalsRouter = require("./auth.router");
const tasksRouter = require("./auth.router");
const userRouter = require("./auth.router");

router
  .use("/auth", authRouter)
  .use("/goals", goalsRouter)
  .use("/tasks", tasksRouter)
  .use("/user", userRouter);

module.exports = router;
