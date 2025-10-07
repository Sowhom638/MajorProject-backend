// models/order.model.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            img: { type: String, required: true }
        }
    ],
    shippingAddress: {
        firstName: String,
        lastName: String,
        street: String,
        city: String,
        district: String,
        state: String,
        zipcode: Number
    },
    totalAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);