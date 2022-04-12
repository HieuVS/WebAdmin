const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: Number,
    phone: String,
    maNV: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('staffs', Staff);