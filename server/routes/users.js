const express = require("express");
const router = express.Router();
const User = require("../models/User");
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../midlleware/auth");
const log = require("../utilities/chalk");
const createErrorLog = require("../utilities/logger");

const userJoiSchema = joi.object({
  _id: joi.string().allow(""),
  name: joi.object({
    firstName: joi.string().required().min(2).max(30),
    middleName: joi.string().max(30).allow(""),
    lastName: joi.string().required().min(2).max(30),
    _id: joi.string().allow(""),
  }),
  phone: joi.string().min(10).max(10),
  email: joi.string().required().email(),
  password: joi
    .string()
    .required()
    .min(8)
    .max(1024)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@%$#^&*-_*(])[A-Za-z\d!@%$#^&*-_*(]{8,}$/
    ),
  image: joi.object({
    imageURL: joi.string().allow(""),
    imageAlt: joi.string().allow(""),
    _id: joi.string().allow(""),
  }),
  gender: joi.string().required().valid("male", "female"),
  role: joi.string().required().valid("admin", "business", "nonbusiness", ""),
  address: joi.object({
    country: joi.string().required().min(3).max(30),
    state: joi.string().allow(""),
    city: joi.string().required().min(2).max(30),
    street: joi.string().required().min(2).max(30),
    houseNumber: joi.string().required().min(1).max(30),
    _id: joi.string().allow(""),
  }),
  favCards: joi.array(),
  __v: joi.number().allow(""),
});

//get all users, avialble for admin only

router.get("/", auth, async (req, res) => {
  try {
    if (req.payload.role !== "admin") {
      return res.status(401).send("Unathorized");
    }
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    createErrorLog(500, error);
    log.err(error);
  }
});

// login usuing google creds

router.post("/google", async (req, res) => {
  try {
    let user = await User.findOne({ email: Object.keys(req.body)[0] });
    if (!user) {
      return (
        createErrorLog(400, "User dosn't exist"),
        res.status(400).send("User dosn't exsist")
      );
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET
    );

    res.status(200).send(token);
  } catch (error) {
    createErrorLog(500, error);
    log.err(error);
  }
});

// get user by id, avialble to admin and the same user id how made the req

router.get("/:id", auth, async (req, res) => {
  try {
    if (req.payload._id !== req.params.id && req.payload.role !== "admin") {
      createErrorLog(401, "unthorized");
      return res.status(401).send("unthorized");
    }
    let user = await User.findById(req.params.id);
    if (!user) {
      createErrorLog(404, "user not found");
      return res.status(404).send("user not found");
    }
    res.status(200).send(user);
  } catch (error) {
    createErrorLog(500, error);
    log.err(error);
  }
});

// update user by id, avialble to admin and the same user id how made the req

router.put("/:id", auth, async (req, res) => {
  try {
    if (req.payload._id !== req.params.id && req.payload.role !== "admin") {
      createErrorLog(401, "unathorized");
      return res.status(401).send("unathorized");
    }
    let { error } = userJoiSchema.validate(req.body);
    if (error) {
      createErrorLog(400, error);
      return res.status(400).send(error);
    }
    let user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });

    if (!user) {
      createErrorLog(404, "user not found");
      return res.status(404).send("user not found");
    }

    res.status(200).send(user);
  } catch (error) {
    createErrorLog(500, error);
    log.err(error);
  }
});

// update user role by id, avialble to the same user id how made the req

router.patch("/:id", auth, async (req, res) => {
  try {
    if (req.payload._id !== req.params.id) {
      createErrorLog(401, "unthorized");
      return res.status(401).send("unthorized");
    }

    let { error } = userRoleJoiSchema.validate(req.body);
    if (error) {
      createErrorLog(400, error);
      return res.status(400).send("inavlid body");
    }

    let user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });

    if (!user) {
      createErrorLog(400, "usernot found");
      return res.status(404).send("user not found");
    }
    res.status(200).send(user);
  } catch (error) {
    createErrorLog(500, error);
    log.err(error);
  }
});

// delete user by id, avialble to admin and the same user id how made the req

router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.payload._id !== req.params.id && req.payload.role !== "admin") {
      createErrorLog(401);
      return res.status(401).send("unthorized");
    }
    let user = await User.findByIdAndDelete({ _id: req.params.id });
    if (!user) {
      createErrorLog(401, "user not found");
      return res.status(404).send("user not found");
    }
    res.status(200).send(user);
  } catch (error) {
    createErrorLog(500, error);
    log.err(error);
  }
});

module.exports = router;
