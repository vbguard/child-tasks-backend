const Goals = require("../../models/goals.model.js");
const User = require("../../models/user.model.js");

const { ValidationError } = require("../../core/error");

const deleteGoal = (req, res) => {
  const userId = req.user._id;
  const goalId = req.params.goalId;

  const sendResponse = () => {
    res.json({
      status: "success"
    });
  };

  Goals.findByIdAndDelete({ userId, _id: goalId })
    .then(() => {
      User.findByIdAndUpdate(userId, { $pull: { goals: goalId } })
        .then(() => sendResponse())
        .catch(err => {
          throw new ValidationError(err.message);
        });
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = deleteGoal;
