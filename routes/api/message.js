const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const messageController = require("../../controllers/message");

// @endpoint /api/messages
// @method GET
// @access Private
router.get("/", messageController.getMessages);

// @endpoint /api/messages/message
// @method POST
// @access Private
router.post(
  "/message",
  [body("message").trim().isLength({ min: 1, max: 100 })],
  messageController.postMessage
);
module.exports = router;
