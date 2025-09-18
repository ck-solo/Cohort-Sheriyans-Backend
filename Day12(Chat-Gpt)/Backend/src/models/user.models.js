const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    FullName: {
      FirstName: {
        type: String,
        require: true,
      },
      LastName: {
        type: String,
        require: true,
      },
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userScheme);

module.exports = userModel;
