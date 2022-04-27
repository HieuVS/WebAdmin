const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isOwner: { 
        type: Boolean,
        required: true,
    },
    name: String,
    age: String,
    phone: String,
    maNV: String,
    createAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('users', User);