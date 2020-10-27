const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middlewares/auth");
const { checkRole } = require("../../middlewares/classifyRole");

// controllers
const { createJob, getJobs } = require("../../controllers/job.controller");

// @route   POST /api/jobs
// @desc    Create a job post
// @access  Recruiter only
router.post(
  "/",
  [
    auth,
    checkRole(["recruiter"]),
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
    await createJob(req, res);
  }
);

// @route   GET /api/jobs
// @desc    Get all job postings
// @access  Public
router.get("/", async (req, res) => {
  await getJobs(req, res);
});

module.exports = router;
