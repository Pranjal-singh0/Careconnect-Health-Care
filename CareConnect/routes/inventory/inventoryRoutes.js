const express = require('express');
const router = express.Router();
const inventoryController = require('../../controllers/inventoryController');

// Route to dashboard
router.get('/dashboard', inventoryController.getDashboard);

// Add item
router.get('/add', inventoryController.getAddItem);
router.post('/add', inventoryController.postAddItem);

// Delete item
router.get('/delete/:id', inventoryController.deleteItem);

module.exports = router;
