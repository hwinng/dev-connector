module.exports = (roles) => async (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json({ msg: "Unauthorized!" })
    : next();
