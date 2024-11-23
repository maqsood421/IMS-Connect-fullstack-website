const Vote = require('../models/Vote');
const Idea = require('../models/Idea');

// Cast a vote for an idea
exports.castVote = async (req, res) => {
    const { ideaId } = req.body;
    const userId = req.user._id; // Extract user ID from authenticated user

    try {
        // Check if user already voted for this idea
        const existingVote = await Vote.findOne({ idea_id: ideaId, user_id: userId });
        if (existingVote) {
            return res.status(400).json({ message: 'User already voted for this idea' });
        }

        // Create a new vote
        const vote = await Vote.create({ idea_id: ideaId, user_id: userId });

        res.status(201).json({ message: 'Vote cast successfully', vote });
    } catch (error) {
        res.status(500).json({ message: 'Error casting vote', error });
    }
};

// Get votes for an idea
exports.getVotesByIdea = async (req, res) => {
    const { ideaId } = req.params;

    try {
        const votes = await Vote.find({ idea_id: ideaId }).populate('user_id', 'name email');
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching votes', error });
    }
};
