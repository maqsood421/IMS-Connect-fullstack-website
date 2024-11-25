const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to fetch all messages
router.get('/', authMiddleware, getMessages);

// Route to post a new message
router.post('/',authMiddleware, sendMessage);

module.exports = router;
