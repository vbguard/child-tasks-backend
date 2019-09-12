const router = require("express").Router();
const { restorePassword } = require("../controllers/user");

router
  .post("/:id")
  .get("/:id")
  .delete("/:id")
  .put("/:id")
  .post("/restore", restorePassword);

module.exports = router;
