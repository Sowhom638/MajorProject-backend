const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: [String],
    enum: ['men', 'women', 'kids', 'electronics', 'home'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  rating: {
    type: Number,
    required: true,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  isCarted: {
    type: Boolean,
    default: false
  },
  isWished: {
    type: Boolean,
    default: false
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  img: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;