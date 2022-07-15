const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema({
    Ecode: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    DoB: String,
    phone: String,
    birthPlace: String,
    joinDate: {
        type: Date,
        default: Date.now,
    },
    role: String
})

module.exports = mongoose.model('staffs', Staff);