const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minLength: 2, maxLength: 30 },
  middleName: { type: String, maxLength: 30 },
  lastName: { type: String, required: true, minLength: 2, maxLength: 30 },
});

const imageSchema = new mongoose.Schema({
  imageURL: { type: String },
  imageAlt: { type: String },
});

const addressSchema = new mongoose.Schema({
  country: { type: String, required: true, minLength: 3, maxLength: 30 },
  state: { type: String },
  city: { type: String, required: true, minLength: 2, maxLength: 30 },
  street: { type: String, required: true, minLength: 2, maxLength: 30 },
  houseNumber: { type: String, required: true, minLength: 1, maxLength: 30 },
});

const userSchema = new mongoose.Schema({
  name: nameSchema,
  phone: { type: String, minLength: 10, maxLength: 10 },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 1024,
    match:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@%$#^&*-_*(])[A-Za-z\d!@%$#^&*-_*(]{8,}$/,
  },
  gender: { type: String, required: true, enum: [`male`, `female`] },
  role: {
    type: String,
    required: true,
    enum: ["admin", "business", `nonbusiness`, ``],
  },
  image: imageSchema,
  address: addressSchema,
  favCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
