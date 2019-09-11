const router = require("express").Router();

const authRouter = require("./auth.router");
const goalsRouter = require("./goals.router");
const tasksRouter = require("./tasks.router");
const userRouter = require("./user.router");

router
  .use("/auth", authRouter)
  .use("/goals", goalsRouter)
  .use("/tasks", tasksRouter)
  .use("/user", userRouter);


module.exports = router;
