const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: Number,
    image: String,
    stock: Number,
    tax: Boolean,
    category: {
        type: Schema.Types.ObjectId,
        ref:'category',
    } 
})

module.exports = mongoose.model('items', Item);