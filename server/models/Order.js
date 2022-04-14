const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Order = new Schema({
    customerName: String,
    phone: {
        type: String,
        required: true,
    },
    address: String,
    items: Array,
    createAt: {
        type: Date,
        default: Date.now,
    },
    isTakeAway: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('orders', Order)