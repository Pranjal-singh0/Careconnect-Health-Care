const express = require('express');
const router = express.Router();
const mentalHealthController = require('../controllers/chatController');

router.get('/chat', mentalHealthController.getChatPage);
router.post('/chat', mentalHealthController.postChatMessage);

module.exports = router;
