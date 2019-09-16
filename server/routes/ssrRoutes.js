const router = require("express").Router();
const next = require("next");
// const pathMatch = require("path-match");
const dev = process.env.NODE_ENV !== "production";
const nextjs = next({ dev });

router
  .use(async (req, res, next) => {
    await nextjs.prepare();
    next();
  })
  .get("/admin", (req, res) => {
    return nextjs.render(req, res, "/admin");
  })
  .get("/restore/:token", (req, res) => {
    return nextjs.render(req, res, "/restore");
  });

module.exports = router;
