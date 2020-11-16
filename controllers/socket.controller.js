exports.setUpIOConnection = (server) => {
  const io = require("../utils/socket").init(server);
  const users = [];
  io.on("connection", async (socket) => {
    users.push({ id: socket.id });
    io.emit("init", { users: users });
    // Handle disconnect
    socket.on("disconnect", (reason) => {
      // Remove user
      let index = -1;
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.id === socket.id) {
          index = i;
        }
      }
      // Remove user
      if (index !== -1) {
        users.splice(index, 1);
      }
      io.emit("init", { users: users });
    });
  });
};
