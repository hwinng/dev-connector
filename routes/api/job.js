const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middlewares/auth");

const User = require("../../models/User");
const Job = require("../../models/Job");

// @route   POST api/jobs
// @desc    Add a job new
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "This field is required").not().isEmpty(),
      check("salary", "This field is required").not().isEmpty(),
      check("description", "This field is required").not().isEmpty(),
      check("skills", "This field is required").not().isEmpty(),
      check("location", "This field is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Build a job object
    const { title, salary, description, skills, location } = req.body;

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newJob = new Job({
        user: req.user.id,
        title,
        description,
        location,
        skills,
        salary,
      });

      const job = await newJob.save();
      res.json(job);
    } catch (err) {
      res.status(500).json("Server errors");
    }
  }
);

module.exports = router;
