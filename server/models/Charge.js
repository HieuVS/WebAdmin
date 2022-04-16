const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Charge = new Schema({
    type: {
        type: String,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('charge', Charge);