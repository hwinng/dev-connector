const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const auth = require("../../middlewares/auth");
const {
  getMessages,
  postMessage,
} = require("../../controllers/message.controller");

// GET /messages
router.get("/messages", auth, (req, res) => {
  getMessages(req, res);
});

// POST /message
router.post(
  "/message",
  [body("message").trim().isLength({ min: 1, max: 100 })],
  auth,
  (req, res) => {
    postMessage(req, res);
  }
);
module.exports = router;
