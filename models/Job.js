const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  // Reference the user model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  seniority: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
  },
  benefits: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  companyName: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

module.exports = Job = mongoose.model("job", JobSchema);
