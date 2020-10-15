const mongoosee = require("mongoose");

const messageSchema = new mongoosee.Schema(
  {
    content: String,
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = Message = mongoosee.model("message", messageSchema);
