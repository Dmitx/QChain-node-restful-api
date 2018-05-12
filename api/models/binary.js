const mongoose = require('mongoose');

const binarySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: { type: Number, required: true },
    title: { type: String, required: true },
    binary: { type: String, required: true }
});

module.exports = mongoose.model('Binary', binarySchema);