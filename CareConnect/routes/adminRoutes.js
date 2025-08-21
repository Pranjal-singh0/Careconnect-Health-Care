const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Routes
router.get('/dashboard', adminController.getDashboard);
router.get('/users', adminController.getUsers);
router.get('/chats', adminController.getChats);

module.exports = router;
