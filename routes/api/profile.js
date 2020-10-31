require("dotenv").config();
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../../middlewares/auth");
const {
  viewMyProfile,
  createAndUpdateProfile,
  getProfiles,
  getProfile,
  removeProfile,
  addExperience,
  removeExperience,
  addEducation,
  removeEducation,
  getUserRepos,
} = require("../../controllers/profile.controller");

// @route   GET api/profile/me
// @desc    Get the current user profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  await viewMyProfile(req, res);
});

//@route POST api/profile
// @desc Create or update user profile
//access Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required.").not().isEmpty(),
      check("skills", "Skill is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    await createAndUpdateProfile(req, res);
  }
);

// @route   GET api/profile/
// @desc    Get all the profile
// @access  Public
router.get("/", async (req, res) => {
  await getProfiles(req, res);
});

// @route   GET api/profile/user/:user_id
// @desc    Get the profile by user id
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  await getProfile(req, res);
});

// @route   DELETE api/profile
// @desc    Delete profile, user
// @access  Private
router.delete("/", auth, async (req, res) => {
  await removeProfile(req, res);
});

// @route   PUT api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "This field is required.").not().isEmpty(),
      check("company", "This field is required.").not().isEmpty(),
      check("from", "This field is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    await addExperience(req, res);
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience by Id
// @access  Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  await removeExperience(req, res);
});

// @route   PUT api/profile/education
// @desc    Add education to profile
// @access  Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "This field is required.").not().isEmpty(),
      check("degree", "This field is required.").not().isEmpty(),
      check("fieldofstudy", "This field is required.").not().isEmpty(),
      check("from", "This field is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    await addEducation(req, res);
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education by Id
// @access  Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  await removeEducation(req, res);
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get("/github/:username", (req, res) => {
  getUserRepos(req, res);
});
module.exports = router;
