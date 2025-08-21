const { getChatHistory } = require('../models/chatSession');
const adminModel = require('../models/adminModel');

// Admin Dashboard
exports.getDashboard = (req, res) => {
  adminModel.getCounts((err, counts) => {
    if (err) {
      console.error('❌ Error loading dashboard:', err);
      return res.status(500).send('Server Error');
    }

    res.render('admin/dashboard', {
      userCount: counts.userCount,
      inventoryCount: counts.inventoryCount,
      title: 'Admin Dashboard'
    });
  });
};

// Users List
exports.getUsers = (req, res) => {
  adminModel.getAllUsers((err, users) => {
    if (err) {
      console.error('❌ Error loading users:', err);
      return res.status(500).send('Server Error');
    }

    res.render('admin/users', { users });
  });
};

// Chat History
exports.getChats = (req, res) => {
  try {
    const chatData = getChatHistory(); // Static or from memory
    res.render('admin/chats', { chatData });
  } catch (error) {
    console.error('❌ Error loading chats:', error);
    res.status(500).send('Server Error');
  }
};
