const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    password: {
      type: String,
      required: true,
      index: true
    },
    isChild: {
      type: Boolean,
      required: true
    },
    goals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Goals"
      }
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tasks"
      }
    ],
    scores: {
      type: Number,
      default: 0
    },
    token: {
      type: String
    }
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Users", userSchema);
