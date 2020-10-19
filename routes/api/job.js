const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middlewares/auth");

// Load Models
const User = require("../../models/User");
const Job = require("../../models/Job");

// @route   POST /api/jobs
// @desc    Create a job post
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("seniority", "Seniority field is required").not().isEmpty(),
      check("term", "Term field is required").not().isEmpty(),
      check("position", "Position field is required").not().isEmpty(),
      check("skills", "Skills field is required").not().isEmpty(),
      check("description", "Description field is required").not().isEmpty(),
      check("location", "Location field is required").not().isEmpty(),
      check("contactName", "Contact name is required").not().isEmpty(),
      check("contactInfo", "Contact information is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
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
  }
);

// @route   GET /api/jobs
// @desc    Get all job postings
// @access  Public
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ date: -1 });

    res.send(jobs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
