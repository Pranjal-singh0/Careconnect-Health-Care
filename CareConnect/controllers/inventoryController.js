const Inventory = require('../models/Inventory');

// GET: Render add item form
exports.getAddItem = (req, res) => {
  res.render('inventory/addItem', { error: null }); // Pass null initially
};

exports.postAddItem = (req, res) => {
  const item = {
    name: req.body.name,
    quantity: parseInt(req.body.quantity),
    category: req.body.category
  };

  Inventory.addItem(item, (err) => {
    if (err) {
      return res.render('inventory/addItem', { error: 'Error adding item' }); // Pass error to the template
    }

    res.redirect('/inventory/dashboard');
  });
};

exports.getDashboard = (req, res) => {
  console.log("🔍 /inventory/dashboard hit");

  const Inventory = require('../models/Inventory');
  Inventory.getAllItems((err, items) => {
    if (err) {
      console.error("❌ Error loading items:", err);
      return res.render('inventory/dashboard', { items: [] });
    }
    // Check what is being passed to EJS
    if (items.length > 0) {
      console.log("✅ Items exist, rendering dashboard with items");
    } else {
      console.log("⚠️ No items found in DB");
    }
console.log("📦 Items fetched from DB:", items);

    res.render('inventory/dashboard', { items });
  });
};

// DELETE: Delete item by ID
exports.deleteItem = (req, res) => {
  const id = req.params.id;
  Inventory.deleteItemById(id, (err) => {
    if (err) {
      console.error("❌ Error deleting item:", err);
      return res.send('Error deleting item');
    }

    console.log("🗑️ Item deleted with ID:", id);
    res.redirect('/inventory/dashboard');
  });
};
