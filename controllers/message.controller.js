const Message = require("../models/Message");
const User = require("../models/User");

const getMessages = async (req, res, next) => {
  Message.aggregate([
    {
      $lookup: {
        from: "user",
        localField: "from",
        foreignField: "id",
        as: "fromObj",
      },
    },
  ])
    .project({
      "fromObj.password": 0,
      "fromObj.__v": 0,
      "fromObj.date": 0,
    })
    .exec((err, messages) => {
      if (err) {
        console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Failure" }));
        res.sendStatus(500);
      } else {
        res.json(messages);
      }
    });
};

// @desc post the message with restricted conditions
const postMessage = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const message = new Message({
      from: user.name,
      message: req.body.message,
      user: req.user.id,
    });

    req.io.sockets.emit("message event", req.body.message);

    await message.save();
    res.json(message);
  } catch (err) {
    console.log(err);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Failure" }));
    res.sendStatus(500);
  }
};

module.exports = {
  getMessages,
  postMessage,
};
