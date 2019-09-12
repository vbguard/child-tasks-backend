const sgMail = require("@sendgrid/mail");
const User = require("../../models/user.model");
const Joi = require("joi");
const { ValidationError } = require("../../core/error");

const restorePassword = async (req, res) => {
  // REF

  const schema = Joi.object()
    .keys({
      email: Joi.string().regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
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

  const { email } = req.body;

  const newPassword = Math.random()
    .toString(36)
    .substring(5);

  const user = await User.findOne({ email });

  if (user) {
    user.password = newPassword;
    user.save();

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: user.email,
      from: "child-task@goit.co.ua",
      subject: "Restore your password",
      // text: "Restore your password",
      html: `<h2>Ваш новый пароль: ${newPassword}</h2>`
    };
    sgMail.send(msg, (err, result) => {
      if (err) res.send(err.message);
      if (result) res.send(result);
    });
  } else {
    res.send("error");
  }
};

module.exports = restorePassword;
