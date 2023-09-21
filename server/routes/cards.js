const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const auth = require("../midlleware/auth");
const joi = require("joi");
const User = require("../models/User");
const log = require("../utilities/chalk");
const createErrorLog = require("../utilities/logger");

const cardValidationSchema = joi.object({
  ownerId: joi.string().required(),
  title: joi.string().required().min(2).max(50),
  subtitle: joi.string().required().min(5),
  description: joi.string().required().min(20).max(500),
  phone: joi.string().min(10).max(10),
  email: joi.string().required().email(),
  webSite: joi.string(),
  image: joi.object({
    businessImgURL: joi.string().min(2),
    businessImgAlt: joi.string().min(2),
  }),
  address: joi.object({
    country: joi.string().required().min(3).max(30),
    state: joi.string(),
    city: joi.string().required().min(2).max(30),
    street: joi.string().required().min(2).max(30),
    houseNumber: joi.string().required().min(1).max(30),
    zipcode: joi.string().required().min(2).max(30),
  }),
  postDate: joi.string().allow(""),
});

// get all cards

router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    if (!cards.length) {
      createErrorLog(404, "cards not found");
      return res.status(404).send("cards not found");
    }

    res.status(200).send(cards);
  } catch (error) {
    log.err(error);
  }
});

// get cards for the user id

router.get("/mycards", auth, async (req, res) => {
  try {
    let cards = await Card.find({ ownerId: req.payload._id });

    if (!cards.length) {
      createErrorLog(404, "cards not found");
      return res.status(404).send("cards not found");
    }
    res.status(200).send([cards]);
  } catch (error) {
    createErrorLog(500, error)
    log.err(error);
  }
});

// get card by id

router.get("/:id", async (req, res) => {
  try {
    let card = await Card.findById(req.params.id);
    if (!card) {
      createErrorLog(404, "cards not found");
      return res.status(404).send("card not found");
    }
    res.status(200).send(card);
  } catch (error) {
    createErrorLog(500, error)
    log.err(error);
  }
});

// POST new card avialble to business and admin only

router.post("/", auth, async (req, res) => {
  try {
    if (req.payload.role !== "business" && req.payload.role !== "admin") {
      createErrorLog(401, "unathorized");
      return res.status(401).send("unathorized");
    }

    req.body.ownerId = req.payload._id;

    log.err(req.body);
    const { error } = cardValidationSchema.validate(req.body);
    if (error) {
      createErrorLog(400, error.details[0].message);
      res.status(400).send(error.details[0].message);
    }

    let card = await Card.findOne({
      title: req.body.title,
    });

    if (card) {
      createErrorLog(409, "card already exists");
      return res.status(409).send("card already exists");
    }

    let newCard = new Card({
      ownerId: req.body.ownerId,
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      phone: req.body.phone,
      email: req.body.email,
      webSite: req.body.webSite,
      image: req.body.image,
      address: req.body.address,
    });

    await newCard.save();

    res.status(201).send(newCard);
  } catch (error) {
    createErrorLog(500, error)
    log.err(error);
  }
});

// update card by id, avialble to the same user id how made the req

router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = cardValidationSchema.validate(req.body);
    if (error) {
      createErrorLog(400, error.details[0].message);
      return res.status(400).send(error.details[0].message);
    }
    let newCard = await Card.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.payload._id },
      req.body
    );
    if (!newCard) {
      createErrorLog(404, "card not found");
      return res.status(404).send("card not found");
    }
    res.status(200).send(newCard);
  } catch (error) {
    createErrorLog(500, error)
    log.err(error);
  }
});

// add card to favCards array in user model

router.patch("/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.payload._id);
    if (!user) {
      res.status(404).send("user not found");
    }

    if (user.favCards.includes(req.params.id)) {
      user.favCards = user.favCards.filter((card) => card !== req.params.id);
      await user.save();
      return res
        .status(200)
        .send(`${req.params.id} removed from favCards ${user}`);
    }
    user.favCards.push(req.params.id);

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    createErrorLog(500, error)
    log.err(error);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.payload.role !== "business" && req.payload.role !== "admin") {
      createErrorLog(401, "unathorized");
      return res.status(401).send("unathorized");
    }

    let card = await Card.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.payload._id,
    });
    if (!card) {
      createErrorLog(404, "card not found");
      return res.status(404).send("card not found");
    }

    res.status(200).send(card);
  } catch (error) {
    createErrorLog(500, error)
    log.err(error);
  }
});

module.exports = router;
