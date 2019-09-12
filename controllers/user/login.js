const passport = require("passport");
const Joi = require("joi");
const { ValidationError } = require("../../core/error");

// Login User and get him Token for access to some route action
const userLogin = (req, res) => {
  console.log("userLogin");

  const schema = Joi.object()
    .keys({
      email: Joi.string().regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      ),
      password: Joi.string()
        .min(6)
        .max(16)
    })
    .options({
      presence: "required",
      stripUnknown: true,
      abortEarly: false
    });

  const result = schema.validate(req.body);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }

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
