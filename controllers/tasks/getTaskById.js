const Tasks = require("../../models/tasks.model.js");

const { ValidationError } = require("../../core/error");

const getTaskById = (req, res) => {
  const userId = req.user._id;
  const taskId = req.params.taskId;

  const sendResponse = task => {
    res.json({
      status: "success",
      task
    });
  };

  const sendError = error => {
    const errMessage =
      error.message || "must handle this error on registration";
    res.status(400).json({
      status: "error",
      error: errMessage
    });
  };

  Tasks.findById({ userId, _id: taskId })
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

module.exports = getTaskById;
