const router = require("express").Router();

router
  .get("/goals")
  .get("/goals/:id")
  .post("/goals")
  .patch("/goals/:id")
  .delete("/goals/:id");

module.exports = router;
