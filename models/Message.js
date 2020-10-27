const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    message: {
      type: String,
      required: true,
    },
    ip: String,
    agent: {
      platform: String,
      os: String,
    },
    partialIp: String,
    timezone: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", messageSchema);
