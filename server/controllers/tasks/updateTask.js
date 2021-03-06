const Tasks = require("../../models/tasks.model.js");
const User = require("../../models/user.model.js");

const { ValidationError } = require("../../core/error");
const Joi = require("joi");

const updateTask = (req, res) => {
  const userId = req.user.id;
  // const isDone = req.body.isDone;
  // const inActive = req.body.inActive;

  const schema = Joi.object()
    .keys({
      title: Joi.string()
        .min(3)
        .max(20),
      points: Joi.number()
        .min(1)
        .max(10000),
      description: Joi.string()
        .min(1)
        .max(500),
      isDone: Joi.boolean(),
      inActive: Joi.boolean(),
      isComplete: Joi.boolean(),
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
      stripUnknown: true,
      abortEarly: false
    });

  const result = schema.validate(req.body);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }

  const { taskId } = req.params;
  const validData = result.value;

  const sendResponse = data => {
    res.json({
      status: "success",
      ...data
    });
  };

  const sendError = error => {
    const errMessage =
      error.message || "must handle this error on registration";
    res.json({
      status: "error",
      error: errMessage
    });
  };

  const validDataLength = Object.keys(validData).length;

  if (validDataLength === 0) {
    sendError({ message: "No valid Fields" });
    return;
  }

  Tasks.findOneAndUpdate({ _id: taskId }, { $set: validData }, { new: true })
    .then(task => {
      if (!task) {
        sendError({ message: "no such task" });
        return;
      }

      if (Object.keys(req.body).includes("isComplete")) {
        if (req.body.isComplete) {
          return User.findOneAndUpdate(
            { _id: userId },
            { $inc: { scores: task.points } },
            { new: true }
          )
            .then(updatedUser => {
              return sendResponse({
                task: task.getPublicFields(),
                user: { scores: updatedUser.scores }
              });
            })
            .catch(err => {
              throw new Error(err);
            });
        }

        if (!req.body.isComplete) {
          return User.findOneAndUpdate(
            { _id: userId },
            { $inc: { scores: -task.points } },
            { new: true }
          )
            .then(updatedUser => {
              return sendResponse({
                task: task.getPublicFields(),
                user: { scores: updatedUser.scores }
              });
            })
            .catch(err => {
              throw new Error(err);
            });
        }
      }

      sendResponse(task.getPublicFields());
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = updateTask;
