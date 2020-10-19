require("dotenv").config();
const jwt = require("jsonwebtoken");
//const config = require("config");

module.exports = (req, res, next) => {
  //get the token from header
  const token = req.header("auth-token");

  //check if not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Invalid token, authorization denied." });
  }

  //verify token
  try {
    const decodedToken = jwt.verify(token, process.env.jwtSecret);
    req.user = decodedToken.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
