require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const useragent = require("express-useragent");
const rateLimit = require("express-rate-limit");

connectDB();

app.use(express.json({ extented: true }));
app.use(useragent.express());

// Set up rate limiter for entire app requests
const appLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // limit each IP # requests per windowMs
});
app.use(appLimiter);

// Set CORS header
// app.use((req, res, next) => {
//   res.setHeader("Access-control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, DELETE, PUT, OPTIONS"
//   );
//   res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
//   // Allow client to set headers with Content-Type
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// Error Handler
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data; // Passing original error data
  res.status(status).json({ message: message, data: data });
});

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/jobs", require("./routes/api/job"));
app.use("/api/messages", require("./routes/api/message"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
