const geoip = require("geoip-lite");
const io = require("../utils/socket");
const Message = require("../models/Message");
const User = require("../models/User");

exports.getMessages = async (req, res, next) => {
  try {
    // Get last(latest) 10 messages
    const messages = await Message.find()
      .select("-updatedAt -__v -_id")
      .sort({ createdAt: -1 })
      .limit(10);
    if (!messages) {
      const error = new Error("Failed to fetch messages");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Fetched messages",
      messages: messages,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postMessage = async (req, res, next) => {
  try {
    const message = req.body.message;
    const user = await User.findById(req.user.id).select("-password");

    if (!message) {
      const error = new Error("Failed to get message");
      error.statusCode = 404;
      throw error;
    }

    // Query messages created last 3 minutes to check for # request limit
    const recentMessages = await Message.find({
      createdAt: { $gt: new Date(Date.now() - 3 * 60 * 1000) },
    });
    /* Optional: When number of messages reaches the limit (50), it removes the oldest message */
    const totalMessages = await Message.find().countDocuments();
    if (totalMessages >= 50) {
      const oldestMessage = await Message.find()
        .sort({ createdAt: 1 })
        .limit(1);
      if (!oldestMessage) {
        const error = new Error("Couldn't find message to remove");
        error.statusCode = 404;
        throw error;
      }
      await Message.findByIdAndRemove(oldestMessage[0]._id);
    }

    const messageDoc = new Message({
      from: user.name,
      user: req.user.id,
      message: message,
    });
    await messageDoc.save();
    // Object to pass to socket.io client
    const message_ = new Message({
      from: messageDoc.from,
      message: message,
      createdAt: messageDoc.createdAt,
    });
    // Sends message to all connected users
    io.getIO().emit("message event", {
      action: "add",
      message: { ...message_._doc },
    });
    res.status(201).json({
      message_,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
