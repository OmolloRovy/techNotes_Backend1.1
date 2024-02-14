const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const CustomerSchema = new mongoose.Schema({
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
});
noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Customer', customerSchema)