const DefaultTasks = require("../../models/defaultTasks.model");
const Joi = require("joi");
const { ValidationError } = require("../../core/error");

const createDefaultTasks = (req, res) => {
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
      presence: "required",
      stripUnknown: true,
      abortEarly: false
    });

  const result = schema.validate(req.body);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }
  const { title, description, points } = req.body;

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

  const newTask = new DefaultTasks({
    title,
    description,
    points
  });

  newTask
    .save()
    .then(task => {
      sendResponse(task.getPublicFields());
    })
    .catch(sendError);
};

module.exports = createDefaultTasks;
