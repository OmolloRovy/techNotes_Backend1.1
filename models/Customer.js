const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const customerSchema = new mongoose.Schema(
  {
    note: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Note",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    device_details: {
      type: Object, // Adjust structure based on device data
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
