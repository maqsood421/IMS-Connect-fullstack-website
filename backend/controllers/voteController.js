const Vote = require('../models/Vote');
const Idea = require('../models/Idea');
const mongoose = require('mongoose');

// Cast a vote for an idea
exports.castVote = async (req, res) => {
    const { idea_id } = req.body;
    const userId = req.user; // Extract user ID from authenticated user

    try {
    
        // Validate ObjectId for ideaId and userId
        if (!mongoose.Types.ObjectId.isValid(idea_id) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid idea ID or user ID' });
        }

        // Check if the idea exists in the database
        const idea = await Idea.findById(idea_id);
        if (!idea) {
            return res.status(404).json({ message: 'Idea not found' });
        }

        // Check if the user has already voted for this idea
        const existingVote = await Vote.findOne({ idea_id: idea_id, user_id: userId });
        if (existingVote) {
            return res.status(400).json({ message: 'You have already voted for this idea' });
        }

        // Create a new vote
        const vote = new Vote({ idea_id: idea_id, user_id: userId });
        await vote.save();

        res.status(201).json({ message: 'Vote casted successfully', vote });
    } catch (error) {
        console.error("Error casting vote:", error.message);
        res.status(500).json({ message: 'Error casting vote', error: error.message });
    }
};

// Get votes for an idea
exports.getVotesByIdea = async (req, res) => {
    const { idea_id } = req.params;

    try {
        // Validate ObjectId for ideaId
        if (!mongoose.Types.ObjectId.isValid(idea_id)) {
            return res.status(400).json({ message: 'Invalid idea ID' });
        }

        // Fetch votes for the idea and populate user information
        const votes = await Vote.find({ idea_id: idea_id }).populate('user_id', 'name email');

        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching votes', error: error.message });
    }
};
