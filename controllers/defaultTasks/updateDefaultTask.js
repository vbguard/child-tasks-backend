const DefaultTasks = require("../../models/defaultTasks.model");

const { ValidationError } = require("../../core/error");
const Joi = require("joi");

const updateDefaultTask = (req, res) => {
  const schema = Joi.object()
    .keys({
      title: Joi.string()
        .min(3)
        .max(20),
      description: Joi.string()
        .min(3)
        .max(500),
      points: Joi.number()
        .min(1)
        .max(20000)

      // deadline
    })
    .options({
      // presence: "required",
      stripUnknown: true,
      abortEarly: false
    });

  const result = schema.validate(req.body);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }

  const taskId = req.params.taskId;
  const newData = req.body;

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

  DefaultTasks.findByIdAndUpdate(taskId, { $set: newData }, { new: true })
    .then(task => {
      if (!task) {
        sendError({ message: "no such task" });
        return;
      }
      sendResponse(task.getPublicFields());
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = updateDefaultTask;
