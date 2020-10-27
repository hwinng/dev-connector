const { validationResult } = require("express-validator");

// Load Models
const User = require("../models/User");
const Job = require("../models/Job");

// @route   POST /api/jobs
// @desc    Create a job post
// @access  Recruiter only
const createJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    seniority,
    term,
    position,
    skills,
    description,
    location,
    salary,
    benefits,
    companyName,
    contactName,
    contactInfo,
    availability,
  } = req.body;

  try {
    const user = await User.findById(req.user.id).select("-password");

    const newJob = new Job({
      user: req.user.id,
      name: user.name,
      avatar: user.avatar,
      seniority,
      term,
      position,
      skills,
      description,
      location,
      salary,
      benefits,
      companyName,
      contactName,
      contactInfo,
      availability,
    });

    const job = await newJob.save();

    res.json(job);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET /api/jobs
// @desc    Get all job postings
// @access  Public
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ date: -1 });

    res.send(jobs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getJobs,
  createJob,
};
