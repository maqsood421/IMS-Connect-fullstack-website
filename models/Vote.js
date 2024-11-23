const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    idea_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Vote', VoteSchema);
