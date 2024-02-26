const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const paymentSchema = new mongoose.Schema(
  {
    customer:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref: 'Customer'
    },
name: {
      type: String,
      required: true,
      ref: 'User'
    },
    Amountpaid: {
      type:  Integer,
      required: true,
     
    },
    change: {
      type: Integer,
      required: true,
    },
  
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
