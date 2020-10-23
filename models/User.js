const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "recruiter", "admin"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = User = mongoose.model("user", userSchema);
