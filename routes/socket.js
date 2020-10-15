const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const Message = require("../models/Message");

io.on("connection", (socket) => {
  //get the last 10 messages from the database
  Message.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .exec((err, msg) => {
      if (err) return console.log(err);

      //send the last messages to the user
      socket.emit("init", msg);
    });

  // Listen to connected user for a new message
  socket.on("message", (msg) => {
    const message = new Message({
      content: msg.content,
      name: msg.name,
    });

    //save the message to database
    message.save((err) => {
      if (err) return console.log(err);
    });

    // Notify all other user about new message
    socket.broadcast.emit("push", msg);
  });
});
