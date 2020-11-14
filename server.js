require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Define server
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const io = require("socket.io").listen(server);

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

//connect database;
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Mongodb successfully connected");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// Assign socket object to every request
app.use(function (req, res, next) {
  req.io = io;
  next();
});

//usable routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/jobs", require("./routes/api/job"));
app.use("/", require("./routes/api/message"));
