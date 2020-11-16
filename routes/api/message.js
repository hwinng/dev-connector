const express = require("express");
const { body } = require("express-validator");
const auth = require("../../middlewares/auth");
const router = express.Router();
const messageController = require("../../controllers/message.controller");
// GET /messages
router.get("/messages", messageController.getMessages);
// POST /message
router.post(
  "/message",
  [body("message").trim().isLength({ min: 1, max: 100 })],
  auth,
  messageController.postMessage
);
module.exports = router;
