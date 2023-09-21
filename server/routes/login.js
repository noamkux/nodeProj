const express = require("express");
const router = express.Router();
const User = require("../models/User");
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const log = require("../utilities/chalk");
const createErrorLog = require("../utilities/logger");


const userJoiSchema = joi.object({
  email: joi.string().required().email(),
  password: joi
    .string()
    .required()
    .min(8)
    .max(30)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@%$#^&*-_*(])[A-Za-z\d!@%$#^&*-_*(]{8,}$/
    ),
});

router.post("/", async (req, res) => {
  try {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
      createErrorLog(400, error)
      return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user){
      createErrorLog(400, "Invalid email or password")
     return res.status(400).send("Invalid email or password");}

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      
      createErrorLog(400, "Invalid email or password")
      return res.status(400).send("Invalid email or password");
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET
    );

    res.status(200).send(token);
  } catch (error) {
    createErrorLog(500, error)
    log.err(error);
  }
});

module.exports = router;
