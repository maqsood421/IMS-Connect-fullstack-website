const express = require('express');
const { castVote, getVotesByIdea } = require('../controllers/voteController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, castVote);        // Cast a vote
router.get('/:ideaId', authMiddleware, getVotesByIdea); // Get votes for an idea

module.exports = router;
