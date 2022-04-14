const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Table = new Schema({
    isActive: Boolean,
    headcount: Number,
    startAt: {
        type: Date,
        default: Date.now(),
    },
    endAt: {
        type: Date,
        default: Date.now(),
    },
    table: {
        type: Schema.Types.ObjectId,
        ref: 'category',
    }
});

module.exports = mongoose.model('tables', Table);