const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Table = new Schema({
    isActive: Boolean,
    number: Number,
    startAt: {
        type: Date,
        default: Date.now(),
    },
    headCount: Number,
    tableId: String
});

module.exports = mongoose.model('tables', Table);