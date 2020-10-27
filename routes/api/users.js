require("dotenv").config();
const express = require("express");
const router = express.Router();
const { userRegister } = require("../../controllers/user.controller");
const { check } = require("express-validator");

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "Please include a valid email.").isEmail(),
    check("password", "Password is at least 6 characters.").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    await userRegister(req, res, "user");
  }
);

// @route   POST api/users/register-recruiter
// @desc    Register recruiter
// @access  Public
router.post(
  "/register-recruiter",
  [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "Please include a valid email.").isEmail(),
    check("password", "Password is at least 6 characters.").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    await userRegister(req, res, "recruiter");
  }
);

// @route   POST api/users/register-admin
// @desc    Register admin
// @access  Public
router.post(
  "/register-admin",
  [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "Please include a valid email.").isEmail(),
    check("password", "Password is at least 6 characters.").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    await userRegister(req, res, "admin");
  }
);

module.exports = router;
