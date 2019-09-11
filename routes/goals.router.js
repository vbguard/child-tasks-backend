const router = require("express").Router();
const passport = require('passport');

const { createGoal, getAllUserGoals } = require('../controllers/goals/index');

const passportCheck = passport.authenticate("jwt", {
  session: false
});

router
  .post('/',passportCheck, createGoal)
  .get("/", getAllUserGoals)
  .get("/:id")
  .patch("/:id")
  .delete("/:id");

module.exports = router;
