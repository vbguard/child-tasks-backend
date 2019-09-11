const passport = require("passport");

// Login User and get him Token for access to some route action
const userLogin = (req, res) => {
  console.log("userLogin");
  passport.authenticate(
    "local",
    {
      session: false
    },
    (err, user, info) => {
      console.log("user from login:", user);

      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : "Login failed",
          user: user
        });
      }

      req.login(
        user,
        {
          session: false
        },
        err => {
          if (err) {
            res.send(err);
          }

          console.log("user2 :", user);
          return res.json({
            user
          });
        }
      );
    }
  )(req, res);
};

module.exports = userLogin;
