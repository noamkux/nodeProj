const jwt = require("jsonwebtoken");
const createErrorLog = require("../utilities/logger");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      createErrorLog(401, "Unauthorized no token provided")
      return res.status(401).send("Unauthorized no token provided");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload
    next()
  } catch (error) {
    console.log(error);
  }
};
