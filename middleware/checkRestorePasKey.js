const checkRestorePasKey = (req, res, next) => {
  const { secret } = req.params;

  if (secret !== "some secret key") {
    res.redirect("/");
  }

  next();
};

module.exports = checkRestorePasKey;
