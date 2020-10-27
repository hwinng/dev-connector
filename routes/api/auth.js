require("dotenv").config();
const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const { userLogin, getAuth } = require("../../controllers/auth.controller");

// @route   GET api/auth
// @desc    get the user login information without password
// @access  Public
router.get("/", auth, async (req, res) => {
  await getAuth(req, res);
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
