const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // `required` ensures the field must be provided.
  },
  email: {
    type: String,
    required: true,
    unique: true, // Additional option to ensure uniqueness.
  },
  password: {
    type: String,
    required: true, // Field is mandetory.
  },
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
    },
  ],
});

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
