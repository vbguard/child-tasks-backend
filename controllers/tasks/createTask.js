const Tasks = require("../../models/tasks.model.js");
const User = require("../../models/user.model");
const Joi = require("joi");
const { ValidationError } = require("../../core/error");

const createTask = async (req, res) => {
  const schema = Joi.object()
    .keys({
      title: Joi.string()
        .min(3)
        .max(20),
      points: Joi.number()
        .min(1)
        .max(500),
      deadline: Joi.string().valid([
        "8.00-10.00",
        "10.00-12.00",
        "12.00-14.00",
        "14.00-16.00",
        "16.00-18.00",
        "18.00-20.00",
        "20.00-22.00",
        "No time"
      ])
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

  const sendResponse = task => {
    res.json({
      status: "success",
      task
    });
  };

  const newTask = new Tasks({
    userId: req.user._id,
    title: req.body.title,
    points: req.body.points,
    deadline: req.body.deadline
  });

  User.findByIdAndUpdate(req.user._id, { $push: { tasks: newTask._id } })
    .then(updatedUser => {
      if (updatedUser) {
        newTask
          .save()
          .then(task => {
            if (task) {
              sendResponse(task);
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

module.exports = createTask;
