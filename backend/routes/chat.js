const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { saveChatLog, getChatLogs } = require('../controllers/chatController');

// Protect all routes
router.use(protect);

// Route to save chat log
router.post('/log', saveChatLog);

// Route to get chat logs for a user
router.get('/log/:userId', getChatLogs);

module.exports = router; 