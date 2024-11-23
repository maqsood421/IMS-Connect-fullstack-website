const express = require('express');
const { createIdea, getIdeas } = require('../controllers/ideaController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', createIdea);
router.get('/', authMiddleware, getIdeas);

module.exports = router;
