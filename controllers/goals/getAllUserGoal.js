const Goals = require('../../models/goals.model.js');

const getAllUserGoal = (req, res) => {
  // const userId = req.user._id;

  Goals.find().then(goals => {
    res.json({ goals });
  }).catch( err => res.status(400).json({ message: err.message }));
};

module.exports = getAllUserGoal;