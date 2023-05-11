const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please enter first name"]
  },
  lastName: {
    type: String,
    required: [true, "Please enter last name"]
  },
  password: {
    type: String,
    required: [true, "Please enter the password"]
  },
  age: {
    type: Number,
    required: [true, "Please enter the age"]
  },
  gender: {
    type: String,
    required: [true, "Please select gender"]
  },
  address: {
    type: String,
    required: [true, "Please enter the address"]
  },
  contactNumber: {
    type: Number,
    required: [true, "Please enter the contact number"],
    unique: true
  },
  email: {
  type: String,
  required: [true, "Please add the user email address"],
  unique: [true, "Email address already taken"],
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
});

module.exports = mongoose.model("User", userSchema);




