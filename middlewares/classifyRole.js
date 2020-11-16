require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkRole = (roles) => async (req, res, next) => {
  const token = req.header(process.env.TOKEN_HEADER);

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Invalid token, authorization denied." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.jwtSecret);
    req.user = decodedToken.user;

    const user = await User.findById(req.user.id).select("-password");
    !roles.includes(user.role)
      ? res.status(401).json({ msg: "Unauthorized!" })
      : next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = { checkRole };
