const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    type: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('categories', Category);