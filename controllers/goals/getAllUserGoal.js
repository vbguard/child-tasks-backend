const Goals = require("../../models/goals.model.js");
const { ValidationError } = require("../../core/error");

const getAllUserGoal = (req, res) => {
  const userId = req.user._id;

  const sendResponse = goals => {
    res.json({
      status: "success",
      goals
    });
  };

  Goals.find({ userId })
    .then(goals => {
      sendResponse(goals);
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = getAllUserGoal;
