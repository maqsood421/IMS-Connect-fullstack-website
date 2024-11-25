const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    idea_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea', required: true },
  },
  { timestamps: true }
);

// Add a unique index to prevent duplicate votes
VoteSchema.index({ user_id: 1, idea_id: 1 }, { unique: true });

module.exports = mongoose.model('Vote', VoteSchema);
