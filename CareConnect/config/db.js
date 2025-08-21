const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri); // No need for options in v4+

let db;

async function connectDB() {
    try {
        console.log("🔌 Connecting to MongoDB...");
        await client.connect();

        const dbName = process.env.DB_NAME || 'careconnect';
        db = client.db(dbName);

        console.log(`✅ MongoDB connected to database: ${dbName}`);
    } catch (error) {
        console.error('❌ DB connection error:', error);
        process.exit(1);
    }
}

function getDB() {
    if (!db) {
        console.warn("⚠️ getDB() called before DB was initialized.");
        throw new Error('Database not initialized. Make sure connectDB() is called first.');
    }
    return db;
}

module.exports = { connectDB, getDB };
