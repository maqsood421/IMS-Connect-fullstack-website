const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Reward', RewardSchema);
