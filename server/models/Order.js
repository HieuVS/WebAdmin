const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Order = new Schema({
    name: String,
    phone: {
        type: String,
        required: true,
    },
    address: String,
    items: Array,
    discount: {
        type: Schema.Types.ObjectId,
        ref:'discounts',
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    isTakeAway: {
        type: Boolean,
        required: true
    },
    tableId: String
})

module.exports = mongoose.model('orders', Order)