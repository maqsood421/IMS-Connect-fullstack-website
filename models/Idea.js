const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Idea', IdeaSchema);
