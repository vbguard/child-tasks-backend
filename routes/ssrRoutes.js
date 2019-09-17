const router = require("express").Router();

const { notFound } = require("../helpers/views");
// const notFound = require("../helpers/views/notFound.view.jsx");

router
  // .get("/admin", (req, res) => {
  //   return res.render("index");
  // })
  // .get("/restore/:token", (req, res) => {
  //   return res.render("/restore");
  // })
  .all("*", notFound);

module.exports = router;
