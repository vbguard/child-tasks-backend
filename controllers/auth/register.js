const User = require("../../models/user.model");
const login = require("./login");
const Joi = require("joi");
const { ValidationError } = require("../../core/error");

// Register New User and Check this email have in DB
const userSignup = (req, res) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string().regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      ),
      password: Joi.string()
        .min(6)
        .max(16),
      name: Joi.string()
        .min(3)
        .max(16),
      age: Joi.number()
        .min(1)
        .max(99)
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
