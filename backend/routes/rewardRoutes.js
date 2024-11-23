const express = require('express');
const { addRewardPoints, getUserRewards } = require('../controllers/rewardController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addRewardPoints);    // Add reward points to a user
router.get('/:userId', authMiddleware, getUserRewards); // Get rewards for a user

module.exports = router;
