const User = require("../../models/user.model");
const login = require("./login");

// Register New User and Check this email have in DB
const userSignup = (req, res) => {
  const sendError = error => {
    const errMessage =
      error.message || "must handle this error on registration";
    res.json({
      status: "error",
      error: errMessage
    });
  };

  if (!req.body.email || !req.body.password) {
    sendError({ message: "Please enter email and password." });
    return;
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    newUser
      .save()
      .then(() => {
        login(req, res);
      })
      .catch(sendError);
  }
};

module.exports = userSignup;
