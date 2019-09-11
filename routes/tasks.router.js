const router = require("express").Router();

router
  .get("/tasks")
  .get("/tasks/:id")
  .post("/tasks")
  .patch("/tasks/:id")
  .delete("/tasks/:id");

module.exports = router;
