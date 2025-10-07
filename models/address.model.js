const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  street: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  district: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zipcode: {
    type: Number,
    required: true,
    min: [100000, 'Zipcode must be a valid 6 digit number'],
    max: [999999, 'Zipcode must be a valid postal code']
  }
}, {
  timestamps: true
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;