const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../config/config");
// Declare the Schema of the Mongo model
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
      // required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    age: {
      type: Number
      // required: true
    },
    password: {
      type: String,
      required: true
    },
    isChild: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: String
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
    },
    facebookId: {
      type: String
    },
    googleId: {
      type: String
    }
  },
  { timestamps: true }
);
// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre("save", function(next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSalt(10), null);
};

UserSchema.methods.validatePassword = function(password) {
  console.log("validate :", password);
  const compare = bcrypt.compareSync(password, this.password);
  console.log("compare :", compare);
  return compare;
};

UserSchema.methods.getJWT = function() {
  const preToken = jwt.sign(
    {
      id: this._id
    },
    config.JWT_SECRET_KEY
  );

  const token = `Bearer ${preToken}`;

  this.token = token;
  this.save();
  return token;
};

//Export the model
module.exports = mongoose.model("Users", UserSchema);
