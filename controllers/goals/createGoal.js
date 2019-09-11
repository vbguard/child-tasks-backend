const Goals = require("../../models/goals.model.js");
const User = require("../../models/user.model");
const Joi = require("joi");
const { ValidationError } = require("../../core/error");

const createGoal = async (req, res) => {
  const schema = Joi.object()
    .keys({
      title: Joi.string()
        .min(3)
        .max(20),
      points: Joi.number()
        .min(1)
        .max(20000)
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

  const newGoal = new Goals({
    userId: req.user._id,
    title: req.body.title,
    points: req.body.points
  });

  User.findByIdAndUpdate(req.user._id, { $push: { goals: newGoal._id } })
    .then(updatedUser => {
      if (updatedUser) {
        newGoal
          .save()
          .then(goal => {
            if (goal) {
              res.json(goal);
            }
          })
          .catch(err => {
            throw new ValidationError(err.message);
          });
      }
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = createGoal;
