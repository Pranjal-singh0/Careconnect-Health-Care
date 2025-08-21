const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

function getAllItems(callback) {
  const db = getDB();
  if (!db) return callback(new Error("Database not connected"));

  const collection = db.collection('inventory');

  collection.find({}).project({ name: 1, quantity: 1, category: 1 }).toArray()
    .then((items) => {
      console.log("📦 Items fetched from DB:", items); // Debug log
      callback(null, items);
    })
    .catch((err) => {
      console.error("❌ Error fetching items:", err);
      callback(err);
    });
}

function addItem(item, callback) {
  const db = getDB();
  db.collection('inventory').insertOne(item, callback);
}

function deleteItemById(id, callback) {
  const db = getDB();
  db.collection('inventory').deleteOne({ _id: new ObjectId(id) }, callback);
}

module.exports = { getAllItems, addItem, deleteItemById };
