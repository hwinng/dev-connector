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
  // Retrieve IP from the header
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (ip.includes(",")) {
    ip = ip.substring(0, ip.indexOf(","));
  }
  // Retrieve partial IP from ip. i.e. 111.22
  let partialIp = "";
  const splittedIps = ip.split(".");
  if (splittedIps.length < 1) {
  } else if (splittedIps.length === 1) {
    partialIp = splittedIps[0];
  } else {
    partialIp = `${splittedIps[0]}.${splittedIps[1]}`;
  }
  try {
    // Get timezone from ip address. When not found, set default to prevent error
    let geo = geoip.lookup(ip);
    if (!geo) {
      geo = { timezone: "", agent: { isBot: false } };
    }
    const message = req.body.message;
    const user = await User.findById(req.user.id).select("-password");

    if (!message) {
      const error = new Error("Failed to get message");
      error.statusCode = 404;
      throw error;
    }
    // Bot check
    if (geo.agent && geo.agent.isBot) {
      const error = new Error("Failed to post");
      error.statusCode = 400;
      throw error;
    }
    // Query messages created last 3 minutes to check for # request limit
    const recentMessages = await Message.find({
      createdAt: { $gt: new Date(Date.now() - 3 * 60 * 1000) },
    });
    let ipMatchCount = 0;
    let platformMatchCount = 0;
    // Check if there are multiple entries with same ip & device
    recentMessages.forEach((m) => {
      if (m.ip === ip) {
        ipMatchCount++;
        if (
          m.agent &&
          m.agent.platform === req.useragent.platform &&
          m.agent.os === req.useragent.os
        ) {
          platformMatchCount++;
        }
      }
    });
    // Limit requests with same ip and device to 10 or same ip to 20
    if (
      (ipMatchCount >= 10 && platformMatchCount >= 10) ||
      ipMatchCount >= 20
    ) {
      const error = new Error("Message limit reached");
      error.statusCode = 400;
      throw error;
    }
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
      ip: ip,
      agent: {
        isBot: req.useragent.isBot,
        platform: req.useragent.platform,
        os: req.useragent.os,
      },
      partialIp: partialIp,
      timezone: geo.timezone,
      message: message,
    });
    await messageDoc.save();
    // Object to pass to socket.io client
    const message_ = new Message({
      from: messageDoc.from,
      partialIp: messageDoc.partialIp,
      timezone: geo.timezone,
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
