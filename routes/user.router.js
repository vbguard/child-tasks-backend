const router = require("express").Router();

router
  .post("/user/:id")
  .get("/user/:id")
  .delete("/user/:id")
  .put("/user/:id")
  .post("/user/restore");

module.exports = router;
