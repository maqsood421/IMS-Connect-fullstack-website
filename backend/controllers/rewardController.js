const Reward = require('../models/Reward');
const User = require('../models/User');

// Add reward points to a user
exports.addRewardPoints = async (req, res) => {
    const { userId, points } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.points += points; // Increment user points
        await user.save();

        const reward = await Reward.create({ user_id: userId, points });
        res.status(201).json({ message: 'Points added successfully', reward });
    } catch (error) {
        res.status(500).json({ message: 'Error adding reward points', error });
    }
};

// Get rewards for a user
exports.getUserRewards = async (req, res) => {
    const { userId } = req.params;

    try {
        const rewards = await Reward.find({ user_id: userId });
        res.status(200).json(rewards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rewards', error });
    }
};
