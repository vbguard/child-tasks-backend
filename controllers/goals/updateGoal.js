const Goals = require("../../models/goals.model.js");
const { ValidationError } = require("../../core/error");
const Joi = require("joi");

const updateGoal = (req, res) => {
  const goalId = req.params.goalId;
  const newData = req.body;
  console.log({ newData });

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
      isDone: Joi.boolean()
    })
    .options({
      stripUnknown: true,
      abortEarly: false
    });

  const result = schema.validate(req.body);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }

  const sendResponse = goal => {
    res.json({
      status: "success",
      goal
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

  Goals.findByIdAndUpdate(goalId, { $set: newData }, { new: true })
    .lean()
    .then(goal => {
      if (!goal) {
        sendError({ message: "no such goal" });
        return;
      }
      delete goal.__v;
      delete goal.userId;

      sendResponse(goal);
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = updateGoal;
