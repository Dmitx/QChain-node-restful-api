const mongoose = require('mongoose');

const contractSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String },
    initHash:{ type: String },
    ownerAddress: { type: String },
    type: { type: Number },
    title: { type: String },
    data: { type: String },
    status: { type: Number },
});

module.exports = mongoose.model('Contract', contractSchema);