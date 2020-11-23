require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const useragent = require("express-useragent");
const messageRoutes = require("./routes/api/message");
const { setUpIOConnection } = require("./controllers/socket.controller");

app.use(express.json());
app.use(useragent.express());

// Set CORS header
app.use((req, res, next) => {
  res.setHeader("Access-control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, OPTIONS"
  );
  res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
  // Allow client to set headers with Content-Type
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Register routes
app.use("/", messageRoutes);
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/jobs", require("./routes/api/job"));

// Error Handler
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data; // Passing original error data
  res.status(status).json({ message: message, data: data });
});
// DB connection

const port = process.env.PORT || 8999;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    setUpIOConnection(server);
  })
  .catch((err) => {
    // Handle error
    console.log(err);
  });
