const router = require("express").Router();
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextjs = next({ dev });

router
  .use(async (req, res, next) => {
    await nextjs.prepare();
    next();
  })
  .get("/", (req, res) => {
    return nextjs.render(req, res, "admin");
  })
  .get("/admin", (req, res) => {
    return res.render("admin");
  })
  .get("/restore/:token", (req, res) => {
    return res.render("restore/Restore");
  })
  .all("*", (req, res) => res.render("notFound"));

module.exports = router;
