const Tasks = require("../../models/tasks.model.js");
const { ValidationError } = require("../../core/error");

const getAllUserTasks = (req, res) => {
  const userId = req.user._id;

  const sendResponse = tasks => {
    res.json({
      status: "success",
      tasks
    });
  };

  Tasks.find({ userId })
    .then(tasks => {
      sendResponse(tasks);
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = getAllUserTasks;
