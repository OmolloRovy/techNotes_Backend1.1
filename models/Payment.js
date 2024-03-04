const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const paymentSchema = new mongoose.Schema(
  {

name: {
      type: String,
      required: true,
    },
    amountPaid: {
      type:  String,
      required: true,
     
    },
    change: {
      type: String,
      required: true,
    },
    otherMethods: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
