require("dotenv").config();
const request = require("request");
const { validationResult } = require("express-validator");

const auth = require("../middlewares/auth");

const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

const viewMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile of this user." });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server errored");
  }
};

const createAndUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    facebook,
    youtube,
    linkin,
    instagram,
    twitter,
  } = req.body;

  // Build profile object
  const profileFields = {};

  profileFields.user = req.user.id;

  for (field in req.body) {
    if (req.body[field]) {
      if (field === "skills")
        profileFields.skills = req.body[field]
          .split(",")
          .map((skill) => skill.trim());
      else profileFields[field] = req.body[field];
    }
  }
  // Build social object
  profileFields.social = {};
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkin) profileFields.social.linkin = linkin;
  if (youtube) profileFields.social.youtube = youtube;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    //Update
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    //Create
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json("Server errors...");
  }
};

const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.send(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server errors...");
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status.json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);

    // Avoid if params is not kind of ObjectId
    // example api/profile/user/1 -> 'Profile not found'
    // instead of inform 'Server errors...'
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).json("Server errors...");
  }
};

const removeProfile = async (req, res) => {
  try {
    //remove all posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndDelete({ user: req.user.id });
    // Remove user
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: "User removed." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server errors...");
  }
};

const addExperience = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, company, location, from, to, current, description } = req.body;

  //Create a new experience object
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error...");
  }
};

const removeExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get the remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server errors...");
  }
};

const addEducation = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  //Create a new education object
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error...");
  }
};

const removeEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get the remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server errors...");
  }
};

const getUserRepos = (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.githubClientId}&client_secret=${process.env.githubClientSecret}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  viewMyProfile,
  createAndUpdateProfile,
  getProfiles,
  getProfile,
  removeProfile,
  addExperience,
  addEducation,
  removeEducation,
  removeExperience,
  getUserRepos,
};
