const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = Job = mongoose.model("job", jobSchema);
