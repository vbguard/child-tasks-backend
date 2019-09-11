const router = require("express").Router();
const passport = require('passport');

const { createTask } = require('../controllers/tasks/index');

const passportCheck = passport.authenticate("jwt", {
  session: false
});

router
  .get("/")
  .get("/:id")
  .post("/", passportCheck, createTask)
  .patch("/:id")
  .delete("/:id");

module.exports = router;
