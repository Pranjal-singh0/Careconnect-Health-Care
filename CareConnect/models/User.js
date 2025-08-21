const { getDB } = require('../config/db');
const collectionName = 'users';

const UserModel = {
    async create(userData) {
        const db = getDB();
        const result = await db.collection(collectionName).insertOne(userData);
        return result.insertedId;
    },

    async findByEmail(email) {
        const db = getDB();
        return await db.collection(collectionName).findOne({ email });
    }
};

module.exports = UserModel;
