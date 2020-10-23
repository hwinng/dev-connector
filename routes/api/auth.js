require("dotenv").config();
const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const { userLogin } = require("../../utils/Authentication");

// @route   GET api/auth
// @desc    get the user login information without password
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error..." });
  }
});

// @route POST api/auth
// @desc User login
// @access Public
router.post("/", async (req, res) => {
  await userLogin(req, res, "user");
});

// @route POST api/auth/login-recruiter
// @desc Recruiter login
// @access Public
router.post("/login-recruiter", async (req, res) => {
  await userLogin(req, res, "recruiter");
});

// @route POST api/auth/login-admin
// @desc Admin login
// @access Public
router.post("/login-admin", async (req, res) => {
  await userLogin(req, res, "admin");
});
module.exports = router;
