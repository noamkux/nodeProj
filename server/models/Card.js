const mongoose = require("mongoose");

const currentDate = new Date();

const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
const year = currentDate.getFullYear();
const formattedDate = `${day}-${month}-${year}`;


// Define sub-schemas for address and image
const addressSchema = new mongoose.Schema({
  country: { type: String, required: true, minLength: 3, maxLength: 30 },
  state: { type: String },
  city: { type: String, required: true, minLength: 2, maxLength: 30 },
  street: { type: String, required: true, minLength: 2, maxLength: 30 },
  houseNumber: { type: String, required: true, minLength: 1, maxLength: 30 },
  zipcode: { type: String, required: true, minLength: 2, maxLength: 30 },
});

const imageSchema = new mongoose.Schema({
  businessImgURL: { type: String, minLength: 2 },
  businessImgAlt: { type: String, minLength: 2 },
});

const cardSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true, minLength: 2, maxLength: 50 },
  subtitle: { type: String, required: true, minLength: 5 },
  description: { type: String, required: true, minLength: 20, maxLength: 500 },
  phone: { type: String, minLength: 10, maxLength: 10 },
  email: { type: String, required: true, unique: true },
  webSite: { type: String },
  image: imageSchema,
  address: addressSchema,
  postDate: { type: String, default: formattedDate }
});


const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
