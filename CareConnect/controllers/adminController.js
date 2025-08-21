const { getDB } = require('../config/db');
const { getChatHistory } = require('../models/chatSession');

exports.getDashboard = async (req, res) => {
  try {
    const db = getDB();
    const [userCount, inventoryCount] = await Promise.all([
      db.collection('users').countDocuments(),
      db.collection('inventory').countDocuments()
    ]);

    res.render('admin/dashboard', {
      userCount,
      inventoryCount,
      title: 'Admin Dashboard'
    });
  } catch (error) {
    console.error('❌ Error loading dashboard:', error);
    res.status(500).send('Server Error');
  }
};

exports.getUsers = async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection('users').find({}, { projection: { _id: 0, username: 1 } }).toArray();
    res.render('admin/users', { users });
  } catch (error) {
    console.error('❌ Error loading users:', error);
    res.status(500).send('Server Error');
  }
};

exports.getChats = (req, res) => {
  try {
    const db = getDB();
    const chatData = getChatHistory(); // This could be per user or global depending on your logic
    res.render('admin/chats', { chatData });
  } catch (error) {
    console.error('❌ Error loading chats:', error);
    res.status(500).send('Server Error');
  }
};