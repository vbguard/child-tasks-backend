const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var goalsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    points: {
      type: Number,
      required: true
    },
    isDone: {
      type: Boolean,
      default: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    }
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Goals", goalsSchema);
