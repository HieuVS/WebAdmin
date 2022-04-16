const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Discount = new Schema({
    code: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('discounts', Discount);