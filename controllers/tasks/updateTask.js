const Tasks = require("../../models/tasks.model.js");

const { ValidationError } = require("../../core/error");
const Joi = require("joi");

const updateTask = (req, res) => {
  const taskId = req.params.taskId;
  const newData = req.body;

  const schema = Joi.object()
    .keys({
      title: Joi.string()
        .min(3)
        .max(20),
      points: Joi.number()
        .min(1)
        .max(20000),
      description: Joi.string()
        .min(1)
        .max(500),
      isDone: Joi.boolean(),
      isBlocked: Joi.boolean()
    })
    .options({
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

  const sendError = error => {
    const errMessage =
      error.message || "must handle this error on registration";
    res.json({
      status: "error",
      error: errMessage
    });
  };

  Tasks.findByIdAndUpdate(taskId, { $set: newData }, { new: true })
    .lean()
    .then(task => {
      if (!task) {
        sendError({ message: "no such task" });
        return;
      }
      delete task.__v;
      delete task.userId;

      sendResponse(task);
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = updateTask;
