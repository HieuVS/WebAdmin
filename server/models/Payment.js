const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Payment = new Schema({
    items: {
        type: Array,
        require: true,
    },
    charge: {
        type: Schema.Types.ObjectId,
        ref:"charges",
    },
    discount: {
        type: Schema.Types.ObjectId,
        ref:"discounts",
    },
    totalAmount: Number,
    tax: Number,
    isTakeAway:  Boolean,
    customer: Object,
    createAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('payment', Payment);