const express = require("express");
const router = express.Router();
const User = require("../models/User");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const log = require("../utilities/chalk");
const createErrorLog = require("../utilities/logger");

const userJoiSchema = joi.object({
  name: joi.object({
    firstName: joi.string().required().min(2).max(30),
    middleName: joi.string().max(30).allow(""),
    lastName: joi.string().required().min(2).max(30),
  }),
  phone: joi.string().min(10).max(10),
  email: joi.string().required().email(),
  password: joi
    .string()
    .required()
    .min(8)
    .max(30)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@%$#^&*-_*(])[A-Za-z\d!@%$#^&*-_*(]{8,}$/
    ),
  image: joi.object({
    imageURL: joi.string().allow(""),
    imageAlt: joi.string().allow(""),
  }),
  gender: joi.string().required().valid("male", "female"),
  role: joi.string().required().valid("admin", "business", "nonbusiness", ""),
  address: joi.object({
  country: joi.string().required().min(3).max(30),
  state: joi.string().allow(""),
  city: joi.string().required().min(2).max(30),
  street: joi.string().required().min(2).max(30),
  houseNumber: joi.string().required().min(1).max(30)}),
  favCards: joi.array(),
});

router.post("/", async (req, res) => {
  try {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
      createErrorLog(400, error)
      return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      createErrorLog(409, "User already exists")
      return res.status(409).send("User already exists");
    }
    const newUser = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    const token = jwt.sign(
      { _id: newUser._id, role: newUser.role, email: newUser.email },
      process.env.JWT_SECRET
    );

    res.status(201).send(token);
  } catch (error) {
    createErrorLog(500, error)
    log.err(error);
  }
});

module.exports = router;
