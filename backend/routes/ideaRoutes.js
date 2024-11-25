const express = require('express');
const { createIdea, getIdeas, getAllIdeas } = require('../controllers/ideaController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createIdea);
router.get('/', authMiddleware, getAllIdeas);
router.get('/get-user-ideas', authMiddleware, getIdeas);

module.exports = router;
