const router = require("express").Router();

router
  .post("/login")
  .post("/register")
  .post("/logout");

module.exports = router;
